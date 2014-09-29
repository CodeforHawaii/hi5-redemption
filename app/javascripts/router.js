'use strict';

var Backbone = require('backbone');

var Router = function() {
  var router = Backbone.Router.extend({
    routes: {
      '*actions': 'defaultRoute'
    }
  });

  Backbone.history.start();
  return router;
};

module.exports = Router;
