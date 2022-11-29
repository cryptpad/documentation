Security
========

.. _trust:

Trust Assumptions
-----------------

While CryptPad is end-to-end encrypted and the server has no access to your data, there are still assumptions on whom you need to trust – as for any other (web) application.

Concretely, you have to trust the following:

* Your chosen CryptPad :ref:`instance <cryptpad_instances>`

  * to run the code published on GitHub,
  * to not block your network messages, and
  * to follow its terms of service and privacy policy.
* Your collaborators not to forward :ref:`sharing links <share_link>` to illegitimate third parties.

Under these assumptions you can be sure that it is technically not possible to read or modify your pads by

* your chosen CryptPad instance,
* any powerful adversary that can see your web traffic, or
* any other user.

We maintain a `list of public CryptPad instances <https://cryptpad.org/instances>`_ to let you better decide on whom you want to trust.

.. warning ::
    CryptPad does only provide a weak form of anonymity.
    Your chosen CryptPad instance can see your IP address and your "user agent" (browser and operating system).

    If you need stronger anonymity guarantees, you can access CryptPad via `Tor <https://www.torproject.org>`_.

.. _passwords:

Passwords for documents and folders
-----------------------------------

:badge_user:`Logged in users`

When you share the link to a document or shared folder through an insecure channel (for example email or SMS), someone might intercept the link and gain access to your data. To prevent this from happening, the :ref:`owners <owners>` of a document or folder can add a password.

When you :ref:`share documents with your contacts and teams directly on CryptPad <share_contacts>`, communications are encrypted and we assume that you want to give them access. Therefore the password is remembered and sent with the pad when you share it. The recipient, or yourself, are **not** asked for it when they open the document.

You can add a password to a document when you :ref:`create <new_document>` it.

You can also add or change the password in the :ref:`access` menu:

* From the CryptDrive: ``Right click`` > |unlock-alt| **Access**.
* From the document toolbar: |unlock-alt| **Access**.

.. _verifying_contacts:

Verifying contacts
------------------
:badge_user:`Logged in users`

To verify a contact's identity, i.e., that a contact belongs to the person you think, you can compare the public signing keys:

1. Ask your contact to share :ref:`their public key <user_settings_account>` over a secure channel with you.
2. If this public key matches the one from your contact's :ref:`profile page <another_user_profile>`, you can be sure that the contact belongs to the person at the other end of the secure channel.

.. _self_destructing_pads:

Self-destructing pads
---------------------

:badge_user:`Logged in users`

Self-destructing pads will be destroyed automatically without the interaction of any user.
This ensures that sensitive data is not accessible forever.

There are two ways to create self-destructing pads:

* You can set an expiration time during :ref:`creating <new_document>`.
* You can share a pads via a :ref:`view-once-and-self-destruct link<share_access_rights>`.

.. _remote_disconnect:

Remote Disconnect
-----------------

:badge_user:`Logged in users`

In some cases (loss or theft of a device, forgotten to log out of a session on a shared computer, etc.) it can be necessary to close all active CryptPad sessions. This can be done in two ways:

* User menu (avatar at the top-right) > |gear| **Settings** > |lock| **Confidentiality** > **LOG OUT**.

This option logs out all sessions **except** the one from which it is actiaved.

* User menu (avatar at the top-right) > |plug| **Log out everywhere**.

This option logs out all sessions **including** the one from which it is activated.

.. _remote_content:

Remote Content
--------------

In Markdown editors (:ref:`app_code`, :ref:`app_slides`, :ref:`app_kanban`), CryptPad blocks images and other remotely hosted content to prevent potential tracking.

:badge_user:`Logged in users`

To include images from the CryptDrive or to upload new ones, use the |picture-o| **Insert** menu. This menu inserts a ``media-tag`` element that is more complex than Markdown image syntax but is managed automatically.

.. _known_sec_issue:

Known caveats
-------------

No unique usernames
~~~~~~~~~~~~~~~~~~~

Neither the :ref:`account name <user_settings_account>` nor the :ref:`display name <user_settings_account>` is unique in CryptPad.
This means that you cannot trust usernames to identify people.
Instead, :ref:`identify your contact <verifying_contacts>` via their public keys.

Edit rights in teams
~~~~~~~~~~~~~~~~~~~~

Team members with edit access to a teams drive may share this access to other users both inside and outside the team.
Team members may even convert folders into :ref:`shared folders <shared_folders>` and delegate their access to anybody they want.

You therefore have to be careful with whom you grant edit rights.
You may also want to

* set the :ref:`role  <team_roles_and_permissions>` of a member to viewer and selectively share edit rights to this person.
* use :ref:`access lists <access_list>` to limit the access to a file to specific contacts.

Access of former team members
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

The team communication is encrypted with static keys.
This implies that a former team member still has the keys.
A former team member can therefore potentially decrypt team messages and can also keep the same access to the team's document as before.
However, this requires to modify the client source code as the official one does neither store the keys nor decrypt any messages of a team which the user is not part of.
