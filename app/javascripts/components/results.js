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
        <div className='col-xs-8'>
          <h3>{location.fullName()}</h3>
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
});

var ResultList = React.createClass({
  selectItem: function (item) {
    console.log(item);
  },
  render: function() {
    var coords = this.props.coords;
    this.props.locations.sortNear(coords);

    var list = this;

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
        <ResultMap mapCenter={coords}/>
      </div>
      </div>
    );
  }
});

module.exports = ResultList;
