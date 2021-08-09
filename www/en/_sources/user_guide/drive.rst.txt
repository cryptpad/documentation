
.. _drive:

Drive
=====

The CryptDrive is used to store and manage documents. For logged in
users it is the default landing page on CryptPad. It is also accessible
from the other pages:

-  ``Click`` on the logo at the top-left.
-  User menu (avatar at the top-right) > |hdd-o| **CryptDrive**.

.. _drive_display:

Display
-------

Documents in the CryptDrive can be displayed as a |list| list or a
|th-large| grid. To switch between the two, use the button at the
right of the CryptDrive toolbar (under the avatar).

In grid mode, CryptPad can display thumbnails of documents. These can be
turned on in the :ref:`user settings <user_settings_cryptdrive>`.

.. figure:: /images/drive-grid.png
   :class: screenshot

   The CryptDrive in grid view.

.. figure:: /images/drive-list.png
   :class: screenshot

   The CryptDrive in list view.


Managing documents
------------------

.. XXX: clarify here that you can drag and drop between folders etc...

.. _folders:

Folders
~~~~~~~

:badge_user:`Logged in users`

There are multiple ways to create folders in the CryptDrive:

-  |plus| **New** in the toolbar > |folder| **Folder**.
-  ``Right click`` > |folder| **New folder**.
-  ``Ctrl + e`` > |folder| **Folder**.

Once a folder is created, documents can be added to it by dragging them
from the CryptDrive.

To change the color of a folder:

- ``Right click`` on the folder > |cptools palette| **Change color**.

To share a folder and all of its contents:

- ``Right click`` on the folder > |share-alt| **Share**. The folder will then be converted into a :ref:`shared folder <shared_folders>`.

Renaming
~~~~~~~~

There are two ways to rename documents on CryptPad. One changes the
document title for all users, the other changes it only in your
CryptDrive.

To change the title of a documents for all users that have it in their
CryptDrive:

#. ``Click`` on the title or the |pencil| button in the toolbar of the document.
#. Type the new title.
#. Save with the |check| button or ``Enter`` key.

To change the title of a document only in your CryptDrive:

#. ``Right click`` on the document in your CryptDrive > |pencil| **Rename**.
#. Type the new name.
#. Save with the ``Enter`` key.

The |flag| icon indicates that the title of a document is different in
your CryptDrive than for other users.

.. _deleting:

Deleting
~~~~~~~~

There are two ways of deleting a document on CryptPad:

- |trash| **Removing** a document means it stops appearing in the CryptDrive but remains in the database. The document remains in the CryptDrive of other users who have stored it. The document can be recovered in the CryptDrive using the :ref:`history <drive_history>`.
- |cptools destroy| **Destroying** a document deletes it from the database permanently. The document is deleted from all CryptDrives that store it, and it cannot be recovered using the CryptDrive history. :badge_owner:`Document owners`

.. note::

   If a document is not stored in any CryptDrive, it is **destroyed** from the database after 90 days (the length of this delay can be set by the service administrators).

To **remove** a document from the CryptDrive.

-  Drag the document from the CryptDrive into the |trash| **Trash**.
-  ``Right click`` > |trash| **Move to trash**
-  Select the document and press the ``Del`` key.

To **remove** the document from the CryptDrive without storing it in the
trash first:

- Select the document and press the ``Shift + Del`` keys.

To empty the trash:

- ``Right click`` on the |trash| **Trash** tab to the left of the CryptDrive > |trash-o| **Empty the trash**.
- ``Click`` on the |trash| **Trash** tab to access the trash > |trash-o| **Empty the trash**.

If you are an :ref:`owner <owners>` of some documents in the trash when you empty it,
you are prompted to decide if you want to **remove** or **destroy**
them.

To **destroy** a document without storing it in the trash first:

-  ``Right click`` on the document in the CryptDrive > |cptools destroy| **Destroy**. :badge_owner:`Document owners`

.. note::
   Once destroyed, documents may still appear in other user's CryptDrives. Once a document has been added to someone's drive, the encrypted nature of CryptPad makes it impossible to take it back. Therefore a destroyed document may still appeared in a user's drive if they had previously stored it. However, they will not be able to open the document.

.. _drive_history:

CryptDrive history
------------------

The CryptDrive history is saved and can be restored if needed. From the
CryptDrive:

1. ``Click`` on the |history| history button at the top-right (under
   the avatar).
2. Use the arrows |fast-backward| |step-backward| and |step-forward| |fast-forward| to step through
   the history.
3. Restore the displayed version with |check| **Restore**, or exit the history without restoring
   with |times| **Close**.

To save storage space the CryptDrive history can be deleted in the :ref:`user settings <user_settings_cryptDrive>`.

.. note::

   :ref:`Shared folders <shared_folders>` have their own history, separate from the CryptDrive history. Restoring the history of the drive does not affect shared folders, conversely the history of a shared folder can be restored without affecting the rest of the drive.

.. _tags:

Tags
----

:badge_user:`Logged in users`

Group documents in multiple categories by using tags. Your tags are not
visible by other users.

The |hashtag| **Tags** tab in the CryptDrive displays all tags in use
and their associated documents.

.. image:: /images/modal-tags.png
   :class: screenshot

To add or remove tags from a document:

-  From the CryptDrive: ``Right click`` on the document > |hashtag| **Tags**.
-  From a document: |file-o| **File** > |hashtag| **Tags**.

To manage tags for multiple documents:

#. Select the documents with ``Ctrl + Click`` in the CryptDrive.
#. ``Right click`` on the documents > |hashtag| **Tags**.

Only the tags assigned to all the documents are then displayed. Any tags
added and/or removed are applied to all the selected documents.

.. _templates:

Templates
---------

:badge_user:`Logged in users`

Templates provide reusable starting points to create documents of a
similar structure, for example invoices, letterheads, reports, and so
on.

To create a template:

1. Select the |cptools template| **Templates** tab in the CryptDrive.
2. |plus| **New** in the toolbar.

or

1. In an existing document: |file-o| **File** > |bookmark| **Save as
   template**.

or

1. Create a :ref:`new document <new_document>`.
2. On the creation screen select |cptools new-template| **New
   template**.

To use a template:

-  Select the template when creating a :ref:`new document <new_document>`.
-  In an existing document: |file-o| **File** > |upload| **Import a
   template**.
   Please note: this option **replaces** the contents of the document
   with the template.
