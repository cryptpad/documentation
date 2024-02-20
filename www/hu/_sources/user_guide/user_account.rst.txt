User Account
============

CryptPad encrypts data so that it is readable only by you and your collaborators. For this reason **the administrators of the service cannot view, retrieve or reset your password**. Therefore it is important that you make a note of your password in a safe place separate from your CryptPad account.

CryptPad uses the combination of your username and password to identify you. Usernames are not unique on CryptPad. It is possible to create multiple accounts with the same username and different passwords.

Account types
-------------

There are three types of accounts on CryptPad:

Guest user
~~~~~~~~~~

Non-registered users are identified by an emoji animal or mascot avatar (at the top right).

No personal information is necessary to use CryptPad without registering. However, functionality is reduced:

-  Access to all applications.
-  Sharing and collaborating on documents.
-  Storage limited to 3 months of inactivity (counted per document).
-  File storage unavailable for images/videos/PDF/etc…
-  Limited access to :ref:`calendars <calendar>` (link-shared calendars only).

Logged in user
~~~~~~~~~~~~~~

Logged in user are identified by an avatar (at the top right), either their profile picture if they have set one or the first 2 letters of their display name.

Registering an account does not require any personal information, only a username and password. Additional functionality for logged in users:

-  Personal and permanent storage space for documents.
-  File storage for images/videos/PDF/etc…
-  More options to manage documents as :ref:`owner <owners>`: add a :ref:`password <access_tab>`, an :ref:`expiry date <access_tab>`, or an :ref:`access list <access_list>`.
-  Organisation of documents in :ref:`folders <folders>`, :ref:`shared folders <shared_folders>`, or with :ref:`tags <tags>` and :ref:`templates <templates>`.
-  Creation of :ref:`teams <teams>`.
-  Customisation of the :ref:`profile <profile>` page and a list of :ref:`contacts <contacts>` to :ref:`share documents <share>` and :ref:`chat <chat_contacts>` with. Notifications for interactions between contacts.
-  Creation and management of :ref:`calendars <calendar>`.

Premium user
~~~~~~~~~~~~

(only on cryptpad.fr)

-  More storage space.
-  Higher maximum upload size for files (images/videos/PDF/etc…).
-  Priority response from the admin/support team.
-  Support the development and sustainability of CryptPad.

Account management
------------------

Registration
~~~~~~~~~~~~

To register a new account, go to the registration page: **Register** at the top right of the home page.

.. image:: /images/registration.png
   :class: screenshot

Fill out the following information:

-  **Username**: This is the name used to log in to CryptPad, it is different from the **Display name** visible by other users. The **Username** cannot be changed once the account is created.

.. note::
   Unlike many online services, **CryptPad does not require an email address to register**. It is possible to use an email address as a username but it is then used as any other string of characters. As explained below, this username is not visible from the administrators and is never used to communicate about your account (especially not to send "password reset" emails, as these do not exist on CryptPad).

-  **Password**: It is recommended to use a strong password. The password can be changed in :ref:`user settings <user_settings>`.

.. image:: /images/registration-warning.png
   :class: screenshot

.. danger::

   Important: CryptPad administrators cannot view, retrieve or reset your password if it is lost or forgotten.

-  **Terms of service**: Read and accept the terms of service.

Optional:

-  **Import documents from your anonymous session**: If you have created documents as a non-registered user you can import them into your account.

Logging in
~~~~~~~~~~

To log in to CryptPad visit the **log in** page (at the top right of the home page), and fill in the username and password used at registration.

Optional:

-  **Import documents from your anonymous session**: If you have created documents as a non-registered user you can import them into your account.

Notifications
-------------

:badge_user:`Logged in users`

CryptPad notifies you when your contacts interact with you. Notifications are displayed by the bell |bell-o| next to the avatar (at the top-right). If you have unread notifications, the bell is filled |bell| and a count is displayed.

|bell| Bell drop down menu:

