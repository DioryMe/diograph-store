var webpack = require('webpack');

module.exports = {
  mode: "development",
  entry: "./app/diograph-store.ts",
  output: {
    filename: "./dist/bundle.js",
    path: __dirname,
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: [ { loader: "ts-loader" } ]
      }
    ]
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js']
  },
  plugins: [
    new webpack.EnvironmentPlugin({
      'DIOGRAPH_SERVER_HOST': 'http://localhost:3000'
    })
  ]
};
