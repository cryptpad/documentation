# Code / Markdown

The Code/Markdown application in CryptPad is an integration of [CodeMirror](https://codemirror.net/).

## Toolbar

<i class="fa fa-wrench"></i> **Tools**: Show/hide the text editor toolbar. 

<i class="fa fa-picture-o"></i> **Insert**: Add an image to the document. The image can be chosen in the CrpytDrive or uploaded. {**logged in user**}

<i class="cptools cptools-palette"></i> **Theme**: Set colors for the editor, detailed [below]

<i class="fa fa-eye"></i> **Preview**: Show/hide the Markdown preview pane.

## Theme

<i class="fa fa-paint-brush"></i> **Color by author**: Highlight the text written by each user with their cursor color (picked in [user settings]). When active: 
  - <i class="fa fa-paint-brush"></i> **Hide author colors** to turn off the display of colors in this window, the colors can be turned back on and remain active for other users. 
  - <i class="fa fa-paint-brush"></i> **Color by author** > **Clear and disable** to turn off the colors for all users and delete the data.

**Theme**: Color scheme used in the code editor pane.

**Language**: Used for syntax highlighting. 

## Import/Export

<i class="fa fa-file-o"></i> **File** > <i class="fa fa-upload"></i> **Import**.

Suported formats: Any plain text file, the file extension is used to determine the language.

<i class="fa fa-file-o"></i> **File** > <i class="fa fa-download"></i> **Export**.

Supported formats: `.md`, any other extension can be typed for the name of the exported file. 

## Markdown

The Code application is particularly suited for writing documents in Markdown: a lightweight syntax that offers basic formatting while remaining readable. Markdown is readily converted to other formats such as HTML. 

[Markdown syntax guide.](https://github.com/adam-p/markdown-here/wiki/Markdown-Cheatsheet )

<!--- localised link if possible. French here: 
https://blog.wax-o.com/2014/04/tutoriel-un-guide-pour-bien-commencer-avec-markdown/ -->

Additionally to basic Markdown syntax, the following features are also available: 

- `[TOC]` Inserts a table of contents.
- Todo list
  - `- [ ] task` for a task to do.  
  renders as: <i class="fa fa-square-o"></i> task
  - `- [x] task` for a completed task.  
  renders as: <i class="fa fa-check-square"></i> task
- Diagrams with [Mermaid](https://mermaid-js.github.io/mermaid/#/).
- Mindmaps with [Markmap](https://markmap.js.org/).
- Mathematical equations with [Mathjax](https://www.mathjax.org/).

## Images

It is strongly advised **not** to insert external images in documents. The Markdown syntax `![description](https://site.com/image.jpg)` is supported but presents security risks. Malicious code can be hidden in images and result in data leakeage.

For this reason, CryptPad makes use of `media-tag` to insert images from the CryptDrive. This syntax is more complex but it is managed automatically by the <i class="fa fa-picture-o"></i> **Insert** menu.

## Lightbox

To browse through all images and diagrams in a document using the full width of hte window: 

1. `Double click` on an image or diagram in the Markdown preview. 
1. Navigate with the arrow keys.
1. Close the light box with <i class="fa fa-times"></i> or `Esc`.








