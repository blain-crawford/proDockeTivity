const path = require('path');

module.exports = {
  mode: "development",
  entry: './src/index.js',
  output: {
    filename: 'main.js',
    path: path.resolve(__dirname, 'dist'),
  },
  devtool: "source-map",
  devServer: {
    hot: 'only',
    static: {
      directory: 'dist',
      watch: true
    }
  },
  module: {
    rules: [
      {
        test: /\.js$/i,
        exclude: /node_modules/
      },
      {
        test: /\.css$/i,
        // use: ['style-loader', 'css-loader']
      },
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/i,
        type: 'asset/resource',
      },
    ]
  }
};