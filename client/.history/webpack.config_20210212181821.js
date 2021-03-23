const path = require("path");
module.exports = {
  mode: "production",
  resolve: {
    extensions: [".ts", ".tsx", ".js"],
  },
  entry: "./src/main.ts",
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
