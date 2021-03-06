var emitter = require('component-emitter');

/**
 * Create a collection of items
 * @constructor
 * @returns {ObservableCollection}
 */
function ObservableCollection() {

  if (!(this instanceof ObservableCollection)) {
    return new ObservableCollection();
  }

  /** @private */
  //this.type = undefined;//TODO:

  /** @private */
  this.items = [];

}

ObservableCollection.prototype = {

  /**
   * Get whether the collection contains the item
   * @param     {*}   item
   * @returns   {boolean}
   */
  contains: function(item) {
    return this.items.indexOf(item) !== -1;
  },

  /**
   * Get the position of the item in the collection
   * @param     {*}   item
   * @returns   {number}
   */
  indexOf: function(item) {
    return this.items.indexOf(item);
  },

  /**
   * Get the item at the index
   * @param     {number}  index
   * @returns   {*}
   */
  at: function(index) {
    return this.items[index];
  },

  /**
   * Add the item to a specific position in
   * @param     {*}       item
   * @param     {number}  index
   * @returns   {ObservableCollection}
   */
  insert: function(item, index) {

    if (index < 0 || index > this.items.length) {
      throw new RangeError('Index out of bounds');
    }

    this.items.splice(index, 0, item);
    this.emit('added', item, index);

    return this;
  },

  /**
   * Add the item to the start of the collection
   * @param     {*}       item
   * @returns   {ObservableCollection}
   */
  prepend: function(item) {
    this.insert(item, 0);
    return this;
  },

  /**
   * Add the item to the end of the collection
   * @param     {*}       item
   * @returns   {ObservableCollection}
   */
  append: function(item) {
    this.insert(item, this.items.length);
    return this;
  },

  //TODO: move(index, index)

  /**
   * Remove the first occurrence of an item
   * @param     {*}   item
   * @returns   {ObservableCollection}
   */
  remove: function(item) {

    //find the item
    var index = this.items.indexOf(item);

    //check the item was found in the collection
    if (index === -1) {
      return this;
    }

    //remove the item from the collection
    this.removeAt(index);

    return this;
  },

  /**
   * Remove a single item at a specific index
   * @param   {number} index
   * @returns {ObservableCollection}
   */
  removeAt: function(index) {

    //check the item was found in the collection
    if (index < 0 || index >= this.items.length) {
      throw new RangeError('Index out of bounds');
    }

    //remove the item from the collection
    var removed = this.items.splice(index, 1);
    this.emit('removed', removed[0], index);

    return this;
  },

  /**
   * Remove all items from the collection
   * @returns {ObservableCollection}
   */
  removeAll: function() {
    this.items.splice(0, this.items.length);
    this.emit('emptied');
    return this;
  },

  /**
   * Iterate over each item
   * @param   {function(*, number)} fn
   * @returns {ObservableCollection}
   */
  each: function(fn) {
    for (var i=0; i<this.items.length; ++i) {
      fn.call(this, this.items[i], i);
    }
    return this;
  },

  /**
   * Find the first item matching the criteria in the collection
   * @param   {function(*, number)} fn
   * @returns {*}
   */
  find: function(fn) {
    for (var i=0; i<this.items.length; ++i) {
      if (fn.call(this, this.items[i], i)) {
        return this.items[i];
      }
    }
    return undefined;
  },

  /**
   * Get an array representation of the collection
   * @returns {Array.<T>}
   */
  toArray: function() {
    return this.items.slice(0);
  },

  /**
   * Get a string representation of the collection
   * @returns {string}
   */
  toString: function() {
    return '[Collection '+JSON.stringify(this.items)+']';
  }

};

emitter(ObservableCollection.prototype);

Object.defineProperties(ObservableCollection.prototype, {

  /**
   * Get whether the collection is empty
   * @name  ObservableCollection#empty
   * @type  {boolean}
   */
  empty: {
    get: function () {
      return this.items.length === 0;
    }
  },

  /**
   * Get the number of items in the collection
   * @name  ObservableCollection#length
   * @type  {number}
   */
  length: {
    get: function () {
      return this.items.length;
    }
  },

  /**
   * Get the first item in the collection
   * @name  ObservableCollection#first
   * @type  {*}
   */
  first: {
    get: function() {
      return this.items[0];
    }
  },

  /**
   * Get the last item in the collection
   * @name  ObservableCollection#last
   * @type  {*}
   */
  last: {
    get: function() {
      return this.items[this.items.length-1];
    }
  }

});

module.exports = ObservableCollection;