const path = require("path");

module.exports = {
  mode: "development",
  target: "electron-main",
  resolve: {
    extensions: [".ts", ".tsx", ".js"],
  },
  entry: "./src/electron/index.ts",
  module: {
    rules: [
      {
        test: /\.(js|ts|tsx)$/,
        use: "babel-loader",
        options: {
          presets: ["@babel/preset-typescript"],
        },
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
    filename: "index.js",
  },
  devtool: "source-map",
  watch: true,
};
