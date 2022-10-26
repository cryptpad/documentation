Installation
============

This guide is about installing a public CryptPad instance available on the internet. For instructions about installing and running a local development instance please see the :ref:`dev_guide`.

The development team is available to provide paid support contracts (see our `organizational plans <https://cryptpad.fr/accounts/#org>`__ for an idea of our pricing), otherwise, requests for assistance can be directed to the community in our `forum <https://forum.cryptpad.org>`_ or `admins Matrix channel <https://matrix.to/#/#cryptpad-admins:matrix.xwiki.com>`_.

Prerequisites
-------------

Domains
~~~~~~~

2 domains or subdomains are needed to take full advantage of CryptPad’s security features. Please see the :ref:`domains <admin_domain_config>` section below for more details.

Hardware
~~~~~~~~

The development team uses and recommends the following hardware requirements as a minimum on the host machine:

-  Debian 11
-  2GB RAM
-  2 CPUs
-  20GB storage (depending on planned usage)

.. warning::
   CryptPad is engineered to maximise privacy, and to minimize the amount of useful information that can be gained even if the host machine is compromised. However it is up to the administrator(s) to ensure that the host machine is secure. The instructions for this are beyond the scope of this guide but best practices include:

   - Disabling password-based SSH access
   - Updating the operating system regularly with any security patches
   - Limiting the number of people who have server access
   - Avoiding insecure applications running in parallel on the same host
   - Updating CryptPad itself regularly

Software
~~~~~~~~

Before starting the installation, ensure the following software is installed:

-  GIT
-  nodejs (we use node v12.14.0)
   -  Using `NVM <https://github.com/nvm-sh/nvm#installing-and-updating>`__ is recommended
-  npm
-  bower
   -  Installed with ``npm install -g bower``

Install Cryptpad
----------------

.. note::
   The development team recommends creating a dedicated user to install and run CryptPad in production rather than using the root user.

Clone the CryptPad repository

.. code:: bash

   git clone https://github.com/xwiki-labs/cryptpad.git cryptpad

Switch to the latest published tag

.. code:: bash

   git checkout $(git tag -l | grep -v 'v1.*$' | sort -V | tail -n 1)

Dependencies
~~~~~~~~~~~~

.. code:: bash

   cd cryptpad
   npm install
   bower install

Configuration
~~~~~~~~~~~~~

Copy the example configuration

.. code:: bash

   cd cryptpad/config
   cp config.example.js config.js

Please read the configuration file, and modify variables as needed. The :ref:`domains <admin_domain_config>` are particularly important.

The server can now be started with

.. code:: bash

   cd cryptpad
   node server

The instance is now ready to run but cannot yet be accessed from the internet.

Daemonization
~~~~~~~~~~~~~

In production you may want to run CryptPad as a daemon that restarts automatically.

Systemd
^^^^^^^

To run CryptPad as a `systemd <https://www.freedesktop.org/software/systemd/man/systemd.service.html>`__ service, please follow the example `cryptpad.service <https://github.com/xwiki-labs/cryptpad/blob/main/docs/cryptpad.service>`__ file.

#.  Save the example as ``cryptpad.service`` in ``/etc/systemd/system/``
#.  Make necessary adjustments (e.g. user name, path, nodejs version)
#.  Enable the service at startup with ``systemctl enable cryptpad``.

Other ways of daemonizing nodejs applications include for example `foreverjs <https://github.com/foreversd/forever>`_ or `pm2 <https://pm2.keymetrics.io/>`_.

.. _admin_domain_config:

Domains
-------

You need two domains to take full advantage of CryptPad’s security features.

1. The main domain on which users access your instance
2. A “sandbox” domain or subdomain to which a set of restrictive Content-Security Policy headers are applied

The intent of this system is to limit the risk of Cross-Site Scripting (XSS) vulnerabilities allowing attackers to leak user data. Sensitive computation (like the processing of cryptographic keys) is handled on the main domain, while the user-interface is implemented on the sandbox domain.

The `example Nginx configuration <https://github.com/xwiki-labs/cryptpad/blob/main/docs/example.nginx.conf>`__ file includes the relevant headers to enable the sandboxing system, however, you must configure your instance correctly for it to be effective. You will need:

1. two domains or subdomains
2. to include both domains in ``cryptpad/config/config.js`` as described in :ref:`admin_cryptpad_config`
3. to generate one SSL certificate that covers both domains. The development team uses `acme.sh <https://acme.sh/>`__ and this is reflected in the example config.
4. to correctly assign both domains and certificates to the relevant variables in the `example Nginx configuration <https://github.com/xwiki-labs/cryptpad/blob/main/docs/example.nginx.conf>`__

.. warning::

   Using CryptPad in production without the sandboxing system may put users’ information at risk.

   The development team is not aware of any third-party configurations (Apache, HAProxy, Lighttpd) that correctly implement the recommended settings. Use them at your own (and your users’) risk!

Install and configure Nginx
---------------------------

