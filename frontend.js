const webpack = require('webpack');
const webpackOpts = require('./webpack.config');

module.exports = function webtask(cb) {
  webpack(webpackOpts, (err, stats) => {
    cb(err)
  })
}