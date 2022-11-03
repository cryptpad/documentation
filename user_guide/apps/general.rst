General
=======

.. _new_document:

New document
------------

To create a new document:

*  From anywhere on CryptPad: ``Ctrl+e``.
*  From the CryptDrive:

   * |plus| **New** in the toolbar.
   * |plus| **New** at the bottom of the file list/grid.
   
*  From a document: |file-o| **File** > |plus| **New**.

.. image:: /images/app-creation-screen.png
   :class: screenshot

:badge_user:`Logged in users`

The creation screen offers a number of options when new documents are
created.

-  **Owned pad**: Create the new document as :ref:`owner <owners>`. If the document is created without an owner this setting cannot be modified.

-  **Expiring pad**: Specify an expiry date after which the document will be destroyed. This setting cannot be modified after the document is created.

-  **Add a password**: Secure the sharing of the document with a :ref:`password <passwords>`. This setting can be changed later in the :ref:`access` menu.

-  **Template**: Choose to start from a blank document or use a :ref:`template <templates>` as a starting point.

.. note::
   All templates saved in CryptDrive or in teams that you are part of appear on the creation screen. To save a document as a template:

   - In the open document: |file-o| **File** > |cptools new-template| **Save as template**.

   or

   - In the CryptDrive: Drag the document to the |cptools template| **Templates** folder.

.. _saving:

Saving
------

Changes to documents are saved automatically. The status line in the document toolbar (under the title) confirms that changes have been saved.

.. _make_a_copy:

Make a copy
-----------

To duplicate a document:

-  From the document: |file-o| **File** > |clone| **Make a copy**.
-  From the CryptDrive: ``Right click`` on the document > |clone|
   **Make a copy**.

.. note::
   Due to the integration of OnlyOffice with CryptPad's encrypted real-time collaboration, **Make a copy** is not available in Spreadsheets.

.. _document_history:

Document history
----------------

.. figure:: /images/history-toolbar-richtext.png
   :class: screenshot

   The history toolbar

The history of documents is saved and can be restored if needed. To view and restore the history of a document:

1. |file-o| **File** > |history| **History**.
2. Use the arrows to navigate:

   - |step-backward| and |step-forward| between each edit.
   - |step-backward| |user| and |user| |step-forward| between each author.
   - |step-backward| |users| and |users| |step-forward| between each editing session (when the same group of authors was connected to the document).

3. Restore the displayed version with |check| **Restore** , or close the history without restoring
   with |times| **Close**.

To save storage space, history can be deleted in the document’s :ref:`properties <document_properties>` :badge_owner:`Document owners`

.. note::
   The history functionality works slightly differently in the :ref:`app_sheets` application, due to the integration of OnlyOffice with CryptPad's encrypted real-time collaboration. Please refer to :ref:`spreadsheet history <sheets_history>` for further details.

**Version Links**

To share a link to the displayed version of the history:

- |share-alt| **Share** in the toolbar.
- Select **Contacts**, **Link** or **Embed** similarly to when :ref:`sharing a document <share>`.

Recipients will be able to view the selected version in read-only mode.

.. warning::
   Sharing a link to a version also gives read-only access to all versions of the document.

.. _snapshot_from_history:

**Create a snapshot from history**

To create a :ref:`snapshot <snapshots>` from the displayed version of the history:

- |camera| button in the toolbar.
- In the dialog, provide a name for the snapshot.
- |camera| **New Snapshot**

.. _snapshots:

Snapshots
---------

.. figure:: /images/snapshots-dialog.png
   :class: screenshot

   The snapshots dialog

Snapshots are specific points in the history of a document that are named for easy reference.

To create a snapshot from the current state of the document:

- |file-o| **File** > |camera| **Snapshots**
- In the dialog, provide a name for the snapshot.
- |camera| **New Snapshot**

To create a snapshot from a version in the document's history see :ref:`snapshot from history <document_history>` above.

To view and restore a snapshot:

- |file-o| **File** > |camera| **Snapshots**
- In the dialog, ``Click`` on the snapshot in the list and |eye| **View**.
- The snapshot opens in a new window.
- |check| **Restore** or |times| **Close**

To delete a snapshot:

- |file-o| **File** > |camera| **Snapshots**
- In the dialog, ``Click`` on the snapshot in the list and |trash| **Delete**.

.. warning::
   Snapshots are part of the document's history. If you delete the history in the :ref:`document_properties`
   snapshots will be deleted as well.

.. _document_properties:

Properties
----------

.. image:: /images/modal-properties.png
   :class: screenshot

To access the properties menu:

-  From the document: |file-o| **File** > |info-circle|
   **Properties**.
-  From the CryptDrive: ``Right click`` on the document >
   |info-circle| **Properties**.

Available data:

-  Document identifier to share with instance administrators in case of an issue. (note that this does not expose the content of of the document).
-  Links to edit and view (depending on your permissions).
-  Dates of creation and last access.
-  Size.

The document size shows the proportions used for content and for history. To save storage space, delete the document’s history with **Delete history** and confirm. :badge_owner:`Document owners`

.. _document_users_and_chat:

Users and chat
--------------

Interact with users connected to the same document through the user-list
|user| |eye| and the |comments| **Chat**.

To show/hide these panes:

-  |user| |eye| for the user-list.
-  |comments| **Chat** for the chat.
