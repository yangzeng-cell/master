const path = require("path");

module.exports = {
  // 设置入口文件
  entry: "./src/index.js",
  //   可以通过配置 output 选项，告知 webpack 如何向硬盘写入编译文件。注意，即使可以存在多个 entry 起点，但只能指定一个 output 配置
  output: {
    // 设置文件名
    filename: "bundle.js",
    // 设置绝对路径
    path: path.resolve(__dirname, "./build"),
  },
  module: {
    rules: [
      {
        //   规则使用正则表达式，需要匹配那些资源
        test: /\.css$/,
        // 第一种写法
        use: [{ loader: "css-loader" }],
      },
    ],
  },
};
