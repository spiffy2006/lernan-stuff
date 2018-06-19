var Recursor = require('cb-recurse');
module.exports = function isEmptyish(data) {
  var empty = true;
  Recursor.recurse(data, function(value) {
    if (!!value) {
      empty = false;
    }
  });
  return empty;
};
