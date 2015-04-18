# observable-collection

An `Array` wrapper that emits events when the underlying `Array` is modified.

## Installation

    $ npm install --save digitaledgeit/observable-collection

## Usage
    
    var collection = require('digitaledgeit-observable-collection');
    
    function update(item, index) {
      //update the view
    }
    
    collection()
      .on('added',    update)
      .on('removed',  update)
      .on('emptied',  update)
      .append({name: 'Bill'})
      .append({name: 'Mark'})
      .prepend({name: 'Steve'})
      .each(function(item) {
        console.log(item);
      })
    ;

## API

### new Collection()

Create a new collection.

### Properties

#### .first : *

Get the first item in the collection.

#### .last : *

Get the last item in the collection.

#### .empty : boolean

Check whether the collection is empty.

#### .length : number

Get the length of the collection.

### Methods

#### .at(index : number) : *
#### .contains(item : *) : boolean
#### .indexOf(item : *) : number
#### .prepend(item : *)
#### .append(item : *)
#### .remove(item : *)
#### .removeAt(index : number)
#### .removeAll()
#### .each(fn : function)
#### .find(fn : function) : *
#### .toArray() : Array
#### .toString() : string

### Events

#### #added
- item
- index

#### #removed
- item
- index

#### #emptied
