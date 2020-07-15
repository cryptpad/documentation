
# Share / Access

<i class="fa fa-share-alt"></i> **Share** and <i class="fa fa-unlock-alt"></i> **Access** are the two menus to manage how other users can interact with your documents on CryptPad. 

- From the document toolbar: <i class="fa fa-share-alt"></i> **Share** and <i class="fa fa-unlock-alt"></i> **Access** at the center.
- From the CryptDrive: `Right click` on a document > 
<i class="fa fa-share-alt"></i> **Share** or <i class="fa fa-unlock-alt"></i> **Access**.

## Share 

There are three ways to share a document: [Contacts], [Link], and [Embed]. In each case, access rights can be set to authorise the recipient to edit the document, or to only view it. 

### Access rights

There are 4 levels of permissions: 

- **View**: Read-only without editing the document.
- **Present**: Read-only the rendered output of the document, available in the [Code] and [Slides] applications.
- **Edit**: View and make changes to the document. 
- **View once and self-destruct**: Read-only **one time**. Once the link is opened by a recipient, the document is deleted permanently. 

Note: If a document is already stored in the CryptDrive of a user with edit rights, the "edit link" is shown in the document's properties even if the user is in View mode.

### Sharing with contacts
{**logged in user**}

This is the recommended method for sharing documents securely on CryptPad. When sharing directly with [contacts], document links never leave the encrypted platform of CryptPad. This prevents data from being leaked to third parties. 

To share with one or more contacts: 

- <i class="fa fa-share-alt"></i> **Share** in the document toolbar > <i class="fa fa-address-book"></i> **Contacts**.
- `Right click` on the document in the CryptDrive > <i class="fa fa-share-alt"></i> **Share** > <i class="fa fa-address-book"></i> **Contacts**.

Then: 

1. Choose the [access rights].
2. Select the contacts or teams to share with. 
3. **Share** button.

When sharing with contacts, they receive a notification.  
When sharing with a team, the document is added directly to the team's CryptDrive. 

### Sharing a link 

The **Link** tab provides links that can be shared through the medium of your choice. Depending on how you send the link, this method can present security risks. To add a level of security, it is recommended to add a [password] to your document before sharing the link. 

To copy the link to a document: 

- From the document: <i class="fa fa-share-alt"></i> **Share** in the toolbar  > <i class="fa fa-link"></i> **Link**    
- From the CryptDrive : `Right click` on the document > <i class="fa fa-share-alt"></i> **Share** > <i class="fa fa-link"></i> **Link** 

then 

1. Choose the [access rights].  
**Embed mode** hides the toolbar and user list  
**Preview** allows to check what the link will look like before sending it. 
1. **Copy** the link.
2. Send the link. 

### Embedding

Embedding allows for a CryptPad document to be displayed on a web page. 

To embed a document: 

- From the document : <i class="fa fa-share-alt"></i> **Share** in the toolbar > <i class="fa fa-code"></i> **Embed**.
- From the CryptDrive : `Right click` on the document > <i class="fa fa-share-alt"></i> **Share** > <i class="fa fa-code"></i> **Embed**.

then

1. Choose the [access rights]. 
1. **Copy** the embed code. 
1. Paste the code on a web page. 

### Shared folders
{**logged in user**}

Shared folders are made for sharing a set of documents at once. 

To create a shared folder in the CryptDrive: 

- `+ New` > <i class="cptools cptools-shared-folder"></i> **Shared folder**.  
- `Ctrl + e` > <i class="cptools cptools-shared-folder"></i> **Shared folder**.  
- `Right click` > <i class="cptools cptools-shared-folder"></i> **New shared folder**.

To convert an existing folder into a shared folder: 

1. `Right click` on the folder > <i class="fa fa-share-alt"></i> **Share**. 
1. Choose the conversion options.   
  Password.  
  [Owned] folder.
2. `OK` or press the `Enter` key.

<div class="note">
    Shared folders have their own history, separate from the [CryptDrive history]. Restoring the history of the drive does not affect shared folders, conversely the history of a shared folder can be restored without affecting the rest of the drive.
</div>

Folders are shared in a similar way to documents. To share a folder from the CryptDrive: 

1. `Right click` on the folder > <i class="fa fa-share-alt"></i> **Share**. 
2. Choose the [access rights].  
  **View**: Read-only without editing the contents of the folder.  
  **Edit**: View and make changes to the folder. 
1. Three tabs are available:  
  <i class="fa fa-address-book"></i> **Contacts**: Recommended method to share securely with contacts and teams on CryptPad.  
  <i class="fa fa-link"></i> **Link**: Copy a link to send through the medium of your choice.  
  <i class="fa fa-code"></i> **Embed**: Copy code to include the folder on a web page.


## Access
{**logged in user**}

This menu is used to restrict access to a document or shared folder: 

- From the document: <i class="fa fa-unlock-alt"></i> **Access**.
- From the CryptDrive: `Right click` on the document or shared folder > <i class="fa fa-unlock-alt"></i> **Access**.


### Access tab

This tab summarises all the modalities of access to the document: 

- **Expiration date**: Date at which the document will be deleted. This date is set at the creation of the document and cannot be modified afterwards. 

- **Password**: Displays if a [password] has been set. A new password can be set, or an existing password modified. 

- **Owners**: List of all the document's [owners].

- **Edit rights requests**:  
  **Request edit rights**: For users with read-only access rights.  
  <i class="fa fa-bell-slash"></i> **Mute access requests for this pad**: Hides edit rights requests for this document. {**document owners**}
  
- **Access list**: Displays the [access list] and indicates if it is enabled. 

- <i class="cptools cptools-destroy"></i> **Destroy**: Delete the document permanently.


### Access List
{**document owners**}

The access list restricts access to a document. Once active, users who are not on the list are not able to access the document, even if they have it stored in their CryptDrive. 

To enable the access list, tick **Enable access list**. The [owners] of the document are on the list by default and cannot be removed from it. 

To add contacts or teams to the list: 

1. Select them in the list of contacts on the right.
1. Add them to the list with the <i class="fa fa-arrow-left"></i> button.

To remove a user or team from the list use the <i class="fa fa-times"></i> button next to their name.

### Owners

This tab is used to manage the ownership of the document. Owners of a document have the following permissions: 

- Enable an [acces list].
- Enable a password.
- Add or remove other owners. 
- Destroy the document. 

The ownership of a document is set on the [creation screen].

<div class="note">
  If a document is created without owners, no one has permissions to manage its ownership. It cannot be permanently destroyed by anyone, but can be removed from the CryptDrive and will be destroyed automatically after 90 days of inactivity.
</div>

{**document owners**}

To add users or teams as owners: 

1. Select them in the list of contacts on the right. 
2. Add them to the list with the <i class="fa fa-arrow-left"></i> button.

To remove an owner, use the <i class="fa fa-times"></i> button next to their name. 
