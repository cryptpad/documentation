.. _app_form:

Form
=====

.. image:: /images/app-form-preview.png
   :class: screenshot
   :alt: preview of the Form application

Roles
-----

Forms benefit from the same collaboration and privacy features as the other CryptPad applications. They also have slightly different requirements when it comes to usage, for example someone responding to a form should be able to edit their own answers but not other users' answers or the form itself. For this reason the :ref:`share_access_rights` when sharing a form are different from the other applications. Forms have 3 different roles:

- **Author**: can edit questions and :ref:`form settings <form_settings>`.
- **Auditor**: can view responses to the form whether or not they are public.
- **Participant**: can answer the form and only view responses once they are made public by an author.

To share a form with a specific role, for example to send it to participants, select the role in the |share-alt| **Share** menu before selecting contacts or copying the link.

.. image:: /images/app-form-share.png
   :class: screenshot
   :alt: the share menu in the form application, showing the three roles: participant, auditor, and author.

.. note::

   The user list, chat, and alerts about users joining the collaborative session are all disabled when a participant is responding to a form. This is to avoid giving the impression that someone is watching while they answer.

Editing a form
---------------

To add a question, use the |plus| **Add** menu after the last question, or the |plus| between each question.

To delete a question use the |trash-o| **Delete** button on the question to remove.

Utilities
~~~~~~~~~~

|cptools form-paragraph| Description
++++++++++++++++++++++++++++++++++++

Add text to the form using Markdown syntax.

:badge_user:`Logged in users`

To add an image from the CryptDrive or upload a new one, use the |picture-o| icon in the toolbar.

|cptools form-page-break| Page Break
+++++++++++++++++++++++++++++++++++++

Split the form into pages. Only displayed to participants.

|cptools form-conditional| Conditional Section
++++++++++++++++++++++++++++++++++++++++++++++

|cptools form-list-radio| **Choice** and |cptools form-list-check| **Checkbox** questions can be used to display or hide a section of questions.

1. In the form editor, use the |plus| **Add** buttons between questions, or the list at the bottom of the form, to add a |cptools form-conditional| **Conditional Section**.
2. Ensure that there is at least one :ref:`form_Q_choice` or :ref:`form_Q_checkbox` before the section (a hint will be displayed if not). Only questions placed *before* the section will be available to use in the conditions.
3. Add some content (description text, questions) to the section using the |plus| **Add** button or by dragging questions into the section area.
4. Set some conditions using the selection menus. AND conditions must all be true together, only of the OR conditions needs to be true.
5. In the participant view, the section will only be displayed if the conditions are true.

Question types
~~~~~~~~~~~~~~

|cptools form-text| Text
++++++++++++++++++++++++

Response: one line of text

Options:

- Text type: text, number, link or email

.. note::

    In the case of link and email, the question is highlighted in red and an error is shown to the user if their response does not fit the required format.

|cptools form-paragraph| Paragraph
++++++++++++++++++++++++++++++++++

Response: multiple lines of text

Options:

- Maximum characters: limit (defaults to 1000)

.. _form_Q_choice:

|cptools form-list-radio| Choice
++++++++++++++++++++++++++++++++

Response: one choice from the list

Options:

- |plus| **Add option** button
- Grab the |ellipsis-v| |ellipsis-v| handle and drag to re-order options
- Delete an option with |times|

|cptools form-grid-radio| Choice Grid
+++++++++++++++++++++++++++++++++++++

Response: one option choice per item

Options:

- |plus| **Add option** and |plus| **Add item** buttons
- Grab the |ellipsis-v| |ellipsis-v| handle and drag to re-order items and options
- Delete an item or option with |times|

|calendar| Date
++++++++++++++++++++++++

:badge_new:`New in version 5.3`

Response: pick a date and time

.. _form_Q_checkbox:

|cptools form-list-check| Checkbox
++++++++++++++++++++++++++++++++++

Response: multiple choices from the list

Options:

- Maximum selectable options
- |plus| **Add option** button
- Grab the |ellipsis-v| |ellipsis-v| handle and drag to re-order options
- Delete an option with |times|

|cptools form-grid-check| Checkbox Grid
+++++++++++++++++++++++++++++++++++++++

