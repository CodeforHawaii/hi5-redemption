/** @jsx React.DOM */
var React = require('react');
var $ = require('jquery');
var Backbone = require('backbone');
var SearchForm = require('./search_form');

Backbone.$ = $;

var Location = Backbone.Model.extend({

});

var LocationCollection = Backbone.Collection.extend({
  model: Location,
  url: "/locations.json"
});

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
  placeChanged: function(lat, lng) {
    console.log("Lat: " + lat);
    console.log("Lng: " + lng);
  },
  render: function() {
    React.renderComponent(
      <SearchForm placeChanged={this.placeChanged.bind(this)} />, this.el
    );

    return this;
  }
});

var view = new SearchView({el: $('#search')});
