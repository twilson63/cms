# My Medwise Advisor CMS

My Medwise Advisor CMS is a simple content management portal that enables content managers to modify the content on all of the my medwise advisor applications.

As a Content Manager
I want to create and modify content documents
So that the messaging is consitent across applications and 
can be modified and deployed without developer intervention.

Each document can contain one to many keys, each key can be one of the following types:

* markdown
* text
* image
* file

The value of the key represents the contents or a reference to the content.

A json version of a document would look like this:


```
{
  _id: 'unique id of document',
  name: 'name of the document',
  content: [
    { 
      key: 'unique id of content',
      type: 'text',
      value: 'Your data here'
    }
  ]
}

```

As a Content Manager
I want to see a list of documents
So that I can find the document I would like to modir

As a Content Manager
I want to click the add button to create a new button
So that I can create a new content document

As a Content Manager
I want to search my documents by typing and clicking enter
So that I can narrow my document list by the items that match 
via text in the search box

As a Content Manager
I want to give a content document a name that makes 
it easy to reference at a later time
So that I can reference it at a later time

As a Content Manger
I watn to add one to many content document items,
these items will contain a key which will have no spaces
and must be unique in the document.

As a content manager
I watnt to be able to add documents of type text, markdown, 
images, and files


