
.. _app_kanban:

Kanban
======

The Kanban application in CryptPad is based on
`JKanban <https://www.riccardotartaglia.it/jkanban/>`__.

.. image:: /images/app-kanban-preview.png
   :class: screenshot

Organisation
------------

Move cards/columns:

-  ``Drag`` the card/column to its desired position and ``Drop``.

Remove a card/column:

-  The |trash| area appears once you are dragging an element.
-  ``Drag`` the card/column to the |trash| Delete area at the bottom of the screen and ``Drop`` the card/column.

or

-  |pencil| button on the card/column to open the editor > **Delete** and confirm.

Columns
-------

Create a new column:

-  |plus| button to the right of the last columns.

Change the title of a column:

1. ``Click`` on the column title.
2. Type the new title.
3. ``Enter``

The column title and color can be changed in the column editor:

1. |pencil| button next to the column title.
2. Change the title and/or pick a color.
3. **Close**, ``Esc`` or ``Enter``

Cards
-----

Create a new card with the buttons at the bottom of each column:

-  |cptools add-bottom| to add a card at the bottom of the column.
-  |cptools add-top| to add a card at the top of the column.

Change the title of a card:

1. ``Click`` on the card title.
2. Type the new title.
3. ``Enter``

The title of a card can also be modified in the card editor (see below).

Card editor
-----------

Open the card editor:

-  |pencil| button next to the card title.

In the card editor:

-  Edit the card title.
-  Edit the card body using
   `Markdown <https://github.com/adam-p/markdown-here/wiki/Markdown-Cheatsheet>`__:
   Italics, bold, links, lists, todo-lists, etc. are supported.
-  Insert images with the |picture-o| menu in the markdown toolbar (Markdown syntax for remote images is blocked, see :ref:`remote_content`).
-  Pick a card color.
-  Add or remove tags to the card.
-  Delete the card.

Display
-------

Use the |minus| and |bars| icons at the top right to display:

-  |minus| only card titles.
-  |bars| full card contents.

The tags at the top of the board are used to filter cards:

1. ``Click`` on one or more tags.
2. Only cards with these tags are displayed.
3. Any new cards will automatically receive the selected tags.
4. ``Click`` on a selected tag to de-select it, or use |times| **Clear
   filter** (at the left of the list) to de-select all tags.

Import/Export
-------------

| |file-o| **File** > |upload| **Import**
| Supported formats: ``.json`` files exported by this application.

| |file-o| **Files** > |download| **Export**
| Supported formats: ``.json``.
