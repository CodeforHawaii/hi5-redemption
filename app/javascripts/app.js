/** @jsx React.DOM */
var React = require('react');
var $ = require('jquery');
var Backbone = require('backbone');
var SearchForm = require('./search_form');

Backbone.$ = $;

var parseTime = function(time) {
  var ampm = "AM";
  var hour = Math.floor(time / 100);
  var minutes = time - (hour * 100);

  if (minutes < 10) {
    mintues = "0" + minutes;
  }
  if (hour === 0) {
    hour = 12;
  }
  else if (hour === 12) {
    ampm = "PM";
  }
  else {
    hour -= 12;
    ampm = "PM"
  }

  return hour + ":" + minutes + " " + ampm;
}

var Location = Backbone.Model.extend({
  initialize: function() {
    this.id = this.attributes.OBJECTID;
  },
  fullName: function() {
    var str = this.attributes.NAME;
    if (this.attributes.COMPANY !== " ") {
      str += " (" + this.attributes.COMPANY + ")";
    }

    return str;
  },
  hasWeekend: function() {
    return this.attributes.WEEKEND !== " ";
  },
  hours: function() {
    var str = "Open " + this.attributes.DAYS + " from " + this.attributes.HOURS;
    if (this.hasWeekend) {
      str += ", " + this.attributes.WEEKEND + " from " + this.attributes.WEEKEND_HO;
    }

    return str;
  },
  todaysHours: function() {
    var date = new Date();
    var day = date.getDay();
    if (typeof this.attributes.hours[day] === "undefined") {
      return "Closed today"
    }

    return "Open today from " + this.openTime(date) + " to " + this.closeTime(date);
  },
  openTime: function(date) {
    var hours = this.attributes.hours;
    var day = date.getDay();
    if (typeof hours[day] === "undefined") {
      return null;
    }

    return parseTime(hours[day].open);
  },
  closeTime: function(date) {
    var hours = this.attributes.hours;
    var day = date.getDay();
    if (typeof hours[day] === "undefined") {
      return null;
    }

    return parseTime(hours[day].close);
  },
  isOpen: function(date) {
    var hours = this.attributes.hours;
    var day = date.getDay();
    if (typeof hours[day] === "undefined") {
      return false;
    }

    var time = (date.getHours() * 100) + date.getMinutes();
    return hours[day].open < time && time < hours[day].close;
  },
  description: function() {
    return this.attributes.DESCRIPTIO;
  },
  generateMapsHref: function() {
    return "http://maps.google.com/maps?daddr=" +
      this.attributes.geometry[1] + "," +
      this.attributes.geometry[0] + "&hl=en";
  }
});

var LocationCollection = Backbone.Collection.extend({
  model: Location,
  url: "/locations.json"
});

var Locations = new LocationCollection();

// Backbone Views
var ResultView = Backbone.View.extend({
  initialize: function() {
    this.render();
  }
});

var SearchView = Backbone.View.extend({
  initialize: function() {
    this.render();
  },
  handleLocation: function(lat, lng) {
    console.log("Lat: " + lat);
    console.log("Lng: " + lng);
  },
  render: function() {
    React.renderComponent(
      <SearchForm handleLocation={this.handleLocation.bind(this)} />, this.el
    );

    return this;
  }
});

$(function() {
  var view = new SearchView({el: $('#search')});

  Locations.fetch({
    success: function(collection) {
      console.log(collection);
    }
  });
});
