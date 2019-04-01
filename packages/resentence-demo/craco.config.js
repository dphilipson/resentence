const path = require("path");
const { NormalModuleReplacementPlugin } = require("webpack");

module.exports = {
  webpack: {
    plugins: [
      new NormalModuleReplacementPlugin(
        /.*\/generated\/iconSvgPaths.js/,
        path.resolve(__dirname, "emptyIconSvgPaths.js"),
      ),
    ],
  },
};
