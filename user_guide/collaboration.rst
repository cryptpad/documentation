Collaboration / Social
======================

.. _profile:

Profile
-------

:badge:`Logged in users`

Each registered user on CryptPad has a profile page accessible from the
user menu:

-  User menu (avatar at the top-right) > |user-circle| **Profile**.

Personal profile
~~~~~~~~~~~~~~~~

The following elements can be customised on the profile page:

-  Avatar with |upload| **Upload a new avatar**.
-  Description with |pencil| **Add a description**.
-  Website with **Add a link to your website**.

Sharing:

- **View my profile**: Preview the profile page as it appears to other users.

- |share-alt| **Share**: Copy a link to your profile.

User profile
~~~~~~~~~~~~

To see the profile of another user:

-  **User list** |users| |eye| of a document where they are
   connected > ``Click`` on their name.
-  If the user is in your list of :ref:`contacts <contacts>`.
   User menu (avatar at the top-right) > |address-book| **Contacts** >
   ``Double click`` on their name in the list.

On another user’s profile page:

-  **Send a contact request**: Adds this user to your :ref:`contacts <contacts>` once they have approved the request.

-  |bell-slash| **Mute**: Blocks notifications and messages from this
   user. They will not know that they have been muted.

-  |key| **Copy public key**: Copies the key used by instance
   administrators and on instances that offer subscriptions.

.. _contacts:

Contacts
--------

:badge:`Logged in users`

On CryptPad, using contacts makes collaboration more secure and simple.

Add a contact
~~~~~~~~~~~~~

On the profile page of another user: 

- **Send a contact request**.

By sharing your profile:

1. Copy the link: User menu (avatar at the top-right) > |user-circle|
   **Profile** > |share-alt| **Share**.
2. Paste and send through the means of your choice (preferably a secure
   mode of cummunication).

Manage contacts
~~~~~~~~~~~~~~~

To access the Contacts page:

-  User menu (avatar at the top-right) > |address-book| **Contacts**.

All contacts are listed at the left of the window. For each contact:

* |bell-slash|: Mute messages and notifications.
* |user-times|: Remove.
* |circle|: Indicates that this contact is online.

.. _chat_contacts:

Chat with contacts
~~~~~~~~~~~~~~~~~~

On the Contacts page, ``Click`` on a contact in the list to open the
chat with them in the main window.

Write messages in the field at the bottom and send them with
|paper-plane| or ``Enter``.

Load more chat history with |history| or delete the history with
|eraser|.

.. _teams:

Teams
-----

:badge:`Logged in users`

CryptPad teams are shared spaces between a group of users. A team has
its own CryptDrive, chat, and a list of members with roles and
permissions.

.. note::

   The number of teams a CryptPad user can join is limited to 3 for performance reasons.

To create a team:

#. User menu (avatar at the top-right) > |users| **Teams**. 
#. |plus-circle| **New**.

To open an existing team: 

#. User menu (avatar at the top-right) > |users| **Teams**.
#. |list| **Teams** > **Open** button on the desired team.

Team Drive
~~~~~~~~~~

The team storage space is similar to the :ref:`CryptDrive <drive>` but shared between
members of the team.

Team members
~~~~~~~~~~~~

To manage the members of a team, go to the |users| **Members** tab.

Invite members
~~~~~~~~~~~~~~

To invite members to a team:

-  |users| **Members** tab > **Invite members**.

|address-book| **Contacts** tab: Select CryptPad contacts to invite
them to the team. Invitees receive an invite notification and can
confirm they want to join the team.

|link| **Link** tab: Copy a link to send through the means of your
choice (preferably a secure mode of cummunication). This link is
single-use only. It becomes invalid after someone first uses it to join
the team.

-  **Temporary name**: Used to identify the invite link in the list of
   pending invitations.

-  **Password**: Protect the link against potiential interception.
   (optional)

-  **Personal message**: Message that the recipient will see before they
   decide to accept the invitation to join the team.

Roles and permissions
~~~~~~~~~~~~~~~~~~~~~

======= ==== ==== ============== ===========
Role    View Edit Manage members Manage team
======= ==== ==== ============== ===========
Viewers ✅    ❌    ❌              ❌
Members ✅    ✅    ❌              ❌
Admins  ✅    ✅    ✅              ❌
Owners  ✅    ✅    ✅              ✅
======= ==== ==== ============== ===========

Permissions:

View: access folders and pads (read-only).

Edit: create, modify, and delete folders and pads.

Manage Members: invite and revoke members, change member roles up to
Admin.

Manage Team: change team name and avatar, add or remove Owners, change
team subscription, delete team.

Administration
~~~~~~~~~~~~~~

Each member’s role can be changed in the team roster. Team admins and
owners can manage members of equal or lower role. For each member:

| |angle-double-up| : Promote to higher role.
| |angle-double-down|: Demote to lower role.
| |times|: Kick from the team.

Chat
~~~~

The team chat is similar to the chat with :ref:`contacts <contacts>` except shared between all members of the team.

Administration tab
~~~~~~~~~~~~~~~~~~

:badge:`Team owners`

-  **Public signing key**: Used to identify the team on instances that
   offer subscitpions.

-  **Team name**: Change the name of the team.

-  **Team avatar**: Import/modify an avatar for the team.

-  **Team deletion**: Permanently delete the team and all of its
   documents.
