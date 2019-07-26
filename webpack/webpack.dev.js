const path = require("path");
const merge = require("webpack-merge");
const common = require("./webpack.bash.js");

const webpack = require("webpack");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const PUBLIC_PATH = "/";

module.exports = merge(common, {
  entry: {
    app: ["react-hot-loader/patch", "./src/index.js"]
  },
  output:{
    path: path.resolve(__dirname, "..", "dist"),
    filename: "js/bundle.js",
    publicPath: PUBLIC_PATH
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader", "postcss-loader"]
      },
      {
        test: /\.(scss|sass)$/,
        use: [
          "style-loader", // creates style nodes from JS strings
          "css-loader", // translates CSS into CommonJS
          "postcss-loader",
          "sass-loader" // compiles Sass to CSS, using Node Sass by default
        ]
      },
      {
        test: /\.less$/,
        use: [
          "style-loader",
          "css-loader",
          "postcss-loader",
          {
            loader: "less-loader",
            options: {
              javascriptEnabled: true,
              modifyVars: {
                "@primary-color": "#71777c",
                "@layout-trigger-background": "#FFF",
                "@menu-item-color": "#71777c"
              }
            }
          }
        ]
      }
    ]
  },
  plugins: [
    new MiniCssExtractPlugin({
      // Options similar to the same options in webpackOptions.output
      // both options are optional
      filename: "css/[name].css",
      chunkFilename: "css/[id].css"
    }),
    new webpack.HotModuleReplacementPlugin()
  ],
  devtool: "inline-source-map",
  devServer: {
    contentBase: path.join(__dirname, "dist"),
    compress: true,
    historyApiFallback: true,
    host: "localhost",
    port: 8080,
    overlay: true,
    watchOptions: {
      poll: true
    },
    hot: true,
    quiet: false
  },
  mode: "development"
});
