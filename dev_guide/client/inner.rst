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
système “framework” ou non, le fonctionnement global reste le même : un
module sframe-common charge le système de communication avec “outer” et
initialise différents éléments.

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

   -  le titre et le nom de l’application
   -  la liste d’utilisateur avec les données publiques des éditeurs
      (nom, avatar, profil, clés publiques, mailbox, etc.)

-  les données “private” qui représentent la liste des données privées
   fournies par l’extérieur et qui sont très variées

   -  l’origine “unsafe” utilisée dans “outer” et le nom de
      l’application
   -  le type de hash pour les documents collaboratifs : édition ou
      lecture seule, mode présentation, mode intégration, etc.
   -  des données concernant le document lui-même

-  les données “user” qui représentent l’utilisateur actuel et qui sont
   identiques à celles partagées dans la liste d’utilisateur du document

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
-  UI.(add|remove|error)LoadingScreen : ajouter, enlever ou modifier un
   écran de chargement
-  De nombreux outils pour créer des fenêtres personnalisées utilisant
   le style CryptPad

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
