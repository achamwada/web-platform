const path = require('path');
const webpack = require('webpack');

const isProduction = process.env.NODE_ENV === 'production';
let entry, output;

if (isProduction) {
  entry = './src/handlers/contentfulHandler.ts';
  output = {
    libraryTarget: 'commonjs2',
    path: path.resolve(__dirname, 'dist'),
    filename: 'contentfulHandler.js',
  };
} else {
  const slsw = require('serverless-webpack');
  entry = slsw.lib.entries;
  output = {
    libraryTarget: 'commonjs2',
    path: path.resolve(__dirname, '.webpack'),
    filename: '[name].js',
  };
}

module.exports = {
  entry: entry,
  target: 'node',
  mode: isProduction ? 'production' : 'development',
  module: {
    rules: [
      {
        test: /\.ts$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
    ],
  },
  resolve: {
    extensions: ['.ts', '.js'],
  },
  output: output,
  externals: {
    'aws-sdk': 'commonjs aws-sdk',
  },
  optimization: {
    minimize: isProduction,
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV),
    }),
  ],
};
