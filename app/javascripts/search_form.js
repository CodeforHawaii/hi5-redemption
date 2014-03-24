/** @jsx React.DOM */
var React = require('react');
var $ = require('jquery');

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

// Utility function for getting place coordinates
var getCoordinates = function(place) {
  return {
    lat: place.geometry.location.lat(),
    lng: place.geometry.location.lng()
  };
}
var PlacesSearch = React.createClass({
  selectFirstResult: function(callback) {
    // Need to use jQuery to get the DOM node. Sadly, it's out of scope.
    var result = $('.pac-container .pac-item:first').text();
    var geocoder = new google.maps.Geocoder();
    var $node = $(this.getDOMNode());

    // Unfocus node and set value.
    $node.blur();
    $node.prop('value', result);

    // Set the input value to the first location
    geocoder.geocode({"address": result}, function (res, status) {
      if (status === google.maps.GeocoderStatus.OK) {
        var coordinates = getCoordinates(res[0]);
        callback(coordinates.lat, coordinates.lng);
      }
    });
  },
  render: function() {
    return (
      <input id="places-search" className="form-control" placeholder="Type a location" />
    );
  },
  componentDidMount: function() {
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
      var place = autocomplete.getPlace();

      if (typeof place.geometry === "undefined") {
        this.selectFirstResult(this.props.placeChanged);
      }
      else {
        var coordinates = getCoordinates(place);
        this.props.placeChanged(coordinates.lat, coordinates.lng);
      }
    }.bind(this));
  }
});

var SearchForm = React.createClass({
  handleSubmit: function() {
    // Only here to prevent the form from being submitted.
    return false;
  },
  render: function() {
    return (
      <form onSubmit={this.handleSubmit}>
        <div className="input-group">
          <span className="input-group-btn"><LocationButton /></span>
          <PlacesSearch placeChanged={this.props.placeChanged} />
        </div>
      </form>
    );
  }
});

module.exports = SearchForm;
