/** @jsx React.DOM */
var React = require('react');
var $ = require('jquery');
var Backbone = require('backbone');
var SearchForm = require('./components/search_form');

Backbone.$ = $;

// Backbone Views
var ResultView = Backbone.View.extend({
  initialize: function() {
    this.render();
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
  ResultView: ResultView,
  SearchView: SearchView
}
