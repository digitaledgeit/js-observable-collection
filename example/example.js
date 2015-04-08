var collection = require('..');
console.log(collection()
  .on('added', function(item, at) {
    console.log('added:', JSON.stringify(item) +'@'+ at, this.length);
  })
  .on('removed', function(item, at) {
    console.log('removed:', JSON.stringify(item) +'@'+ at, this.length);
  })
  .on('emptied', function(item, at) {
    console.log('emptied:', this.length);
  })
  .append({name: 'James'})
  .append({name: 'Loren'})
  .append({name: 'Michelle'})
  .each(function(person, at) {
    console.log(person.name, at);
  })
  .removeAt(1)
);

