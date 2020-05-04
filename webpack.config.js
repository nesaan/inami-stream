const path = require('path');
const inamiWebpackPlugin = require('./inami-webpack-plugin');


module.exports = {
  "mode": "development",
  "entry":  __dirname + "/src/web/index.js",
  "output": {
      "path": __dirname + '/public/web/',
      "filename": 'web.bundle.js'
  },
  "module": {
      "rules": [
          {
              "enforce": "pre",
              "test": /\.(js|jsx)$/,
              "exclude": /node_modules/,
              "use": "eslint-loader"
          },
          {
              "test": /\.(js|jsx)$/,
              "exclude": /node_modules/,
              "use": {
                  "loader": "babel-loader"
              }
          },
          {
            test: /\.(png|jpe?g|gif)$/i,
            use: [
              {
                loader: 'file-loader',
              },
            ],
          },
          {
              "test": /\.css$/,
              "use": [
                  "style-loader",
                  "css-loader"
              ]
          }
      ]
  },
  "plugins": [inamiWebpackPlugin],
  "target": "electron-renderer",
  "externals":{
      "nedb": "commonjs nedb"
  }
};