const path = require("path");
const webpack = require("webpack");

module.exports = {
  entry: {analysis_tree_visualize:"./static/js/tree/analysis_tree_visualize.js"},
  output: {
    path: path.resolve(__dirname, "./static/js/tree"),
    filename: "[name].boundle.js",
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
        },
      },
    ],
  },
  optimization: {
    minimize: true,
  },
  plugins: [
    new webpack.DefinePlugin({
      "process.env": {
        // This has effect on the react lib size
        NODE_ENV: JSON.stringify("production"),
      },
    }),
  ],
};
