Généralités
###########

Les URLs “safe” et “unsafe”
---------------------------

La configuration du serveur fait état de 2 URLs différentes, via les
champs “httpUnsafeOrigin” et “httpSafeOrigin”. Par défaut, sur une
instance de développement, ce sont les adresses
``http://localhost:3000/`` (unsafe) et ``http://localhost:3001/``
(**unsafe**). La seconde (**safe**) n’est généralement pas montrée aux
utilisateurs car elle ne fonctionne que pour des éléments ouverts de
manière interne. Ouvrir CryptPad manuellement avec l’URL safe ne permet
pas d’accéder aux applications.

CryptPad utilise un système de sandbox qui permet d’isoler l’interface
utilisateur du contenu en mémoire. Pour des raisons de confort
d’utilisation, il est nécessaire de garder en mémoire toutes les
informations du compte utilisateur courant (contenu du drive, liste de
contacts, équipes, etc.). L’interface, qui est la partie vulnérable de
la structure et pourrait contenir des failles, est donc tenue à l’écart
de ces informations et ne reçoit que celles essentielles pour utiliser
le document courant. Pour effectuer cela, toute cette partie “interface
utilisateur” a été placée dans une iframe prenant l’intégralité de la
fenêtre et ouverte sur l’URL **safe**. Le niveau de base, parent de
l’iframe, qui contient les données sensibles et quant à lui ouvert sur
l’URL **unsafe** fournie aux utilisateurs.

.. note:: Dans un système en production, il est possible d’utiliser des sous-domaines différents ou même des domaines différents pour représenter ces 2 origines. Par exemple, sur l’instance gérée par les développeurs, l’URL unsafe est ``https://cryptpad.fr`` et l’URL safe est ``https://sandbox.cryptpad.info/.``

Structure en 5 niveaux
----------------------

Le code de CryptPad est réparti dans 5 niveaux distincts, 2 côté serveur
et 3 côté clients.

-  Côté serveur

   -  Le “server” qui contient le code lancé dans le processus
      principal. Il gère les connexions websockets et tous les appels au
      serveur passent donc par ce niveau.
   -  Les “workers” qui gèrent toutes les connexions à la base de
      données et les traitements demandant davantage de ressource du
      processeur. Le “server” principal les appelle lorsqu’il reçoit
      certaines commandes des utilisateurs. Ils sont lancés dans des
      processus distincts afin de pouvoir exploiter au mieux les
      potentiels différents coeurs du processeur.

-  Côte client

   -  Le niveau de base, appelé “outer” dans le code, qui contient le
      HTML chargé par le navigateur en fonction de l’URL de la page. Ce
      niveau est chargé avec l’URL “unsafe” (celle qui est visible dans
      la barre d’adresse du navigateur) car il a accès à des données
      sensibles, notamment les clés de chiffrement du compte
      utilisateur.
   -  L’iframe contenant l’interface utilisateur, appelée “inner” dans
      le code, et lancée en tant que fille de “outer” et elle utilise
      l’URL “safe”. Cette iframe représente l’intégralité de l’écran
      visible par l’utilisateur. Aucun élément d’interface ne se trouve
      au dehors (dans le niveau “outer”). Elle n’a accès qu’aux données
      nécessitant d’être affichées à l’écran.
   -  Le niveau supérieur, appelé “worker” (au singulier, différent des
      “workers” côté serveur), qui gère la connexion au serveur et garde
      en mémoire toutes les données du compte utilisateur (ou du compte
      “non-enregistré”). Ce niveau est chargé dans un SharedWorker
      lorsque le navigateur le supporte (Firefox, Chrome, Edge) avec
      l’URL “unsafe”, ce qui signifie que tous les onglets du navigateur
      du client chargés sur cette instance de CryptPad auront accès au
      même worker. Il permet donc de n’avoir à charger les données du
      compte qu’une fois pour tous les onglets ouverts, et il permet de
      n’avoir à lancer qu’une seule connexion Websocket avec le serveur.


.. image:: /images/dev/5levels.png
   :class: screenshot

Chiffrement
-----------

