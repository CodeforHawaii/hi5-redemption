var React = require('react');

var Main = require('./components/main.jsx!');

require('./polyfills')();

React.render(<Main />, document.body);
