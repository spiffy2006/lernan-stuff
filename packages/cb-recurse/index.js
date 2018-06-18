function Recursor(data, singleValueCB) {
  this.data = data;
  this.cb = singleValueCB;
  this.singleValueTypes = ["undefined", "boolean", "number", "string", "symbol", "function"];
}

Recursor.prototype.isSingleValue = function(data) {
  var type = typeof data;
  // typeof null === "object" it ruins lives"
  if (data === null) { 
    return true;
  } else if (this.singleValueTypes.indexOf(type) > -1) {
    return true;
  } else {
    return false;
  }
}

Recursor.prototype.recurseObject = function(obj) {
  var keys = Object.keys(obj);
  for (var i = 0; i < keys.length; i++) {
    if (this.isSingleValue(obj[keys[i]])) {
      this.callback(obj[keys[i]]);
    } else {
      this.recurseNonSingleValue(obj[keys[i]]);
    }
  }
}

Recursor.prototype.recurseArray = function(arr) {
  for (var i = 0; i < arr.length; i++) {
    if (this.isSingleValue(arr[i])) {
      this.callback(arr[i]);
    } else {
      this.recurseNonSingleValue(arr[i]);
    }
  }
}

Recursor.prototype.recurseNonSingleValue = function(data) {
  switch(data.constructor) {
    case Array:
      this.recurseArray(data);
      break;
    case Object:
      this.recurseObject(data);
      break;
    default:
      this.callback(data);
  }
}

Recursor.prototype.recurse = function() {
  if (this.isSingleValue(this.data)) {
    this.callback(this.data);
  } else {
    this.recurseNonSingleValue(this.data);
  }
}

Recursor.prototype.callback = function(singleValue) {
  this.cb(singleValue);
}

Recursor.recurse = function(data, cb) {
  var r = new Recursor(data, cb);
  r.recurse();
}

  module.exports = Recursor;