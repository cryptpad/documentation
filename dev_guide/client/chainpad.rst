ChainPad and Listmap
====================

In the database, collaborative documents (i.e. documents that are not static files uploaded by the user) are stored as a series of encrypted "patches" that allow the document to be reconstructed from a starting point. This patch management is handled by our `ChainPad library <https://github.com/xwiki-contrib/chainpad>`__.

ChainPad
--------



ChainPad is what we could call the basis of CryptPad's "real-time engine". Starting from the same fixed starting point (which can be empty), several users can open the same document. ChainPad works exclusively with documents in "text" format in theory, but solutions exist in practice for other JavaScript data formats.

Each user initializes a local ChainPad "object" and fills it with the patch history of the database from a given starting point. The patches contain a set of simple operations to perform on the document (remove X characters and add the "abc" characters at the Y position) and a "parent". Storing a parent identifier in the patch allows us to rebuild the document with the patches in the correct order. The full set of patches from a starting point (usually an empty string) then allows us to get the latest version of the document.

Once the document is restored thanks to the history, CryptPad will detect each change made in the application in order to generate a new "local" version of the document and will provide this version to ChainPad. ChainPad will then analyze it in order to find the "differences" between the new version and the previous version. These differences will make it possible to **create a new "patch"** which will be encrypted by CryptPad, sent to other users and stored in the database.

When **receiving a patch** in real time from another user, ChainPad will try to integrate it into the current document. If unsaved changes (patch not yet created) are in progress by the current user, ChainPad will first merge the local changes with the remote patch before inserting the updated content into the interface. This merge allows users to make many changes simultaneously without losing characters in the content.

ChainPad also has tools to **manage conflicts**. It knows the order of the patches thanks to the parent, but because of the time it takes for other users to receive a message, this does not prevent two patches from being sent at the same time by two different users. These 2 patches will have the same parent "patch" and will therefore create a "branch" in the patch tree. As the patches are encrypted, the server cannot decide by itself how to resolve these conflicts, so ChainPad will have to deal with them in each user's browser. It is then necessary to ensure that the result obtained by "merging" these 2 patches is identical for all clients. To do this, ChainPad checks in particular the order of the messages received by the server. Two patches can have the same parent, but this does not prevent one of the two patches from arriving first at the server. WebSocket technology guarantees that messages sent by the server to the various clients arrive in the order in which the server sent them. The ChainPads of all users therefore know which patches have the same parent and the order in which to process them, which is enough to achieve the same result everywhere.

The interactions between CryptPad and ChainPad are summarized in :


-  Provide remote patches to ChainPad
-  Indicate to ChainPad any changes made locally.
-  Receive patches from ChainPad related to local changes
-  Retrieve the current state of the ChainPad document

   -  State common to all users, called "authDoc".
   -  Local state (not yet saved/sent), called "userDoc".

Checkpoints
-----------

In order to avoid having to synchronize the complete history of the document since its creation each time a collaborative document is loaded, ChainPad uses a system of "checkpoints". Every 50 patches stored in the database, the user creating the patch will in fact create a special patch called a "checkpoint". This patch is defined by a single operation that deletes the entire document and re-inserts it at the same time. Checkpoints have the particularity that they can be used as starting points for the system. Checkpoints also have a special marking added after encryption that allows the server to identify them as such.

When a user loads an existing document and asks for the history, the server will only send all patches starting from the penultimate checkpoint (in theory the last checkpoint is sufficient, but the penultimate one makes it easier to solve some problems). This system allows us to save a lot of loading time for documents that are heavily used on the long term. It also allows pad owners to delete the old history by keeping in the database only the messages from the last 2 checkpoints.

ChainPad with JavaScript objects
--------------------------------

As mentioned above, ChainPad only works with text documents. This means that the only operations it can perform are to add or remove characters at a given position relative to the beginning of the document. It cannot therefore work with objects or arrays directly, for example using an operation that requires the 3rd element of an array to be changed.

However, in CryptPad, many applications require to work with objects or arrays. In the "code" application, objects allows us to store the title of the document and its content at the same time. In the drive, this is more obvious because the structure of the drive itself with its organization in folders can be easily represented as a tree in a JavaScript object.

A **basic solution** would be to say that it is enough to work in ChainPad with the string representation of the object (with ``JSON.stringify``) and to transform it back into an object once the work of ChainPad has been done (with ``JSON.parse``). The problem with this kind of solution is that conflict management may destroy the document!

To solve this problem, it is possible to initialize an instance of ChainPad with a **specific algorithm to handle conflicts**, as well as an **algorithm to validate a patch**. When you want to work with an object, for a patch to be valid, ``JSON.parse()`` must not generate an error. If an error occurs, the patch is simply ignored.

Each instance of ChainPad works with only one document and it must be initialized with the correct algorithms.

Chainpad-netflux
----------------

ChainPad allows us to manage patches, either to integrate them into the local document or to generate patches from the local document. In order to work completely in a real-time system, the part that will encrypt these patches, and especially the part that will communicate with the server to broadcast these patches to other users, is missing. To complete chainpad with the missing parts, a `chainpad-netflux <https://github.com/xwiki-labs/chainpad-netflux/>`__ library has been created.

This guide explains the Netflux protocol used by CryptPad to communicate with the server. A WebSocket client and server implementation have been made. The chainpad-netflux library allows to connect a chainpad instance with this client-side Netflux implementation.

Chainpad-netflux is thus initialized mainly with a "channelId" corresponding to the desired collaborative document, a "crypto" module containing a function to encrypt and a function to decrypt using the keys corresponding to the desired document and a WebSocket address to connect to the server.

This library will then automatically initialize the Websocket connection to the server:

-  Join the channel corresponding to the desired document (with the provided channelId)
-  Create a ChainPad instance
-  Request history from the server
-  Decrypt messages from the history
-  Fill ChainPad with the decrypted history

Other configuration fields of chainpad-netflux then allow us to interact with the chainpad instance and to listen to specific events. Chainpad-netflux sends events as soon as remote patches are received, when changes are made to the user list or when disconnecting from the network. It gives access to the ChainPad instance which allows us to retrieve the current state of the document and to indicate any changes made to the document. As soon as ChainPad generates a patch, it is encrypted by the library and sent to the server automatically.

Listmap
-------

A use case of ChainPad that is often used in CryptPad corresponds to collaboration on data stored in a JavaScript object. A `chainpad-listmap <https://github.com/xwiki-labs/chainpad-listmap/>`__ library has been developed to meet this need in a very simple way. It is based on JavaScript "Proxy" objects.

JavaScript  Proxies" are an extension of the classical JavaScript objects and arrays which allow us to listen to all the changes made on the object (addition, deletion or modification of an element). In particular, we can execute code for each change made, which in our case allows us to link our Proxy to a ChainPad instance. Each change made to the object will thus be reported to ChainPad, which will analyze the differences compared to the previous version and create a patch.

This library integrates Chainpad-netflux, detailed above, which provides a Chainpad instance directly connected to the server and which manages the encryption. To use chainpad-listmap, a configuration similar to that of chainpad-netflux must be provided: a "channelId" for the document to retrieve, encryption/decryption functions for the document and a connection address to the server. Chainpad-listmap directly returns a Proxy. The Proxy can be used as any JavaScript object and changing its content in any way will automatically propagate these changes to other users. Events are triggered on this object in several cases: "ready" when the history is synchronized, "change" when an element is added or modified, "remove" when an element is deleted as well as "disconnect" and "reconnect" for network problems.

.. note:: The **user account** (containing the drive), the **shared folders** and the **teams** are all used and stored as a chainpad-listmap document.

