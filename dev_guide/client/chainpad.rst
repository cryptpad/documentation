ChainPad and Listmap
====================

In the database, collaborative documents (i.e. documents that are not static files uploaded by the user) are stored as a series of encrypted "patches" that allow the document to be reconstructed from a starting point. This patch management is handled by our `ChainPad library <https://github.com/xwiki-contrib/chainpad>`__.

ChainPad
--------

ChainPad is the basis of CryptPad's "real-time engine". Starting from the same fixed starting point (which can be empty), several users can open the same document. ChainPad works exclusively with documents in "text" format in theory, but solutions exist in practice for other JavaScript data formats.

Each user initializes a local ChainPad "object" and fills it with the patch history of the database from a given starting point. The patches contain a set of simple operations to perform on the document (e.g. "remove X characters and add 'abc' at the Y position") as well as a "parent". Storing a parent identifier in the patch allows for the document to be re-built with the patches in the correct order. Applying the full set of patches from a starting point (usually an empty string) produces the latest version of the document.

Once the document is restored, CryptPad detects each change made in the application in order to generate a new "local" version of the document and provides this version to ChainPad. ChainPad then analyzes it, finding all the differences between the new version and the previous version. These differences are used to **create a new "patch"** that is encrypted by CryptPad, sent to other users, and stored in the database.

When **receiving a patch** in real time from another user, ChainPad tries to integrate it into the current document. If unsaved changes (patch not yet created) are in progress by the current user, ChainPad first merges the local changes with the remote patch before inserting the updated content into the interface. This merge allows users to make many changes simultaneously without losing characters in the content.

ChainPad also includes tools to **manage conflicts**. While the order of the patches is known, thanks to the parent identifier, the delay for all users to receive patches can result in two users sending patches with the same parent at the same time. This creates a "fork" in the patch tree. As the patches are encrypted, the server cannot determine how to resolve these conflicts. ChainPad has to handle them in each user's browser. To ensure that the result of "merging" the branching patches is identical for all users, ChainPad checks the order of the messages received by the server. Two patches can have the same parent, but one of these patches still reaches the server before the other. WebSocket technology guarantees that messages sent by the server to the various clients arrive in the order in which the server sent them. The ChainPads of all users therefore know which patches have the same parent and the order in which to process them, which is enough to achieve the same result everywhere.

The interactions between CryptPad and ChainPad can be summarized as :

-  Provide remote patches to ChainPad
-  Indicate to ChainPad any changes made locally
-  Receive patches from ChainPad related to local changes
-  Retrieve the current state of the ChainPad document

   -  State common to all users, called "authDoc"
   -  Local state (not yet saved/sent), called "userDoc"

Checkpoints
-----------

In order to avoid having to synchronize the complete history of the document since its creation each time a collaborative document is loaded, ChainPad uses a system of **checkpoints**. Every 50 patches stored in the database, the user creating the patch will in fact create a special patch called a checkpoint. Such a patch consists in a single operation that deletes the entire document and re-inserts it at the same time. Checkpoints have the particularity that they can be used as starting points for the system. Checkpoints also have a special marking added after encryption that allows the server to identify them as such.

When a user loads an existing document and asks for its history, the server will only send all patches starting from the penultimate checkpoint (in theory the last checkpoint is sufficient, but the penultimate one makes it easier to solve some problems). This system saves considerable loading time for documents that are heavily used over long periods of time. It also allows document owners to delete the old history, only keeping the messages from the last two checkpoints in the database.

ChainPad with JavaScript objects
--------------------------------

As mentioned above, ChainPad only works with text documents. This means that the only operations it can perform are to add or remove characters at a given position relative to the beginning of the document. Therefore, ChainPad cannot work with objects or arrays directly, for example using an operation that requires the 3rd element of an array to be changed.

However, many CryptPad applications require to work with objects or arrays. In the Code/Markdown application for example, objects are used to store the title of the document and its content at the same time. In the drive, this is more obvious because the structure of the drive itself with its organization in folders can be easily represented as a tree in a JavaScript object.

A **basic solution** would be for ChainPad to work with the string representation of the object (with ``JSON.stringify``) and to transform it back into an object once the work of ChainPad has been done (with ``JSON.parse``). The problem with this kind of solution is that conflict management may destroy the document!

To solve this problem, it is possible to initialize an instance of ChainPad with a **specific algorithm to handle conflicts**, as well as an **algorithm to validate a patch**. When you want to work with an object, for a patch to be valid, ``JSON.parse()`` must not generate an error. If an error occurs, the patch is simply ignored.

Each instance of ChainPad works with only one document and it must be initialized with the correct algorithm: ``SmartJSONTransformer`` or ``NaiveJSONTransformer``.

Chainpad-netflux
----------------

ChainPad allows for the management of patches, either to integrate them into the local document or to generate patches from the local document. To form a real-time system, a missing element needs to encrypt these patches and communicate with the server to broadcast them to other users. The `chainpad-netflux <https://github.com/xwiki-labs/chainpad-netflux/>`__ library addresses this need.

This section explains the Netflux protocol used by CryptPad to communicate with the server, though a WebSocket client and server implementation. The chainpad-netflux library connects a ChainPad instance with this client-side Netflux implementation.

Chainpad-netflux is initialized with a "channelId" corresponding to the desired collaborative document, a "crypto" module containing a function to encrypt and a function to decrypt using the keys corresponding to the desired document, and a WebSocket address to connect to the server.

Chainpad-netflux automatically initializes the Websocket connection to the server:

-  Join the channel corresponding to the desired document (with the provided channelId)
-  Create a ChainPad instance
-  Request history from the server
-  Decrypt messages from the history
-  Fill ChainPad with the decrypted history

Other configuration fields of chainpad-netflux are used to interact with the ChainPad instance and to listen to specific events. Chainpad-netflux sends events as soon as remote patches are received, when changes are made to the user list or when disconnecting from the network. It gives access to the ChainPad instance in order to retrieve the current state of the document and to indicate any changes made. As soon as ChainPad generates a patch, it is encrypted by Chainpad-netflux and sent to the server automatically.

Chainpad-listmap
----------------

One use case of ChainPad that is often used in CryptPad is collaboration on data stored in a JavaScript object. The `chainpad-listmap <https://github.com/xwiki-labs/chainpad-listmap/>`__ library has been developed to meet this need in a very simple way. It is based on JavaScript "Proxy" objects.

JavaScript "Proxies" are an extension of classical JavaScript objects and arrays that enables listening to all the changes made on the object (addition, deletion or modification of an element). Additionally, code can be executed for each change made, which allows for a Proxy to be linked to a ChainPad instance. Each change made to the object will thus be reported to ChainPad, which will analyze the differences compared to the previous version and create a patch.

This library integrates Chainpad-netflux, detailed above, which provides a Chainpad instance directly connected to the server and which manages the encryption. To use chainpad-listmap, a configuration similar to that of chainpad-netflux must be provided: a "channelId" for the document to retrieve, encryption/decryption functions for the document and a connection address to the server. Chainpad-listmap directly returns a Proxy. The Proxy can be used as any JavaScript object and changing its content in any way will automatically propagate these changes to other users. Events are triggered on this object in several cases: "ready" when the history is synchronized, "change" when an element is added or modified, "remove" when an element is deleted as well as "disconnect" and "reconnect" for network problems.

.. note:: The **user account** (containing the drive), the **shared folders** and the **teams** are all used and stored as a chainpad-listmap document.
