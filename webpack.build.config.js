const HtmlWebpackPlugin = require('html-webpack-plugin')

const webpackConfig = {
  entry: './src/index.js',
  output: {
    path: `${__dirname}/build/`,
    filename: 'redux-logdown.js',
    libraryTarget: 'umd'
  }
}

module.exports = webpackConfig
