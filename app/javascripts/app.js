'use strict';

var $ = require('jquery');
var AppController = require('./views').AppController;
var Router = require('./router');

/** Converts numeric degrees to radians */
if (typeof(Number.prototype.toRad) === 'undefined') {
  Number.prototype.toRad = function() {
    return this * Math.PI / 180;
  };
}

$(function() {
  new AppController({el: $('body')});
  new Router();
});
