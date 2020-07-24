Framework
=========

La plupart des applications d’édition collaborative de CryptPad
fonctionnent de la même manière et seule la façon dont les données sont
affichées diffère. Pour cela, une grande partie de leur code peut être
mise en commun. Il existe djéjà beaucoup de code commun à plusieurs
parties de CryptPad, mais dans le cas des applications collaboratives
cela va encore plus loin.

Chaque application classique est composée de plusieurs fichiers :

-  ``index.html``, le point de départ HTML qui charge le JavaScript de
   “outer”
-  ``main.js``, le point de départ du JavaScript de “outer”, qui charge
   l’iframe “inner” et le reste du code
-  ``inner.html``, le point de départ HTML de l’iframe
-  ``inner.js``, le JavaScript propre à l’application
-  ``app-xxxx.less``, pour l’apparence de l’application

www/common/sframe-app-outer.js
------------------------------

En ce qui concerne le fichier ``main.js``, c’est le seul fichier
JavaScript de “outer” qui est propre à l’application courante. Dans
certains cas, il doit contenir des instructions spécifiques permettant
de donne davantage de droits à l’application ou ajouter des commandes
spéciales pour la base de données. Par exemple pour l’application Drive,
il est nécessaire d’avoir accès au contenu complet du drive dans
l’iframe “inner”. Cette application est donc la seule qui possède des
accès complets sur le compte utilisateurs, et ces accès sont fournis par
le fichier “main.js”.

Dans le cas des applications collaboratives, aucun accès spécial n’est
nécessaire et elles ont toutes accès aux mêmes informations de la base
de données, c’est pourquoi le fichier ``main.js`` n’existe pas et est
remplacé par un fichier ``www/common/sframe-app-outer.js`` qui a
exactement le même rôle mais est commun à toutes les applications
collaboratives.

www/common/sframe-app-framework.js
----------------------------------

A l’intérieur de l’iframe, chaque application a besoin de son propre
code pour afficher les données du document collaboratif. Le fichier
``inner.js`` est donc toujours présent et charge les librairies et
outils tels que CodeMirror (code, slide, polls), jKanban (kanban) ou
encore CkEditor (texte). Une partie importante du code représente
toutefois des éléments communs à toutes ces applications :

-  Chargement de l’historique déchiffré pour pouvoir reconstruire le
   document
-  Chargement de “ChainPad” pour créer le document et gérer l’édition
   temps-réel via les patchs
-  Gestion des déconnexions/reconnexions
-  Gestion de tous les outils spécifiques présents dans la barre
   d’outils : historique, export, liste d’utilisateurs, chat, etc.

Tous ces éléments sont inclus dans le “framework”
``www/common/sframe-app-framework.js`` qui simplifie alors au maximum la
création d’une application en s’occupant directement de tous ces
éléments et en fournissant des APIs simples pour ``inner.js``.

Un fichier ``inner.js`` qui peut représenter une application complète
ressemble alors à :

.. code:: javascript

   // This is the initialization loading the CryptPad libraries
   define([
       'jquery',
       '/common/sframe-app-framework.js',
       '/customize/messages.js', // translation keys
       'less!/myapp/app-myapp.less'
       /* Here you can add your own javascript or css to load */
   ], function (
       $,
       Framework,
       Messages) {


       /* Here you can initialize your own functions and objects */

       // This is the main initialization loop
       var onFrameworkReady = function (framework) {
           // Here you can load the objects or call the functions you have defined

           // This is the function from which you will receive updates from CryptPad
           framework.onContentUpdate(function (newContent) {
               console.log("Content should be updated to " + newContent);
               // Update the interface to render the new version of the content
           });

           // This is the function called to get the current state of the data in your app
           framework.setContentGetter(function () {
               // Get the content from your interface and serialize it into a string or object
               var content = getContent();
               console.log("Content current value is " + content);
               return {
                   content: content
               };
           });

           // This is called when the history is synced. "onContentUpdate" has already been called with the full content and the loading screen is being removed.
           framework.onReady(function (newPad) {
               // Here you can focus any editable part, check the integrity of the current data or intialize some values
           });

           // When you want to send changes to the collaborative document, you can call framework.localChange()
           // framework.localChange() will use the "content getter" defined above to get the current value of your content
           // and push it to the other users.

           // Example with a textarea
           var oldVal = "";
           $("textarea").on("change keyup paste", function () {
               var currentVal = $(this).val();
               if (currentVal === oldVal) {
                   return; //check to prevent multiple simultaneous triggers
               }
               oldVal = currentVal;
               // action to be performed on textarea changed
               console.log("Content changed");
               // we call back the cryptpad framework to inform data has changes
               framework.localChange();
           });

           // starting the CryptPad framework
           framework.start();
       };

       // Framework initialization
       Framework.create({
           toolbarContainer: '#cme_toolbox',
           contentContainer: '#cp-app-miniapp-editor'
       }, waitFor(function (framework) {
           onFrameworkReady(framework);
       }));
   });

customize.dist/src/less2/include/framework.less
-----------------------------------------------

Enfin, tous les éléments de style communs aux différentes applications
collaboratives peuvent être chargés dans le fichier app-xxxx.less via un
unique appel. Un framework LESS
``customize.dist/src/less2/include/framework.less`` existe en effet et va
charger le style de la barre d’outils, du chat, des différents menus,
des boutons ou encore des fenêtres.

Deux mixins sont disponibles dans ce fichier, ``.framework_main()`` et
``.framework_min_main()``. La version minimale “min” est utilisée pour
les applications non collaboratives (drive, préférences, profile,
support, etc.) qui ré-utilisent la plupart des éléments de style. La
version complète ajoute le style du chat, des mentions (pour les
commentaires), de l’écran de création de pad et des styles pour le
curseur des autres utilisateurs.

