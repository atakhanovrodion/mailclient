const path = require("path");
module.exports = {
  mode: "production",
  resolve: {
    extensions: [".ts", ".tsx", ".js"],
  },
  entry: "./src/main.ts",
  module: { rules: [{}] },
};
