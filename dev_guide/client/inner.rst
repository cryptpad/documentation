Inner
=====


The inner level corresponds to the entire visible interface of CryptPad. It represents an iframe isolated from the complete content of the user's account. Each CryptPad application has its own interface, but many elements are in common and the functioning remains the same in the majority of cases. Only the way the data is displayed changes completely.

Workflow
--------

The JavaScript starting point of the "inner" level corresponds to the "inner.js" file of each application. This file loads all the necessary elements for the iframe to work and manages the data representation in the selected application. Whether the application uses the "framework" system or not, the overall operation remains the same: an sframe-common module loads the communication system with "outer" and initializes different elements.

metadata-manager
----------------

``www/common/metadata-manager.js``

This module allows the levels outside the iframe (worker and outer) to provide data to the iframe. These data are divided into 2 categories: "user" data contain every public elements concerning the current user account and "priv" data contain elements that are private or that are not sent to other users.

This module also uses data coming from the "inner" level, and in particular from the current collaborative document (when applicable). It can thus provide 3 types of content to any "inner" module requesting it:

-  the collaborative document "metadata" that are stored in the document itself

  -  the title and name of the application
  -  the user list with public data of editors (name, avatar, profile, public keys, mailbox, etc.).

-  the "private" data coming from the outside levels which are very varied

  -  the "unsafe" origin used in "outer" and the name of the application
  -  the type of hash for collaborative documents: edition or read-only, presentation mode, embed mode, etc.
  -  data about the document itself

-  the "user" data that represents the current user and that is directly put in the document user list

UI modules
----------

common-interface
~~~~~~~~~~~~~~~~

``www/common/common-interface.js``

This module allows you to create reusable empty interface elements. The most used are :

-  UI.alert, UI.confirm, UI.prompt: creates a dialog box similar to the native ``alert``, ``confirm`` and ``prompt`` but using the CryptPad style and not blocking the thread when it is open.
-  UI.log: creates a small notification in the bottom-left corner that disappears automatically after a few seconds
-  UI.confirmButton: adds a confirmation step "Are you sure?" on the button provided
-  UI.(add|remove|error)LoadingScreen: add, remove or modify a loading screen
-  Many tools to create custom windows using CryptPad style

common-ui-elements
~~~~~~~~~~~~~~~~~~

``www/common/common-ui-elements.js``

This module provides tools to display elements with pre-existing content, sometimes retrieved directly from outside the iframe:

-  Display the pad creation screen
-  Create action buttons for the toolbar with the appropriate style
-  Create a Markdown toolbar (for code, slide, poll and profile applications)
-  Create a "Help / Getting started..." menu for the current application
-  Create a drop-down menu to change the interface language
-  And many other tools ...
