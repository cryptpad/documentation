Share / Access
==============

|share-alt| **Share** and |unlock-alt| **Access** are the two menus
to manage how other users can interact with your documents on CryptPad.

-  From the document toolbar: |share-alt| **Share** and |unlock-alt|
   **Access** at the center.
-  From the CryptDrive: ``Right click`` on a document > |share-alt|
   **Share** or |unlock-alt| **Access**.

.. _share:

Share
--------------------

There are three ways to share a document: :ref:`share_contacts`, :ref:`share_link`, and :ref:`share_embed`. In each case, access rights can be set to authorise the recipient to edit the document, or to only view it.

.. _share_access_rights:

Access rights
~~~~~~~~~~~~~

There are 4 levels of permissions:

-  **View**: Read-only without editing the document.
-  **Present**: Read-only the rendered output of the document, available
   in the [Code] and [Slides] applications.
-  **Edit**: View and make changes to the document.
-  **View once and self-destruct**: Read-only **one time**. Once the
   link is opened by a recipient, the document is deleted permanently.

.. note::

   If a document is already stored in the CryptDrive of a user with edit rights, the “edit link” is shown in the document’s properties even if the user is in View mode.

.. _share_contacts:

Sharing with contacts
~~~~~~~~~~~~~~~~~~~~~

|badge-logged-in|

This is the recommended method for sharing documents securely on CryptPad. When sharing directly with :ref:`contacts <contacts>`, document links never leave the encrypted platform of CryptPad. This prevents data from being leaked to third parties.

To share with one or more contacts:

-  |share-alt| **Share** in the document toolbar > |address-book|
   **Contacts**.
-  ``Right click`` on the document in the CryptDrive > |share-alt|
   **Share** > |address-book| **Contacts**.

Then:

#. Choose the :ref:`access rights <share_access_rights>`.
#. Select the contacts or teams to share with.
#. **Share** button.

.. note::

   When sharing with contacts, they receive a notification.
   When sharing with a team, the document is added directly to the team’s CryptDrive.

.. _share_link:

Sharing a link
~~~~~~~~~~~~~~

The **Link** tab provides links that can be shared through the medium of
your choice. Depending on how you send the link, this method can present
security risks. To add a level of security, it is recommended to add a
:ref:`password <access_tab>` to your document before sharing the link.

To copy the link to a document:

-  From the document: |share-alt| **Share** in the toolbar > |link|
   **Link**
-  From the CryptDrive : ``Right click`` on the document > |share-alt|
   **Share** > |link| **Link**

then

#. Choose the :ref:`access rights <share_access_rights>` and additional options:

   * **Embed mode** hides the toolbar and user list
   * **Preview** allows to check what the link will look like before sending it.

#. **Copy** the link.
#. Send the link.

.. _share_embed:

Embedding
~~~~~~~~~

Embedding allows for a CryptPad document to be displayed on a web page.

To embed a document:

-  From the document : |share-alt| **Share** in the toolbar > |code|
   **Embed**.
-  From the CryptDrive : ``Right click`` on the document > |share-alt|
   **Share** > |code| **Embed**.

then

1. Choose the :ref:`access rights <share_access_rights>`.
2. **Copy** the embed code.
3. Paste the code on a web page.

.. _shared_folders:

Shared folders
~~~~~~~~~~~~~~

|badge-logged-in|

Shared folders are made for sharing a set of documents at once.

To create a shared folder in the CryptDrive:

-  ``+ New`` > |cptools shared-folder| **Shared folder**.
-  ``Ctrl + e`` > |cptools shared-folder| **Shared folder**.
-  ``Right click`` > |cptools shared-folder| **New shared folder**.

To convert an existing folder into a shared folder:

1. ``Right click`` on the folder > |share-alt| **Share**.
2. Choose the conversion options.
   Password.
   [Owned] folder.
3. ``OK`` or press the ``Enter`` key.

Folders are shared in a similar way to documents. To share a folder from
the CryptDrive:

1. ``Right click`` on the folder > |share-alt| **Share**.
2. Choose the `access rights <#access-rights>`__.
   **View**: Read-only without editing the contents of the folder.
   **Edit**: View and make changes to the folder.
3. Three tabs are available:
   |address-book| **Contacts**: Recommended method to share securely
   with contacts and teams on CryptPad.
   |link| **Link**: Copy a link to send through the medium of your
   choice.
   |code| **Embed**: Copy code to include the folder on a web page.

.. note::

   Shared folders have their own history, separate from the :Ref:`drive_history`. Restoring the history of the drive does not affect shared folders, conversely the history of a shared folder can be restored without affecting the rest of the drive.


.. _access:

Access
------

|badge-logged-in|

This menu is used to restrict access to a document or shared folder:

-  From the document: |unlock-alt| **Access**.
-  From the CryptDrive: ``Right click`` on the document or shared folder
   > |unlock-alt| **Access**.

.. _access_tab:

Access tab
~~~~~~~~~~

This tab summarises all the modalities of access to the document:

-  **Expiration date**: Date at which the document will be deleted. This
   date is set at the creation of the document and cannot be modified
   afterwards.

-  **Password**: Displays if a [password] has been set. A new password
   can be set, or an existing password modified.

-  **Owners**: List of all the document’s `owners <#owners>`__.

-  | **Edit rights requests**:
   | **Request edit rights**: For users with read-only access rights.
   | |bell-slash| **Mute access requests for this pad**: Hides edit rights requests for this document. |badge-owners|

-  **Access list**: Displays the `access list <#access-list>`__ and
   indicates if it is enabled.

-  |cptools destroy| **Destroy**: Delete the document permanently.

.. _access_list:

Access List
~~~~~~~~~~~

|badge-owners|

The access list restricts access to a document. Once active, users who
are not on the list are not able to access the document, even if they
have it stored in their CryptDrive.

To enable the access list, tick **Enable access list**. The
`owners <#owners>`__ of the document are on the list by default and
cannot be removed from it.

To add contacts or teams to the list:

1. Select them in the list of contacts on the right.
2. Add them to the list with the |arrow-left| button.

To remove a user or team from the list use the |times| button next to
their name.

.. _owners:

Owners
~~~~~~

This tab is used to manage the ownership of the document. Owners of a
document have the following permissions:

-  Enable an :ref:`acces list <access_list>`.
-  Enable a password.
-  Add or remove other owners.
-  Destroy the document.

The ownership of a document is set on the [creation screen].

.. note::

   If a document is created without owners, no one has permissions to
   manage its ownership. It cannot be permanently destroyed by anyone,
   but can be removed from the CryptDrive and will be destroyed
   automatically after 90 days of inactivity.

|badge-owners|

To add users or teams as owners:

1. Select them in the list of contacts on the right.
2. Add them to the list with the |arrow-left| button.

To remove an owner, use the |times| button next to their name.
