
.. _dev_database:

Database
=========

CryptPad takes an unusual approach to storing documents on the server. User data is simply stored on the file system rather than a database.

Key points
-----------

* Each CryptPad document has information stored on the server in a location determined by a channel id
* The content of each document is encrypted using the encryption key, so that the server cannot read it
* Clients send the channel id to the server to:
  * get the latest information about a document
  * subscribe to ongoing updates while they are connected
  * modify the contents of the document
* each *channel* is stored within its own file on the server
* each change to the document is encoded on a single line of that file


Understanding document URLs
---------------------------

Everything that a client needs in order to interact with a CryptPad document is stored in its URL.

Let's look at an example:

.. XXX link to an example doc, e.g. markdown reference

https://cryptpad.fr/code/#/1/edit/ux7cTLdkhgUoTbMN-NLuvw/SohyLF7Lu6ProATIc-suV662/

Browsers do not send the information after the ``#`` symbol to the server when loading a page, so it is safe to encode private information there.

The information before ``#`` tells the browser which server to connect to, and what resources to download.

For example, this part of the URL (`https://cryptpad.fr/code/`) tells the server to load the code editor.

The remaining information (``#/1/edit/ux7cTLdkhgUoTbMN-NLuvw/SohyLF7Lu6ProATIc-suV662/``) is handled with Javascript by the browser.

There are several pieces of information there, separated by slashes.


.. code-block:: javascript

    URL encoding version: 1
    editor mode: edit
    Channel id: ux7cTLdkhgUoTbMN-NLuvw
    Encryption key: SohyLF7Lu6ProATIc-suV662


Finding a document
-------------------

It is possible to run code provided by the CryptPad server in your browser console. To extract the channel id of a document you have open, you can run this snippet:

.. code-block:: javascript

    require([
        "/common/common-hash.js"
    ], function (Hash) {
        var url = window.location.href;
        var password = "";
        var parsed = Hash.parsePadUrl(url);
        var secret = Hash.getSecrets(parsed.type, parsed.hash, password);
        console.log(secret.channel);
    });


If you were to run this on the document corresponding to the URL listed above, it would print ``bb1edc4cb7648605284db30dfcd2eebf``.

The corresponding file would be stored on the server, in your CryptPad instance's directory, at ``cryptpad/datastore/bb/bb1edc4cb7648605284db30dfcd2eebf.ndjson``.


.. XXX: for more information on administering the database including backups, migration, and more, please see the administrator guide.