const webpack = require('webpack');
const BrowserSyncPlugin = require('browser-sync-webpack-plugin');

module.exports = {
     entry:'./js/effect.js',
     output:{
          path:__dirname, 
          filename:'build.js' 
     },
     watch: true,
     module: {
        rules: [
          {
            test: /\.scss$/,
            loader: "style-loader!css-loader!sass-loader"
          },
          {
            test: /\.m?js$/,
            exclude: /(node_modules|bower_components)/,
            use: {
              loader: 'babel-loader',
              options: {
                presets: ['@babel/preset-env']
              }
            }
          }
        ]
     },
     devtool: "source-map",
      plugins: [
        new BrowserSyncPlugin({
          host: 'localhost',
          port: 3000,
          files: ["./index.html"],
          server: { baseDir: ['./'] }
        })
      ]
}