CryptPad’s application server handles active connections via websocket and serves static assets (HTML, Javascript, CSS, etc.). This basic configuration is designed to be very easy to configure for local development, but it does not protect traffic with SSL or handle many concurrent users very well.

In a production environment, the development team recommends `Nginx <https://docs.nginx.com/nginx/admin-guide/installing-nginx/installing-nginx-open-source/>`__ for the following reasons:

1. Protect traffic with SSL (so your users can reach your instance via HTTPS)
2. Scale to many more users by serving static content with a more scalable web-server instead of the single-threaded NodeJS web-server that is built-in
3. Allow the application server to focus exclusively on handling websocket connections

.. warning::

   CryptPad cannot run in a subfolder. Make sure you configure your server to access it through the root domain or a subdomain.

Note that the version of Nginx distributed by your operating system may not support websockets. The recommended minimum version to serve CryptPad is ``1.10.3``.

To configure Nginx for CryptPad:

1. Copy the `CryptPad example Nginx config file <https://github.com/xwiki-labs/cryptpad/blob/main/docs/example.nginx.conf>`__ so that it is used/imported by the main Nginx config, for example by placing it in ``/etc/nginx/conf.d/cryptpad.conf``.
2. Edit the configuration file with the correct domains and paths to certificates.
3. Run ``openssl dhparam -out /etc/nginx/dhparam.pem 4096`` if you haven’t done so already on the host machine.

Static assets and pages such as ``https://cryptpad.yourdomain.com/index.html`` should now be accessible at the main domain.

.. _admin_cryptpad_config:

Configure CryptPad
------------------

To finalise the installation, ensure ``cryptpad/config/config.js``
contains at least:

-  The correct domains:

   -  The main domain in place of:

      .. code:: javascript

         httpUnsafeOrigin: 'http://localhost:3000',

   -  The Sandbox domain in place of:

      .. code:: javascript

         httpSafeOrigin: "https://some-other-domain.xyz",

-  An administrator email (appears on the Contact page) in place of:

.. code:: javascript

   adminEmail: 'i.did.not.read.my.config@cryptpad.fr',

Diagnostics
~~~~~~~~~~~

CryptPad provides a diagnostics page that runs instance configuration tests. Visit ``https://cryptpad.yourdomain.com/checkup/`` after completing all of the steps above to ensure everything is correctly configured.

.. _admin_adminusers:

Configure administrators
~~~~~~~~~~~~~~~~~~~~~~~~

Once CryptPad is installed, create an account via the Register button on the home page. To make this account an instance administrator:

1. Copy their public key found in **User Menu** (avatar at the top right) > **Settings** > **Account** > **Public Signing Key**
2. Paste this key in ``cryptpad/config/config.js`` in the following array (uncomment and replace the placeholder):

.. code:: javascript

   adminKeys: [
           "[cryptpad-user1@my.awesome.website/YZgXQxKR0Rcb6r6CmxHPdAGLVludrAF2lEnkbx1vVOo=]",
   ],

3. Restart CryptPad

.. _admin_support_mailbox:

Configure support mailbox
~~~~~~~~~~~~~~~~~~~~~~~~~

Version 4.6.0 and later
^^^^^^^^^^^^^^^^^^^^^^^

Since version 4.6 the support mailbox can be configured from the :ref:`admin_panel`.

#. With an instance administrator account, visit the ``/admin/#support`` page
#. Click **Generate Support Keys**
#. The support mailbox is now active
#. Flush the cache to access the mailbox:  **General** tab > **Flush HTTP Cache**

To allow other administrators to access the support mailbox:

#. Copy the key at the bottom of the support page
#. Send it to another administrator account
#. They can use the **Add private key** field on the support page to gain access to the support mailbox

.. note::
   If the support mailbox is configured through the admin panel, any configuration using the old method detailed below is ignored.


Versions older than 4.6.0
^^^^^^^^^^^^^^^^^^^^^^^^^^

To enable the encrypted support ticket system, use the ``generate-admin-key.js`` script:

#. ``node ./scripts/generate-admin-keys.js``
#. Add the **public key** into the ``supportMailboxPublicKey`` field of the configuration file ``cryptpad/config/config.js``
#.  Copy the **private key** in the support section of the control panel (after setting up an administrator account). This private key is the same for all administrator accounts that want to access support.


Once the steps above are complete, many day-to-day administration tasks such as support and monitoring can be done in the :ref:`administration panel <admin_panel>`.

.. _configure_open_graph:

Configure Open Graph metadata
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

To enable social media link previews, add Open Graph tags to the applications of your CryptPad instance with the following command:

.. code:: bash

    npm run make-opengraph

This creates an ``index.html`` page for each application in the ``customize/www`` directory. It is **not recommended to perform manual modifications on these pages** as they will be overridden the next time ``npm run make-opengraph`` is run.

To modify the preview images please see :ref:`preview_images`

.. note::
    Updating to a newer version of the software in the future without re-running this command may result in outdated code.

.. Support
.. ~~~~~~~~~
.. XXX TODO pargraph about support for diverging configurations

.. > About commercial support, what to expect from community, etc.

