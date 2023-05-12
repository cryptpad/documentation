Support
=======

.. _support:

Support tickets provide a secure communication channel with the administrators of the CryptPad instance. The **Support** page is accessible through:

-  User menu (avatar at the top-right) > |life-ring| **Support**.

The support page is separated into 3 tabs:

- |envelope-o| :ref:`Existing tickets <support_existing>`
- |life-ring| :ref:`New ticket <support_new>`
- |wrench| :ref:`Debug data <support_debug>`

.. _support_debug:

Debug data
----------

It shows you the information included in the support tickets you submit. Like everything else, it's all encrypted and only your instance administrators will be able to access this data. Note that doesn't give access to any of your documents.

.. code-block:: json

   {
      "name": "Louise Michel",
      "accountName": "louise",
      "drive": "59bf50e995e3e4c1521b68714c90d0da",
      "channel": "450969c6f83219801fc4d564317d2b4c",
      "curvePublic": "X3vctTSzpzXiGXTZAH3ZZyGPRQ6XSkP1bL+gpTXd1hc=",
      "edPublic": "iet4Bjei1m0m6xPxEn18Z+x/MBwVVy/EDoZi/qLNx9s=",
      "notifications": "b8a8601db2daf07a0e6990e9e24492b0",
      "quota": {
         "usage": 20495042,
         "limit": 1073741824,
         "plan": ""
      },
      "userAgent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:109.0) Gecko/20100101 Firefox/112.0",
      "vendor": "",
      "appVersion": "5.0 (Macintosh)",
      "screenWidth": 1470,
      "screenHeight": 956,
      "blockLocation": "https://files.cryptpad.fr/block/cs/csbVlBNtg50Lm1elgBkmQsOBXmu7MT38KzSt2ru1OXM=",
      "teams": []
   }

Here is the detailed list of the data shared and its purpose:

Names
~~~~~

The current name and username you specified for your account.

Identifiers
~~~~~~~~~~~

Drive, channel and notification unique identifiers.

Keys
~~~~

Public curve & key used for encryption.

Quota
~~~~~

Your total storage, how much is currently taken and the subscription if you have one.

Web browser
~~~~~~~~~~~

User agent, vendor & appVersion let us know what web browser you are using and which version.

Screen
~~~~~~

Width & height, allows us understand the kind of device you are using.

Block location
~~~~~~~~~~~~~~

To verify your credentials exists on the server in case of login issue.

Teams
~~~~~

List the teams you are member off and some information about them.

.. _support_new:

New ticket
----------

You can create a new ticket by selecting a category, type in a subject and your request. Note that your instance administrator languages are shown at the top of the page. In case of need don't hesitate to use an online translation system.

After selecting the category, some guidelines are shown. You'll learn what type of information your instance administrators will likely require to be able to help you.

- User account
- Drive or team
- Document
- Report abuse
- Bug report
- Other

After typing your request and sending your ticket you are taken back to the existing tickets tab.

.. _support_existing:

Existing tickets
----------------

It's where you can read the response from your instance administrators to the tickets you created. If needed, you can add more information to your first message by clicking the REPLY blue button. Note that you can add attachments to your message, like a screenshot for example.

When receiving a response to a ticket, a :ref:`notification <user_settings_notifications>` is sent to your account, visible in the bell at the top right.

If your request has been fulfilled you can close the ticket. Or just wait for them to acknowledge your last message and close it themselves. When the ticket is closed it still appears in your existing tickets list. If you want, you can use the red button at the end to remove it.



