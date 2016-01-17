const webpack = require('webpack')
const secrets = require('./secrets.json')

module.exports = {
  devtool: 'source-map',
  entry: {
    app: './src/main.js'
  },
  eslint: {
    formatter: require('eslint-friendly-formatter')
  },
  module: {
    loaders: [
      {
        test: /\.vue$/,
        loader: 'vue'
      }, {
        test: /\.js$/,
        loader: 'babel!eslint',
        exclude: /node_modules/
      }, {
        test: /\.json$/,
        loader: 'json'
      }, {
        test: /\.(png|jpg|gif|svg)$/,
        loader: 'url',
        query: {
          limit: 10000,
          name: '[name].[ext]?[hash]'
        }
      }
    ]
  },
  plugins: [
    new webpack.DefinePlugin({
      __DEBUG__: false,
      __MAPS_KEY__: JSON.stringify(secrets.production.GOOGLE_MAPS_API_KEY)
    })
  ],
  output: {
    path: `${process.cwd()}/public/assets`,
    filename: '[name].js'
  },
  resolve: {
    extensions: ['', '.js', '.vue'],
    alias: {
      'src': `${process.cwd()}/src`
    }
  },
  vue: {
    loaders: {
      js: 'babel!eslint',
      postcss: [
        require('postcss-font-magician')(),
        require('postcss-url')(),
        require('postcss-cssnext')(),
        require('postcss-browser-reporter')(),
        require('postcss-reporter')()
      ],
      autoprefixer: false
    }
  }
}
