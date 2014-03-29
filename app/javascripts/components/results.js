/** @jsx React.DOM */
var React = require('react');

var ResultRow = React.createClass({
  render: function() {
    var location = this.props.location;
    var coords = this.props.coords;

    return (
      <li>
        <h3>{location.fullName()}</h3>
        <p><strong>{location.todaysHours()}</strong></p>
        <p>{location.attributes.LOCATION}</p>
        <p>{location.attributes.ADDRESS}</p>
        <p>{location.getDistanceFrom(coords).toFixed(1)} miles away</p>
      </li>
    );
  }
});

var ResultList = React.createClass({
  render: function() {
    var rows = [];
    var coords = this.props.coords;
    
    this.props.locations.sortNear(this.props.coords);
    this.props.locations.forEach(function(location) {
      rows.push(<ResultRow location={location} coords={coords} key={location.id} />);
    });

    return (
      <div>
      <h2>Results near "{this.props.address}"</h2>
      <ul className="list-unstyled">{rows}</ul>
      </div>
    );
  }
});

module.exports = ResultList;
