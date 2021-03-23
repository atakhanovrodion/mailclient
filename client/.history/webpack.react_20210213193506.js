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
        use: "babel-loader",
        exclude: "/node_modules/",
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
  devtool: "source-map",
  plugins: [
    new HtmlWebpackPlugin({
      template: "./src/index.html",
    }),
  ],
  devServer: {
    contentBase: path.join(__dirname, "dist/render.js"),
    compress: true,
    port: 9000,
    hot: true,
  },
};
