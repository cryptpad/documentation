.. _admin_customization:

Instance customization
======================

The functionality as well as the look-and-feel of an instance can be customized by creating a ``customize`` folder and copying assets to be customized (images, stylesheets, page templates, etc) from ``customize.dist`` into it. If a file exists in ``customize``, it will be served to users instead of its namesake in ``customize.dist``.

.. note::

    The purpose of the ``customize`` directory is to make it easier to upgrade CryptPad while maintaining customizations in place. Occasionally, a major new version may introduce breaking changes or require adjustments in the customizations. Administrators with customized instances are therefore encouraged to **read instructions carefully before each upgrade**.


Application config
------------------

A wide range of settings are available in ``www/common/application_config_internal.js``. To modify them:

#. Make a copy of ``customize.dist/application_config.js`` in the ``customize`` folder.
#. Copy the default value(s) to modify from ``www/common/application_config_internal.js`` into ``customize/application_config.js``.

Restricting guest access
~~~~~~~~~~~~~~~~~~~~~~~~

To disable unregistered use of CryptPad, add the following to ``customize/application_config.js``:

.. code:: javaScript

    AppConfig.registeredOnlyTypes = AppConfig.availablePadTypes;

.. note::

    To close registration of new users on the instance, see :ref:`admin_close_registration` in the admin panel.

Links to Terms of Service, Privacy Policy and Imprint pages
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

Links to these pages are added to ``customize/application_config.js`` and are shown on the instance home page and About menu if provided.

.. code:: javaScript

    // Privacy Policy
    AppConfig.privacy = 'https://link-to-policy.com';
    // Terms of Service
    AppConfig.terms = 'https://link-to-ToS.com';
    // Imprint / Legal Notice
    AppConfig.imprint = 'https://link-to-imprint.com';

Please restart your CryptPad instance after making these changes.

Security Hardening
~~~~~~~~~~~~~~~~~~

It is strongly recommended to set in ``customize/application_config.js`` a randomly chosen string as a salt for the password hashing.
This makes it such attackers who want to bruteforce common credentials must do so again on each CryptPad instance that they wish to attack.

.. warning::
    The ``loginSalt`` should only be set when your CryptPad instance is first created.
    **Changing it at a later time will break logins for all existing users.**

For this, insert your chosen string in the following line:

.. code:: javaScript

    AppConfig.loginSalt = '';

You may further want to increase the minimum password length.
For this, modify the following line:

.. code:: javaScript

    AppConfig.minimumPasswordLength = 8;

Dark theme switch
~~~~~~~~~~~~~~~~~

You can enforce the use of the dark theme on your instance by setting the ``AppConfig.defaultDarkTheme`` variable to true in ``customize/application_config.js``:

.. code:: javaScript

    AppConfig.defaultDarkTheme = 'true';

Look and feel
-------------
Many aspects of CryptPad's interface can be customized by copying files from ``customize.dist`` to your ``customize`` directory.

For example to change colors, copy the LESS color themes ``colortheme.less`` and ``colortheme-dark.less`` from ``customize.dist/src/less2/include/`` to ``customize/src/less2/include/`` and edit the color values.

To use a custom logo on the instance's homepage:

#. Add your SVG logo to ``customize``
#. Rename the logo ``CryptPad_logo_hero.svg``

Files you may be interested in:

- ``index.html`` is the main page
- ``main.js`` contains javascript for the home page
- ``application_config.js`` allows you to modify settings used by the various applications
- ``messages.js`` contains functions for applying translations to various pages
- look inside ``/translations/`` for the rest of the files which contain translated strings
- ``/share/`` implements an iframe RPC which allows multiple domains to access the same localStorage
- ``/src/`` contains source files for html and css (in the form of html templates and .less stylesheets)

All other content which is placed in this directory will be referencable at the ``/customize/``
URL location.

.. _preview_images:

Open Graph preview images
~~~~~~~~~~~~~~~~~~~~~~~~~

Previews when links from the instance are posted to social media include images, these are located in ``/customize.dist/images/opengraph_preview/``. Once :ref:`Open Graph tags have been set up <configure_open_graph>`, the images can be customized by placing modified copies in ``/customize/images/opengraph_preview/`` just like any other image.

Translations
------------

To customize the text of the CryptPad interface in a given language, copy ``customize.dist/translations/messages.xx.js`` to ``customize/translations/messages.xx.js`` where ``xx`` is the locale of the language (use ``messages.js`` to customize English).

In this file, modify the default text using the "Messages" object as follows: ``Messages.key = "Text";``. For all the keys and their associated text please see `www/common/translations/messages.json <https://github.com/cryptpad/cryptpad/blob/main/www/common/translations/messages.json>`__ or any of the ``messages.xx.json`` in the same directory for the translated text.

For example, to customize the text about the instance on the home page, the following could be pasted in ``customize/translations/messages.js`` and the text changed to describe the instance.

.. code:: javaScript

    Messages.home_host = "This is an independent community instance of CryptPad.";

For more information on how translations work in CryptPad please see :ref:`dev_translations` in the developer guide.
