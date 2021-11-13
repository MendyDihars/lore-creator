const { config } = require('dotenv');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
config();

const { NODE_ENV } = process.env;

module.exports = {
  entry: path.resolve(__dirname, 'web', 'index.ts'),
  mode: NODE_ENV,
  target: 'web',
  output: {
    path: path.resolve(__dirname, 'web', 'public'),
    filename: 'bundle.js'
  },
  resolve: {
    extensions: ['.js', '.jsx', '.ts', '.tsx']
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        exclude: /node_modules/,
        use: [
          'ts-loader'
        ]
      },
      {
        test: /\.tsx?$/,
        exclude: /node_modules/,
        use: [
          'babel-loader'
        ]
      },
      {
        test: /\.s?css$/,
        exclude: /node_modules/,
        use: [
          "style-loader",
          "css-loader",
          "sass-loader"
        ]
      }
    ]
  },
  watch: NODE_ENV === 'development',
  plugins: [
    new HtmlWebpackPlugin({
      template: path.join(__dirname, 'web', 'index.html')
    })
  ]
}