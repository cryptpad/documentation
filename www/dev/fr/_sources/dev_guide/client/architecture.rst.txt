
Architecture client
===================

L’architecture client est séparée en 3 niveaux. Le worker est commun à
tous les onglets CryptPad ouverts dans un même navigateur et chaque
onglet contient son propre “outer” et ses iframes. “outer” correspond au
niveau de base, c’est-à-dire au fichier HTML chargé en premier par le
navigateur. Deux iframes sont ouvertes, la première contenant toute
l’interface de l’application et ouverte sur la domaine “safe”, la
seconde contenant les éléments d’interface devant afficher des données
confidentielles et donc ouverte sur le domaine unsafe. Chacun des trois
niveaux a ses propres rôles qui vont être détaillés dans cette partie.

.. image:: /images/dev/client.png
   :class: screenshot


.. _architecture_worker:

Worker
------

Fonctionnement
~~~~~~~~~~~~~~

Le worker est l’unique lien WebSocket avec le serveur pour tous les
onglets CryptPad. Cela est effectué grâce à la technologie SharedWorker,
qui permet d’ouvrir un “Webworker” commun à tous les onglets ouverts sur
la même origine. Les avantages sont alors multiples :

-  Gain en ressources sur le client (mémoire, CPU, et réseau économisés
   en évitant les répétitions de tâches)
-  Gain en ressources sur le serveur (une unique connexion avec chaque
   client)
-  Les “workers” représentent du code exécuté dans un thread différent
   de l’onglet principal, ce qui permet d’effectuer des calculs plus
   lourds sans ralentir la page.

Il faut toutefois noter que tous les navigateurs n’ont pas implémenté
les SharedWorkers. Ils ne sont disponibles que sur Firefox ainsi que les
navigateurs basés sur Chromium. Internet Explorer ainsi que les
anciennes versions d’Edge ne les supportent pas mais les nouvelles
versions d’Edge étant basées sur Chromium, elles le permettent. Apple ne
souhaite pas les développer par `manque d’adoption de la part des
développeurs <https://twitter.com/xeenon/status/652573047623323648>`__.

Pour ces navigateurs obsolètes, le système bascule automatique sur des
“WebWorkers” classiques, c’est-à-dire 1 worker par onglet. Cela permet
toujours l’utilisation d’un thread séparé pour les calculs assez lourds,
mais cela ralentit fortement la chargement des onglets lorsque le compte
utilisateurs contient beaucoup de données. Enfin, si les WebWorkers ont
été désactivés dans le navigateur, un dernier système est en place afin
d’effectuer le travail du worker dans l’onglet principal au niveau
“outer”. Cela n’a aucun impact sur le fonctionnement du code mais ne
permet pas de profiter des avantages des workers.

.. note:: Il est possible de désactiver facilement l’utilisation des workers dans CryptPad. Cela peut faciliter le débogage dans certains cas, la console des Shared Workers n’étant pas facilement accessible.  Pour cela, il suffit d’entrer ``localStorage.CryptPad_noWorkers = "1"`` dans la console JavaScript du navigateur. Pour réactiver les workers, il faut alors supprimer ou changer la valeur de cette clé du localStorage.

Contenu
~~~~~~~

Le niveau de code “worker” est ouvert depuis le niveau “outer”, une fois
que des vérifications initiales ont été effectuées. C’est “outer” qui
décide quel type de worker il peut utiliser (SharedWorker, WebWorker ou
rien). Il initialise alors le worker avec le “connecteur” correspondant
à ce type de worker :

-  ``www/common/outer/sharedworker.js`` pour le SharedWorker
-  ``www/common/outer/webworker.js`` pour le SharedWorker
-  ``www/common/outer/noworker.js`` pour le SharedWorker

.. note:: Il existe aussi un fichier “serviceworker.js” pour lancer le worker dans un service worker, qui a également d’autres avantages (comme la compatibilités avec davantage de navigateurs) mais pose certaines contraintes incompatibles avec le code actuel. Aucune solution n’a pour l’instant été trouvée.

Une fois le connecteur chargé avec la technologie souhaitée, c’est
exactement le même code qui régit les 3 types de système.

1. Un **canal de communication asynchrone** est d’abord initialisé avec
   le niveau “outer” afn de recevoir des commandes et d’envoyer des
   évènements.
2. Un fichier ``www/common/outer/store-rpc.js`` traduit les commandes
   texte en fonctions à appeler.
