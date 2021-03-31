const path = require("path");

module.exports = {
  mode: "development",
  target: "electron-main",
  resolve: {
    extensions: [".ts", ".tsx", ".js"],
  },
  entry: "./src/main/index.ts",
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        loader: "babel-loader",
        options: {
          presets: [
            ["@babel/preset-env", { shippedProposals: true }],
            "@babel/preset-react",
            "@babel/preset-typescript",
          ],
        },
        exclude: "/node_modules/",
      },
    ],
  },
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "index.js",
  },
  devtool: "source-map",
  watch: true,
};
