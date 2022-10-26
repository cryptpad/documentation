
Worker
======

async-store.js
--------------

Async-store contains all the functions representing the commands sent by "outer". Its role is to manage the connection to the user account, load the sub-structures linked to this account (shared folders, profile, teams) and load all the modules that extend its use. It creates two main objects, named ``store`` and ``Store``. The first one represents the memory of the worker and stores everything that has been loaded, the second one represents its "muscles" and contains all the functions that can be executed by the commands of "outer". Many modules are loaded to perform specific tasks and are accessible via ``store``.

“Store” commands
----------------

Commands that can be executed by async-store include :

-  Initialization
  -  Loading user account (via listmap), shared folders and teams
  -  Loading of the different modules in the worker
  -  Initiating an authenticated session with the server (for registered users)
-  Authenticated server requests
  -  Modify your "pin log", change a password, destroy an owned document, recover the remaining storage space for the account, execute administrator commands, etc.
  -  Upload a static file to the user drive
  -  The identity of the author is proved to the server with the signature key of the registered user.
-  Unauthenticated server requests
  -  Retrieve the total size of a document in the database (with its history)
  -  Retrieve the metadata of a document (list of owners, access list, expiration date, etc.).
-  Actions on the user account
  -  Storing or retrieving Settings
  -  Commands to be performed in the drive
  -  Shared folder management
  -  Contacts management (add or delete contacts)
-  Actions on the different modules
  -  Each module can receive its own commands, but these first pass through "async-store" which will redistribute it to the concerned modules.
-  Collaborative documents
  -  Join a collaborative document
    -  Chainpad-netflux initialization
    -  Send messages to this document's channel
    -  Listen to events on this document's channel
  -  Obtain a part of the document history
  -  Change the password of a document
  -  Manage document metadata (access list or owners)
