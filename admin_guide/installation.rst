Installation
============

This guide is about installing a public CryptPad instance available on the internet. For instructions about installing and running a local development instance please see the :ref:`dev_guide`.

Prerequisites
-------------

Domains
~~~~~~~

2 domains or subdomains are needed to take full advantage of CryptPad’s security features. Please see the :ref:`domains <admin_domain_config>` section below for more details.

Hardware
~~~~~~~~

The development team uses and recommends the following hardware requirements as a minimum on the host machine:

-  Debian 12
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

-  Nodejs with NPM included (we use the official NodeJs LTS release)

   -  Using `nodesource <https://github.com/nodesource/distributions#using-debian-as-root-4>`__ is recommended


- Docker engine (if using Docker, see :ref:`Install with Docker <admin_docker_install>`)

   - See `the official Docker installation guide <https://docs.docker.com/engine/install/debian/>`__


Install Cryptpad
----------------

.. _admin_recommended_install:

Recommended
~~~~~~~~~~~

.. note::
   The development team recommends creating a dedicated user to install and run CryptPad in production rather than using the root user.

Clone the CryptPad repository

.. code:: bash

   git clone https://github.com/cryptpad/cryptpad.git cryptpad

Switch to the latest published tag

.. code:: bash

   git checkout $(git tag -l | grep -v 'v1.*$' | sort -V | tail -n 1)

Dependencies
""""""""""""

.. code:: bash

   cd cryptpad
   npm ci
   npm run install:components

Configuration
"""""""""""""

Copy the example configuration

.. code:: bash

   cd cryptpad/config
   cp config.example.js config.js

Please read the configuration file, and modify variables as needed. The :ref:`domains <admin_domain_config>` are particularly important.

As part of the installation process, be sure to read :ref:`admin_customization` and to modify ``customize/application_config.js`` as some settings cannot be changed once user accounts have been created.

The server can now be started with

.. code:: bash

   cd cryptpad
   node server

The instance is now ready to run but cannot yet be accessed from the internet.

Daemonization
"""""""""""""

In production you may want to run CryptPad as a daemon that restarts automatically.

Systemd
"""""""

To run CryptPad as a `systemd <https://www.freedesktop.org/software/systemd/man/systemd.service.html>`__ service, please follow the example `cryptpad.service <https://github.com/cryptpad/cryptpad/blob/main/docs/cryptpad.service>`__ file.

#.  Save the example as ``cryptpad.service`` in ``/etc/systemd/system/``
#.  Make necessary adjustments (e.g. user name, path, nodejs version)
#.  Enable the service at startup with ``systemctl enable cryptpad``.

Other ways of daemonizing nodejs applications include for example `foreverjs <https://github.com/foreversd/forever>`_ or `pm2 <https://pm2.keymetrics.io/>`_.

FreeBSD
"""""""

To run CryptPad as a `rc.d <https://man.freebsd.org/cgi/man.cgi?query=rc.d&sektion=8&n=1>`__ unit, please follow the example `rc.d-cryptpad <https://github.com/cryptpad/cryptpad/blob/main/docs/rc.d-cryptpad>`__ file.

#. Save the example as ``cryptpad`` in ``/usr/local/etc/rc.d/``
#. Make necessary adjustments (e.g. user name, path)
#. Enable the service at startup with ``service cryptpad enable``

.. _admin_docker_install:

Docker
~~~~~~

While we still prefer :ref:`the recommended installation method <admin_recommended_install>`, Docker is now officially supported.

We provide the following files in the CryptPad repository:

- ``.dockerignore`` is useful to remove parts of the repository from the image (avoid making it use too much storage)
- ``Dockerfile`` is used to build the Docker image itself
- ``docker-entrypoint.sh`` allows to configure a few things (domain names and build static assets)
- ``docker-compose.yml`` used to create a container using the image and keep it running


#. Build your own Docker image

   .. code:: docker

      docker build -t cryptpad/cryptpad:version-5.5.0 .

#. Modify ``docker-compose.yml`` with your own values

   - ``CPAD_MAIN_DOMAIN``
   - ``CPAD_SANDBOX_DOMAIN``

#. Set appropriate permissions

   .. code:: bash

      sudo chown -R 4001:4001 data customize

#. Run the container with Docker Compose

   .. code:: docker

      docker compose up -d

.. _admin_domain_config:

Domains
-------

You need two domains to take full advantage of CryptPad’s security features.

