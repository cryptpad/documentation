Common hash
===========

``./www/common/common-hash.js``

.. function:: encodeBase64(bytes)

    Convert a list of bytes (used in TweetNaCl) into a base64 string that can be stored and shared.
   
   :param bytes: Uint8Array object to transform
   :rtype: Base64 string
   

.. function:: decodeBase64(str)

    Convert a base64 string into a list of bytes that can be used with cryptographic tools.
   
   :param str: Base64 string
   :rtype: Uint8Array


.. function:: hashChannelList(list)

    Hash a list of channel IDs to check with the server if the pins log is correct.
   
   :param list: Array of channel IDs
   :rtype: Base64 string



.. function:: generateSignPair()

    Provide a pair of signing and validation keys.

   :rtype: Object {validateKey, signKey, safeValidateKey, safeSignKey} with base64-encoded keys


.. function:: getSignPublicFromPrivate(privateKey)

    Recover a validation key from a private signing key.
   
   :param privateKey: Base64-encoded private signing key
   :rtype: Base64-encoded string


.. function:: getBoxPublicFromSecret(secretKey)

    Recover a public encryption key from a private encryption key.
   
   :param secretKey: Base64-encoded private encryption key
   :rtype: Base64-encoded string


.. function:: checkBoxKeyPair(secretKey, publicKey)

    Check if the provided private and public encryption keys form a matching key pair.
   
   :param secretKey: Base64-encoded private encryption key
   :param publicKey: Base64-encoded public encryption key
   :rtype: Boolean


.. function:: getSecrets(type, hash, password)

    Recover a pad **secret**, containing all the keys and ids necessary to load the content, from its hash.
    The secret will contain all the data that can be extracted from the hash, depending on the access rights (view or edit) and the type of hash (file or collaborative document).
   
   :param type: Application name (pathname in the URL)
   :param hash: Hash to process
   :param password: Pad or file password
   :rtype: secret


.. function:: getEditHashFromKeys(secret)

    Get the edit hash of a collaborative document if the provided secret offers edit access.
   
   :param secret: secret generated with getSecrets
   :rtype: hash


.. function:: getViewHashFromKeys(secret)

    Get the view hash of a collaborative document if the provided secret offers view access.
   
   :param secret: secret generated with getSecrets
   :rtype: hash


.. function:: getHiddenHashFromKeys(secret)

    Get the **safe hash** of a collaborative document from the provided secret. The safe hash contains the channel ID for this pad but doesn't includes data about the cryptographic keys. It can only be open by users who already have the pad stored in their drive.
   
   :param secret: secret generated with getSecrets
   :rtype: hash


.. function:: getFileHashFromKeys(secret)

    Get the hash of a static file (image, video, pdf, etc.) from its secret.
   
   :param secret: secret generated with getSecrets
   :rtype: hash


.. function:: getHashes(secret)

    Get an object including all the available hashes for this secret: fileHash, viewHash and/or editHash
   
   :param secret: secret generated with getSecrets
   :rtype: Object {fileHash, viewHash, editHash} with *String* or *undefined* values


.. function:: createChannelId([ephemeral=false])

    Generate a random "channelId" String, represented as a 32-characters long hexadecimal string. Ephemeral channels (messages never stored in the database) have a 34-characters long id.
   
   :param ephemeral: Boolean (default false) indicating the need of an ephemeral channel id
   :rtype: channelId string


.. function:: getChannelIdFromKey(publicKey)

    Special function used to obtain the channelId of the support mailbox. This channelId is directly derived from the support mailbox's validation key since every CryptPad user should have access to it.
   
   :param publicKey: Base64-encoded validation key
   :rtype: channelId string


.. function:: createRandomHash(type, password)

    Get a new random hash for a static file or a collaborative document. An **edit** hash is generated for collaborative documents. Password-protected documents are recognized with ``/p/`` in the hash.
   
   :param type: Application name(file, pad, code, etc.)
   :param password: Truthy if the hash should have the *password* flag.
   :rtype: hash


.. function:: parseTypeHash(type, hash)

    Parse the hash of a static file or a collaborative document in CryptPad and provide all the data that can be extracted from this hash. This function supports all previous hash versions in order to be able to open very old pads or files.
    
    A ``getHash(options)`` function is included in the returned object and provides differents variants of the same hash (embed mode, present mode, password flag, etc.)
   
   :param type: Application name(file, pad, code, etc.)
   :param hash: URL hash of the document
   :rtype: Object {...} with all the extracted values and a getHash function


.. function:: parsePadUrl(url)

    Parse the URL of a static file or a collaborative document in CryptPad. The result includes the *application name* (type), the *hash* of the document and the result of ``parseTypeHash`` for this document.
    
    A ``getUrl(options)`` function is included in the returned object and can be used in the same way as ``getHash`` in the hash parser.
   
   :param url: URL of the document
   :rtype: Object {...} with all the extracted values and a getUrl function


.. function:: hashToHref(type, hash)

    Convert the hash of a document for a given application into a full URL.

   :param type: Application name(file, pad, code, etc.)
   :param hash: hash of the document
   :rtype: URL (String)


.. function:: hrefToHash(href)

    Extract the hash of a document from its full URL.

   :param href: URL of the document
   :rtype: hash


.. function:: getRelativeHref(href)

    Get a relative URL from an absolute URL.
    | Example: ``https://cryptpad.fr/code/#/2/code/edit/{seed}/`` ==> ``/code/#/2/code/edit/{seed}/``
   
   :param href: URL of the document
   :rtype: Relative URL of the document


.. function:: hrefToHexChannelId(href, password)`

    Extract the channelId from the URL of a document. The password is required for password-protected documents.
   
   :param href: URL of the document
   :param password: document password
   :rtype: channelId


.. function:: getBlobPathFromHex(id)

    Get the relative URL of an encrypted file from its id. This URL is different from the URL of the decrypted file and is used to download the full file directly from the server so that it can be decrypted locally.
   
   :param id: file id
   :rtype: relative URL


.. function:: serializeHash(hash)

    Return the provided hash with a trailing slash if it was missing.
   
   :param hash: hash of the document
   :rtype: hash


.. function:: isValidHref(href)

    Check if the provided URL is valid and contains the necessary data to open a CryptPad static file or collaborative document.
   
   :param href: URL of a document
   :rtype: Boolean


