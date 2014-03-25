/** @jsx React.DOM */
var React = require('react');

var ResultRow = React.createClass({
  render: function() {
    return (
      <li>{this.props.location.fullName()}</li>
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
      <ul>{rows}</ul>
    );
  }
});

module.exports = ResultList;
