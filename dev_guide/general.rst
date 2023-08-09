General information
===================

Sandbox
-------

The server configuration indicates 2 different URLs with the fields ``httpUnsafeOrigin`` and ``httpSafeOrigin``. By default, on a development instance, they correspond to ``http://localhost:3000/`` (**unsafe**) and ``http://localhost:3001/`` (**safe**). The second (**safe**) is usually not shown to users, it's only used internally within an iframe. Opening CryptPad manually with the safe URL won't provide access to applications.

CryptPad uses a sandboxing system that isolates the user interface from the in-memory content. For user experience reasons, it is necessary to keep in memory all the information of the current user account (drive content, contact list, teams, etc.). The interface, which is the exposed part of the structure, could contain vulnerabilities and is therefore not "shown" any user information. It receives only data relevant for the current document. This isolation system has been implemented by putting the entire user interface in an iframe that takes up the whole window and that shows the **safe** URL. The base level (parent of the iframe) contains the sensitive data and is open on the **unsafe** URL.

.. note:: In a production system, it is possible to use different sub-domains or even different domains to represent these 2 origins. For example, on the main instance managed by the development team, the unsafe URL is ``https://cryptpad.fr`` and the safe URL is ``https://sandbox.cryptpad.info/.``.

5-level structure
-----------------

CryptPad's code is split in 5 distinct levels, 2 server side and 3 client side.

-  Server side

   -  The "server" which contains the code launched in the main process. It manages the websocket connections and all calls to the server go through this level.
   -  The "workers" that manage all database connections and scripts that require more CPU resources. The main "server" calls them when it receives certain commands from users. They are launched in separate sub-processes in order to be able to make the most of the available CPU cores.

-  Client side

   -  The base level, called "outer" in the code. This level is loaded with the "unsafe" URL (the one visible in the browser address bar) because it has access to sensitive data, including user account encryption keys.
   -  The iframe containing the user interface, called "inner" in the code, is launched as a daughter of "outer" and uses the "safe" URL. This iframe represents the entire screen visible per the users. No interface element is outside of the iframe. It has only access to the data that needs to be displayed on the screen.
   -  The upper level, called "worker", which manages the connection to the server and keeps all the user account data in memory. This level is loaded in a SharedWorker when the browser supports it (Firefox, Chrome, Edge) with the "unsafe" URL, which means that all the browser's tabs loaded on this CryptPad instance will have access to the same worker. It allows us to load the account data only once for all open tabs and to use only one Websocket connection.

.. figure:: /images/dev/cp_5level_structure.svg
   :alt: CryptPad's 5-level structure

   CryptPad's 5-Level Structure


Encryption
----------

CryptPad uses several encryption systems appropriate for different use cases. These systems come from the `TweetNaCl <https://github.com/dchest/tweetnacl-js>`__ library.

