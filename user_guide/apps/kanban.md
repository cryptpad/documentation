# Kanban

The Kanban application in CryptPad is based on [JKanban](https://www.riccardotartaglia.it/jkanban/).

## Organisation 

Move cards/columns: 

- `Drag` the card/column to its desired position and `Drop`. 

Remove a card/column:

- The <i class="fa fa-trash"></i> area appears once you are dragging an element.
- `Drag` the card/column to the <i class="fa fa-trash"></i> Delete area at the bottom of the screen and `Drop` the card/column.

or

- <i class="fa fa-pencil"></i> button on the card/column to open the editor > **Delete** and confirm. 

## Columns 

Create a new column: 

- <i class="fa fa-plus"></i> button to the right of the last columns.

Change the title of a column:

1. `Click` on the column title.
1. Type the new title.
1. `Enter`

The column title and color can be changed in the column editor: 

1. <i class="fa fa-pencil"></i> button next to the column title. 
1. Change the title and/or pick a color.
1. **Close**, `Esc` or `Enter`

## Cards

Create a new card with the buttons at the bottom of each column:

- <i class="cptools cptools-add-bottom"></i> to add a card at the bottom of the column.
- <i class="cptools cptools-add-top"></i> to add a card at the top of the column.

Change the title of a card: 

1. `Click` on the card title.
1. Type the new title.
1. `Enter`.

The title of a card can also be modified in the card editor (see below).

## Card editor

Open the card editor: 

- <i class="fa fa-pencil"></i> button next to the card title.

In the card editor:

- Edit the card title.
- Edit the card body using [Markdown](https://github.com/adam-p/markdown-here/wiki/Markdown-Cheatsheet):  <!--- localised link if possible. French here: https://blog.wax-o.com/2014/04/tutoriel-un-guide-pour-bien-commencer-avec-markdown/ -->   
  Italics, bold, links, lists, todo-lists, etc. are supported. 
- Pick a card color. 
- Add or remove tags to the card.
- Delete the card.

## Display

Use the <i class="fa fa-minus"></i> and <i class="fa fa-bars"></i> icons at the top right to display:

  - <i class="fa fa-minus"></i> only card titles.
  - <i class="fa fa-bars"></i> full card contents.

The tags at the top of the board are used to filter cards:

1. `Click` on one or more tags.
1. Only cards with these tags are displayed.
1. Any new cards will automatically receive the selected tags.
1. `Click` on a selected tag to de-select it, or use <i class="fa fa-times"></i> **Clear filter** (at the left of the list) to de-select all tags.

## Import/Export

<i class="fa fa-file-o"></i> **File** > <i class="fa fa-upload"></i> **Import**  
Supported formats: `.json` files exported by this application.

<i class="fa fa-file-o"></i> **Files** > <i class="fa fa-download"></i> **Export**   
Supported formats: `.json`.

