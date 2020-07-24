Inner
=====

Le niveau inner correspond à toute l’interface visible de CryptPad. Il
représente une iframe isolée du contenu complet du compte de
l’utilisateur. Chaque application CryptPad possède sa propre interface,
mais de nombreux éléments sont en commun et le fonctionnement reste le
même dans la majorité des cas. Seule la manière dont les données sont
affichées change complètement.

Fonctionnement
--------------

Le point de départ JavaScript du niveau “inner” correspond au fichier
“inner.js” de chaque application. Ce fichier charge tous les éléments
nécessaires au fonctionnement de l’iframe et gère la représentation des
données dans l’application concernée. Que l’application utilise le
système “framework” ou non, le fonctionnement global reste le même :

-  Un module sframe-common charge le module de communication avec
   “outer” et initialise différents systèmes

   -  Metadata manager
   -  localStore
   -  mailbox
   -  et de nombreux autres sytèmes selon le type d’application

Sframe-common
-------------

``www/common/sframe-common.js``

C’est le point central de l’iframe inner. Cet élément va charger tous
les sous-modules essentiels à l’iframe et va gérer le canal de
communication avec l’extérieur. La plupart des systèmes à ce niveau qui
ne sont pas purement interface et qui ont besoin de données utilisent
sframe-common pour les récupérer. Dans le code, la variable y donnant
accès est souvent appelée ``common`` et parfois ``sfCommon``.

metadata-manager
----------------

``www/common/metadata-manager.js``

Ce module permet aux niveaux extérieurs à l’iframe (worker et outer) de
fournir des données à celle-ci. Ces données sont réparties en 2
catégories selon à qui elles sont destinées : les données “user”
contiennent tout ce qui est public concernant le compte utilisateur
actuel et sont destinées aux autres utilisateurs et les données “priv”
contiennent des éléments privé ou qui ne servent pas aux autres
utilisateur.

Les niveaux extérieurs décident d’eux-mêmes de quand ré-envoyer ces
données, car ce sont eux qui savent quand elles sont mises à jour. Les
mises à jours sont très fréquentes et une première version est envoyée
dés l’initialisation des sytèmes.

Une fois les données reçues par le “metadata manager”, celui-ci les
réorganise par fonction. Ce module utilise en effet également des
données provenant du niveau “inner”, et en particulier du document
collaboratif actuel (lorsque l’application CryptPad est de ce type). Il
peut ainsi fournir 3 types de contenu à tout module de “inner” le
demandant :

-  les “metadata” du document collaboratif qui sont stockées dans le
   document lui-même

   -  le titre, le titre par défaut et le nom de l’application
   -  la liste d’utilisateur avec les données publiques des éditeurs
      (nom, avatar, profil, clés publiques, mailbox, etc.)
   -  la liste des auteurs (afin d’afficher les couleurs par auteur dans
      l’application Code)

-  les données “private” qui représentent la liste des données privées
   fournies par l’extérieur et qui sont très variées

   -  l’origine (``window.location.origin``) “unsafe” utilisée dans
      “outer” et le chemin (``window.location.pathname``) de
      l’application
   -  le type de hash pour les documents collaboratifs : édition ou
      lecture seule, mode présentation, mode intégration, etc.
   -  des données concernant le document lui-même : modèle ou non,
      supprimé ou accessible, le “channelId”, etc.

-  les données “user” qui représentent l’utilisateur actuel et qui sont
   identiques à celles partagées dans la liste d’utilisateur du document

localStore
----------

Ce système est intégré directement à sframe-common. Il permet de
récupérer certaines valeurs stockées dans le localStorage situé à
l’extérieur et d’y stocker de nouvelles valeurs. Le “localStorage” du
domaine “safe” de inner n’est **jamais** utilisé. Les données
accessibles ne contiennent évidemment pas les clés d’accès au compte et
seules les valeurs ayant un marquage spécifique sont accessibles depuis
le “localStore” du niveau inner.

