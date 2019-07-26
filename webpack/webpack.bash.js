const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const WebpackBar = require("webpackbar");


module.exports = {
  entry: {
    app: "./src/index.js"
  },
  module: {
    rules: [
      {
        // .js .jsx用babel解析
        test: /\.js?$/,
        exclude: /node_modules/, // 排除不处理的目录
        include: path.resolve(__dirname, "../src"),
        use: ["babel-loader"]
      },
      {
        test: /\.(png|jpe?g|gif|svg)$/,
        use: [
          {
            loader: "file-loader",
            options: {
              name: "[name].[ext]",
              outputPath: "images/"
            }
          },
          {
            loader: "image-webpack-loader"
          }
        ]
      }
    ]
  },
  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      title: "zhazhahui的博客",
      filename: "index.html",
      template: "public/index.html",
      chunks: ["app"],
      hash: false,
      favicon: "public/maniicon.ico" //网页icon
    }),
    new WebpackBar()
  ]
};
