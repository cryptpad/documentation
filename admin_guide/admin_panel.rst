.. _admin_panel:

Administration panel
====================

A number of monitoring and configuration options are available through the admin panel to administer your instance without needing to open config files on the server.

The admin panel is available to administrator users (see :ref:`admin_adminusers`).

- **User Menu** (avatar at the top right) > |gears| **Administration**
- or go to https://your-instance.com/admin/

This page repeats the comments present on the admin panels and adds a few clarifications.

General
-------

Flush HTTP Cache
~~~~~~~~~~~~~~~~

Force users to download the latest client-side assets (only if your server is in fresh mode).

This includes some configuration changes distributed via ``/api/config``.

Update user quotas
~~~~~~~~~~~~~~~~~~

Forcing an update of user storage limits can be done any time, but is only necessary in the event of an error.

.. _admin_close_registration:

Close registration
~~~~~~~~~~~~~~~~~~

Do not allow any new users to register.

Enable remote embedding
~~~~~~~~~~~~~~~~~~~~~~~

Allow documents and media from this instance to be embedded on other websites. This will add an "Embed" option to the Share menu. For security reasons applications that use OnlyOffice (Sheets, Document, Presentation) cannot be embedded even if this setting is active.

Please note that by enabling this settings, you will need to adapt your Nginx configuration file, adding ``vector:`` to pass :ref:`diagnostic tests <admin_checkup>`.

Mandatory Two-Factor Authentication
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

Tick the box so all users on this instance will be asked to set up two-factor authentication to log in to their account.

.. _admin_email:

Admin contact email
~~~~~~~~~~~~~~~~~~~

This email address is displayed on the instance contact page.

This email may be used by the development team, only if :ref:`admin_consent_contact` is given, to warn of security vulnerabilities or in other cases for example matters affecting public facing instances listed in `the directory <https://cryptpad.org/instances/>`_.

.. _admin_instance_info:

Instance information
~~~~~~~~~~~~~~~~~~~~

The following fields are used to describe the instance in the :ref:`list of public instances <admin_list_public>`:

