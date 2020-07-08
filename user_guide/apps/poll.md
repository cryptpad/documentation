# Poll

The Polls application is aimed at the facilitation of decisions in small groups of people who trust each other, for example to decide on a meeting date/time.

It is not suited for polling a large number of people, or for situation where the security of the votes is paramount. To cast a vote, each user must have edit rights to the document. This enables each participant to **modify and/or delete answers from other participants**.

A complete re-write of this application is planned for late 2020. 
<!--- XXX watch date and update accordingly --> 

## Toolbar

<i class="fa fa-pencil"></i> **Edit**: Switch to edit mode to change the poll description and response options.

<i class="fa fa-check"></i> **Publish**: Save the changes to the poll description and response options. 

In edit mode: 

<i class="fa fa-wrench"></i> **Tools**: Show/hide the text editor toolbar.

<i class="fa fa-picture-o"></i> **Insert**:  Add an image to the poll description. The image can be chosen in the CrpytDrive or uploaded. {**logged in user**}


## Edit mode 

The poll description is written in [Markdown](https://github.com/adam-p/markdown-here/wiki/Markdown-Cheatsheet).
<!--- localised link if possible. French here: 
https://blog.wax-o.com/2014/04/tutoriel-un-guide-pour-bien-commencer-avec-markdown/ --> 
Use <i class="fa fa-picture-o"></i> **Insert** to add images.

Response options are added to the left of the table. To add an option: 

1. Add a title to the "Option" field.
1. `Click` on <i class="fa fa-plus"></i> or `Enter`. 

To change an option, `Click` on the ✐ to the right of the title. To delete an option, `Click` on <i class="fa fa-times"></i> to the left of the title. 

## Voting

Each vote is logged in a column of the results table. To add a vote: 

1. Add a name to the column title.
1. `Click` on the cells of the options to indicate:
  - ✔ Yes
  - ~ Maybe
  - ✖ No
1. `Click` on **Submit** at the top of the column to save the vote and add it to the total count. 

Use <i class="fa fa-lock"></i> to unlock an existing column and edit the name and votes. Use <i class="fa fa-unlock"></i> to lock the column.

To add a comment to the poll:

1. Write your comment in the field labelled "Your comment".
1. **Send**

## Export

<i class="fa fa-file-o"></i> **File** > <i class="fa fa-download"></i> **Export**   
Supported formats: `.csv`
