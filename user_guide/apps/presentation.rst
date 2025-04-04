.. _app_presentation:

Presentation
============

The Presentation application in CryptPad is an integration of `OnlyOffice <https://www.onlyoffice.com/>`__. To read more about the details of this integration see :ref:`FAQ_OOintegration`

.. image:: /images/app-presentation-preview.png
   :class: screenshot

Documentation
-------------

Please refer to the `OnlyOffice documentation <hhttps://helpcenter.onlyoffice.com/userguides/docs-pe.aspx>`__ for a presentation user-guide.

.. note::
   
   Due to various security implications, `OnlyOffice plugins <https://helpcenter.onlyoffice.com/ONLYOFFICE-Editors/Editors-User-Guides/AllEditors/Plugin-manager.aspx>`__, also `macros <https://api.onlyoffice.com/plugin/macros>`__, aren't available on CryptPad. 

Toolbars
--------

CryptPad integrates OnlyOffice presentations into the same encrypted collaboration system as the other applications. Additionally OnlyOffice provides a wide range of functions in a tabbed toolbar. This results in a double toolbar that can cause confusion:

- The topmost **CryptPad toolbar** is used for |file-o| **File** operations (including import/export, history, properties, etc) as well as |share-alt| **Share** and |unlock-alt| **Access**.
- The **OnlyOffice toolbar** is used for all functionality within the presentation document itself, as well as the collaboration modes explained in the next section.

Undo and collaboration modes
----------------------------

.. image:: /images/app-presentation-collab-mode.png
   :class: screenshot

OnlyOffice provides two collaborative editing modes in presentations that affect how changes are synced between users and whether or not the **Undo** functionality is available.

- **Fast Mode** is enabled by default. New edits by all users are automatically synced with others as they are made. In this mode it is not possible to undo.
- **Strict Mode** allows each user to make changes independently. The modified cells are "locked" for others until the author manually saves their changes. New edits are only synced with other users after being saved. In this mode it is possible to undo changes that have not yet been saved. When a user saves their changes, others are prompted to save in order to receive the latest edits.

When :kbd:`Ctrl + Z` is pressed for undo, the application will automatically suggest switching to **Strict Mode** to enable the undo functionality.

To switch back to **Fast mode** use the **Collaboration** tab in the OnlyOffice toolbar and select **Co-editing Mode** > **Fast**.

.. note::
   CryptPad remembers your choice of editing mode on each device for all documents.

.. _presentations_history:

History
-------

To access the presentation history, use |file-o| **File** > |history| **History** in the CryptPad toolbar.

Due to the integration of OnlyOffice with CryptPad's encrypted real-time collaboration, history in presentations works differently than :ref:`in the other applications <document_history>`.

.. figure:: /images/history-toolbar-presentation.png
   :class: screenshot

   The presentation history toolbar

History in presentations only allows to jump back to the previous version, and then move forward through individual edits.

- |fast-backward| previous version
- |step-forward| step forward one edit
- |fast-forward| next version

The functionality to restore and share a version, as well as everything relating to :ref:`snapshots`, works in the same way as in :ref:`the other applications <document_history>`.

.. _presentations_printing:

Printing
--------

To print presentations it is recommended to export using one of the formats below and to handle page layout with a desktop application such as LibreOffice Impress.

Alternatively the ``.pdf`` export can be used to produce file for print, results may vary depending on the layout of the document.

Import/Export
-------------

| |file-o| **File** > |upload| **Import**.
| Supported formats: ``.bin`` files exported by this application, PowerPoint ``.pptx``, ``.odp``.

| |file-o| **File** > |download| **Export**.
| Supported formats: ``.bin``, PowerPoint ``.pptx``, ``.odp``, ``.pdf``.

.. .csv removed from the supported export formats as it's broken and deactivated
