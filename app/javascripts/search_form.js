/** @jsx React.DOM */
var React = require('react');

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
});

var PlacesSearch = React.createClass({
  render: function() {
    return (
      <input id="places-search" className="form-control" placeholder="Type a location" />
    );
  },
  componentDidMount: function() {
    var locationCallback = this.props.placeChanged;

    // Set up the search box
    var defaultBounds = new google.maps.LatLngBounds(
      new google.maps.LatLng(20.3111981, -158.8405013),
      new google.maps.LatLng(22.2711981, -156.8005013)
    );

    var autocomplete = new google.maps.places.Autocomplete(this.getDOMNode(), {
      bounds: defaultBounds,
      radius: 200,
      componentRestrictions: {country: 'us'}
    });

    google.maps.event.addListener(autocomplete, 'place_changed', function() {
      locationCallback(autocomplete.getPlace());
    });
  }
});

var SearchForm = React.createClass({
  render: function() {
    return (
      <form><div className="input-group">
        <span className="input-group-btn"><LocationButton /></span>
        <PlacesSearch placeChanged={this.props.placeChanged} />
      </div></form>
    );
  }
});

module.exports = SearchForm;
