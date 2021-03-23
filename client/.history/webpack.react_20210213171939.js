const HtmlWebpackPlugin = require("html-webpack-plugin");
const path = require("path");

module.exports = {
  mode: "development",
  target: "electron-renderer",
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
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"],
      },
    ],
  },
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "render.js",
  },
  plugin: [
    new HtmlWebpackPlugin({
      template: "./src/index.html",
    }),
  ],
};
