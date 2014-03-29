var Backbone = require('backbone');

var parseTime = function(time) {
  var ampm = "AM";
  var hour = Math.floor(time / 100);
  var minutes = time - (hour * 100);

  if (minutes < 10) {
    minutes = "0" + minutes;
  }
  if (hour === 0) {
    hour = 12;
  }
  else if (hour === 12) {
    ampm = "PM";
  }
  else if (hour > 12) {
    hour -= 12;
    ampm = "PM"
  }

  return hour + ":" + minutes + " " + ampm;
}

var distance = function(p1, p2) {
  // Implementation of the haversine formula.
  // http://www.movable-type.co.uk/scripts/latlong.html
  var R = 3959; // Miles, not km.

  var d1 = (p2[0] - p1[0]).toRad();
  var d2 = (p2[1] - p1[1]).toRad();
  var lat1 = p1[0].toRad();
  var lat2 = p2[0].toRad();

  var a = Math.sin(d1 / 2) * Math.sin(d1 / 2) +
          Math.sin(d2 / 2) * Math.sin(d2 / 2) * Math.cos(lat1) * Math.cos(lat2);

  var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));

  return R * c;
};

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
  },
  getDistanceFrom: function(coords) {
    var geometry = [this.attributes.geometry[1], this.attributes.geometry[0]]
    return distance(coords, geometry);
  }
});

var LocationCollection = Backbone.Collection.extend({
  model: Location,
  url: "/locations.json",
  sortNear: function(current) {
    // Set this collection's comparator before sorting.
    this.comparator = function(location) {
      return location.getDistanceFrom(current);
    }

    return this.sort();
  }
});

module.exports = {
  LocationCollection: LocationCollection
};
