import { join, resolve } from 'path';
import { HotModuleReplacementPlugin } from 'webpack';
import HtmlWebpackPlugin from 'html-webpack-plugin';

module.exports = {
  entry: ["@babel/polyfill", join(__dirname, 'frontend', 'index.js')],
  output: {
    path: join(__dirname, 'client-build'),
    filename: 'index.bundle.js',
    publicPath: '/'
  },
  mode: process.env.NODE_ENV || 'development',
  resolve: {
    modules: [ resolve(__dirname, 'frontend'), 'node_modules' ]
  },
  devServer: { 
    contentBase: join(__dirname, 'frontend'),
    hot: true,
    historyApiFallback: true,
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
	exclude: /node_modules/,
	use: [ 'babel-loader' ]
      },
      {
        test: /\.s?css$/,
	use: [
	  "style-loader",
          "css-loader",
	  "sass-loader"
	]
      },
      {
        test: /\.(jpg|jpeg|png|gif|mp3|svg)$/,
	loaders: ['file-loader']
      }
    ]
  },
  plugins: [
    new HotModuleReplacementPlugin(),
    new HtmlWebpackPlugin({
      template: join(__dirname, 'frontend', 'index.html')
    })
  ]
};