Response: multiple choices for each item

Options:

- Maximum selectable options (per item)
- |plus| **Add option** and |plus| **Add item** buttons
- Grab the |ellipsis-v| |ellipsis-v| handle and drag to re-order items and options
- Delete an item or option with |times|

|cptools form-list-ordered| Ordered List
++++++++++++++++++++++++++++++++++++++++

Response: order of preference for the listed options

Options:

- |plus| **Add option** button
- Grab the |ellipsis-v| |ellipsis-v| handle and drag to re-order options
- Delete an option with |times|

:badge_new:`New in version 5.3`

Condorcet:

Since v5.3 responses can show the results with the `Condorcet method <https://en.wikipedia.org/wiki/Condorcet_method>`_. You can select Schulze or Ranked Pairs to display the winner. The details will also show the number of matches won by each candidates.

|cptools form-poll| Poll
++++++++++++++++++++++++

Response: |check| Yes, |times| No, or |cptools form-poll-maybe| Acceptable for each of the proposed options

Option types:

- Text

   - |plus| **Add option** button
   - Grab the |ellipsis-v| |ellipsis-v| handle and drag to re-order options
   - Delete an option with |times|

- Day

   - Select the date choices by clicking on them in the calendar

- Time

   - Click on an option to select the date and time in the calendar
   - Click "Add multiple dates and times" to select multiple options and use |plus| **Add all** to add all of the selected options at once.

.. _form_settings:

Form Settings
~~~~~~~~~~~~~

Use the 3 buttons at the top for easy access to:

- |bar-chart| **Responses** (count): toggles the response page
- |eye| **Preview form**: Opens the participant link
- |link| **Copy public link**: Copies the participant link

.. note::
   To share an **author** link to the form (with edit rights), use the :ref:`share` menu in the toolbar.

Closing date
++++++++++++

Date after which the form will be closed to new responses

   - Use the **Set closing date** button to select a date from the calendar
   - If a closing date is set, use **Remove closing date** to remove it.

Anonymize responses
+++++++++++++++++++

All responses are anonymized regardless of whether they are logged in to a CryptPad account. If un-checked, participants who are logged-in can still opt to answer anonymously if guest access is allowed (see below).

Guest Access
++++++++++++

 - Blocked: only users who are logged in to their CryptPad account can respond to the form.
 - Allowed: unregistered users can respond, logged in users can choose to respond anonymously.

Editing after submission
++++++++++++++++++++++++

.. XXX track this as feature is implemented

:badge_new:`New in version 5.2`

- One time only: participants can answer the form only one time and can't modify or delete their responses after submitting them.
- One time and edit/delete: participants can answer the form only one time but are allowed modify or delete their responses after submitting them.
- Multiple times: participants can answer the form multiple times but can't modify or delete their responses after submitting them.
- Multiple times and edit/delete: participants can answer the form multiple times and are allowed to modify or delete their responses after submitting them.

.. note::
   Please note that if Guest Access is allowed, unregistered users can still answer multiple times a "One time only" form if they open it on a web browser private window, or wipe the browser cookies, etc.

Publish Responses
+++++++++++++++++

Allows participants who submit the form to view responses. Once enabled, this setting publishes all past and future responses.

.. warning::

    Once responses are made public they cannot be made private again.

Submit message
++++++++++++++

Add a custom message to be displayed after participants submit the form.

Color theme
+++++++++++

Choose the background and highlight color for the form.

Responses
~~~~~~~~~

Notifications for new responses are sent to the form _owner_ through the integrated notifications.

Advanced use-cases
~~~~~~~~~~~~~~~~~~

Anonymous responses with access list
++++++++++++++++++++++++++++++++++++

To conduct an anonymous survey with a known group of users, the anonymous answers feature can be combined with an :ref:`access_list`.

To access the form, participants need to be logged in to an account that is on the access list (either directly or through a :ref:`team <teams>` they are part of).

If anonymous answers are allowed on the form, participants are able to answer anonymously while the access list ensures they are coming from a specific group of users.

Import/Export
-------------

To export responses as a CSV file use the |download| **Export to CSV** button on the |bar-chart| **Responses** page.
