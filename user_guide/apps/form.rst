
.. _app_form:

Form
=====

:badge_new:`New in version 4.7`

.. note::

    The Form application is currently in Beta. More features are planned for the near future including:

    * import/export
    * better visualization for responses
    * more options

        * different ways of counting ranked ballots

    * author notifications

.. The following features

.. * import/export
.. * better visualization for responses
.. * more options
..     * different ways of counting ranked ballots
.. * printing
.. * author notifications

.. .. warning::
..     Not suitable for elections.

.. XXX: app screenshot

Roles
-----

Forms benefit from the same collaboration and privacy features as the other CryptPad applications. They also have slightly different requirements when it comes to usage, for example someone responding to a form should be able to edit their own answers but not other users' answers or the form itself. For this reason the :ref:`share_access_rights` when sharing a form are different from the other applications. Forms have 3 different roles:

- **Authors**: can edit questions and :ref:`form settings <form_settings>`.
- **Auditors**: can view responses to the form whether or not they public.
- **Participant**: can answer the form and only view responses once they are made public by an author.

To share a form with a specific role, for example to send it to participants, select the role in the |share-alt| **Share** menu before selecting contacts or copying the link.

.. XXX Forms share modal screenshot

Editing a form
---------------

To add a question, use the |plus| **Add** menu after the last question, or the |plus| between each question.

To delete a question use the |trash-o| **Delete** button on the question to remove.

Question types
~~~~~~~~~~~~~~~

|cptools form-text| Text
+++++++++++++++++++++++++

|cptools form-text| Response: one line of text

Options:

- Text type: text, number, link or email

.. note::

    In the case of link and email, the question is highlighted in red and an error is shown to the user if their response does not fit the required format.

|cptools form-paragraph| Paragraph
+++++++++++++++++++++++++++++++++++++

Response: multiple lines of text

Options:

- Maximum characters: limit (defaults to 1000)

|cptools form-list-radio| Choice
+++++++++++++++++++++++++++++++++

Response: one choice from the list

Options:

- |plus| **Add option** button
- Grab the |ellipsis-v| |ellipsis-v| and drag to re-order options
- Delete an option with |times|

|cptools form-grid-radio| Choice Grid
+++++++++++++++++++++++++++++++++++++++

Response: one option choice per item

Options:

- |plus| **Add option** and |plus| **Add item** buttons
- Grab the |ellipsis-v| |ellipsis-v| and drag to re-order items and options
- Delete an item or option with |times|

|cptools form-list-check| Checkbox
++++++++++++++++++++++++++++++++++++

Response: multiple choices from the list

Options:

- Maximum selectable options
- |plus| **Add option** button
- Grab the |ellipsis-v| |ellipsis-v| and drag to re-order options
- Delete an option with |times|

|cptools form-grid-check| Checkbox Grid
+++++++++++++++++++++++++++++++++++++++++

Response: multiple choices for each item

Options:

- Maximum selectable options (per item)
- |plus| **Add option** and |plus| **Add item** buttons
- Grab the |ellipsis-v| |ellipsis-v| and drag to re-order items and options
- Delete an item or option with |times|

|cptools form-list-ordered| Ordered List
+++++++++++++++++++++++++++++++++++++++++

Response: order of preference for the listed options

Options:

- |plus| **Add option** button
- Grab the |ellipsis-v| |ellipsis-v| and drag to re-order options
- Delete an option with |times|

|cptools form-poll| Poll
+++++++++++++++++++++++++

Response: |check| Yes, |times| No, or |cptools form-poll-maybe| Acceptable for each of the proposed options

Option types:

- Text

   - |plus| **Add option** button
   - Grab the |ellipsis-v| |ellipsis-v| and drag to re-order options
   - Delete an option with |times|

- Day

   - Select the date choices by clicking on them in the calendar

- Time

   - Click on an option to select the date and time in the calendar
   - Click "Add multiple dates and times" to select multiple options and use |plus| **Add all** to add all of the selected options at once.

.. _form_settings:

Form Settings
~~~~~~~~~~~~~~

- Closing date: date after which the form will be closed to new responses

   - Use the **Set closing date** button to select a date from the calendar
   - If a closing date is set, use **Remove closing date** to remove it.

- Anonymous answers (blocked by default)

   - Blocked: only users who are logged in to their CryptPad account can respond to the form.
   - Allowed: unregistered users can respond, logged in users can choose to respond anonymously.

- Publish responses (private by default): allow anyone who can view the form to view responses.

.. warning::
    Once responses are made public they cannot be made private again.

Advanced use-cases
~~~~~~~~~~~~~~~~~~~

Anonymous responses with access list
+++++++++++++++++++++++++++++++++++++

To conduct an anonymous survey within a known group of users, the anonymous answers feature can be combined with an :ref:`access_list`.

To access the form, participants need to be logged in to an account that is on the access list (either directly or through a :ref:`team <teams>` they are part of.

If anonymous answers are allowed on the form, participants are able to answer anonymously while the access list ensures they are coming from a specific group of users.

Import/Export
-------------

Exporting the results for analysis outside of CryptPad is not yet available. This is planned for a future release.







.. Answering a form