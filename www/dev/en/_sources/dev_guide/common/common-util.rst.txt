Common util
===========

``./www/common/common-util.js``




.. function:: slice(arr)

    Shortcut for ``Array.prototype.slice.call`` which allows the use of the Array "slice" method on any Array-like structure like a Uint8Array (from cryptographic tools) or a NodeList (from ``document.querySeletorAll``). The result is always a classic Array.
   
   :param arr: Array-like element (list)
   :rtype: Array


.. function:: bake(f, args)

    Get a function with no arguments which will call the provided function with the provided arguments.
    
    | Example: ``Util.bake(LocalStore.logout, cb)`` returns ``function () { LocalStore.logout(cb); }``
   
   :param f: Function to call
   :param args: Arguments to call the function with
   :rtype: function


.. function:: both(f, g)

    Get a function "h" that will call both f (first) and g (second) with the arguments provided to the new function (h).
    
    | Example: ``var h = Util.both(f, g); h(false, true)`` is the same as ``f(false, true); g(false, true);``
   
   :param f: First function to call
   :param g: Second function to call
   :rtype: function


.. function:: clone(obj)

    Shortcut for ``JSON.parse(JSON.stringify(obj))`` used to clone (recursively) a JavaScript object.
   
   :param obj: Object to clone
   :rtype: Object


.. function:: tryParse(str)

    Parse the provided string as an object with ``JSON.parse`` but catch exceptions and return ``undefined`` instead.
   
   :param str: Stringified object
   :rtype: Object or undefined


.. function:: mkAsync(f)

    Get an asynchronous version of the provided function.
   
   :param f: Function
   :rtype: Function


.. function:: mkEvent(once)

    Handle "events" in the code which are not attached to an element and are easier to handle than native events. The "evt" object returned contains 3 methods:
    
    | ``evt.reg(f)`` registers a handler "f" on the event, similar to ``element.addEventListener``
    | ``evt.fire(args)`` triggers the event and calls all the handlers, similar to ``element.dispatchEvent(new Event())``
    | ``evt.unreg(f)`` removes a handler registered for this event, similar to ``removeEventListener``
    
    A **once** flag can be used to force the event to be triggered only once. In this case, every handler registered after the event has been fired will be called instantly.
    
   
   :param once: Boolean (default false)
   :rtype: Object {reg, fire, unreg}



.. function:: mkTimeout(f, ms)

    Create a function that needs to be called before "ms" milliseconds. This function will call "f" with the provided arguments. If it's not called before the end of the timer, "f" will be called with "TIEMOUT" as first argument.
   
   :param f: Function to englobe with a timeout
   :param ms: Timeout in milliseconds
   :rtype: Function



