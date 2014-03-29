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
  setResult: function(result) {
    this.location = result.name;
    this.coords = [result.latitude, result.longitude];

    if (typeof this.component === 'undefined') {
      this.render();
    }
    else {
      this.updateComponent();
    }
  },
  updateComponent: function() {
    this.component.setProps({
      address: this.location,
      coords: this.coords,
      locations: this.collection
    });
  },
  render: function() {
    Locations.fetch({
      success: function(collection) {
        this.collection = collection;

        this.component = React.renderComponent(
          new ResultList({
            address: this.location,
            coords: this.coords,
            locations: this.collection
          }), this.el
        );
      }.bind(this)
    });

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
      new SearchForm({
        handleLocation: this.parent.handleLocation.bind(this.parent)
      }), this.el
    );

    return this;
  }
});

var AppController = Backbone.View.extend({
  handleLocation: function(result) {
    this.resultsView.setResult(result);
  },
  initialize: function() {
    this.searchView = new SearchView({el: $('#search'), parent: this});
    this.resultsView = new ResultsView({el: $('#results')});
  }
});

module.exports = {
  AppController: AppController
}
