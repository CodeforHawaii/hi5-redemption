'use strict';

var AppController = require('./views.js!jsx').AppController;

// Inject the tap event plugin.
require('react-tap-event-plugin')();
require('./polyfills.js')();

new AppController({el: document.getElementsByTagName('body')[0]});
