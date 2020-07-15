# Whiteboard

The Whiteboard application in CryptPad is based on [Fabric.js](http://fabricjs.com/).

<img class="screenshot" alt="preview of the whiteboard application" src="/images/whiteboard-preview.png">

## Toolbar

<i class="fa fa-picture-o"></i> **Insert**: Add an image to the document. The image can be chosen in the CryptDrive or uploaded. {**logged in user**}

## Drawing

Two modes are available: 

- <i class="fa fa-paint-brush"></i> Paint mode: add new shapes to the drawing. 
- <i class="fa fa-arrows"></i> Select mode: transform existing shapes. 

To delete everything on the canvas: 

- **Clear** button in the drawing toolbar at the bottom.

## Paint mode

The width and opacity of line are set in the drawing toolbar. The preview to the right shows the size and opacity of the paintbrush.

Color is selected in the palette in the drawing toolbar. To change a color `Double click` on it and select a new one using the color-picker.

## Select mode

`Click` on an element to select it, then:
- `Drag` to move.
- Transform (scale, rotate) with the selection handles. 

To delete a selected element: 
- `Del` key.
- <i class="fa fa-trash"></i> button in the drawing toolbar.

## Export

<i class="fa fa-file-o"></i> **File** > <i class="fa fa-download"></i> **Export**  
Supported format: `.png`

To export an image to the CryptDrive, for example to use it in other documents: 

<i class="fa fa-file-o"></i> **File** > <i class="fa fa-file-image-o"></i> **Save as image**