Customization
-------------

.. XXX 🚧 section in progress 🚧

.. this should be consolidated with the customization section of the dev guide (will live in the admin guide with dev pointing here)

.. merge or link: https://docs.cryptpad.fr/en/dev_guide/basics.html#customization

.. Below is from GitHub Wiki

You may have noticed a folder called
```/customize.dist/`` <https://github.com/xwiki-labs/cryptpad/tree/main/customize.dist>`__.
Files in this directory can be overridden by creating a file with an
identical name and path at ``/customize/``. The CryptPad web server will
pick files from the latter first. Editing files will let you change the
look and feel of CryptPad. Please note this is for advanced users only
as it can result in incompatibilities with other code either when you
edit the files or when you update to newer versions of the platform.

One easy place to get started is
```/customize/application_config.js`` <Application-config>`__.
