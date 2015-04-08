var collection = require('..');

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

