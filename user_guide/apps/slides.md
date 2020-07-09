# Slides

The Slides application in CryptPad is an integration of [CodeMirror](https://codemirror.net/).

## Toolbar


<i class="fa fa-wrench"></i> **Tools**: Show/hide the text editor toolbar. 

<i class="fa fa-picture-o"></i> **Insert**: Add an image to the document. The image can be chosen in the CrpytDrive or uploaded. {**logged in user**}

<i class="cptools cptools-palette"></i> **Theme**: Set colors for the editor, detailed [below]

<i class="fa fa-eye"></i> **Preview**: Show/hide the slides preview pane.

<i class="fa fa-play-circle"></i> **Présenter**: Launch the slide presentation in full window.

## Writing slides with Markdown

CryptPad slides are written in Markdown,  a lightweight syntax that offers basic formatting while remaining readable.

[Markdown syntax guide.](https://github.com/adam-p/markdown-here/wiki/Markdown-Cheatsheet )

<!--- localised link if possible. French here: 
https://blog.wax-o.com/2014/04/tutoriel-un-guide-pour-bien-commencer-avec-markdown/ -->

The main addition to basic Markdown in the Slides application is the `---` delimiter to separate slides. 

## Theme

<i class="fa fa-gear"></i> **Options**:
  - Layout: Toggle slide numbers, date, title, and transitions.
  - Background Image: Displayed on all slides. 
  - Custom CSS: Paste CSS code to customise the presentation's appearance. 

<i class="fa fa-i-cursor"></i> **Text color**, 
<i class="fa fa-square-o"></i> **Background color**: Pick colors for the presentation. 

**Theme**: Color scheme used in the code editor pane.

### Import/Export 

<i class="fa fa-file-o"></i> **File** > <i class="fa fa-upload"></i> **Import**.

Suported formats: Any plain text file.

<i class="fa fa-file-o"></i> **File** > <i class="fa fa-download"></i> **Export**.

Supported formats: `.md`. 

## Images

It is strongly advised **not** to insert external images in documents. The Markdown syntax `![description](https://site.com/image.jpg` is supported but presents security risks. Malicious code can be embedded in images and result iin data leakeage.

For this reason, CryptPad makes use of `media-tag` to insert images from the CryptDrive. This syntax is more complex but it is managed automatically by the <i class="fa fa-picture-o"></i> **Insert** menu.


### Lightbox

To browse through all images and diagrams in a document: 

- `Double click` on an image or diagram in the Markdown preview. 