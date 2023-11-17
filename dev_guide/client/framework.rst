Framework
=========

Most of CryptPad's collaborative applications work in a similar way, only differing in the ways that data is displayed. Therefore, a large part of their code can be shared. There is already a lot of code common to several parts of CryptPad, but in the case of collaborative applications, this goes even further.

Each application is composed of several files:

-  ``index.html``, the HTML starting point that loads the JavaScript of "outer".
-  ``main.js``, the starting point of the "outer" JavaScript, which loads the "inner" iframe and the worker
-  ``inner.html``, the HTML starting point of the iframe
-  ``inner.js``, the application-specific JavaScript
-  ``app-xxxx.less``, for the style of the application

sframe-app-outer.js
-------------------

The ``main.js`` file is the only JavaScript file of "outer" that is specific to the current application. In some cases, it must contain specific instructions to give more rights to the application or add special commands for the database. For example, in the Drive application it is necessary to have access to the complete contents of the drive in the "inner" iframe. So this application is the only one that has full access to the user account, and this access is provided by the ``main.js`` file.

In the case of collaborative applications, no special access is needed and they all have access to the same database information, that is why the ``main.js`` file does not exist and is replaced by the ``www/common/sframe-app-outer.js`` file which has exactly the same role but is common to all collaborative applications.

sframe-app-framework.js
-----------------------

Inside the iframe, each application needs its own code to display the data of the collaborative document. The ``inner.js`` file always exists and loads libraries and tools such as CodeMirror (code, slide, polls), jKanban (kanban) or CkEditor (rich text). However, a large part of the code represents elements common to all these applications:

-  Loading the decrypted history to be able to rebuild the document
-  Loading "ChainPad" to create the document and manage real-time editing via patches
-  Management of disconnections/reconnections
-  Management of all the specific tools present in the toolbar: history, export, user list, chat, etc.

All these elements are included in ``www/common/sframe-app-framework.js``  which simplifies the creation of a new application by taking care of all these elements directly and providing simple APIs for ``inner.js``.

An ``inner.js`` file for a complete application looks something like:

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
               // Here you can focus any editable part, check the integrity of the current data or initialize some values
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
       }, function (framework) {
           onFrameworkReady(framework);
       });
   });

framework.less
--------------

All style elements common to the different collaborative applications can be loaded into ``app-xxxx.less`` via a single call. The LESS framework ``customize.dist/src/less2/include/framework.less`` will load the style of the toolbar, the chat, the different menus, the buttons and the modals.

Two mixins are available in this file, ``.framework_main()`` and ``.framework_min_main()``. The minimal "min" version is used for non-collaborative applications (drive, preferences, profile, support, etc.) that reuse most of the style elements. The full version adds the chat style, mentions (for comments), pad creation screen and styles for users' cursors.
