'use strict';

var Backbone = require('backbone');

var Router = Backbone.Router.extend({
  routes: {
    'search?near=:lat,:lng': 'search',
    '*actions': 'defaultRoute'
  }
});

Router.prototype.buildSearchUrl = function(result) {
  return 'search?near=' + result.latitude + ',' + result.longitude;
};

module.exports = Router;