- Instance name (optional, if no name is provided the instance URL is used)
- Instance description
- Hosting location (country where the instance's encrypted data is hosted)

.. note::

   This information is used on the instance front page.

User Storage
------------

This section is for managing storage limits on the instance.

.. note::

   The values set in the admin panel override the defaults or modifications made to the configuration files.

Storage Limit
~~~~~~~~~~~~~

Maximum storage limit for CryptDrives (users and teams) when no custom rule is applied.

Apply a custom limit
~~~~~~~~~~~~~~~~~~~~

Set custom limits for users by using their public key. You can update or remove an existing limit.

Custom limits
~~~~~~~~~~~~~

List all the custom storage limits applied to your instance.

Database
--------

This section is dedicated for the database management. You will find moderation tools and specific information about the accounts registered.

Account information
~~~~~~~~~~~~~~~~~~~

Enter a user's public key to fetch data about their account.

Document information
~~~~~~~~~~~~~~~~~~~~

Query a document or file via its id or URL

Login-block information
~~~~~~~~~~~~~~~~~~~~~~~

The login block is what allows an account to log in to CryptPad with the combination of username + password

2FA Recovery
~~~~~~~~~~~~

Users can copy recovery data on the 2FA recovery page https://your-instance.com/recovery/ in the "*Forgot recovery code*" section and email it to the instance administrators. Paste recovery data below to disable 2FA for an account

Statistics
----------

-  Launch time: Date and time at which the server was launched
-  Active connections: Number of active websocket connections (and unique IP addresses connected)
-  Active documents: Number of unique documents currently being viewed or edited
-  Open Files: Number of file descriptors currently open on the server
-  Registered users: Number of users registered on your instance
-  Disk usage: Amount of storage space consumed by various CryptPad resources

.. warning::

   The disk usage report can be very resource intensive to run on large instances.

Support
-------

To enable the Support mailbox, please see :ref:`admin_support_mailbox`.

List of tickets sent by users to the support mailbox. All the administrators can see the messages and their answers. A closed ticket cannot be re-opened. You can only remove (hide) closed tickets, and the removed tickets are still visible by other administrators.

-  reply to tickets
-  close tickets
-  remove closed tickets

Broadcast
---------

This section offers different ways of sending notifications to all users on the instance.

Maintenance
~~~~~~~~~~~

Plan a maintenance on this instance and notify all users. Limited to one active maintenance at a given time.

Survey
~~~~~~

Add, update or remove a link to an external survey. Users will receive a notification and the survey will remain available from the user menu.

Broadcast Message
~~~~~~~~~~~~~~~~~

Send a message to all users on this instance. All existing and new users will receive it as a notification. Preview messages before sending them with "Preview notification". Preview notifications have a red icon and are visible only to you.

Performance
-----------

This section is dedicated to available measurments for checking resources consumption.

Performance
~~~~~~~~~~~

An overview of the total time spent executing various server-side commands

Measure disk performance
~~~~~~~~~~~~~~~~~~~~~~~~

If enabled, a JSON API endpoint will be exposed under /api/profiling. This keeps a running measurement of disk I/O within the time window set below. This setting can impact server performance and may reveal sensitive data. It is recommended that you leave this setting disabled unless you know what you are doing. 

Disk performance measurement window
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

If you have enabled disk performance measurements then the duration of the window can be configured below.

Network
--------

.. _admin_checkup:

Validate instance configuration
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

CryptPad includes a page which automatically diagnoses common configuration issues and suggests how to correct them if necessary. To visit the page use the **Run Diagnostics** button or visit ``https://your.instance/checkup/``.

The rest of this section includes options about how you and your instance communicate, or not, with the CryptPad development team.

.. _admin_telemetry_optout:

Server telemetry
~~~~~~~~~~~~~~~~

**Opt-out** of daily messages sent from the instance to the development team's server. The purpose of these messages is to count how many third-party instances of CryptPad are in operation and which version of the software they are running. The full content of the messages can be reviewed in CryptPad's server logs.

Statistical aggregation
~~~~~~~~~~~~~~~~~~~~~~~

You may opt-in to providing additional usage metrics to the developers, such as the approximate number of registered and daily users for your instance.

.. _admin_list_public:

List my instance in public directories
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

**Opt-in** to have the instance included in the `list of public instances <https://cryptpad.org/instances/>`_ on `the CryptPad project site <https://cryptpad.org>`_ if it is intended for public use. We add public instances to our `uptime monitoring <https://uptime.cryptpad.org/status/public-instances>`_ and encourage administrators to follow updates.

In addition to this setting being enabled, the following criteria are required in order to have an instance listed:

- All :ref:`diagnostic tests <admin_checkup>` must pass
- Must not use a domain such as cryptpad.TLD as they imply a relationship with the development team and copyright holder (XWiki SAS), please use a subdomain instead
- The version of CryptPad must be up to date within 90 days of `the latest release <https://github.com/cryptpad/cryptpad/releases>`_
- Instance information must be provided in the :ref:`General tab <admin_instance_info>`
- :ref:`admin_telemetry_optout` must be enabled
- Absence of analytics and third-party trackers
- Reasonable uptime, ±99% average availability on the previous 30 days
- A working backup strategy is in place and has been tested
- At least one other person must have access to the infrastructure
- Commitment to give users at least 6 months of advance warning in case of shutting down

.. note::

   The `list of public instances <https://cryptpad.org/instances/>`_ is considered an extension of the CryptPad community. As such, the development team reserves the right to remove instances from the list if their administrators or the groups they represent are in breach of the `Code of Conduct <https://github.com/cryptpad/cryptpad/blob/main/CODE_OF_CONDUCT.md>`_ or for any other reason at their own discretion.

.. _admin_consent_contact:

Consent to contact
~~~~~~~~~~~~~~~~~~

**Opt-in** to allow the development team to contact the :ref:`admin_email` with notifications of serious problems with the software or the instance  configuration. Administrator emails are never shared, sold, or used for marketing purposes.

Crowdfunding participation
~~~~~~~~~~~~~~~~~~~~~~~~~~

**Opt-out** of advertizing CryptPad's crowdfunding campaign on the instance.

Instance purpose
~~~~~~~~~~~~~~~~

Indicate the purpose of the instance, this is used to inform the development roadmap.

.. note::
   Instance purpose is only sent to the development team if :ref:`admin_telemetry_optout` is enabled
