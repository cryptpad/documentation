
.. _app_sheets:

Spreadsheet
===========

The Spreadsheet application in CryptPad is an integration of
`OnlyOffice <https://www.onlyoffice.com/>`__. To read more about the details of this integration see :ref:`FAQ_OOintegration`.

.. image:: /images/app-sheets-preview.png
   :class: screenshot


Documentation
-------------

Please refer to the `OnlyOffice
documentation <https://helpcenter.onlyoffice.com/en/ONLYOFFICE-Editors/ONLYOFFICE-Spreadsheet-Editor/index.aspx>`__
for a spreadsheet user-guide.


Toolbars
--------

CryptPad integrates OnlyOffice spreadsheets into the same encrypted collaboration system as the other applications. Additionally OnlyOffice provides a wide range of functions in a tabbed toolbar. This results in a double toolbar that can cause confusion:

.. XXX add spreadsheet toolbar screenshot

- The topmost **CryptPad toolbar** is used for |file-o| **File** operations (including import/export, history, properties, etc) as well as |share-alt| **Share** and |unlock-alt| **Access**.
- The **OnlyOffice toolbar** is used for all functionality within the spreadsheet document itself, as well as the collaboration modes explained in the next section.

Undo and collaboration modes
----------------------------

OnlyOffice provides two collaborative editing modes in spreadsheets that affect how changes are synced between users and whether or not the **Undo** functionality is available.

- **Fast Mode** is enabled by default. New edits by all users are automatically synced with others as they are made. In this mode it is not possible to undo.
- **Strict Mode** allows each user to make changes independently. The modified cells are "locked" for others until the author manually saves their changes. New edits are only synced with other users after being saved. In this mode it is possible to undo changes that have not yet been saved. When a user saves their changes, others are prompted to save in order to receive the latest edits.

When ``Ctrl Z`` is pressed for undo, the application will automatically suggest switching to **Strict Mode** to enable the undo functionality.

To switch back to **Fast mode** use the **Collaboration** tab in the OnlyOffice toolbar and select **Co-editing Mode** > **Fast**.

.. note::
   CryptPad remembers your choice of editing mode on each device for all documents.


.. _sheets_history:

History
-------

To access the spreadsheet history, use |file-o| **File** > |history| **History** in the CryptPad toolbar.

Due to the integration of OnlyOffice with CryptPad's encrypted real-time collaboration, history in speadsheets works differently than :ref:`in the other applications <document_history>`.

.. figure:: /images/history-toolbar-sheets.png
   :class: screenshot

   The spreadsheet history toolbar

History in spreadsheets only allows to jump back to the previous version, and then move forward through individual edits.

- |fast-backward| previous version
- |step-forward| step forward one edit
- |fast-forward| next version

The functionality to restore and share a version, as well as everything relating to :ref:`snapshots`, works in the same way as in :ref:`the other applications <document_history>`.

.. _sheets_printing:

Printing
--------

To print spreadsheets it is recommended to export using one of the formats below and to handle page layout with a desktop application such as LibreOffice Calc.

Alternatively the ``.pdf`` export can be used to produce file for print, results may vary depending on the layout of the document.


Import/Export
-------------

| |file-o| **File** > |upload| **Import**.
| Supported formats: ``.bin`` files exported by this application, Excel ``.xslx``.

| |file-o| **File** > |download| **Export**.
| Supported formats: ``.bin``, Excel ``.xslx``, ``.ods``, ``.csv``, ``.pdf``.
