/** @jsx React.DOM */
var React = require('react');

var ResultRow = React.createClass({
  render: function() {
    var location = this.props.location;
    var coords = this.props.coords;

    return (
      <li className='list-group-item'>
        <h3>{location.fullName()}</h3>
        <p><strong>{location.todaysHours()}</strong></p>
        <p>{location.attributes.ADDRESS}</p>
        <p>{location.getDistanceFrom(coords).toFixed(1)} miles away</p>
      </li>
    );
  }
});

var ResultMap = React.createClass({
  componentDidMount: function() {
    var mapOptions = {
      center: new google.maps.LatLng(this.props.mapCenter[0], this.props.mapCenter[1]),
      zoom: 16
    };

    var map = new google.maps.Map(document.getElementById("resultMap"), mapOptions);
  },
  render: function() {
    return (<div id="resultMap"></div>);
  }
})

var ResultList = React.createClass({
  render: function() {
    var coords = this.props.coords;
    this.props.locations.sortNear(coords);

    return (
      <div className="row">
      <div className="col-sm-4">
        <ul className="list-group">
          {this.props.locations.map(function(location) {
            return new ResultRow({
              location: location,
              coords: coords,
              key: location.id
            });
          })}
        </ul>
      </div>
      <div className="col-sm-8">
        <ResultMap mapCenter={coords}/>
      </div>
      </div>
    );
  }
});

module.exports = ResultList;
