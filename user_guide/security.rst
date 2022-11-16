Security
========

.. _trust:

Trust Assumptions
-----------------

While CryptPad is end-to-end encrypted and the server has no access to your data, there are still assumptions on whom you need to trust – as for any other (web) application.
You have to trust the following:

* Your chosen CryptPad instance (e.g., https://cryptpad.fr)

  * to run the code published on GitHub,
  * to not block your requests, and
  * to follow its terms of service and privacy policy.

* User's you shared a document with not to forward the sharing link to illegitimate third parties.

Under these assumptions you can be sure that it is technically not possible

* for your chosen CryptPad instance to read or write your documents,
* for any network adversary such as your Internet Service Provider (ISP) or law enforcement to read or write your documents, and
* for any other user to read or write your documents.

We maintain a `list of public CryptPad instances <https://cryptpad.org/instances>`_ to let you decide on whom you want to trust.

.. note::
    CryptPad does only provide a weak form of anonymity. 
    Your chosen CryptPad instance can see your IP address and your "user agent" (browser and operating system).
    If you need stronger anonymity guarantees, you can have a look at the `Tor project <https://www.torproject.org>`_.


.. _passwords:

Passwords for documents and folders
-----------------------------------

:badge_user:`Logged in users`

When you share the link to a document or shared folder through an insecure channel (for example email or SMS), someone might intercept the link and gain access to your data. To prevent this from happening, the :ref:`owners <owners>` of a document or folder can add a password.

When you share documents with your contacts and teams directly on CryptPad, communications are encrypted and we assume that you want to give them access. Therefore the password is remembered and sent with the pad when you share it. The recipient, or yourself, are **not** asked for it when they open the document.

You can add a password to a document when you :ref:`create <new_document>` it.

You can also add or change the password in the :ref:`access` menu:

* From the CryptDrive: ``Right click`` > |unlock-alt| **Access**.
* From the document toolbar: |unlock-alt| **Access**.

.. _remote_disconnect:

Remote Disconnect
-----------------

:badge_user:`Logged in users`

In some cases (loss or theft of a device, forgotten to log out of a session on a shared computer, etc.) it can be necessary to close all active CryptPad sessions. This can be done in two ways:

* User menu (avatar at the top-right) > |gear| **Settings** > |lock| **Confidentiality** > **Close remote sessions**.

This option logs out all sessions **except** the one from which it is actiaved.

* User menu (avatar at the top-right) > |plug| **Log out everywhere**.

This option logs out all sessions **including** the one from which it is activated.

.. _remote_content:

Remote Content
--------------

In Markdown editors (:ref:`app_code`, :ref:`app_slides`, :ref:`app_kanban`), CryptPad blocks images and other remotely hosted content to prevent potential tracking.

:badge_user:`Logged in users`

To include images from the CryptDrive or to upload new ones, use the |picture-o| **Insert** menu. This menu inserts a ``media-tag`` element that is more complex than Markdown image syntax but is managed automatically.