-  Browse unread notifications.
-  Delete a notification with |times|.
-  **Open notifications panel**: View all notifications and notification
   history.

On the notifications panel page:

-  Select the type of notification to view:

   -  |bars| All.
   -  |user| Contact Requests.
   -  |cptools richtext| Shared with me.
   -  |archive| History.

-  |trash|: Delete notifications.

.. _user_settings:

Settings
--------

The account settings are found in the user menu (avatar at the top right) > |gear| **Settings**.

.. _user_settings_account:

Account
~~~~~~~

-  **Account name**: Username chosen at registration. This name cannot be changed. :badge_user:`Logged in users`
-  **Public Signing Key**: Used by instance administrators and/or on instances that offer subscriptions. This is the only data about your account that is available to the administrators of the service. :badge_user:`Logged in users`
-  **Display Name**: Name displayed to other users, for example when you collaborate on documents. To change this name enter a new name and click on **Save**. :badge_user:`Logged in users`
-  **Language**: Language used in the CryptPad interface. To change the language of CryptPad pick a new language in the drop-down menu. CryptPad is translated in English and French by the development team, and in other languages by the :ref:`community <contribute_translation>`. Some translations can be incomplete and/or contain errors.
- **Automatic Download limit**: Maximum size in megabytes (MB) for automatically loading media elements (images, videos, pdf) embedded into documents. Elements bigger than the specified size can be loaded manually. Use "-1" to always load the media elements automatically.
-  **Account deletion**: Option to permanently delete your account and all of its documents. **Delete your account** and confirm. :badge_user:`Logged in users`

.. _user_settings_confidentiality:

Security & Privacy
~~~~~~~~~~~~~~~~~~

- **Close remote sessions**: Log out of all sessions except the one from which this option is activated. (see also :ref:`remote_disconnect`) :badge_user:`Logged in users`
- **Two-Factor Authentication (2FA)**: Protect your account with an additional verification code provided by an authenticator app of your choice.   :badge_user:`Logged in users`

  To activate 2FA:

  #. Enter your account password
  #. Save the recovery code
  #. Snap the QR code with a 2FA app of your choice (or copy the address and paste into your app)
  #. Enter the verification code to confirm

- **Change your password**: Change your account's password. Enter your current password, and confirm the new password by typing it twice
- **Safe links**: When this setting is active, the link in your browser’s address bar does not provide access to the document unless the recipient already has it in their CryptDrive. This setting is active by default. It is highly recommended to keep it active and to use the :ref:`share` menu to copy links to documents.

CryptPad includes the keys to decrypt your documents in their links. Anyone with access to your browsing history can potentially read your data. This includes intrusive browser extensions and browsers that sync your history across devices. Situations where your browser is visible by others, such as screen-sharing or screenshots, are also potentially risky in terms of leaking access to your documents. Enabling “safe links” prevents the keys from entering your browsing history or being displayed in your address bar whenever possible.

-  **Feedback**: CryptPad can send anonymised usage feedback to the server in order to improve the user experience. The content of documents is never shared. This option is disabled by default.
-  **Cache**: CryptPad stores parts of your documents in your browser's memory in order to save network usage and improve loading times. You can disable the cache if your device doesn't have a lot of free storage space. For security reasons, the cache is always cleared when you log out, but you can clear it manually if you want to reclaim storage space on your machine.
-  **Destroy all owned documents**: All documents where you are the sole owner will be permanently destroyed

Appearance
~~~~~~~~~~

- **Color theme**: determines the theme (light or dark) used across CryptPad. By default this follows the operating system and/or browser setting, but it can also be set manually.

.. _user_settings_cryptdrive:

CryptDrive
~~~~~~~~~~

