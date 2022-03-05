const path = require('path')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const CopyPlugin = require('copy-webpack-plugin')

module.exports = {
  entry: [
    'normalize.css',
    './src/index.js'
  ],
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist')
  },
  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: 'src/index.html'
    }),
    new webpack.ProvidePlugin({
      PIXI: 'pixi.js'
    }),
    new CopyPlugin({
      patterns: [
        { from: 'src/fonts/LongCang-Regular.woff', to: 'fonts/LongCang-Regular.woff' },
        { from: 'src/style.css', to: 'style.css' }
      ]
    })
  ],
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: ['style-loader', 'css-loader']
      },
      {
        test: /\.(otf|ttf|woff|woff2)$/,
        use: ['file-loader']
      }
    ]
  }
}