1. The main domain on which users access your instance
2. A “sandbox” domain or subdomain to which a set of restrictive Content-Security Policy headers are applied

The intent of this system is to limit the risk of Cross-Site Scripting (XSS) vulnerabilities allowing attackers to leak user data. Sensitive computation (like the processing of cryptographic keys) is handled on the main domain, while the user-interface is implemented on the sandbox domain.

The `example Nginx configuration <https://github.com/cryptpad/cryptpad/blob/main/docs/example.nginx.conf>`__ file includes the relevant entries to enable the sandboxing system, however, you must configure your instance correctly for it to be effective. You will need:

1. two domains or subdomains
2. to include both domains in ``cryptpad/config/config.js`` as described in :ref:`admin_cryptpad_config`
3. to generate one TLS certificate that covers both domains. The development team uses `acme.sh <https://acme.sh/>`__ and this is reflected in the example config.
4. to correctly assign both domains and certificates to the `example Nginx configuration <https://github.com/cryptpad/cryptpad/blob/main/docs/example.nginx.conf>`__

.. warning::

   Using CryptPad in production without the sandboxing system may put users’ information at risk.

Install and configure Nginx
---------------------------

CryptPad’s application server handles active connections via websocket and serves static assets (HTML, Javascript, CSS, etc.). This basic configuration is designed to be very easy to configure for small to midsize instances (up to 3000 concurrent users). In a production environment, the development team recommends `Nginx <https://nginx.org/en/linux_packages.html#Debian>`__ with our `advanced example configuration <https://github.com/cryptpad/cryptpad/blob/main/docs/example-advanced.nginx.conf>`__ for the following reasons:

1. Scale to many more users by serving static content with a more scalable web-server instead of the single-threaded NodeJS web-server that is built-in
2. Allow the application server to focus exclusively on handling websocket connections

.. warning::

   CryptPad cannot run in a subfolder. Make sure you configure your server to access it through the root domain or a subdomain.

Note that the version of Nginx distributed by your operating system may not support websockets. We recommend and only support `Nginx stable <https://nginx.org/en/download.html>`__.

To configure Nginx for CryptPad:

1. Copy the example config file so that it is used/imported by the main Nginx config, for example by placing it in ``/etc/nginx/conf.d/cryptpad.conf``

   - `Basic example <https://github.com/cryptpad/cryptpad/blob/main/docs/example.nginx.conf>`__ for small and midsize instances, where everything is processed by NodeJS
   - `Advanced example <https://github.com/cryptpad/cryptpad/blob/main/docs/example-advanced.nginx.conf>`__ for big instances, where Nginx handle static content and only websocket connections are processed by NodeJS

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

The support mailbox can be configured from the :ref:`admin_panel`.

#. With an instance administrator account, visit the ``/admin/#support`` page
#. ``Click`` **Generate Support Keys**
#. The support mailbox is now active
#. Flush the cache to access the mailbox:  **General** tab > **Flush HTTP Cache**

To allow other administrators to access the support mailbox:

#. Copy the key at the bottom of the support page
#. Send it to another administrator account
#. They can use the **Add private key** field on the support page to gain access to the support mailbox

.. _configure_open_graph:

Build static pages & Open Graph metadata
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

To build some of CryptPad static pages & enable social media link previews, run the following command:

.. code:: bash

    npm run build

This creates an ``index.html`` page for each application in the ``customize/www`` directory. It is **not recommended to perform manual modifications on these pages** as they will be overridden the next time ``npm run build`` is run.

To modify the preview images please see :ref:`preview_images`

.. note::
    Updating to a newer version of the software in the future without re-running this command may result in outdated code.

Support
~~~~~~~

.. XXX DB: rewrite:
..    mention of org plans as reference is weird
..    link instance pricing page on .org when it is ready

The development team is available to provide paid support contracts (see our `organizational plans <https://cryptpad.fr/accounts/#org>`__ for an idea of our pricing), otherwise, requests for assistance can be directed to the community.

We recommend you to go over our `forum <https://forum.cryptpad.org>`_ and or `admins Matrix channel <https://matrix.to/#/#cryptpad-admins:matrix.xwiki.com>`_.

Note that community support is provided by volunteers, please be aware of what you are asking of them and respect `our Code of Conduct <https://github.com/cryptpad/cryptpad/blob/main/CODE_OF_CONDUCT.md>`_ at all time.
