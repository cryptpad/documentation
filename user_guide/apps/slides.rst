
.. _app_slides:

Slides
======

The Slides application in CryptPad is an integration of
`CodeMirror <https://codemirror.net/>`__.

.. image:: /images/slides-preview.png
   :class: screenshot


Toolbar
-------

|wrench| **Tools**: Show/hide the text editor toolbar.

|picture-o| **Insert**: Add an image to the document. The image can be
chosen in the CrpytDrive or uploaded. :badge:`Logged in users`

|cptools palette| **Theme**: Set colors for the editor, detailed :ref:`below <app_slides_theme>`.

|eye| **Preview**: Show/hide the slides preview pane.

|play-circle| **Présenter**: Launch the slide presentation in full
window.

Writing slides with Markdown
----------------------------

CryptPad slides are written in Markdown, a lightweight syntax that
offers basic formatting while remaining readable.

`Markdown syntax
guide. <https://github.com/adam-p/markdown-here/wiki/Markdown-Cheatsheet>`__

.. raw:: html

   <!--- localised link if possible. French here: 
   https://blog.wax-o.com/2014/04/tutoriel-un-guide-pour-bien-commencer-avec-markdown/ -->

The main addition to basic Markdown in the Slides application is the
``---`` delimiter to separate slides.

.. _app_slides_theme:

Theme
-----

|gear| **Options**:

   - **Layout**: Toggle slide numbers, date, title, and transitions.

   - **Background Image**: Displayed on all slides.

   - **Custom CSS**: Paste CSS code to customise the presentation’s appearance.

|i-cursor| **Text color**, |square-o| **Background color**: Pick
colors for the presentation.

**Theme**: Color scheme used in the code editor pane.

Import/Export
-------------

| |file-o| **File** > |upload| **Import**.
| Suported formats: Any plain text file.

| |file-o| **File** > |download| **Export**.
| Supported formats: ``.md``.

Images
------

It is strongly advised **not** to insert external images in documents.
The Markdown syntax ``![description](https://site.com/image.jpg)`` is
supported but presents security risks. Malicious code can be embedded in
images and result in data leakage.

For this reason, CryptPad makes use of ``media-tag`` to insert images
from the CryptDrive. This syntax is more complex but it is managed
automatically by the |picture-o| **Insert** menu.

Lightbox
--------

To browse through all images and diagrams in a document using the full
width of the window:

1. ``Double click`` on an image or diagram in the Markdown preview.
2. Navigate with the arrow keys.
3. Close the light box with |times| or ``Esc``.
