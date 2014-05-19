/** @jsx React.DOM */
var React = require('react');

var ResultRow = React.createClass({
  handleClick: function () {
    this.props.clickHandler(this.props.location);
  },
  render: function() {
    var location = this.props.location;
    var coords = this.props.coords;

    var iconStyle = {
      align: 'right'
    };

    return (
      <li className='list-group-item row' onClick={this.handleClick}>
        <h3 className='col-xs-12'>{location.fullName()}</h3>
        <div className='col-xs-8'>
          <p><strong>{location.todaysHours()}</strong></p>
          <p>{location.attributes.ADDRESS}</p>
          <p>{location.getDistanceFrom(coords).toFixed(1)} miles away</p>
        </div>
        <div className='col-xs-4 item-icon'>
          <span className="glyphicon glyphicon-chevron-right"></span>
        </div>
      </li>
    );
  }
});

var ResultMap = React.createClass({
  componentWillUpdate: function(current, nextState) {
    var coords = nextState.center.attributes.geometry;
    var center = new google.maps.LatLng(coords[1], coords[0]);
    this.map.setCenter(center);
  },
  componentDidMount: function() {
    var mapOptions = {
      center: new google.maps.LatLng(this.props.mapCenter[0], this.props.mapCenter[1]),
      zoom: 16
    };

    this.map = new google.maps.Map(document.getElementById("resultMap"), mapOptions);
  },
  render: function() {
    return (<div id="resultMap"></div>);
  }
});

var ResultList = React.createClass({
  selectItem: function (item) {
    // Need to tell map to recenter.
    this.map.setState({center: item});
  },
  render: function() {
    var coords = this.props.coords;
    var list = this; // Reference for this when handling clicks.

    // Reference map so we can recenter it.
    this.map = new ResultMap({mapCenter: coords});

    this.props.locations.sortNear(coords);

    return (
      <div className="row">
      <div className="col-sm-4">
        <ul className="list-group">
          {this.props.locations.map(function(location) {
            return new ResultRow({
              location: location,
              coords: coords,
              key: location.id,
              clickHandler: list.selectItem
            });
          })}
        </ul>
      </div>
      <div className="col-sm-8">
        {this.map}
      </div>
      </div>
    );
  }
});

module.exports = ResultList;