-  Documents, user account, static files and group chat

   -  Symmetrical encryption "xsalsa20-poly1305".
   -  A unique encryption key allows users to encrypt and decrypt the desired content. This key is derived from the "hash" of the URL (the part after the #) because this part is never sent to the server by the browser, which makes it possible to respect the Zero-knowledge constraint (the server doesn't know the encryption keys).
   -  All users with access to this key can decrypt the "patches" allowing them to rebuild the document or decrypt the chat messages.

-  Read-only access to documents

   -  Signature “ed25519”.
   -  Since the encryption is symmetrical, all users who can read and therefore decrypt the document can also technically encrypt messages and send them. A signature system makes it possible to authorize or to block sending messages.
   -  The edit URL contains a signature in addition to the encryption key. Editors will therefore be able to "sign" messages after encrypting them.
   -  A "public" verification key allows all users (editors **and** readers) to check if an encrypted message has been signed with the correct signing key. Messages with an invalid signature are ignored.
   -  When a document is created, the public verification key associated with this document is sent to the server. Messages with invalid signature are not stored in the database.

-  Private chat between two users ("contacts" application)

   -  Asymmetric encryption "x25519-xsalsa20-poly1305".
   -  When creating a user account, an asymmetric encryption key pair is generated for the account, as well as a signature key pair. Each of these pairs contains a private and a public component. The public parts are shared with the contacts.
   -  Asymmetric encryption allows to encrypt a message that only a single other user can decrypt when their public encryption key is known. Using our own private key and the contact's public key, we can encrypt the message for that user only, as long as he knows our own public key.
   -  Sending a contact request to a user allows us to exchange public keys needed for this encryption system.

-  Mailbox and notification center

   -  Double asymmetric encryption "x25519-xsalsa20-poly1305".
   -  The notification center works through other users sending us a "notification" when they perform an action concerning our account.
   -  Here we want to be able to send messages to another user in a way where they have proof of the sender's identity, without the server (or anyone with access to the database) being able to identify the sender or recipient via their public keys.
   -  The message is first encrypted asymmetrically using our private key and the recipient's public key. To be able to read this part, the recipient must know our public key, which is not necessarily the case if there was no contact request.
   -  We then add our own public key (unencrypted) to the message (encrypted), and encrypt the result asymmetrically, this time using a single-use key pair generated for the occasion. We then send the newly encrypted message with the public part of the newly generated key.
   -  The recipient can then decrypt a first time with his private key and the public single-use key. He then has access to a new encrypted content as well as our true public key. Finally, he can decrypt the real message using his private key and our public key. If this user already knew our public key, then he has cryptographic proof that we are the sender of the message.

Drive and "pins" log
--------------------

User accounts, including their associated cryptographic keys, drive, contacts and teams, are stored in the database in the same way as any CryptPad collaborative document. Encryption makes it indistinguishable from a pad for anyone who has access to the database.

The "drive" part of the account corresponds to a hierarchy of documents (files and folders), each file being associated with the address of a collaborative document. The read-only and edit addresses are stored separately so that documents can be added to the drive even if only read-only access is available.

Since the drives are indistinguishable from normal documents, another system has been implemented to ensure that documents stored in them are not deleted for inactivity for registered users. This is the **pin list**.

The database thus contains a **list of pins** for each registered user, each list being identified by the **public signature key** of the user account. This list contains the identifiers of all the collaborative documents stored in the drive of the concerned user. When the server needs to delete documents due to inactivity, it can check that they are not present in any pin list.

.. _example-1:

Example
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

Registration, login and block
-----------------------------

A user account is composed of a collaborative document containing the drive and a list of "pins". A third element is also stored for the user accounts in order to manage the password change. Although it is impossible to retrieve your account if the password is forgotten, it is possible to change the password if you still have access to the account.

Contrary to classical systems where the username and the password hash are sent to the server, on CryptPad neither of these 2 pieces of information leave the user's browser. They are instead used as arguments for an `Scrypt key derivation function <https://en.wikipedia.org/wiki/Scrypt>`__ which provides the equivalent of a hash. The difference with a classical hash function is that **Scrypt is deliberately made very expensive in CPU resources** whereas a hash function must be as fast as possible. Since it is used to manage the user's identifiers, making it slow to execute makes it possible to block brute force attacks. In 2021, it takes several seconds to execute the function with a high-end computer.

Once the function is executed, we get a hash containing a series of bytes that we will use to generate login keys. These keys, an encryption key and a key representing a unique identifier, are used to create or retrieve a **block**. It's an encrypted file stored on the server and containing the real keys of the user account.

In summary, when you **register** on CryptPad, your credentials are used to create a "block". In parallel, access keys to the user account are randomly created (a unique identifier for the account, an encryption key and a pair of signature keys to be able to modify the account data) and are then encrypted and stored in the block. When **logging in**, Scrypt allows us to retrieve the block identifier and to be able to decrypt it, which gives you access to your user account keys.

.. XXX correct paragraph below. from CryptHack:
.. But that is not completely right, is it? I thought and that is what I observed on my instance that you don't just change the login block of a user, you also change the drive pad. So a user has a new drive key after changing passwords. Otherwise, that would be a security issue as well.

When a user wants to **change their password**, there is therefore no need to migrate the whole account to a new document, only the "block" will change. Scrypt will indeed give us new login keys to use a new block. This block will be encrypted with a different encryption key than the first one, but the decrypted content will be the same: the keys of the user account. The old block is then removed.

In order to allow users to stay connected without having to type their password for each new session, the keys of the block are kept in memory in the **localStorage** of the browser (on the "unsafe" domain). Logging out means deleting these keys from the localStorage.

.. _example-2:

Example
~~~~~~~

-  Login keys (block identifier and block encryption key) on cryptpad.fr

   -  ``localStorage.Block_hash = "https://files.cryptpad.fr/block/c8/c89FhK8CQfTcoiP073T-RwSgqbY7f--Naoa3ZH8feLk=#UDYn4ZMy1tLksGtYMPewPewCSPkM+vEbluI7hMIe81U="``

-  User account keys on cryptpad.fr

   -  ``"/1/edit/PeWuMBluHImPezK+0IHvtA/4e4242jfxWiKi3JAjtkx-lDt/"``

.. XXX change this v1 hash example

Client-server communication (Netflux)
-------------------------------------

Communication between the client and the server is in the vast majority of cases using a Websocket connection. This connection is based on an implementation of the `Netflux <https://github.com/xwiki-labs/netflux-spec2/blob/master/specification.md>`__ protocol. Exceptions are static files (images, videos, pdf, etc.) and block files that are stored in encrypted format and are retrieved by users with XHR (downloading the complete encrypted file).

With the Netflux protocol, users create a "network" which they then use to perform several types of operations. **The important points** concerning the implementation of the protocol are:

-  Each user is identified by a 32-character hexadecimal string called **netfluxId**. This identifier is generated by the server and is created for each Websocket connection. A user who opens CryptPad from 2 different browsers at the same time will have a netfluxId for each browser (for each connection to the server). This identifier therefore changes with each new connection, no mechanism exists to preserve the identifier of a user between different sessions.
-  A user can join channels and send messages to them. All members of the channel receive the messages. Each collaborative document opened on CryptPad is represented by a channel on the server with a unique identifier.
-  The channel identifier is also a 32-character hexadecimal string called **channelId** or **channel**. The channelId associated with a document is derived from its URL, so that it is known to all users having access to it.
-  Users can send direct messages to each other without going through a channel, as long as they know the "netfluxId" of the recipient.

Server side
~~~~~~~~~~~

At the server level, Netflux is implemented via the "chainpad-server" NPM module: ``./node_modules/chainpad-server/NetfluxWebsocketSrv.js``. This module creates the Websocket server and listens to incoming connections and client requests. It creates and keeps in memory the channels and their members as long as there is at least one member left in the channel. It also relay private messages sent by members to each other.

**IMPORTANT:** The Netflux protocol does not mention a centralized server and therefore does not provide a direct solution for storing messages sent to the channels. The centralized server used in CryptPad is the result of a **Websocket** implementation of the protocol. The data storage part has been realized without modifying the rules imposed by the protocol.

The **data storage** has been achieved by adding a "fake" member in each channel on the server. As soon as a channel is created/opened by a user, a special user named **history keeper** joins it. This user receives all encrypted messages broadcasted to the channel like any other member and stores them in a database. When a user joins a room (i.e. he opens a document), his browser will send a **direct message** to the **history keeper** member to ask for the history of the document. **History keeper** will send the part of the history necessary to rebuild the last version of the document. Once synchronized, the user will receive all new changes in real time and will be able to send his own changes.

.. note:: This fake user is managed by the server but his code is distinct from the "Netflux" part of the server. It represents the whole database and its code is separated in many files. Its code is located in ``./lib/historyKeeper.js``.

Client side
~~~~~~~~~~~

At the client level, a module manages the Netflux protocol with simple APIs. The module is located in ``./wwww/components/netflux-websocket/netflux-client.js``. Once loaded, it allows us to create a **network** representing the Websocket connection to the Netflux server.

This "network" contains the **list of channels** joined by the user, as well as the **list of members** present in each channel. It allows us to perform all the operations allowed by the protocol:

-  Join a channel : ``(Promise) network.join(channelId)`` (provides a ``channel`` object)
-  Send a private message: ``(Promise) network.sendTo(netfluxId, message)``
-  Get the channels list: ``(Array) network.webChannels``.
-  Listen to events in a network: ``network.on('message', handler)`` (events: message, disconnect)

And for each channel obtained from "network.join":

-  Send a message: ``(Promise) channel.bcast(message)``
-  Leave a channel: ``channel.leave(reason)``
-  Listen to eventst: ``channel.on('message', handler)`` (events: message, join, leave)
-  Get the channelId: ``(String) channel.id``
-  Get the members list: ``(Array) channel.members``

.. _example-3:

Example
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
