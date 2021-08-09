
.. _admin_panel:

Administration panel
====================

A number of monitoring and configuration options are available through
the admin panel to administer your instance without needing to open
config files on the server.

The admin panel is available to administrator users (see :ref:`admin_adminusers`).

- **User Menu** (avatar at the top right) > |gears| **Administration**

- or go to https://your-instance.com/admin/

This page repeats the comments present on the admin panels and adds a few clarifications.

General
-------

Flush HTTP Cache
~~~~~~~~~~~~~~~~

Force users to download the latest clientside assets (only if your server is in fresh mode)

This includes some configuration changes distributed via ``/api/config``.

Update user quotas
~~~~~~~~~~~~~~~~~~

Forcing an update of user storage limits can be done any time, but is only necessary in the event of an error

Archive documents
~~~~~~~~~~~~~~~~~

Make a document unavailable without deleting it permanently. It will be placed in an ‘archive’ directory and deleted after a few days (configurable in the server configuration file).

Make a document unavailable, for example for moderation in the case where a document with innapropriate/illegal content is reported.

Restore documents
~~~~~~~~~~~~~~~~~

Restore a document that had previously been archived

.. _admin_close_registration:

Close registration
~~~~~~~~~~~~~~~~~~

Do not allow any new users to register

User Storage
------------

This section is for managing storage limits on the instance.

.. note::

   The values set in the admin panel override the defaults or modifications made to the configuration files.


Storage Limit
~~~~~~~~~~~~~

Maximum storage limit for CryptDrives (users and teams) when no custom rule is applied


Apply a custom limit
~~~~~~~~~~~~~~~~~~~~

Set custom limits for users by using their public key. You can update or remove an existing limit.

Check account storage
~~~~~~~~~~~~~~~~~~~~~

Check the total size of items counted against a user or team’s quota given their public key.

List of custom limits
~~~~~~~~~~~~~~~~~~~~~

List all the custom storage limits applied to your instance.

Statistics
----------

-  Active connections: Number of active websocket connections (and
   unique IP addresses connected)

-  Active pads: Number of unique documents currently being viewed or
   edited

-  Open Files: Number of file descriptors currently open on the server

-  Registered users: Number of users registered on your instance

-  Disk usage: Amount of storage space consumed by various CryptPad
   resources

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

An overview of the total time spent executing various server-side commands


Network
--------

:badge_new:`New in version 4.7`

**Validate instance configuration**: CryptPad includes a page which automatically diagnoses common configuration issues and suggests how to correct them if necessary. To visit the page use the **Run Diagnostics** button or visit ``https://your.instance/checkup/``.

The rest of this section includes options about how you and your instance communicate, or not, with the CryptPad development team. This includes:

- Server telemetry
- Listing the instance in public directories
- Consent to be contacted about security updates
- Promotion of the crowdfunding campaign

For more details visit ``https://your.instance/admin/#network``