3. Un Store principal est créé dans ``www/common/outer/async-store.js``.
   c’est lui qui contient les fonctions correspondant aux commandes et
   qui charge tous les modules nécessaires au fonctionnement du worker.

Tout accès à du contenu se trouvant dans la base de données du serveur
s’effectue alors via des commandes au worker. Ce contenu représente :

-  Les données du compte utilisateur (nom, clés personnelles, accès aux
   différents modules)

   -  Drive, dossiers partagés, contacts, clés d’accès aux équipes,
      profil, préférences, etc.

-  Les données des équipes

   -  Drive, dossiers partagés, membres, metadonnées (image et nom de
      l’équipe)

-  L’accès aux pads (ou documents collaboratifs) pour chaque onglet
   CryptPad ouvert dans le navigateur

Débogage
~~~~~~~~

Lorsqu’un utilisateur rencontre un bug dans CryptPad, tout se passe
généralement au niveau du client et aucune donnée n’est transmise au
serveur. La console JavaScript permet alors de détecter toute erreur
ayant pu survenir dans le code, mais cette console ne concerne que
l’onglet actuel. C’est-à-dire qu’elle se limite aux niveaux “outer” et
“inner” et qu’il n’est pas possible d’accéder au niveau “SharedWorker”
directement. Firefox essaye toutefois d’afficher une copie des messages
de la console du SharedWorker dans la console de la page, mais cela
reste limité et ne permet pas l’exécution de code ou le débogage avancé.

Il faut alors utiliser la **console du SharedWorker** disponible de la
manière suivante :

-  Dans Chrome et Chromium

   -  Ouvrir la page ``chrome://inspect``
   -  Ouvrir la partie “Shared workers”
   -  Repérer le worker souhaité et cliquer sur “inpect”

-  Dans Edge (basé sur Chromium)

   -  Ouvrir la page ``edge://inspect``
   -  Ouvrir la partie “Shared workers”
   -  Repérer le worker souhaité et cliquer sur “inpect”

-  Dans Firefox

   -  Ouvrir la page ``about:debugging``
   -  Ouvrir la partie “Ce Firefox”
   -  Repérer le worker souhaité dans “Workers partagés” et cliquer sur
      “Examiner”

Outer
-----

.. _fonctionnement-1:

Fonctionnement
~~~~~~~~~~~~~~

Le niveau appelé “outer” est le niveau de base, correspondant au fichier
HTML chargé par le navigateur. Il est nommé ainsi par le fait que c’est
le code situé à l’extérieur de l’iframe.

Chaque application commence donc par son propre fichier “index.html”. Ce
fichier va charger le code JavaScript de base, généralement situé dans
un fichier “main.js” pour l’application. On cherche ici à initialiser
les différents niveaux le plus rapidement possible car le niveau “outer”
n’affiche aucune interface et afficher un écran blanc n’est pas
intéressant pour l’utilisateur. c’est donc l’iframe “inner” qui est
d’abord ouverte afin d’afficher l’écran de chargement.

Le fichier “main.js” de chaque application va alors commencer à charger
le code principal, commun à toutes les applications au niveau “outer”.
La première partie est située dans
``www/common/sframe-common-outer.js``. C’est ce module qui va gérer la
communication entre les niveaux “outer” et “inner”. De la même manière
que pour le worker, ces 2 niveuax peuvent s’envoyer des commandes ou des
évènements.

Ce module va également charger ``www/common/cryptpad-common.js`` qui
représente cette fois la communication entre les niveaux “outer” et
“worker”. “cryptpad-common” va d’abord choisir le meilleur type de
worker disponible dans le navigateur. Il va l’initialiser, créer un
canal de communication puis envoyer la commande principale permettant de
charger le compte utilisateur.

Une fois le compte utilisateur chargé par le worker,
“sframe-common-outer” va pouvoir informer “inner” et c’est alors
l’initialisation du pad (si applicable) ou du contenu de l’application
qui va avoir lieu.

Le niveau “outer” fonctionne donc comme un intermédiaire entre
l’interface et la “base de données locale”. Il maintient le tout ouvert,
permet les communications et effectuent certaines tâches.

.. _contenu-1:

Contenu
~~~~~~~

