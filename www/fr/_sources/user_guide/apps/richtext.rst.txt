
.. _app_rich_text:

Rich Text
=========

The Rich Text application in CryptPad is an integration of
`CKEditor <https://ckeditor.com/>`__.

.. image:: /images/app-richtext-preview.png
   :class: screenshot

Toolbar
-------

|wrench| **Tools**: Show/hide the text editor toolbar.

|picture-o| **Insert**: Add an image to the document. The image can be
chosen in the CrpytDrive or uploaded. :badge_user:`Logged in users`

View settings
-------------

The buttons at the top of the editor control the display of text editor elements.

|list-ul| : Show/hide the document outline.

|comment| : Show/hide the comments (a red icon when closed indicates that there are comments).

|expand| : Use the full width of the window for the text editor.

|compress| : Use reduced width "page mode" for the text editor.

To set defaults for these settings, for example to control which sections are visible when recipients visit a shared link to the document, use the **Document Settings** dialog:

|file-o| **File** > |cog| **Document Settings**.

Editing
--------

Headings
+++++++++

In order for headings to appear in the outline, they must be formatted as such. To format a heading, select the text or place the cursor on the heading line, then either:

- Use the formatting menu in the toolbar (displays "normal" by default) to select the desired heading level.

- Use the keyboard shortcut: ``Ctrl`` + ``Alt`` + the number of the desired heading level.

Paragraphs
++++++++++

By default the ``Enter`` key creates a new paragraph, adding a line of spacing with the previous paragraph. To add a line-break without adding a new paragraph, use ``Shift`` + ``Enter``.

Import/Export
-------------

| |file-o| **File** > |upload| **Import**
| Supported formats: ``.html``.

| |file-o| **File** > |download| **Export**
| Supported formats: ``.html``, ``.doc``.

To print or export a PDF:

1. |file-o| **File** > |print| **Print**.
2. Select your printer or “print to file”.

Comments
--------

To comment on a part of the text:

1. Select the text to comment.
2. |comment| button, either to the right of the text or in the text
   editor toolbar.
3. Write the comment.
4. |send-o| **Submit**.

Click on a comment to select it, then: 

- |reply| **Reply**: Adds a comment as a response. 
- |check| **Resolve**: Deletes the comment after confirmation.

To notify contacts in a comment, mention them with ``@`` and their
:ref:`display name <user_settings_account>`.

You receive notifications when:

-  Someone replies to one of your comments.
-  Someone mentions you in a comment.