-  **Homepage redirection**: Automatic redirection from the home page to the drive when logged in is no longer enabled by default
-  **Tips**: Help messages in the CryptPad interface. Click on **Reset** to display them again if they have been dismissed.
-  **Document storage in CryptDrive**: Manages if documents you visit are automatically stored in your CryptDrive. If no one :ref:`owns <owners>` a document you add to your CryptDrive, it counts against your storage quota.

   -  **Automatic**: All the documents you visit are stored in your CryptDrive.
   -  **Manual (always ask)**: If you have not stored a document yet, you will be asked if you want to store them in your CryptDrive.
   -  **Manual (never ask)** Documents are not stored automatically in your Cryptpad. The option to store them will be hidden.

-  **Duplicated owned documents**: When you move your owned documents to a shared folder, a copy is kept in your CryptDrive to ensure that you retain your control over it. You can hide duplicated files. Only the shared version will be visible, unless deleted, in which case the original will be displayed in its previous location.
-  **Thumbnails**: To help navigating the CryptDrive in :ref:`grid mode <drive_display>`, CryptPad can create thumbnails of documents and store them in the browser. This option is turned off by default because it can slow down the browser on less powerful computers. The **Clean** button deletes all existing thumbnails.
-  **Backup**: Two types of backups are available.

   -  **Backup** only saves the keys of documents in the CryptDrive, not their content. This option is designed to save access to documents and **Restore** it in another session.
   -  **Download my CryptDrive** saves the content of all documents in the CryptDrive. When possible, this is done in a format that is readable by other software. Some applications produce files that are only readable by CryptPad.

-  **Import**: If documents have been created as a non-registered user prior to logging in, they can be imported to the CryptDrive. :badge_user:`Logged in users`
-  **Delete History**: The history of the CryptDrive and notifications can be deleted to save storage space. This does not affect the history of documents, which can be deleted individually in the :ref:`properties <document_properties>` dialog.

.. _user_settings_cursor:

Cursor
~~~~~~

-  **Cursor color**: Change the color of your cursor. This is used to identify you while collaborating on documents. It also determines the color of your text when :ref:`color by author <app_code_theme>` is active in Code documents.
-  **Share my cursor position**: Display or hide the exact position of your cursor to other users.
-  **Display other users’ cursor position (BETA)**: Display or hide the position of other users’ cursors.

.. _user_settings_richtext:

Rich Text
~~~~~~~~~

User settings for the :ref:`app_rich_text` application.

-  **Editor’s maximum width**: Switch between page mode (default) that limits the width of the text editor, and using the full width of the screen.
-  **Spellcheck**: Enable spellcheck in Rich Text documents. Spelling errors are underlined and suggested corrections are available through ``Ctrl + Right click`` on the word to correct.
-  **Comment notifications**: Disable notifications when another user replies to one of your comments.
-  **Open links on first click**: Open embedded links on click without the preview popup.

.. _user_settings_code:

Code
~~~~

User settings for the :ref:`app_code` application.

-  **Code editor indentation (spaces)**: Choose the number of spaces for each level of indentation.
-  **Indent using tabs (instead of spaces)**: Insert tabs rather than spaces with the ``Tab`` key.
-  **Auto-close brackets**: Automatically insert a closing character ``)`` when brackets are opened with ``(`` (also works with ``[``, ``'``, ``"``).
-  **Font size in the code editor**: Set the size of text in the code editor.
-  **Spellcheck**: Underline spelling mistakes in the code editor, correction suggestions are available through ``Right click`` on the word to correct.

.. _user_settings_kanban:

Kanban
~~~~~~

User settings for the :ref:`app_kanban` application.

-  **Tag filter**: How you want the tag filter to act when selecting multiple tags: only show cards containing all the selected tags (AND) or show cards containing any of the selected tags (OR).

.. _user_settings_notifications:

Notifications
~~~~~~~~~~~~~

User settings for the notifications.

-  **Calendar notifications**: Enable/disable all notifications for upcoming calendar events.

.. _user_settings_subscription:

Subscription
~~~~~~~~~~~~

(only on cryptpad.fr)

-  Redirects to the account page.
