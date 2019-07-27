const dev = require("./webpack/webpack.dev.js");
const prod = require("./webpack/webpack.prod.js");

if (process.env.NODE_ENV !== "production") {
  module.exports = dev;
} else {
  module.exports = prod;
}
