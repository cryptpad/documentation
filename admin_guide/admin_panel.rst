
.. _admin_panel:

Administration panel
====================

A number of monitoring and configuration options are available through
the admin panel to administer your instance without needing to open
config files on the server.

The admin interface is available through:

https://your-instance.com/admin/

.. XXX [link to where to set this up]

or with an administrator user

-  **User Menu** (avatar at the top right) > **Administration**

General
-------

Flush HTTP Cache
~~~~~~~~~~~~~~~~

.. XXX  <!-- this includes some configuration changes distributed via /api/config -->

   Force users to download the latest clientside assets (only if your
   server is in fresh mode)

Update user quotas
~~~~~~~~~~~~~~~~~~

   Forcing an update of user storage limits can be done any time, but is
   only necessary in the event of an error

Archive documents
~~~~~~~~~~~~~~~~~

   Make a document unavailable without deleting it permanently. It will
   be placed in an ‘archive’ directory and deleted after a few days
   (configurable in the server configuration file).

Make a document unavailable, for example for moderation in the case
where a document with innapropriate/illegal content is reported.

Restore documents
~~~~~~~~~~~~~~~~~

   Restore a document that had previously been archived

User Storage
------------

This section is for managing storage limits on the instance.

.. XXX relationship with the limit set in config? <!-- overrides it on a per-user basis. we should remove configuration of customLimits from the example config... -->

Storage Limit
~~~~~~~~~~~~~

   Maximum storage limit for CryptDrives (users and teams) when no
   custom rule is applied

.. XXX  <!-- this and other values below also override whatever is in the config -->

Apply a custom limit
~~~~~~~~~~~~~~~~~~~~

.. XXX <!-- override -->

   Set custom limits for users by using their public key. You can update
   or remove an existing limit.

Check account storage
~~~~~~~~~~~~~~~~~~~~~

   Check the total size of items counted against a user or team’s quota
   given their public key.

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

.. XXX <!-- can be very expensive to run this on a large instance -->

Disk usage report
~~~~~~~~~~~~~~~~~

Support
-------

.. XXX [link to how to set up the support mailbox]

   Here is the list of tickets sent by users to the support mailbox. All
   the administrators can see the messages and their answers. A closed
   ticket cannot be re-opened. You can only remove (hide) closed
   tickets, and the removed tickets are still visible by other
   administrators.

-  reply to tickets
-  close tickets
-  remove closed tickets

   -  note about how the oldest ticket dictates what gets loaded so if
      you have a lot of tickets make sure to remove the oldest ones

Broadcast
---------

Maintenance
~~~~~~~~~~~

Survey
~~~~~~

Broadcast Message
~~~~~~~~~~~~~~~~~

Performance
-----------
