Key elements in CryptPad
===============================

Zero-knowledge
--------------

**All user data must be encrypted before sending it to the server.**

Données visibles par le serveur
What our server can see
~~~~~~~~~~~~~~~~~~~~~~~

Some data is always sent to the server because that's the way HTTP protocol work. It includes the user's IP address and their "user agent" (browser and operating system), even though it's possible to hide these elements (with a VPN and browser extensions).

On its side, CryptPad also sends some unencrypted data in order to recognize each user: the "Public signing key", generated automatically by CryptPad for each user account. It's the only link between user data and their CryptPad account, but it's a short random string that doesn't contain any personal data and cant' be linked to any physical person.

**We won't accept any contribution that sends unencrypted data that can identify a user (username, avatar, contact list, etc.) to the server, directly or undirectly.**

Experience showed us that when we think we need such data, it's almost always possible to find a solution that can fill the same requirements but protect user data. Our codebase already contains lots of tools that can be used to solve these cases and our development team is willing to help any contributor that might encounter such difficulties.

Content Security Policy (CSP) and security
------------------------------------------

The very functioning of most CryptPad applications is based on collaboration between different users. These applications allow a user to write content that will be displayed in another user's browser. A major concern consists then in **preventing a malicious user from sending code that will be executed by another user's browser** (XSS vulnerability). To prevent this possibility, CryptPad uses 3 main mechanisms to guarantee data security.

The first element to respect when writing code for CryptPad is to use "sanitizers", i.e. tools that clean up user content displayed to others. These sanitizers must remove anything that can be used to execute JavaScript, such as ``onclick="..."`` HTML attributes or ``<script>`` tags.

The second element is managed by the server and adds additional protection. The server sends **Content-Security-Policy** rules to users. These rules allow the browser to know what it can safely do and what is potentially dangerous and must be blocked. They are numerous but the main ones concern JavaScript:

-  We can't load JavaScript code from an external site (CDN). All JavaScript files loaded in CryptPad must be hosted on the domain represented by the ``httpUnsafeOrigin`` field in the configuration file.
-  We can't execute "inline" JavaScript, i.e. using HTML attributes such as ``<span onclick="alert('test');">Click</span>``. The event handlers must be added from the JavaScript code directly: ``span.addEventListener('click', onClick);``.
-  We can't evaluate a string as code with the ``eval()`` function.

Finally, at the third level, if an "XSS" vulnerability exists and CSP rules can be bypassed, a last mechanism can be used to protect a CryptPad account from malicious users. CryptPad works with a "sandbox" system: the whole interface is created inside an iframe open on a different HTTP origin than the one of the browser tab (which contains all the data of your user account). In a development instance, this separation is done using 2 different ports: ``http://localhost:3000`` for the main tab and ``http://localhost:3001`` for the sandbox iframe. The entire collaborative interface being rendered in this iframe, if code was injected by another user, it could only be executed at this level. The "origin" difference between the sandbox and the tab itself would protect the rest of your account: **the malicious user would only be able to recover the data from the document he already has access to**.

Customization
-------------

When writing code for CryptPad, it's important to remember that there are many CryptPad instances and that their administrators sometimes want to customize UI elements.

In order to make the upgrade process easier when such modifications are present, the elements that the development team believes can be customized without risk are stored in the ``customize.dist`` folder. Each file stored in this directory can be modified by creating a ``customize`` folder containing a copy of the original file. If a file exists in ``customize``, it will be served to users instead of its namesake in ``customize.dist``.

Most images, logos and LESS style files are therefore placed in ``customize.dist`` so that they can be easily modified. Local changes made in ``customize`` are ignored by Git and can't be sent as contributions.

Code rules
----------

Several important points concerning the code are to be respected as much as possible when contributing to CryptPad:

-  All JavaScript code in the client must respect ES5 (ECMAScript Edition 5) standards.
-  The style code is written in LESS format.
-  CryptPad uses a sandbox system containing the entire UI of the collaborative tools. When a script needs to update the content of the drive, teams, contacts or any other element that should not be accessible to other users, this code must be outside of the sandbox.
-  CryptPad uses the SharedWorker technology (when the browser supports it) to share a "thread" between all the browser tabs open on the same CryptPad instance. Code that concerns all CryptPad applications can be placed at this level to avoid running it once in each tab.

Translation keys
----------------

CryptPad is officially translated (by the development team) into English (default language) and French. Many other languages are available, but translations are made by the community via our `Weblate platform <https://weblate.cryptpad.fr>`__.

Translation keys must be added manually by the development team to Weblate. To make it easier to merge contributions into the main branch, we ask contributor **not to add their new translation keys directly into the translation files**. The requested translation keys can be listed either in the "pull request" message or as a comment in the code directly. It's also preferable to add at least either an English or a French version of the text.
