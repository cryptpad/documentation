
# Drive

The CryptDrive is used to store and manage documents. For logged in users it is the default landing page on CryptPad. It is also accessible from the other pages: 

- `Clic` on the logo at the top-left.
- User menu (avatar at the top-right) > <i class="fa fa-hdd-o"></i> **CryptDrive**.

## Display

Documents in the CryptDrive can be displayed as a <i class="fa fa-list"></i> list or a <i class="fa fa-th-large"></i> grid. To switch between the two, use the button at the right of the CryptDrive toolbar (under the avatar). 

In grid mode, CryptPad can display thumbnails of documents. These can be turned on in the [user settings]. 

## Managing documents

### Folders
{**logged in user**}

There are multiple ways to create folders in the CryptDrive: 

- <i class="fa fa-plus"></i> **New** in the toolbar > <i class="fa fa-folder"></i> **Folder**.   
- `Right click` > <i class="fa fa-folder"></i> **New folder**.
- `Ctrl + e` > <i class="fa fa-folder"></i> **Folder**. 

Once a folder is created, documents can be added to it by dragging them from the CryptDrive. 

To change the color of a folder: 
- `Rigth click` on the folder > <i class="cptools cptools-palette"></i> **Change color**.

To share a folder and all of its contents: 
- `Right click` on the folder > <i class="fa fa-share-alt"></i> **Share**. The folder will then be converted into a [shared folder].

### Renaming 

There are two ways to rename documents on CryptPad. One changes the document title for all users, the other changes it only in your CryptDrive. 

To change the title of a documents for all users that have it in their CryptDrive: 
1. `Click` on the title or the <i class="fa fa-pencil"></i> button in the toolbar of the document. 
1. Type the new title.
1. Save with the <i class="fa fa-check"></i> button or `Enter` key. 

To change the title of a document only in your CryptDrive:
1. `Right click` on the document in your CryptDrive > <i class="fa fa-pencil"></i> **Rename**.
1. Type the new name. 
1. Save with the `Enter` key.

The <i class="fa fa-flag"></i> icon indicates that the title of a document is different in your CryptDrive than for other users. 

### Deleting
{**logged in user**}

To delete a document from your CryptDrive, place it the <i class="fa fa-trash"></i> **Trash**:  

- Drag the document from the CryptDrive into the <i class="fa fa-trash"></i> **Trash**.
- `Right click` > <i class="fa fa-trash"></i> **Move to trash**
- Select the document and press the `Del` key.

To delete the document directly from the CryptDrive (without storing it in the trash first):
- Select the document and press the `Shift + Del` keys. 

To empty the trash: 
- `Right click` on the <i class="fa fa-trash"></i> **Trash** tab to the left of the CryptDrive > <i class="fa fa-trash-o"></i> **Empty the trash**.
- `Click` on the <i class="fa fa-trash"></i> **Trash** tab to access the trash > <i class="fa fa-trash-o"></i> **Empty the trash**.

When the trash is emptied, the documents it contains are removed from the CryptDrive. 

These documents remain available to other users that have them in their CryptDrive. If a document is not stored in any CryptDrive, it is deleted permanently from the database after 90 days (the length of this delay can be set by the service administrators). 
<!-- XXX double check -->

The [owner] of a document can also delete it permanently: 
- `Right click` on the document in the CryptDrive > <i class="fa fa-eraser"></i> **Delete from the server**.  
<!-- XXX update this with new delete UX ---> 

In this case the document is deleted from the database right away for all users, including anyone that had stored the document in their CryptDrive. 

Once a document is deleted from the database, it cannot be restored through the CryptDrive [history]. 

For unregistered users, only one option is available:
- `Right click` on the document in the CryptDrive > <i class="fa fa-eraser"></i> **Remove from your CryptDrive**. 

## CryptDrive history

The CryptDrive history is saved and can be restored if needed. From the CryptDrive: 

1. `Click` on the <i class="fa fa-history"></i> history button at the top-right (under the avatar). 
1. Use the arrows <i class="fa fa-fast-backward"></i> <i class="fa fa-step-backward"></i> to step through the history. 
1. Restore the current step with <i class="fa fa-check-circle-o"></i>, or exit the history wihtout restoring with <i class="fa fa-window-close"></i>.

To save storage space the CryptDrive history can be deleted in the [user settings]. 

## Tags
{**logged in user**}

Group documents in multiple categories by using tags. Your tags are not visible by other users. 

The <i class="fa fa-hashtag"></i> **Tags** tab in the CryptDrive displays all tags in use and their associated documents. 

To add or remove tags from a document: 

- From the CrytpDrive: `Right click` on the document > <i class="fa fa-hashtag"></i> **Tags**.
- From a document: <i class="fa fa-file-o"></i> **File** > <i class="fa fa-hashtag"></i> **Tags**.

To manage tags for multiple documents: 
1. Select the documents with `Ctrl + Click` in the CryptDrive. 
1. `Right click` on the documents > <i class="fa fa-hashtag"></i> **Tags**.

Only the tags asigned to all the documents are then displayed. Any tags added and/or removed are applied to all the selected documents. 

## Templates
{**logged in user**}

Templates provide reusable starting points to create documents of a similar structure, for example invoices, letterheads, reports, and so on. 


### Create a template 

1. Select the  <i class="cptools cptools-template"></i> **Templates** tab in the CryptDrive. 
1. <i class="fa fa-plus"></i> **New** in the toolbar.

or

1. In an existing document:  <i class="fa fa-file-o"></i> **File** > <i class="fa fa-bookmark"></i> **Save as template**.

or 

1. Create a [new document].
1. On the creation screen select <i class="cptools cptools-new-template"></i> **New template**.

### Use a template

- Select the template when creating a [new document].
- In an existing document: <i class="fa fa-file-o"></i> **File** > <i class="fa fa-upload"></i> **Import a template**. Please note: this option **replaces** the contents of the document with the template. 







