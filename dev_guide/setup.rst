
.. _dev_instance:

Set up a development instance
=============================

Prerequisites
-------------

Please make sure that the following tools are installed on your system before installing CryptPad:

-  GIT
-  nodejs (we use node v12.14.0)

   -  We recommend using `NVM <https://github.com/creationix/nvm>`_ to install nodejs.

-  npm
-  bower

   -  You can install it with ``npm install -g bower`` once npm is installed

Installation
------------

The source code can be found on `GitHub <https://github.com>`__. You must have an account on this platform in order to contribute.

-  Fork the code: https://github.com/xwiki-labs/cryptpad.git
-  Clone the fork on your system in the desired directory
   -  `git clone https://github.com/{YOUR_USER_NAME}/cryptpad.git`
-  Install the server dependencies with npm  and client dependencies with bower:

::

   cd cryptpad
   npm install
   bower install

Configuration
-------------

Once everything is installed, you can configure some values before starting the server.

-  Make a copy of the default configuration:

::

   cd $cryptpath/config
   cp config.example.js config.js

-  The `example configuration file <https://github.com/xwiki-labs/cryptpad/blob/main/config/config.example.js>`__ lists the configurable values and how to use them.
-  For a development instance, the important elements are:

   -  ``httpUnsafeOrigin``: if you want to use the development server and the test client on different systems, you have to modify this value to use the network address of the server (example: 'http://192.168.0.10:3000').
   -  ``adminKeys``: if you want to have access to the administration panel in the CryptPad client, you need to create a user account on the instance and add its *Public Signature Key* here.
   -  ``supportMailboxPublicKey``: if you want to have access to the support panel on the development instance, you need to generate support "keys" using the *generate-admin-key.js* script.

      -  ``node ./scripts/generate-admin-keys.js``
      -  Add the **public key** into the ``supportMailboxPublicKey`` field of the configuration file
      -  Copy the **private key** in the support section of the control panel (after setting up an administrator account). This private key is the same for all administrator accounts that want to access support.

   -  ``defaultStorageLimit``: to increase the storage limit of the development instance (50MB by default).


Caching
-------

CryptPad uses a "cache busting" system to manage versions of the JavaScript code and the compiled CSS code.
This means that, for a normal launch of the server, all the code will be cached on first use and the modifications made thereafter to the sources won't be applied in your browser. To avoid this problem, the server must be launched in *development* mode.

It is important to note that no "build" or "compilation" step is necessary when developing code for CryptPad. The JavaScript files are loaded "raw" in the browser and the "LESS" code is compiled by the clients' browser directly. To test a modification, just write the code and reload the page on CryptPad.


Launching in development mode
-----------------------------

-  ``npm run dev``
