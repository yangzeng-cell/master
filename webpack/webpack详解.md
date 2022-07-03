# webpack配置

 webpack的安装目前分为两个：webpack、webpack-cli

webpack和webpack-cli的关系

 执行webpack命令，会执行node_modules下的.bin目录下的webpack； p webpack在执行时是依赖webpack-cli的，如果没有安装就会报错； p 而webpack-cli中代码执行时，才是真正利用webpack进行编译和打包的过程； p 所以在安装webpack时，我们需要同时安装webpack-cli（第三方的脚手架事实上是没有使用webpack-cli的，而是类似于 自己的vue-service-cli的东西）

# webpack可以解决的问题

解决运行在各个浏览器之间的兼容性处理，例如es6的语法转换成各个浏览器都可以运行的语法，对使用了commonjs模块的语法进行兼容性处理

# webpack默认打包

```
webpack
```

执行webpack命令后就会生成一个dist文件夹，里面会有一个main.js文件，这个文件是被压缩丑化过的，但是会仍然保持原来的ES6语法，默认条件下，webpack不会将es6模块进行转化，需要使用babel进行转换和配置

## webpack是如何确定我们的入口的呢？

当运行webpack命令的时候，webpack会默认去找src/index.js做入口

所以当项目中不存在src/index.js时，会报错

# webpack的配置文件

1.在根目录下创建webpack.config.js作为webpack的配置文件

```
const path = require('path');
module.exports = {
  entry: "./src/main.js",
  output: {
    filename: "bundle.js",
    // 必须是一个绝对路径
    path: path.resolve(__dirname, "./build")
  },
  module: {
    rules: [
      {
        // 规则使用正则表达式
        test: /\.css$/, // 匹配资源
        use: [
          // { loader: "css-loader" },
          // 注意: 编写顺序(从下往上, 从右往做, 从后往前)
          "style-loader", 
          {
            loader: "css-loader",
            options: {
              importLoaders: 1
            }
          },
          "postcss-loader"
        ],
        // loader: "css-loader"
      },
      {
        test: /\.less$/,
        use: [
          "style-loader",
          {
            loader: "css-loader",
            options: {
              importLoaders: 2
            }
          },
          "postcss-loader",
          "less-loader"
        ]
      }
    ]
  }
}

```

```
 "scripts": {
    "build":"webpack --config setup.config.js"
  },//用于修改webpack配置文件的名字
```

