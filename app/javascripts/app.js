var $ = require('jquery');
var AppController = require('./views').AppController;

/** Converts numeric degrees to radians */
if (typeof(Number.prototype.toRad) === "undefined") {
  Number.prototype.toRad = function() {
    return this * Math.PI / 180;
  }
}

$(function() {
  var controller = new AppController({el: $('body')});
});
