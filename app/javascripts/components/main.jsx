var React = require('react');
var mui = require('material-ui');
var RaisedButton = mui.RaisedButton;
var ThemeManager = new mui.Styles.ThemeManager();
var Colors = mui.Styles.Colors;

var Main = React.createClass({
  childContextTypes: {
    muiTheme: React.PropTypes.object
  },

  getChildContext() {
    return {
      muiTheme: ThemeManager.getCurrentTheme()
    };
  },

  componentWillMount() {
    ThemeManager.setPalette({
      accent1Color: Colors.deepOrange500
    });
  },

  _handleTouchTap() {
    alert('hello world');
  },

  render() {
    var containerStyle = {
      textAlign: 'center',
      paddingTop: '200px'
    };

    return (
      <div style={containerStyle}>
        <h1>material-ui</h1>
        <h2>example project</h2>

        <RaisedButton label="Super Secret Password"
                      primary={true}
                      onTouchTap={this._handleTouchTap}
        />
      </div>
    );
  }
});

module.exports = Main;