CryptPad utilise plusieurs systèmes de chiffrements adaptés aux
différents cas d’utilisation. Ces systèmes sont utilisés avec la
librairie `TweetNaCl <https://github.com/dchest/tweetnacl-js>`__.

-  Documents, compte utilisateur, fichiers statiques et chat de groupe

   -  Chiffrement symétrique “xsalsa20-poly1305”.
   -  Une clé de chiffrement unique permet aux utilisateurs de chiffrer
      et déchiffrer le contenu souhaité. Cette clé est dérivée du “hash”
      de l’URL du document (la partie située après le #) car cette
      partie n’est jamais envoyée au serveur par le navigateur, ce qui
      permet de respecter la contrainte Zero-knowledge.
   -  Tous les utilisateurs ayant accès à cette clé peuvent déchiffrer
      les “patchs” permettant de reconstruire le document ou déchiffrer
      les messages du chat.

-  Accès en lecture seule des documents

   -  Signature “ed25519”.
   -  Le chiffrement étant symétrique, tous les utilisateurs pouvant
      lire et donc déchiffrer le document peuvent aussi techniquement
      chiffrer des messages et les envoyer. Un système de signature
      permet d’autoriser ou non l’envoi de messages.
   -  L’URL d’édition contient, en plus de clé de chiffrement, une clé
      de signature. Les éditeurs vont donc “signer” les messages après
      chiffrement.
   -  Une clé “publique” de vérification permet à tous les utilisateurs
      (éditeurs **et** lecteurs) de vérifier si un message (un patch) a
      bien été signé avec la bonne clé de signature. Les messages dont
      la signature est invalide sont ignorés.
   -  Lorsqu’un document est créé, on envoie au serveur la clé publique
      de vérification associée à ce document. Les messages dont la
      signature n’est pas valides ne sont pas stockés dans la base de
      données.

-  Chat privé entre deux utilisateurs (application “contacts”)

   -  Chiffrement asymétrique “x25519-xsalsa20-poly1305”.
   -  Lors de la création d’un compte utilisateur, une paire de clé de
      chiffrement asymétrique est générée pour le compte, ainsi qu’une
      paire de clé de signature. Chacune de ces paires contient une
      composante privée et une composante publique. Les parties
      publiques sont partagées avec les contacts.
   -  Le chiffrement asymétrique permet, lorsque l’on connait la clé
      publique de chiffrement de l’autre utilisateur, de chiffrer un
      message que lui seul pourra déchiffrer. Ainsi, en utilisant notre
      propre clé privée et la clé publique du contact, on peut chiffrer
      le message pour cet utilisateur uniquement, à condition qu’il
      connaisse notre propre clé publique.
   -  Envoyer une demande de contact à un utilisateur permet d’effectuer
      l’échange de clés publiques permettant ce chiffrement.

-  Mailbox, centre de notifications

   -  Double chiffrement asymétrique “x25519-xsalsa20-poly1305”.
   -  Le centre de notifications fonctionne grâce aux autres
      utilisateurs qui envoient une “notification” lorsqu’ils effectuent
      une action concernant l’utilisateur courant.
   -  On souhaite ici pouvoir envoyer des messages à un autre
      utilisateur d’une manière où il a la preuve de l’identité de
      l’expéditeur, sans que le serveur (ou quiconque ayant accès à la
      base de données) ne puisse identifier l’expéditaire ou le
      destinataire via leurs clés publiques.
   -  Le message est d’abord chiffré de manière asymétrique en utilisant
      notre clé privée et la clé publique du destinataire. Pour pouvoir
      lire cette partie, le destinataire doit connaître notre clé
      publique, ce qui n’est pas forcément le cas si il n’y a pas eu de
      demande de contact.
   -  On ajoute alors notre propre clé publique (de manière
      non-chiffrée) au message (chiffré), et on chiffre l’ensemble de
      manière asymétrique en utilisant cette fois une paire de clé à
      usage unique générée pour l’occasion. On envoie le message
      nouvellement chiffré avec la partie publique de la clé
      nouvellement générée.
   -  Le destinataire peut alors déchiffrer une première fois avec sa
      clé privée et la clé publique à usage unique. Il a alors accès à
      un nouveau contenu chiffré ainsi qu’à notre véritable clé
      publique. Il peut enfin déchiffrer le véritable message en
      utilisant sa clé privée et notre clé publique. Si cet utilisateur
      connaisait déjà notre clé publique, il a alors une preuve
      cryptographique que nous sommes l’expéditeur du message.

Drive et journal de “pins”
--------------------------

Le compte utilisateur, comprenant les clés cryptographiques associées,
le drive, les contacts et les équipes, est stocké dans la base de
données de la même manière qu’un document collaboratif CryptPad
quelconque. Le chiffrement le rend indifférenciable d’un pad pour
quiconque aurait accès à la base de données.

La partie “drive” du compte correspond donc à une hiérarchie de
documents (fichiers et dossiers), chaque fichier étant associé à
l’adresse du document collaboratif lié. Les adresses de lecture-seule et
d’édition sont stockées séparément de manière à pouvoir stocker les
documents même si seul l’accès en lecture-seule est connu.

Les drives étant impossible à différencier des documents normaux, un
autre système a été mis en place afin de pouvoir garantir que les
documents y étant stockés ne seront pas supprimés pour inactivité pour
les utilisateurs enregistrés. Il s’agit de la **liste de pins**.

La base de données contient ainsi une **liste de pins** pour chaque
utilisateur enregistré, chaque liste étant identifiée par la **clé
publique de signature** du compte utilisateur. Cette liste contient les
identifiants de tous les documents collaboratifs stockés dans le drive
de l’utilisateur concerné. Lorsque le serveur doit supprimer des
documents pour cause d’inactivité, il peut vérifier qu’ils ne sont
présents dans aucune liste de pins.

.. _exemple-1:

Exemple
~~~~~~~

.. code-block:: javascript

   // Drive
   {
     "root": {
       "Folder": {
         "e76245241314a65dacfe13b1c34b4fa7": 842390975368
       },
       "0c1bf2c6be2cd5eaafd2b2bd1a4043ea": 937347739064
     },
     "filesData": {
       "937347739064": {
         "title": "Rich text 1",
         "atime": 1594892373553,
         "ctime": 1594892373553,
         "href": "http://localhost:3000/pad/#/2/pad/edit/D3YorVnQYakniVbj+fgdq7tx/",
         "channel": "2e44fb409dc333f0008a3bae4a74f032"
       },
       "842390975368": {
         "title": "Markdown document",
         "atime": 1594814836987,
         "ctime": 1594814831653,
         "href": "http://localhost:3000/code/#/2/code/edit/0WKVNAeUzgSs+WtIQQmhkwiw/",
         "channel": "f0b3fa6aaa4a1285f68c3329f4fc9e86"
       }
     }
   }

   // Pins
   ["2e44fb409dc333f0008a3bae4a74f032", "f0b3fa6aaa4a1285f68c3329f4fc9e86"]

Inscription, connexion et block
-------------------------------

Un compte utilisateur est donc composé d’un document collaboratif
contenant le drive ainsi que d’une liste de “pins”. Un troisième élément
est également stocké pour les comptes utilisateurs afin de pouvoir gérer
le changement de mot de passe. Bien qu’il soit en effet impossible de
récupérer son compte si le mot de passe est oublié, il est possible de
changer le mot de passe si l’on a toujours accès au compte.

Contrairement aux systèmes classiques où le nom d’utilisateur et le hash
du mot de passe sont envoyés au serveur, sur CryptPad aucune de ces 2
informations ne quitte le navigateur de l’utilisateur. Ils sont à la
place utilisés comme arguments pour une `fonction de dérivation
Scrypt <https://fr.wikipedia.org/wiki/Scrypt>`__ qui fournit
l’équivalent d’un hash. La différence avec une fonction de hachage
classique se situe dans le fait que **Scrypt est rendue volontairement
très coûteuse en ressources processeur** alors qu’une fonction de
hachage se doit d’être la plus rapide possible. Éant utilisée pour la
gestion des identifiants de l’utilisateur, rendre son exécution longue
permet de bloquer les attaques par force brute. Il faut en effet
plusieurs secondes pour exécuter la fonction avec un ordinateur haut de
gamme à l’heure où ce document est écrit.

Une fois la fonction exécutée, on obtient un hash contenant une série
d’octets qui vont nous servir à générer des clés de connexion. Ces clés,
une clé de chiffrement et une clé représentant un identifiant unique,
permettent de créer ou récupérer un **block**. Il s’agit d’un fichier
chiffré stocké sur le serveur et contenant les véritables clés du compte
utilisateur.

En résumé, lors de l’\ **inscription** à CryptPad, les identifiants
entrés permettent de créer un “block”. On crée en parallère des clés
d’accès au compte utilisateur (un identifiant unique pour le compte, une
clé de chiffrement et une paire de clés de signature pour pouvoir
modifier les données du compte), que l’on va chiffrer et stocker dans le
block. Lors de la **connexion**, Scrypt nous permet de récupérer
l’identifiant du block et de pouvoir le déchiffrer, ce qui nous donne
accès aux clés du compte utilisateur.

Lorsque l’utilisateur souhaite **changer de mot de passe**, il n’y a
donc pas besoin de migrer le compte entier vers un nouveau document,
uniquement le “block”. Scrypt va en effet nous donner de nouvelles clés
de connexion pour utiliser un nouveau block. Ce block sera chiffré avec
une clé différente du premier, mais le contenu déchiffré sera le même :
les clés du compte utilisateur. Il ne reste alors plus qu’à invalider le
contenu du block d’origine.

Afin de ne permettre aux utilisateurs de rester connecter sans devoir
taper leur mot de passe à chaque nouvelle session, les clés du block
sont gardées en mémoire dans le **localStorage** du navigateur (pour le
domaine “unsafe”). Se déconnecter revient donc à supprimer ces clés du
localStorage.

.. _exemple-2:

Exemple
~~~~~~~

-  Exemple de clés de connexion (clés d’accès au block et de
   chiffrement) sur cryptpad.fr

   -  ``localStorage.Block_hash = "https://files.cryptpad.fr/block/c8/c89FhK8CQfTcoiP073T-RwSgqbY7f--Naoa3ZH8feLk=#UDYn4ZMy1tLksGtYMPewPewCSPkM+vEbluI7hMIe81U="``

-  Exemple de clés de compte utilisateur (accès, chiffrement et
   signature) sur cryptpad.fr

   -  ``"/1/edit/PeWuMBluHImPezK+0IHvtA/4e4242jfxWiKi3JAjtkx-lDt/"``

Communication client-serveur (Netflux)
--------------------------------------

La communication entre le client et le serveur s’effectue dans la grande
majorité des cas via une connexion Websocket. Cette connexion est basée
sur une implémentation du protocole
`Netflux <https://github.com/xwiki-labs/netflux-spec2/blob/master/specification.md>`__.
Les exceptions concernent les fichiers statiques (images, vidéos, pdf,
etc.) et les fichiers de type “block” qui sont stockés entiers chiffrés
et qui sont récupérés par les utilisateurs en XHR (téléchargement du
fichier chiffré complet).

Avec le protocole Netflux, les utilsateurs créent un “network” qu’ils
utilisent ensuite pour effectuer plusieurs types d’opérations. **Les
points importants** concernant l’implémentation du protocole sont :

-  Chaque utilisateur est identifié par une chaîne hexadécimale de 32 caractères appelée **netfluxId**. Cet identifiant est généré par le serveur et est créé pour chaque connexion Websocket. Un utilisateur qui ouvre CryptPad via 2 navigateurs différents en même temps aura un netfluxId pour chaque navigateur (pour chaque connexion au serveur). Cet identifiant change donc a chaque nouvelle connexion, aucun mécanisme n’existe pour préserver l’identifiant d’un utilisateur entre différentes sessions.
-  Un utilisateur peut rejoindre des salons et y envoyer des messages. Tous les membres du salon reçoivent les messages. Chaque document collaboratif ouvert sur CryptPad est représenté par un salon sur le serveur avec un identifiant unique.
-  L’identifiant des salons est également une chaîne hexadécimale de 32 caractères appelée **channelId** ou **channel**. Le channelId associé a un document est dérivé de son URL, afin qu’il soit connu de tous les utilisateurs y ayant accès.
-  Les utilisateurs peuvent s’envoyer des messages directs entre eux sans passer par un salon, à condition qu’ils connaissent le “netfluxId” du destinataire.

Côté serveur
~~~~~~~~~~~~

Au niveau du serveur, Netflux est implémenté via le module npm
“chainpad-server” :
``./node_modules/chainpad-server/NetfluxWebsocketSrv.js``. Ce module
crée le serveur Websocket et écoute les connexions entrantes et les
requêtes des clients. Il crée et garde en mémoire les salons et leurs
membres tant qu’il reste au moins un membre dans le salon. Il transmet
également les messages privés envoyés par les membres entre eux.

**IMPORTANT :** Le protocole Netflux ne fait pas mention d’un serveur
centralisé et donc ne fournit aucune solution directe pour le stockage
des messages envoyés dans les salons. Le serveur centralisé utilisé dans
CryptPad est le résultat de **l’implémentation Websocket** du protocole.
La partie stockage des données a été réalisée sans modifier les règles
imposées par le protocole.

Le **stockage des données** a été réalisée grâce à l’ajout d’un “faux”
membre dans chaque salon du serveur. Dés qu’un salon est créé par un
utilisateur, un utilisateur spécial nommé **history keeper** le rejoint.
Cet utilisateur reçoit tous les messages du salon comme n’importe quel
membre et il stocke les messages dans une base de données. Quand un
utilisateur rejoint un salon (c’est-à-dire qu’il ouvre un document), son
navigateur va envoyer un **message direct** au membre **history keeper**
afin de lui demander l’historique du document. **History keeper** va
envoyer la partie de l’historique nécessaire pour reconstruire la
dernière version du document. Une fois synchronisé, l’utilisateur va
recevoir tous les nouveaux changements en temps réel et va pouvoir
envoyer ses propres modifications.

.. note:: Ce faux utilisateur est géré par le serveur mais son code est bien distinct de la partie “Netflux” du serveur. Il représente toute la base de données et son code est donc séparé dans de nombreux fichiers.  La base se trouve dans ``./lib/historyKeeper.js``

Côté client
~~~~~~~~~~~

Au niveau du client, un module “bower” permet de gérer le protocole
Netflux avec des APIs simples. Le module se trouve dans
``./www/bower_components/netflux-websocket/netflux-client.js``. Une fois
chargé, ce module permet de créer un **network** représentant la
connexion Websocket au serveur Netflux et l’état de l’utilisateur
courant dans au niveau du serveur.

Ce “network” contient la **liste des salons** rejoints par
l’utilisateur, ainsi que la **liste des membres** présents dans chaque
salon. Il permet d’effectuer toutes les opérations permises par le
protocole :

-  Rejoindre un salon : ``(Promise) network.join(channelId)`` (fournit un object ``channel``)
-  Envoyer un message privé : ``(Promise) network.sendTo(netfluxId, message)``
-  Obtenir la liste des salons : ``(Array) network.webChannels``
-  Écouter des évènements dans un network : ``network.on('message', handler)`` (évènements: message, disconnect)

Et pour chaque salon obtenu via “network.join” :

-  Envoyer un message : ``(Promise) channel.bcast(message)``
-  Quitter un salon : ``channel.leave(reason)``
-  Écouter des évènements : ``channel.on('message', handler)`` (évènements: message, join, leave)
-  Obtenir l’identifiant du salon : ``(String) channel.id``
-  Obtenir la liste des membres : ``(Array) channel.members``

.. _exemple-3:

Exemple
~~~~~~~

.. code-block:: javascript

   // Clientside
   var channelId = "f0b3fa6aaa4a1285f68c3329f4fc9e86";
   Netflux.connect('ws://lcoalhost:3000/cryptpad_websocket').then(function (network) {}
     // on success
     
     network.join(channelId).then(function (channel) {
       // on success
       
       // listen for new messages
       channel.on('message', function (message, senderNetfluxId) {
         console.log('Message received:' + message);
       });
       // send a message
       channel.bcast("Hello world!");
       
     }, function (error) {
       // on error
       
       console.error(error);
       
     });
     
   }, function (error) {
     // on error
     
     console.error(error);
     
   });

