const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
  entry: './index.js',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist'),
  },
  module: {
    rules: [{
      test: /\.jsx?$/,
      exclude: [/node_modules/],
      use: {
        loader: 'babel-loader',
        options: {
          presets: ['@babel/preset-env', '@babel/preset-react'],
        },
      },
    },{
      test: /\.css$/,
      use: [MiniCssExtractPlugin.loader, 'css-loader'],
    }]
  },
  devServer: {
    writeToDisk: true
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: 'bundle.css'
    }),
  ],
  resolve: {
    // modules: ['node_modules', '.'],
    extensions: ['.js', '.jsx'],
  },
};