var assert = require('assert');
var Collection = require('..');

describe('observable-collection', function() {

  describe('.insert()', function() {

    it('should increase the length of the collection', function() {

      var collection = new Collection();

      assert.equal(collection.length, 0);
      collection.insert({name: 'John Smith'}, 0);
      assert.equal(collection.length, 1);

    });

    it('should emit an event after the item is added', function(done) {

      var collection = new Collection();

      assert.equal(collection.length, 0);

      collection.on('added', function(item, index) {
        assert.equal(collection.length, 1);
        assert.equal(index, 0);
        done();
      });

      collection.insert({name: 'John Smith'}, 0);

    });

    it('should add the item at the start', function() {

      var person1 = {name: 'Mad Dan'};
      var person2 = {name: 'Ned Kelley'};
      var person3 = {name: 'Mad Max'};

      var collection = new Collection();
      collection
        .append(person1)
        .append(person2)
        .insert(person3, 0)
      ;

      assert.equal(collection.indexOf(person3), 0);

    });
    it('should add the item in the middle', function() {

      var person1 = {name: 'Mad Dan'};
      var person2 = {name: 'Ned Kelley'};
      var person3 = {name: 'Mad Max'};

      var collection = new Collection();
      collection
        .append(person1)
        .append(person2)
        .insert(person3, 1)
      ;

      assert.equal(collection.indexOf(person3), 1);

    });

    it('should add the item at the end', function() {

      var person1 = {name: 'Mad Dan'};
      var person2 = {name: 'Ned Kelley'};
      var person3 = {name: 'Mad Max'};

      var collection = new Collection();
      collection
        .append(person1)
        .append(person2)
        .insert(person3, collection.length)
      ;

      assert.equal(collection.indexOf(person3), collection.length-1);

    });

  });

  describe('.prepend()', function() {

    it('should increase the length of the collection', function() {

      var collection = new Collection();

      assert.equal(collection.length, 0);
      collection.append({name: 'John Smith'});
      assert.equal(collection.length, 1);

    });

    it('should emit an event after the item is added', function(done) {

      var collection = new Collection();

      assert.equal(collection.length, 0);

      collection.on('added', function(item, index) {
        assert.equal(collection.length, 1);
        assert.equal(index, 0);
        done();
      });

      collection.prepend({name: 'John Smith'});

    });

    it('should add the item at the start', function() {

      var person1 = {name: 'Mad Dan'};
      var person2 = {name: 'Ned Kelley'};

      var collection = new Collection();
      collection
        .prepend(person1)
        .prepend(person2)
      ;

      assert.equal(collection.indexOf(person2), 0);

    });

  });

  describe('.append()', function() {

    it('should increase the length of the collection', function() {

      var collection = new Collection();

      assert.equal(collection.length, 0);
      collection.append({name: 'John Smith'});
      assert.equal(collection.length, 1);

    });

    it('should emit an event after the item is added', function(done) {

      var collection = new Collection();

      assert.equal(collection.length, 0);

      collection.on('added', function(item, index) {
        assert.equal(collection.length, 1);
        assert.equal(index, collection.length-1);
        done();
      });

      collection.append({name: 'John Smith'});

    });

    it('should add the item at the end', function() {

      var person1 = {name: 'Mad Dan'};
      var person2 = {name: 'Ned Kelley'};

      var collection = new Collection();
      collection
        .append(person1)
        .append(person2)
      ;

      assert.equal(collection.indexOf(person2), collection.length-1);

    });

  });

  describe('.remove()', function() {

    it('should decrease the length of the collection', function() {

      var person1 = {name: 'Mad Dan'};
      var person2 = {name: 'Ned Kelley'};

      var collection = new Collection();
      collection
        .append(person1)
        .append(person2)
      ;

      assert.equal(collection.length, 2);
      collection.remove(person1);
      assert.equal(collection.length, 1);

    });

    it('should emit an event after the item is removed', function(done) {

      var person1 = {name: 'Mad Dan'};
      var person2 = {name: 'Ned Kelley'};

      var collection = new Collection();
      collection
        .append(person1)
        .append(person2)
      ;

      assert.equal(collection.length, 2);

      collection.on('removed', function() {
        assert.equal(collection.length, 1);
        done();
      });

      collection.remove(person2);

    });

    it('should remove the first item from the collection', function() {

      var person1 = {name: 'Mad Dan'};
      var person2 = {name: 'Ned Kelley'};
      var person3 = {name: 'Mad Max'};

      var collection = new Collection();
      collection
        .append(person1)
        .append(person2)
        .append(person3)
      ;

      collection.remove(person1);
      assert.equal(collection.at(0), person2);
      assert.equal(collection.at(1), person3);
      assert.equal(2, collection.length);

    });

    it('should remove the middle item from the collection', function() {

      var person1 = {name: 'Mad Dan'};
      var person2 = {name: 'Ned Kelley'};
      var person3 = {name: 'Mad Max'};

      var collection = new Collection();
      collection
        .append(person1)
        .append(person2)
        .append(person3)
      ;

      collection.remove(person2);
      assert.equal(collection.at(0), person1);
      assert.equal(collection.at(1), person3);
      assert.equal(2, collection.length);

    });

    it('should remove the last item from the collection', function() {

      var person1 = {name: 'Mad Dan'};
      var person2 = {name: 'Ned Kelley'};
      var person3 = {name: 'Mad Max'};

      var collection = new Collection();
      collection
        .append(person1)
        .append(person2)
        .append(person3)
      ;

      collection.remove(person3);
      assert.equal(collection.at(0), person1);
      assert.equal(collection.at(1), person2);
      assert.equal(2, collection.length);

    });

  });


  describe('.removeAll()', function() {

    it('should decrease the length of the collection', function() {

      var person1 = {name: 'Mad Dan'};
      var person2 = {name: 'Ned Kelley'};

      var collection = new Collection();
      collection
        .append(person1)
        .append(person2)
      ;

      assert.equal(collection.length, 2);
      collection.removeAll();
      assert.equal(collection.length, 0);

    });

    it('should emit an event after the item is removed', function(done) {

      var person1 = {name: 'Mad Dan'};
      var person2 = {name: 'Ned Kelley'};

      var collection = new Collection();
      collection
        .append(person1)
        .append(person2)
      ;

      assert.equal(collection.length, 2);

      collection.on('emptied', function() {
        assert.equal(collection.length, 0);
        done();
      });

      collection.removeAll();

    });

  });

});