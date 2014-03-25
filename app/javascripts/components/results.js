/** @jsx React.DOM */
var React = require('react');

var ResultRow = React.createClass({
  render: function() {
    var location = this.props.location;

    return (
      <li>
        <h3>{location.fullName()}</h3>
        <p><strong>{location.todaysHours()}</strong></p>
        <p>{location.attributes.LOCATION}</p>
        <p>{location.attributes.ADDRESS}</p>
      </li>
    );
  }
});

var ResultList = React.createClass({
  render: function() {
    var rows = [];
    this.props.locations.forEach(function(location) {
      rows.push(<ResultRow location={location} key={location.id} />);
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