.. function:: response(errorHandler)

    Provide a "response" object to handle responses when sending queries using "txid" (transaction id). The returned object contains the following methods:
    
    | ``response.expect(id, f, ms)`` creates a "pending" callback with the provided "id". When a response is received with this id, "f" is called. "ms" is an optional timeout.
    | ``response.handle(id, args)`` triggers the pending callback associated with the provided "id" if it exists. The callback "f" added with ``expect```will be called with the provided "args".
    | ``response.clear(id)`` removes the pending callback for the provided "id".
    | ``response.expected(id)`` returns the current state if a given "id" (true if still pending, false if already called).
    | ``response.expectation(id)`` returns the pending callback associated to the provided "id".
    
    "errorHandler" is called when "handling" an "id" that isn't linked to any pending callback.

   :param errorHandler: Error handler (function)
   :rtype: Object {expect, handle, clear, expected, expectation}


.. function:: find(map, path)

    Safely find a sub-element of a JavaScript object (plain object or array). If the path leads to an undefined element at any point, the script stops and returns ``undefined`` without throwing.
   
   :param map: JavaScript object
   :param path: Path to explore in the given map
   :rtype: Element located to the given path in the map or "undefined"


.. function:: uid()

    Get a short alphanumeric random string that can be used as an id for various elements.
   
   :rtype: Random string of 10 characters maximum


.. function:: fixHTML(str)

    Escape the provided string to make sure HTML tags can't be rendered. Escaped characters are <, >, &, " and '.
   
   :param str: A string containing HTML tags
   :rtype: A string with escaped HTML tags

.. function:: hexToBase64(str)

    Convert a hexadecimal string into a base64 string.
   
   :param str: Hexadecimal string
   :rtype: Base64-encoded string

.. function:: base64ToHex(str)

    Convert a base64 string into a hexadecimal string.
   
   :param str: Base64-encoded string
   :rtype: Hexadecimal string


.. function:: uint8ArrayToHex(bytes)

    Convert an array of bytes into a hexadecimal string.
   
   :param bytes: Uint8Array
   :rtype: Hexadecimal string




.. function:: hexToUint8Array(str)

    Convert a hexadecimal string into an array of bytes.
   
   :param str: Hexadecimal string
   :rtype: Uint8Array




.. function:: uint8ArrayJoin(arr)

    Concat all the Uint8Array items of the given array.
   
   :param arr: Array<Uint8Array>
   :rtype: Uint8Array




.. function:: escapeKeyCharacters(str)

    Replace the "/" characters from the base64 encoded encryption keys with a "-".
   
   :param str: Base64-encoded string
   :rtype: Escaped base64 string




.. function:: unescapeKeyCharacters(bytes)

    Replace the "-" characters from the escaped base64 encoded string with a "/".
   
   :param str: Escaped base64 string
   :rtype: Base64-encoded string





.. function:: deduplicateString(arr)

    Make a copy of the provided array and remove duplicates. The initial array is not modified. The "===" operator is used to detect duplicates so this function will work with more types than "strings".
   
   :param arr: Array
   :rtype: Array




.. function:: fixFileName(name)

    From a given "name", provide a safe file name. Spaces are replaced with "-" and slashes are replaced with "_".
   
   :param str: Unsafe file name (string)
   :rtype: File name (string)


.. function:: bytesToGigabytes(bytes)

    Convert a number of bytes into a number of gigabytes.
   
   :param bytes: Number of bytes
   :rtype: Number of gigabytes

.. function:: bytesToMegabytes(bytes)

    Convert a number of bytes into a number of megabytes.
   
   :param bytes: Number of bytes
   :rtype: Number of megabytes

.. function:: bytesToKilobytes(bytes)

    Convert a number of bytes into a number of kilobytes.
   
   :param bytes: Number of bytes
   :rtype: Number of kilobytes


.. function:: magnitudeOfBytes(bytes)

    Provided the best unit to use (GB or MB) based on the provided number of bytes.
   
   :param bytes: Number of bytes
   :rtype: Unit of size (GB or MB)



.. function:: fetch(src, cb, progress)

    Download a specified file using XHR. The "cb" callback uses two arguments ``function (error, data)`` and is called when the file is downloaded or if an error occurs. The **data** is provided as a Uint8Array.
    
    If provided, the ``progress = function (percent)`` function will be called while downloading the file, based on the native "progress" event of the XHR system. The progress value is a number between 0 and 1.
   
   :param src: URL of the file to download
   :param cb: ``function (error, data)`` to call on error or success
   :param progress: (Optional) ``function (percent)`` called on progress update



.. function:: dataURIToBlob(dataURI)

    Convert a base64 data URI into a Blob javascript object.
   
   :param dataURI: base64 data
   :rtype: Blob




.. function:: throttle (f, ms)

    Englobe the provided **f** function in a wrapper. The new function (wrapper) will call "f" after the given "ms" delay. Each call of the new function will restart the timer to the given "ms".
   
   :param f: Function to call
   :param ms: Delay before calling the function
   :rtype: Function wrapper



.. function:: notAgainForAnother(f, ms)

    Englobe the provided **f** function in a wrapper. The new function (wrapper) will call "f" unless it has already been called in the last "ms" milliseconds. If the function is prevented, the wrapper will return the time remaining before the next possible call.
   
   :param f: Function to call
   :param ms: Minimum delay between each call
   :rtype: Function wrapper



.. function:: createRandomInteger()

    Provided a random integer between 0 and Number.MAX_SAFE_INTEGER (the maximum number guaranteed to be available in JavaScript, "2^53 - 1").
   
   :rtype: Random number



.. function:: noop()

    Empty function
   
   :rtype: Function ``function () {}``



.. function:: once(f, g)

    Englobe the provided **f** function in a wrapper. The new function calls "f" and makes sure it's only called once. When **g** is provided and "f" has already been called, the wrapper will call "g" instead.
   
   :param f: Function to call once
   :param g: (Optional) Function to call after "f"
   :rtype: Function wrapper



.. function:: blobToImage(blob, cb)

    Convert a blob object into a base64 data URI.
   
   :param blob: Blob
   :param cb: Callback ``function (dataURI)``



.. function:: blobURLToImage(url, cb)

    Download the blob located at the given URL and convert it into a base64 data URI.
   
   :param url: Blob to download
   :param cb: Callback ``function (dataURI)``



.. function:: isObject(o)

    Check if the provided element is a plain object (in the JavaScript definition).
   
   :param o: Element to check
   :rtype: Boolean

.. function:: isCircular(o)

    Check if the provided element is a circular object.
    
    NOTE: Circular objects can't be stringified.
   
   :param o: Element to check
   :rtype: Boolean

.. function:: extend(a, b)

    Recursively add the properties of object **b** to object **a**. If an object is in Array (a, b or one of their properties), a shallow copy is made so references to the original items might still be present.
    
    | Example: If "a" and "b" are objects and ``b.item = [{"pew": "pez"}, 2, 3, 4];``, when using extend, ``a.item !== b.item`` but ``a.item[0] === b.item[0]``.
   
   :param a: Object to extend
   :param b: Object to "merge" into "a"

.. function:: isChecked(el)

    Check if the provided "checkbox input" is checked or not. The provided element "el" can be a native DOM element or a jQuery object.
   
   :param el: Element or jQuery object
   :rtype: Boolean


.. function:: hexToRGB(hex)

    Convert an hexadecimal color (with or without '#') into "rgb" decimal values as an array ``[RRR, GGG, BBB]``.
   
   :param hex: Color string
   :rtype: Array


.. function:: isSmallScreen()

    Check if the available screen size represents a "small" screen. Small screens have either their "width" or their "height" smaller than 800px.
   
   :rtype: Boolean


.. function:: stripTags(str)

    Completely remove the HTML tags from the provided string. The text inside those tags is preserved, along with the text outside or any tag.
    
    | Example: ``stripTags("Test <div>pewpew</div> test"); // returns "Test pewpew test"``
   
   :param str: String containing HTML tags
   :rtype: String wihtout HTML tags


.. function:: parseFileName(name)

    Parse a given file name to get an object with its name and its extension separated.

   :param name: File name with its extension (string)
   :rtype: Object {name, ext}



.. function:: isPlainTextFile(type, name)

    Check if a file is a plain text file from its MIME type or its extension.

   :param type: MIME type
   :param name: File name with its extension (string)
   :rtype: Boolean



.. function:: getFirstCharacter(str)

    Return the first character of a given string. This function work with complex unicode characters like emojis.

   :param str: String
   :rtype: First character

