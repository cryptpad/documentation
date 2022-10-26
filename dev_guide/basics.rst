
Key elements in CryptPad
===============================

Zero-knowledge
--------------

**All user data must be encrypted before being sent to the server.**

What our server can see
~~~~~~~~~~~~~~~~~~~~~~~

Some data is always sent to the server because of the way the HTTP protocol works. This includes the user's IP address and their "user agent" (browser and operating system). It is possible to obfuscate these elements (with a VPN and browser extensions).

CryptPad sends some unencrypted data in order to recognize each user: the "Public signing key", generated automatically by CryptPad for each user account. This is the only link between a user's data and their CryptPad account, however this is a short random string that does not contain any identifiable information.

**We will not accept any contribution that sends unencrypted data that can identify a user (username, avatar, contact list, etc.) to the server, directly or undirectly.**

Experience showed us that when we think we need such data, it is almost always possible to find a solution that fulfills the same requirements while protecting user data. Our codebase already contains many tools that can be used to solve these cases and our development team is willing to help any contributor that might encounter such difficulties.

Content Security Policy (CSP) and security
------------------------------------------

The very function of most CryptPad applications is based on collaboration between different users. These applications allow a user to write content that will be displayed in another user's browser. A major concern, then, is to **prevent malicious actors from sending code that will be executed by another user's browser** (XSS vulnerability). To prevent this possibility, CryptPad uses 3 main mechanisms to guarantee data security.

The first element to respect when writing code for CryptPad is to use "sanitizers", i.e. tools that clean up user content displayed to others. These sanitizers must remove anything that can be used to execute JavaScript, such as ``onclick="..."`` HTML attributes or ``<script>`` tags.

The second element is managed by the server and adds additional protection. The server sends **Content-Security-Policy** rules to users. These rules allow the browser to know what it can safely do and what is potentially dangerous and must be blocked. These are numerous but mainly concern JavaScript:

-  We cannot load JavaScript code from an external site (CDN). All JavaScript files loaded by CryptPad must be hosted on the domain represented by the ``httpUnsafeOrigin`` field in the configuration file.
-  We can't execute "inline" JavaScript, i.e. using HTML attributes such as ``<span onclick="alert('test');">Click</span>``. The event handlers must be added from the JavaScript code directly: ``span.addEventListener('click', onClick);``.
-  We cannot evaluate a string as code with the ``eval()`` function.

Finally, at the third level, if an "XSS" vulnerability exists and CSP rules can be bypassed, a last mechanism can be used to protect a CryptPad account from malicious users. CryptPad works with a "sandbox" system: the whole interface is created inside an iframe open on a different HTTP origin than the one of the browser tab (which contains the user account data). In a development instance, this separation is done using 2 different ports: ``http://localhost:3000`` for the main tab and ``http://localhost:3001`` for the sandbox iframe. The entire collaborative interface being rendered in this iframe, if code was injected by another user, it could only be executed at this level. The "origin" difference between the sandbox and the tab itself would protect the rest of your account: **the malicious user would only be able to recover the data from the document they already have access to**.

Customization
-------------

When writing code for CryptPad, it is important to remember that there are many CryptPad instances and that their administrators sometimes want to customize UI elements.

In order to make the upgrade process easier when such modifications are present, the elements that the development team believes can be customized without risk are stored in the ``customize.dist`` folder. Each file stored in this directory can be modified by creating a ``customize`` folder containing a copy of the original file. If a file exists in ``customize``, it will be served to users instead of its namesake in ``customize.dist``. Note that :ref:`dev_translations` can also be customized. For more information please see :ref:`admin_customization` in the administrator guide.

Most images, logos and LESS style files are therefore placed in ``customize.dist`` so that they can be easily modified. Local changes made in ``customize`` are ignored by Git and cannot be sent as contributions.

Code rules
----------

Several important points concerning the code are to be respected as much as possible when contributing to CryptPad:

-  All JavaScript code in the client must respect ES5 (ECMAScript Edition 5) standards.
-  The style code is written using LESS syntax.
-  CryptPad uses a sandbox system containing the entire UI of the collaborative tools. When a script needs to update the content of the drive, teams, contacts or any other element that should not be accessible to other users, this code must be outside of the sandbox.
-  CryptPad uses SharedWorker technology (when the browser supports it) to share a "thread" between all the browser tabs open on the same CryptPad instance. Code that concerns all CryptPad applications can be placed at this level to avoid running it once in each tab.

Translation keys
----------------

CryptPad is officially translated (by the development team) into English (default language) and French. Many other languages are available, but translations are made by the community via our `Weblate platform <https://weblate.cryptpad.fr>`__.

:ref:`dev_translations` must be added manually by the development team to Weblate. To make it easier to merge contributions into the main branch, we ask contributor **not to add their new translation keys directly into the translation files**. The requested translation keys can be listed either in the "pull request" message or as a comment in the code directly. It's also preferable to add at least either an English or a French version of the text.
