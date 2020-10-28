Outer
=====

The "outer" level represents the starting point of the CryptPad code. Except for the initial HTML file loaded by the browser, this level is entirely made of JavaScript code. It is split into two main files, which are connected to the iframe inner for one and to the worker for the other. The APIs used to communicate are the same in both cases.

Communication between levels
----------------------------

The communication is done using a mini-library developed in CryptPad in the ``wwww/common/outer/worker-channel.js`` file. This library allows two systems to send "query" and "event" messages to each other. A "query" consists of sending data and waiting for a response, while an "event" is just sending data.

This library automatically manages callbacks for received answers and allows each party to indicate when it is ready to communicate. The way messages are sent is managed outside the library thanks to a "sendMessage" function that is provided as an argument. If it is a query, a callback is included with the data.

Communication with inner
------------------------

``www/common/sframe-common-outer.js``

This is one of the first main JavaScript file loaded by all CryptPad applications. It's loaded just after the creation of the inner iframe and will first proceed to the installation of a communication channel between these two levels. Once this channel is created, it will load the second main JavaScript file which will manage the "worker" side. This is also the only file that has direct access to the keys contained in the URL of the document.

Two steps will then take place in parallel:

-  loading the user account in the worker
-  loading the application interface in the inner iframe

Once the user account is loaded, sframe-common-outer will initialize all its "handlers" which will manage the events and queries received from "inner". These "handlers" are many and can be found in the code with ``sframeChan.on('...', handler);``. They are notably used to:

-  Execute functions related to the "outer" level

  -  Change the title of the tab or its icon
  -  Modify the localStorage or modify theStorage session

-  Execute functions related to the keys of the document

  -  Changing the document password (requires decrypting and re-encrypting the entire content)
  -  Save or modify the pad data in the drive (the URL of the pad is stored in the drive)
  -  Make a copy or make a template of the document (requires access to the decrypted content to re-encrypt it differently)

-  Transfer commands to the worker

  -  File Upload
  -  Access to more data
  -  Join a pad and be able to receive and send patches
  -  Pad management actions (rename, delete, access list, owners, etc.)

-  Transfer commands to the worker's modules

  -  These commands usually only pass through here, they are not read and are sent directly to the worker.

Once all these "handlers" have been registered, sframe-common-outer will declare itself "ready" and when "inner" will be too, this script will start the realtime engine (if necessary): create a new document or join an existing one.

Communication with worker
-------------------------

``www/common/cryptpad-common.js``

The main role of this file is to create a communication channel with the worker and to initialize it for the user account. The keys of the account will have been extracted from the localStorage beforehand. Once the user account and all the modules are loaded, the worker sends a signal to cryptpad-common which will itself allow the sframe-common-outer script to continue.

Apart from this user account loading process, cryptpad-common keeps a privileged contact with the worker, which allows it to perform some tasks specific to the current tab but which require access to the worker's data.
