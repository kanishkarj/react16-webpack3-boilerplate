const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const CleanWebpackPlugin = require('clean-webpack-plugin');
const webpack = require('webpack');

const ExtractCSSPlugin = new ExtractTextPlugin({filename: './assets/css/[name].css'});
const config = {

  context: path.resolve(__dirname, 'src'),
  entry: {
    app: './assets/js/app.js',
    vendor: ['babel-polyfill']
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'assets/js/[name].bundle.js'
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: ['babel-loader']
      },
      {
        test: /\.(html)$/,
        use: {
          loader: 'html-loader'
        }
      },
      {
        test: /\.scss$/,
        include: [path.resolve(__dirname, 'src', 'assets', 'scss')],
        use: ExtractCSSPlugin.extract({
          use: [
            {
              loader:'css-loader',
              options: {
                minimize : true
              }
            },
            {
              loader:'sass-loader',
              options: {

              }
            }
          ],
          fallback: 'style-loader'
        })
      },
      {
        test: /\.(png|jpg|gif|svg|jpeg)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[name].[ext]',
              outputPath: './assets/media/'
            }
          }
        ]
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              name: '[name].[ext]',
              outputPath: './assets/fonts/',
              //publicPath: './assets/fonts/'
            }
          }
        ]
      }
    ]

  },
  plugins: [
    new HtmlWebpackPlugin({title: 'Production', template: 'index.html'}),
    new CleanWebpackPlugin(['dist']),
    ExtractCSSPlugin,
    new webpack.optimize.CommonsChunkPlugin({
      name: "vendor",
      minChunks: Infinity,
    })
  ]
};

module.exports = config;
