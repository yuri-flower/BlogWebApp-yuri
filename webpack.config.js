const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const path = require('path');
const dotenv = require('dotenv').config();
module.exports = {
  entry: {
    dom: './src/pages/dom.js',
    index: './src/pages/index.js',
    intro: './src/pages/intro.js',
    outro: './src/pages/outro.js'
  },
  output: {
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, 'dist'),
  },
  module: {
    rules: [
      {
        test: /\.html$/i,
        loader: 'html-loader',
      },
      {
        test: /\.(png|jpg|gif|svg|otf|eot|ttf|woff|woff2)$/,
        use: [
          {
            loader: 'file-loader',
          },
        ],
      },
      {
        test: /\.(s[ac]ss|css)$/i,
        use: [
          'style-loader',
          'css-loader',
        ],
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: [['@babel/preset-env', {
              targets: {
                esmodules: true,
              }
            }]],
          },
        },
      },
    ],
  },
  plugins: [
    new webpack.DefinePlugin({
      "process.env": JSON.stringify(dotenv.parsed)
    }),
    new HtmlWebpackPlugin({
      hash: true,
      filename: 'index.html',
      template: `${__dirname}/src/pages/index.html`,
      favicon: `${__dirname}/favicon.ico`,
      inject: 'body',
      chunks: ['index'],
    }),
    new HtmlWebpackPlugin({
      hash: true,
      filename: 'dom.html',
      template: `${__dirname}/src/pages/dom.html`,
      favicon: `${__dirname}/favicon.ico`,
      inject: 'body',
      chunks: ['dom'],
    }),
    new HtmlWebpackPlugin({
      hash: true,
      filename: 'intro.html',
      template: `${__dirname}/src/pages/intro.html`,
      favicon: `${__dirname}/favicon.ico`,
      inject: 'body',
      chunks: ['intro'],
    }),
    new HtmlWebpackPlugin({
      hash: true,
      filename: 'outro.html',
      template: `${__dirname}/src/pages/outro.html`,
      favicon: `${__dirname}/favicon.ico`,
      inject: 'body',
      chunks: ['outro'],
    }),
    new webpack.HotModuleReplacementPlugin(),
    new CleanWebpackPlugin(),
  ],
  devServer: {
    publicPath: '/',
    hot: true,
    port: 8080,
  },
};