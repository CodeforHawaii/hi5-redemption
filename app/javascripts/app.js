var $ = require('jquery');
var views = require('./views');

var SearchView = views.SearchView;
var ResultsView = views.ResultsView;

$(function() {
  var searchView = new SearchView({el: $('#search')});
  var resultsView = new ResultsView({el: $('#results')});
});
