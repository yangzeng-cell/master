# Day04 作业布置

## 一. 完成上课所有的代码练习

已完成







## 三. 什么是loader？webpack的loader是什么作用？和Plugin有什么区别？

* loader用来对模块的源代码进行转换,加载文件

  * 比如因为webpack 不知道怎么样去加载css文件,所以我们需要用css-loader来加载css文件

  * 主要通过配置方式来使用loader来加载

    ```js
     module: {
        rules: [
          {
            // 告诉webpack匹配以.css结尾的文件
            test: /\.css$/,
            // use: [
            //   // 注意顺序,从下往上执行
            //   { loader: "style-loader" },
            //   { loader: "css-loader" }
            // ]
            //简写一: 如果loader只有一个
            // loader: "css-loader"
            //简写二: 多个loader不需要其他属性时,可以直接写loader字符串形式
            // 配置方式一
            use: ["style-loader", "css-loader", "postcss-loader"]
            // 配置方式二
            // use: ["style-loader", "css-loader", {
            //   loader: "postcss-loader",
            //   options: {
            //     postcssOptions: {
            //       plugins: [
            //         "autoprefixer"
            //       ]
            //     }
            //   }
            // }]
          },
          {
            // 告诉webpack匹配以.css结尾的文件
            test: /\.less$/,
            // use: [
            //   // 注意顺序,从下往上执行
            //   { loader: "style-loader" },
            //   { loader: "css-loader" },
            //   { loader: "less-loader" },
            //   { loader: "postcss-loader" }
            // ]
            // 简写
            use: ["style-loader", "css-loader", "less-loader", "postcss-loader"],
          }
        ]
      }
    ```

    * loader和plugin的区别
      * loader是用于特定的模块类型(css,vue...)进行解析加载
      * plugin 是用于执行更多广泛的任务,比如打包优化,资源管理,环境变量注入等
        * 常见的插件
          * CleanWebpackPlugin  **每次修改了一些配置，重新打包时，帮助我们删除dist文件夹**
          * HtmlWebpackPlugin   **对index.html进行打包处理,自动在dist文件夹中，生成了一个index.html的文件**
          * DefinePlugin   **允许在编译时创建配置的全局常量，是一个webpack内置的插件（不需要单独安装）**
            * 比如process.env.NODE_ENV  **判断当前环境是开发还是生产**





## 四. 什么是babel？babel在开发中是什么作用？

* Babel是一个工具链，主要用于旧浏览器或者环境中将ECMAScript 2015+代码转换为向后兼容版本的JavaScript (ES6以上的代码转成ES5代码)
* 作用: 语法转换,源代码转换,箭头函数转换 ,ES6以上的代码转成ES5代码





## 五.webpack的开发模式和生产模式有什么区别？

* Mode: development   开发模式
  * 会将process.env.NODE_ENV 的值设置为development
* Mode: production  生产模式
  * 会将process.env.NODE_ENV 的值设置为production





## 六. webpack如何开启本地服务器，并且提高页面的更新效率（HMR）？

* 如何开启本地服务器?

  * 安装webpack-dev-server

    ```
    npm install webpack-dev-server -D
    
    ```

  * 修改配置文件,启动时加上serve

    ```
     "scripts": {
        "serve": "webpack serve --config wk.config.js"
      },
    ```

  * 命令 : npm run serve

* HMR   **模块热替换**

  * 模块热替换是指在 应用程序运行过程中，替换、添加、删除模块，而**无需重新刷新整个页面**

  * 如何使用HMR

    * 默认情况下，webpack-dev-server已经支持HMR，我们只需要开启即可（默认已经开启）； 
    *  在不开启HMR的情况下，当我们修改了源代码之后，整个页面会自动刷新，使用的是live reloading；

    在main.js中

    ```
    if (module.hot) {
      module.hot.accept("./utils/demo.js", () => {
        console.log("demo更新")
      })
    }
    ```

    



















