Les tâches effectuées par “outer” ne se limitent pas à l’initialisation
du contenu et la transmission de messages. Le code actuel est basé sur
le principe que plusieurs onglets CryptPad seront ouverts dans le
navigateur (héritage du fonctionnement très simple des débuts de
CryptPad et potentiellement difficile à changer). Le SharedWorker permet
d’effectuer des tâches régulières dans un thread commun à tous ces
onglets, mais il ne faut pas que l’on surcharge ce thread au risque de
ralentir l’ensemble des onglets. C’est pourquoi, lorsqu’un onglet
souhaite accéder à un document collaboratif, la récupération du contenu
chiffré est effectué par le “worker”, mais le **déchiffrement** de
celui-ci est effectué dans “outer”.

C’est également “outer” qui se charge de la gestion des clés du document
ouvert, des opérations de changement de mot de passe du compte ou d’un
document, de la copie de pad et du système de connexion au compte (login
avec Scrypt).

Enifn, le localStorage (qui contient des données persistantes) est lié
au domaine principal et est donc géré exclusivement par “outer”.

Inner
-----

.. _fonctionnement-2:

Fonctionnement
~~~~~~~~~~~~~~

Lorsqu’un nouvel onglet est ouvert, “outer” va charger dés que possible
l’iframe “inner” principale. Chaque application possède pour cela sa
propre page “inner.html” qui représente le point de départ de l’iframe.
Ce fichier va alors charger le code de base de l’application “inner.js”,
qui va être chargé d’ouvrir tous les modules nécessaires. La plupart des
modules étant communs à toutes les applications, le fichier “inner.js”
est souvent le seul fichier propre à une application donnée.

Les éléments importants chargés par “inner.js” concernent le code
permettant de communiquer avec “outer”, les éléments d’interface communs
(barre d’outils, menus réutilisables, etc.) mais aussi tout le style de
l’application et des éléments communs. Le style est chargé par un
fichier “.less” propre à l’application depuis “inner.js”, qui importe
tout le style nécessaire à cette application. Un système less propre à
CryptPad qui compile en CSS dans le navigateur du client est utilisé.
Cela permet d’utiliser toutes les fonctions avancées de LESS dans le
code, avec notamment les mixins, sans se soucier d’ajouter une étape de
build qui n’est pas nécessaire pour le JavaScript non plus.

Le but de l’iframe “inner” principale est de fonctionner avec un domaine
(ou une origine HTTP) différent, ce qui permet de profiter de
protections “cross-domain” supplémentaire. Cette iframe est l’unique
partie du système qui affiche une interface où les utilisateurs
intéragissent entre eux, ce qui la rend particulièrement vulnérable en
cas de faille dans le code. L’isoler, d’une part dans une iframe, et
d’autre part avec un domaine différent, permet de protéger toutes les
données qui ne sont pas directement affichées dans le document. Il est
même ainsi **impossible de récupérer les clés du pad courant** depuis
l’iframe “inner”. Seul le contenu déchiffré est accessible, ainsi que
les données publiques de l’utilisateur et les utilisateurs actuels du
pad.

Afin de pouvoir afficher à l’écran des données sensibles telles que le
lien du pad, son mot de passe ou même ses propriétaires dans les
fenêtres de partage ou de gestion des accès, ces éléments sont ouverts
dans une iframe séparée, appelée “secure-iframe”. Cette iframe sécurisée
est ouverte sur le domaine “safe” bien qu’elle aie accès à des données
sensibles pour des raisons de simplicité du code, mais elle n’a aucun
contact direct avec l’iframe principale. Tous les échanges possibles
entre l’iframe principale (qui affiche l’application ouverte) et
l’iframe sécurisée (qui affiche des données sensibles) se font par
l’intermédiaire de “outer”. Ces deux iframes sont toutes les deux filles
de “outer” et elles ne peuvent donc pas accéder aux données l’une de
l’autre, ce qui rend possible l’utilisation du domaine “safe” sur
l’iframe sécurisée accédant au contenu “unsafe”.

.. _contenu-2:

Contenu
~~~~~~~

Les iframes “inner” se chargent d’afficher l’intégralité de l’interface
utilisateur. Cela concerne aussi bien les éléments communs à toutes les
applications (barre d’outils, menu utilisateur, actions principales) que
les éléments communs aux documents collaboratifs (fenêtres d’accès ou de
partage, liste d’utilisateurs) ainsi que les éléments propres à chaque
application (rendu du contenu). Les fenêtres “partage”, “accès”,
“propriétés” ainsi que la fenêtre d’upload ou de sélection d’un fichier
sont affichées par l’iframe sécurisée. Tous le reste se trouve dans
l’iframe principale.

