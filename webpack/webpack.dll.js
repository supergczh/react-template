
const path = require('path');
const webpack = require('webpack');
const { CleanWebpackPlugin } = require("clean-webpack-plugin"); 
const { dependencies } = require('../package.json');

module.exports = {
  mode: 'development',
  entry: {
    library: Object.keys(dependencies),
  },
  output: {
    path: path.join(__dirname, '../dll'), // 生成的dll.js路径，我是存在/build/dev中
    filename: '[name]_[chunkhash:8].dll.js', // 生成的文件名字
    library: '[name]_[chunkhash:8]', // 生成文件的一些映射关系，与下面DllPlugin中配置对应
  },
  plugins: [
    new CleanWebpackPlugin(),
    // 使用DllPlugin插件编译上面配置的NPM包
    new webpack.DllPlugin({
      // 会生成一个json文件，里面是关于dll.js的一些配置信息
      path: path.join(__dirname, '../dll', '[name].manifest.json'),
      name: '[name]_[chunkhash:8]', // 与上面output中配置对应
      context: __dirname,
    }),
  ],
};