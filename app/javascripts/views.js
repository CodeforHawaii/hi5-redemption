/** @jsx React.DOM */
var React = require('react');
var $ = require('jquery');
var Backbone = require('backbone');
var SearchForm = require('./components/search_form');
var ResultList = require('./components/results');
var models = require('./models');

Backbone.$ = $;

var LocationCollection = models.LocationCollection;
var Locations = new LocationCollection();

var ResultsView = Backbone.View.extend({
  initialize: function() {
    var that = this;
    Locations.fetch({
      success: function(collection) {
        this.collection = collection;
      }.bind(this)
    });
  },
  setCoordinates: function(lat, lng) {
    this.latitude = lat;
    this.longitude = lng;

    this.render();
  },
  render: function() {
    React.renderComponent(
      <ResultList locations={this.collection} />, this.el
    );

    return this;
  }
});

var SearchView = Backbone.View.extend({
  initialize: function(options) {
    this.parent = options.parent;
    this.render();
  },
  render: function() {
    React.renderComponent(
      <SearchForm handleLocation={this.parent.handleLocation.bind(this.parent)} />, this.el
    );

    return this;
  }
});

var AppController = Backbone.View.extend({
  handleLocation: function(lat, lng) {
    this.resultsView.setCoordinates(lat, lng);
  },
  initialize: function() {
    this.searchView = new SearchView({el: $('#search'), parent: this});
    this.resultsView = new ResultsView({el: $('#results')});
  }
});

module.exports = {
  AppController: AppController
}
