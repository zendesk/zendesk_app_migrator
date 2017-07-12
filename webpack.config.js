const path = require("path");
module.exports = {
  entry: "./index.ts",
  target: "async-node",
  output: {
    filename: "index.js",
    path: __dirname
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        enforce: "pre",
        include: path.resolve(__dirname, "lib"),
        use: [{ loader: "babel-loader" }, { loader: "ts-loader" }]
      }
    ]
  }
};
