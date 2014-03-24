/** @jsx React.DOM */
var React = require('react');
var $ = require('jquery');
var Backbone = require('backbone');
var SearchForm = require('./components/search_form');
var models = require('./models');

Backbone.$ = $;

var LocationCollection = models.LocationCollection;
var Locations = new LocationCollection();

// Backbone Views
var ResultsView = Backbone.View.extend({
  initialize: function() {
    Locations.fetch({
      success: function(collection) {
        console.log(collection);
      }
    });
  }
});

var SearchView = Backbone.View.extend({
  initialize: function() {
    this.render();
  },
  handleLocation: function(lat, lng) {
    console.log("Lat: " + lat);
    console.log("Lng: " + lng);
  },
  render: function() {
    React.renderComponent(
      <SearchForm handleLocation={this.handleLocation.bind(this)} />, this.el
    );

    return this;
  }
});

module.exports = {
  ResultsView: ResultsView,
  SearchView: SearchView
}