Dans le code, ce système est accessible globalement au niveau inner via
``window.cryptpadStore``. Il offre deux méthodes ``get`` et ``put`` qui
permettent de lire ou de modifier une clé. Les modifications sont
directement envoyées à outer pour être stockées dans le localStorage.

mailbox
-------

``www/common/sframe-common-mailbox.js``

Ce module permet de récupérer les messages envoyées aux boîtes mails du
compte utilisateur directement dans “inner”. Les messages accessibles
ici sont d’abord filtrés par le worker afin de ne jamais contenir
d’informations sensibles. Le code situé dans inner peut s’abonner (avec
la méthode ``subscribe()``) à un type de messages afin d’y avoir accès
et de recevoir les nouveaux messages en temps-réel. Le centre de
notifications de la barre d’outils est par exemple abonné aux messages
de type “notifications”.

Ce module permet également d’envoyer un message (une notification) à un
autre utilisateur avec la méthode ``sendTo``. Il faut pour cela
connaître certaines informations publiques du destinataire. C’est donc
ce système qui est utilisé pour envoyer une “demande de contact” à un
autre utlisateur par exemple.

Modules d’interface
-------------------

Il existe deux grands modules d’interface. Un premier, nommé
“common-interface”, fournit des éléments basiques, vide de contenu, qui
peuvent être réutilisés pour afficher quelque chose à l’utilisateur. Le
second, nommé common-ui-elements" permet d’afficher des éléments déjà
remplis mais qui sont réutilisés à plusieurs endroits dans le code de
inner.

common-interface
~~~~~~~~~~~~~~~~

``www/common/common-interface.js``

Ce module permet donc de créer des éléments d’interface vides
réutilisables. Les plus utilisés sont :

-  UI.alert, UI.confirm, UI.prompt : crée une boîte de dialogue
   similaire aux ``alert``, ``confirm`` et ``prompt`` natifs mais
   utilisant le style de CryptPad et ne bloquant pas le thread quand
   elle est ouverte
-  UI.log : crée une notification bleue dans le coin inférieur gauche
   qui disparaît automatiquement après quelques secondes
-  UI.confirmButton : ajoute une étape de confirmation “Êtes-vous sûrs?”
   sur le bouton fournit en argument
-  UI.(add|remove|error)LoadingScreen : ajouter, enlever ou modifier
   (afficher une erreur) un écran de chargement
-  De nombreux outils pour créer des fenêtres personnalisées au style
   CryptPad

common-ui-elements
~~~~~~~~~~~~~~~~~~

``www/common/common-ui-elements.js``

Ce module permet au code situé dans inner d’afficher des éléments avec
du contenu pré-existant, parfois récupéré directement de l’extérieur de
l’iframe. La plupart des fonctions ont besoin d’un accès au module
“sframe-common” pour être utilisées car elles doivent récupérer des
données avant de fournir l’élément souhaité.

Il contient notamment le code pour :

-  Afficher l’écran de création des pads
-  Créer des boutons d’action pour la barre d’outils avec le style
   adéquat
-  Créer une barre d’outils Markdown (pour les applications code, slide,
   poll et le profil)
-  Créer un menu “Aide / Pour bien démarrer…” pour l’application
   actuelle
-  Créer un menu déroulant pour changer la langue de l’interface
-  Et beaucoup d’autres outils…

Modules additionnels
--------------------

De très nombreux autres modules existent, certains pour une ou plusieurs
applications, d’autres pour les applications collaboratives uniquement
ou l’inverse. Les plus utilisés sont :

-  ``www/common/hyperscript.js`` qui permet de créer des éléments HTML
   d’une manière plus simple et plus rapide que les fonctions natives ou
   même jQuery
-  ``www/common/sframe-common-history.js`` qui permet d’afficher
   l’historique du document courant
-  ``www/common/sframe-common-codemirror.js`` qui permet d’initialiser
   une instance CodeMirror pré-configurée et prête pour le
   fonctionnement temps-réel
-  ``www/common/sframe-common-file.js`` qui permet de gérer l’upload de
   fichiers statiques dans un document ou dans le drive

