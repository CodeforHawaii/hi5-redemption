var $ = require('jquery');
var AppController = require('./views').AppController;

$(function() {
  var controller = new AppController({el: $('body')});
});
