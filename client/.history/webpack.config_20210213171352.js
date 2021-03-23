const HtmlWebpackPlugin = require("html-webpack-plugin");
const path = require("path");

module.exports = {
  mode: "production",
  resolve: {
    extensions: [".ts", ".tsx", ".js"],
  },
  entry: "./src/main.tsx",
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: "ts-loader",
        exlude: "node_modules",
      },
    ],
  },
};
