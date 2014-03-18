/** @jsx React.DOM */
var React = require('react');
var Backbone = require('backbone');
var Q = require('q');

var LocationButton = React.createClass({
  onClick: function() {
    alert('Clicked location button');
  },
  render: function() {
    return (
      <button type="button" className="btn btn-primary" onClick={this.onClick}>
        <span className="glyphicon glyphicon-globe"></span>
      </button>
    );
  }
})

var PlacesSearch = React.createClass({
  render: function() {
    return(
      <input id="placesSearch" className="form-control" placeholder="Type a location" />
    );
  }
});

React.renderComponent(
  <div className="input-group">
    <span className="input-group-btn"><LocationButton /></span>
    <PlacesSearch />
  </div>, document.getElementById('search-form')
);
