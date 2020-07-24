Outer
=====

Le niveau “outer” représente le point de départ du code de CryptPad.
Outre le fichier HTML qui se contente d’exécuter le JavaScript
principal, ce niveau est entièrement constitué de code JavaScript. Il
est séparé en deux fichiers principaux, qui sont connectés à l’iframe
inner pour l’un et au worker pour l’autre. Les APIs utilisées pour
communiquer sont les mêmes dans les deux cas.

Communication entre les niveaux
-------------------------------

La communication se fait en utilisant une mini-librairie développée dans
CryptPad implémentée dans le fichier
``www/common/outer/worker-channel.js``. Cette librairie permet a deux
systèmes de s’envoyer des messages de types “requête” et “évènement”.
Une requête (“query”) consiste à envoyer des données et à attendre une
répondre, alors qu’un évènement (“event”) se contente d’envoyer les
données.

Cette librairie gère automatiquement les callbacks pour les réponses
reçues et permet à chaque partie d’indiquer quand elle est prête à
communiquer. La façon dont les messages sont envoyées est gérée en
dehors de la librairie grâce à une fonction “sendMessage” qui lui est
fournie en argument. Elle déclenche un évènement créé avec
“Util.mkEvent” et fourni lui aussi en argument lorsqu’un évènement ou
une requête est reçue. S’il s’agit d’une requête, un callback est inclus
dans l’évènement avec les données.

Communication avec inner - sframe-common-outer
----------------------------------------------

``www/common/sframe-common-outer.js``

Il s’agit là du premier fichier JavaScript principal chargé par toutes
les applications CryptPad. Il est chargé juste après la création de
l’iframe inner et va d’abord procéder à l’installation d’un canal de
communication entre ces deux niveaux. Une fois ce canal créé, il va
charger le second fichier JavaScript principal qui va gérer le côté
“worker”. Ces également le seul niveau qui a directement accès aux clés
contenues dans l’URL du document.

Deux étapes vont alors avoir lieu en parallèle :

-  le chargement du compte utilisateur dans le worker
-  le chargement de l’interface de l’application dans inner

Une fois le compte utilisateur chargé, sframe-common-outer va
initialiser tous ses “handlers” qui vont gérer les évènements et
requêtes reçues de la part de “inner”. Ces “handlers” sont nombreux et
repérables dans le code avec ``sframeChan.on('...', handler);``. Ils
permettent notamment de :

-  Effectuer des actions propres au niveau “outer”

   -  Changer le titre de l’onglet ou son icône
   -  Modifier le localStorage ou modifier le sessionStorage

-  Effectuer des actions liées aux clés du document

   -  Changement du mot de passe du document (nécessite de déchiffrer et
      rechiffrer entièrement le contenu)
   -  Enregistrer ou modifier les informations du pad dans le drive
      (l’URL du pad est stockée dans le drive)
   -  Créer une copie ou créer un modèle du document (nécessite l’accès
      au contenu déchiffré pour le rechiffrer différemment)

-  Transférer des commandes au worker

   -  Upload de fichier
   -  Accès à différentes données
   -  Rejoindre un pad, pouvoir recevoir et envoyer des patchs
   -  Actions de gestion d’un pad (renommer, supprimer, liste d’accès,
      propriétaires, etc.)

-  Transférer des commandes aux modules du worker

   -  Ces commandes ne font généralement que transiter ici, elles ne
      sont pas lues et sont directement envoyées au worker

Une fois toutes ces fonctions enregistrées, sframe-common-outer va se
déclarer “prêt” et quand “inner” le sera aussi, ce script lancera le
processus pour démarrer l’application utilisée (si nécessaire) : créer
un nouveau document ou rejoindre un document existant.

Communication avec le worker - cryptpad-common
----------------------------------------------

``www/common/cryptpad-common.js``

Ce fichier est l’un des plus anciens fichiers du code de CryptPad. Son
fonctionnement est resté le même depuis le début bien que son contenu
aie beaucoup changé. Son rôle principal est de créer un canal de
communication avec le worker puis, une fois prêt, de commander au worker
de charger le compte utilisateur. Les clés du compte auront au préalable
été extraites du localStorage. Une fois le compte utilisateur et tous
les modules chargés, le worker envoie un signal à cryptpad-common qui va
lui-même permettre à sframe-common-outer de continuer.

En dehors de ce processus de chargement du compte utilisateur,
cryptpad-common garde un contact privilégié avec le worker, ce qui lui
permet d’effectuer certaines tâches que l’on souhaite garder en dehors
de celui-ci mais qui nécessite d’accéder à certaines de ses données.

Toutes les tâches qui contiennent une partie cryptographique et qui ne
sont pas liées ni au fonctionnement temps-réel d’un pad, ni à un élément
global du compte utilisateur seront exécutées dans ce fichier. Les
parties cryptographiques liées au compte utilisateur sont effectuées
dans le worker car elles concernent tous les onglets et ne doivent donc
pas être répétées de nombreuses fois. Le fonctionnement temps-réel des
pads, y compris le chiffrement, est traité dans un fichier spécifique.
Les éléments restant concernent donc les tâches nécessitant de
déchiffrer ou chiffrer des données comme les changements de mots d
epasse ou les copies. Ces commandes sont généralement lancées par une
action de l’utilisateur dans “inner” puis reçues par sframe-common-outer
qui demande à cryptpad-common de les traiter.

Le reste de ce fichier consiste enfin à transférer des messages entre le
worker et sframe-common-outer ou inner.

Autres fichiers notables
------------------------

-  ``www/common/sframe-chainpad-netflux-outer.js``

   -  Ce fichier est responsable du fonctionnement temps-réel du pad
      chargé dans l’onglet actuel. Il transmet les messages entre inner
      et le worker et les chiffre/déchiffre au passage.

-  ``www/common/outer/localstore.js``

   -  Ce fichier gère l’accès à certains éléments récurrents du
      localStorage. Il permet notamment d’ajouter les clés du compte
      utilisateur à la connexion et il les supprime lors de la
      déconnexion.

-  ``www/common/cryptget.js``

   -  Cette librairie peut techniquement être utilisée dans les 3
      niveaux du client de CryptPad, mais elle est le plus souvent
      utilisée dans outer. Elle permet, pour un document donné, de
      récupérer en une commande simple son contenu déchiffré au format
      texte ou de définir le contenu à une certaine valeur de manière
      simple.
   -  Elle utilise chainpad-netflux pour créer une connexion au réseau,
      charger le document, récupérer son contenu (pour une commande
      “get”) ou définir son contenu (commande “put”) puis ferme
      directement la connexion réseau.

