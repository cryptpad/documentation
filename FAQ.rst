Frequently Asked Questions
==========================

.. XXX Troubleshooting
.. ----------------
.. - Check in a different browser
.. - Deactivate extensions, for example in Firefox go to Help > Restart with addons disabled

I forgot my password
---------------------

Administrators of a CryptPad instance cannot recover or reset user passwords. This also ensures that they cannot access any user data (e.g. the content of documents).

If you are still logged in to an account for which you have forgotten the password, you can transfer all of the documents to a new account with the following steps:

1. While logged in to the account with the lost password, navigate to: **User Menu** (avatar at the top right) > |gear| **Settings** > |hdd-o| **CryptDrive**
2. Click the **Backup** button to download a file containing the keys to all documents. (note: this is different to **Download my Cryptdrive** that saves the content of all individual documents)
3. In another browser, register a new account with a known password
4. While logged in to the new account: **User Menu** (avatar at the top right) > |gear| **Settings** > |hdd-o| **CryptDrive** and click the **Restore** button.


How to import/export my documents to/from another platform?
-----------------------------------------------------------

Making CryptPad compatible with a wide range of document formats is an ongoing challenge for the development team. Unfortunately the technology for converting documents in the browser still has limitations, especially as far as private and open source solutions are concerned. While work in this area is in progress, the methods below should help in importing and exporting to/from other widely used software.

.. note::
    Simply copy-pasting content from existing software into CryptPad is an easy first step to try when importing/exporting. Please note that the import/export methods below can improve results significantly.


It is possible to upload **files** to CryptPad for secure storage and sharing, however this does not make every file an editable CryptPad **document**.

Text files uploaded as files can be opened as a Code/Markdown document from the Drive with ``Right click`` > |cptools code| **Open in Code editor**.

To import any other file type in an editable form, please use the |file-o| **File** > |upload| **Import** functionality in the appropriate CryptPad editor as explained below.


Rich text document import/export
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

To import rich text documents (Microsoft Word, Google Docs, LibreOffice Writer, etc.), the supported format is HTML:

1. Export your document as HTML in your existing software.
2. Save the file to your computer.
3. Open a new :ref:`app_rich_text` document on CryptPad (or an existing one to replace the contents).
4. |file-o| **File** > |upload| **Import** and select your file.

To export, use |file-o| **File** > |download| **Export** and select ``.doc`` as the format.

Spreadsheets import/export
~~~~~~~~~~~~~~~~~~~~~~~~~~~

To import spreadsheets, the supported format are Microsoft Excel ``.xlsx`` and OpenDocument ``.ods``. These can both be exported from popular software such as Google Sheets and LibreOffice Calc:

1. Export your document as ``.xlsx`` or ``.ods`` in your existing software.
2. Save the file to your computer.
3. Open a new :ref:`app_sheets` document (or an existing one to replace the contents).
4. |file-o| **File** > |upload| **Import** and select your file.

To export, use |file-o| **File** > |download| **Export** and choose a format:

- The ``.csv`` format is the most widely supported (note that it only contains data and not formatting).
- To use in Microsoft Excel or Google sheets, select ``.xlsx``.
- To use in LibreOffice Calc, select ``.ods``.
- For cases where no further editing of the data is required after export (presentations, reports, etc), select ``.pdf``.
- For backup purposes or to share with a user on another CryptPad instance, select ``.bin``.

.. note::
    Import/export of spreadsheets to various formats is only available in browsers that support specific functionality. Please see the `up-to-date list of supported browsers <https://caniuse.com/sharedarraybuffer>`_.


I cannot do X with a document I created
---------------------------------------

Some functionality on CryptPad is restricted to :ref:`document owners <owners>`. This includes:

-  Enabling an :ref:`access list <access_list>`.
-  Enabling a password.
-  Adding or removing other owners.
-  Destroying the document.

The ownership of a document is set when :ref:`creating it<new_document>` and cannot be changed afterwards if the document is created without an owner.

The development team is considering removing this distinction in future. In the meantime, the safe default option is to "own" all documents you create in order to retain full control over them, including the ability to destroy them.


Can I use CryptPad on mobile?
-----------------------------

CryptPad is engineered to work as well as possible on small screens. Depending on your device performance it should be possible to use CryptPad on mobile. Work to make CryptPad more responsive was undertaken in 2020, if you notice areas that need improvement in this regard, please contact :ref:`user_support` or submit an `issue on Github <https://github.com/xwiki-labs/cryptpad/issues/new/choose>`_.

Are you planning to make an app?
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

We are not planning a dedicated mobile application for the following reasons:

- It would dramatically increase the amount of code that has to be developed and maintained, effectively creating other "versions" of CryptPad for iOS and Android.

- CryptPad is open source and can be hosted by anyone who wants to offer the service. Therefore, users of a mobile application would have to specify which :ref:`CryptPad instance <cryptpad_instances>` they want to connect to, which would be confusing. To complicate things further, each instance may be running a different version of the software, depending on whether or not the latest updates were applied by the administrators.

To address these problems, the development team is working on making CryptPad a "Progressive Web App". This means that it can be used on mobile through the web browser, behaving like an application while being the same software that runs on desktop browsers. This has the benefit of turning every CryptPad instance into a web app provider, rather than putting the burden of choosing the right instance on the user.

.. XXX explain that storage is not our primary use-case

.. Is Cryptpad suitable for storing large amounts of data?
.. --------------------------------------------------------


Can CryptPad sync documents to my local filesystem?
---------------------------------------------------

The way encryption is currently used in CryptPad does not allow syncing with the local file system. This is a regularly requested feature however, so the development team hopes to make it available in future.

.. _FAQ_OOintegration:

What is the relationship between CryptPad and OnlyOffice?
---------------------------------------------------------

The CryptPad :ref:`app_sheets` application is an integration of `OnlyOffice Spreadsheets <https://www.onlyoffice.com/en/spreadsheet-editor.aspx>`_. However, this only concerns the client-side code, CryptPad does not make use of the OnlyOffice Document Server. CryptPad's encrypted collaboration, used for spreadsheets and other applications, is completely different from the encryption system used in parts of upstream OnlyOffice. Some of CryptPad's file format conversion tools are based on OnlyOffice code, but substantial work has been done to make it run in the browser rather than on the server, therefore avoiding the need to reveal the contents of users' documents when converting.

FAQ for cryptpad.fr
-------------------

.. _faq_manual_payments:

Can I pay for my subscription without a card?
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

We accept payments by bank transfer, Paypal, or other depending on requests. However, due to the additional work involved in issuing invoices and processing payments manually, this option is limited to yearly plans for our Duo offer and above and incurs a 30% surcharge.

Do you accept cryptocurrencies for subscriptions and donations?
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

We accept payments in Bitcoin. These are subject to the :ref:`manual processing surcharges <faq_manual_payments>` as explained in the previous question. Additionally, as a company registered in France, we are legally required to ask for a name and address to issue the invoice to, and an email for communication about your subscription.

Can you provide a Data processing Agreement (DPA)?
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

DPAs are a feature of our `Organization Plans <https://cryptpad.fr/accounts/#org>`_, note that a example DPA is available for preview on that page.


