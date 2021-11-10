const { config } = require('dotenv');
const nodeExternals = require('webpack-node-externals');
const path = require('path');
config();

const { NODE_ENV } = process.env;

module.exports = {
  entry: path.resolve(__dirname, 'web', 'index.ts'),
  mode: NODE_ENV,
  target: 'node',
  output: {
    path: path.resolve(__dirname, 'web', 'public'),
    filename: 'bundle.js'
  },
  resolve: {
    extensions: ['.js', '.ts']
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        use: [
          'ts-loader',
        ]
      }
    ]
  },
  watch: NODE_ENV === 'development',
  externals: [ nodeExternals() ]
}