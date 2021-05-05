
.. _admin_customization:

Instance customization
=======================

The functionality as well as the look-and-feel of an instance can be customized by creating a ``customize`` folder and copying assets to be customized (images, stylesheets, page templates, etc) from ``customize.dist`` into it. If a file exists in ``customize``, it will be served to users instead of its namesake in ``customize.dist``.

.. warning::

    The purpose of the ``customize`` directory is to make it easier to upgrade CryptPad while maintaining customizations in place. Occasionally, a major new version may introduce breaking changes or require adjustments in the customizations. Administrators with customized instances are therefore encouraged to **read instructions carefully before each upgrade**.


Application config
------------------

A wide range of settings are available in ``www/common/application_config_internal.js``. To modify them:

#. Make a copy of ``customize.dist/application_config.js`` in the ``customize`` folder.
#. Copy the default value(s) to modify from ``www/common/application_config_internal.js`` into ``customize/application_config.js``.


Restricting guest access
~~~~~~~~~~~~~~~~~~~~~~~~~

To disable unregistered use of CryptPad, add the following to ``customize/application_config.js``:

.. code:: javaScript

    AppConfig.registeredOnlyTypes = AppConfig.availablePadTypes;

.. note::

    To close registration of new users on the instance, see :ref:`admin_close_registration`

Look and feel
-------------

To add a custom logo to the instance's homepage:

#. Add the new logo to ``customize``
#. Copy ``customize.dist/pages/index.js`` to ``customize/pages/index.js``
#. In the copy, replace the image `on this line <https://github.com/xwiki-labs/cryptpad/blob/980a2369007a3b6eeb4de105bfcf1cf13e3444ec/customize.dist/pages/index.js#L147>`_ with your custom logo.

Many other aspects of CryptPad's interface can be customized, for example the LESS color themes ``colortheme.less`` and ``colortheme-dark.less`` in  ``customize.dist/src/less2/include/``. As with all other elements, make a copy in ``customize`` and edit the values to override the defaults.


Translations
-------------

To customize the text of the CryptPad interface in a given language, copy ``customize.dist/messages.xx.js`` to ``customize/translations/messages.xx.js`` where ``xx`` is the locale of the language (use ``messages.js`` to customize English).

In this file, modify the default text using the "Messages" object as follows: ``Messages.key = "Text";``. For all the keys and their associated text please see `www/common/translations/messages.json <https://github.com/xwiki-labs/cryptpad/blob/main/www/common/translations/messages.json>`__ or any of the ``messages.xx.json`` in the same directory for the translated text.

For example, to customize the text about the instance on the home page, the following could be pasted in ``customize/translations/messages.js`` and the text changed to describe the instance.

.. code:: javaScript

    Messages.home_host = "This is an independent community instance of CryptPad.";

For more information on how translations work in CryptPad please see :ref:`dev_translations` in the developer guide.

