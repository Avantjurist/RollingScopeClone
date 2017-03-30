const path = require('path');
const Webpack = require('webpack');

const NODE_ENV = proces.env.NODE_ENV;

const config = {
    entry: './app/index.js',
    output: {
        path: path.join(__dirname, './public/dist'),
        filename: 'bundle.js'
    },
    resolve: {
        extensions: ['', '.js', '.json', '.coffee']
    },
    devtool: NODE_ENV === 'production' ? '' : "source-map"
};

if(NODE_ENV === 'production'){
  config.plugins = [
    new Webpack.optimize.UglifyJsplagin({
      compress: {
        warnings: false;
      }
    })
  ]
}
module.exports = config;
