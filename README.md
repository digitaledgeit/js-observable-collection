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

### Properties

#### .first : *
#### .last : *
#### .empty : boolean
#### .length : number

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
