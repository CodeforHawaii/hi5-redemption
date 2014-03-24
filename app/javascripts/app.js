var $ = require('jquery');
var views = require('./views');
var models = require('./models');

var SearchView = views.SearchView;
var LocationCollection = models.LocationCollection;
var Locations = new LocationCollection();

$(function() {
  var view = new SearchView({el: $('#search')});

  Locations.fetch({
    success: function(collection) {
      console.log(collection);
    }
  });
});
