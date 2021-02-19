Frequently Asked Questions
==========================

How to import my documents from another platform?
-------------------------------------------------

Making CryptPad compatible with a wide range of document formats is a key challenge for the development team. Unfortunately the technology for converting documents in the browser still has limitations, especially as far private and open source solutions are concerned. While work in this area is ongoing, the methods below should help in importing and exporting to/from other widely used software.

.. XXX note on copy/pasting?

.. markdown/code section?
.. XXX note on right-click > open in code editor?

Rich text documents
~~~~~~~~~~~~~~~~~~~~~

To import rich text documents (Microsoft Word, Google Docs, LibreOffice Writer, etc.), the supported format is HTML:

1. Export your document as HTML in your existing software.
2. Save the file to your computer.
3. Open a new :ref:`app_rich_text` document on CryptPad (or an existing one to replace the contents).
3. |file-o| **File** > |upload| **Import** and select your file.

To export, use |file-o| **File** > |download| **Export** and select ``.doc`` as the format.

Spreadsheets
~~~~~~~~~~~~

To import spreadsheets, the supported format is ``.xlsx``. This is the Microsoft Excel format, but can be exported from other software such as Google Sheets and LibreOffice Calc:

1. Export your document as ``.xlsx`` in your existing software.
2. Save the file to your computer.
3. Open a new :ref:`app_sheets` document (or an existing one to replace the contents).
4. |file-o| **File** > |upload| **Import** and select your file.

To export, use |file-o| **File** > |download| **Export** and choose a format:

- The ``.csv`` format is the most widely supported (note that it only contains data and not formatting).
- To use in Microsoft Excel or Google sheets, select ``.xlsx``.
- To use in LibreOffice Calc, select ``.ods``.
- For cases where no further editing of the data is required after export (presentations, reports, etc), select ``.pdf``.
- For backup purposes or to share with a user on another CryptPad instance, select ``.bin``.


Can I use CryptPad on mobile?
-----------------------------

CryptPad is engineered to work as well as possible on small screens. Depending on your device performance it should be possible to use CryptPad on mobile. Work to make CryptPad more responsive was undertaken in 2020, if you notice areas that need improvement in this regard, please contact :ref:`user_support` or submit an `issue on Github <https://github.com/xwiki-labs/cryptpad/issues/new/choose>`_.

Are you planning to make an app?
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

We are not planning a dedicated mobile application for the following reasons:

- It would dramatically increase the amount of code that has to be developed and maintained, effectively creating other "versions" of CryptPad for iOS and Android.

- CryptPad is open source and can be hosted by anyone who wants to offer the service. Therefore, users of a mobile application would have to specify which :ref:`CryptPad instance <cryptpad_instances>` they want to connect to, which would be confusing. To complicate things further, each instance may be running a different version of the software, depending on whether or not the latest updates were applied by the administrators.

To address these problems, the development team is working on making CryptPad a "Progressive Web App". This means that it can be used on mobile through the web browser, behaving like an application while being the same software that runs on desktop browsers. This has the benefit of turning every CryptPad instance into a web app provider, rather than putting the burden of choosing the right instance on the user.

What is a document owner?
-------------------------


Can CryptPad sync documents to my local filesystem?
---------------------------------------------------



What is the relationship between CryptPad and OnlyOffice?
---------------------------------------------------------

The CryptPad :ref:`app_sheets` application is an integration of `OnlyOffice Spreadsheets <https://www.onlyoffice.com/en/spreadsheet-editor.aspx>`_. However, this only concerns the client-side code, CryptPad does not make use of the OnlyOffice Document Server. CryptPad's encrypted collaboration, used for spreadsheets and other applications, is completely different from the encryption system used in parts of upstream OnlyOffice. Some of CryptPad's file format conversion tools are based on OnlyOffice code, but substantial work has been done to make it run in the browser rather than on the server, therefore avoiding the need to reveal the contents of users' documents when converting.


Can you provide a Data Processing Agreement?
--------------------------------------------
