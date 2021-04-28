# 使用webpack时发生Cannot read property 'tap' of undefined

HtmlWebpackPlugin报错，要把webpack webpack-cli版本问题，

"webpack": "^4.44.2",

  "webpack-cli": "^3.3.12",

  "webpack-dev-server": "^3.11.2"

要把开发环境下和全局环境下的webpack从5版本降至4版本，目前webpack devserver版本与5不兼容，会报错



# [TypeError: this.getOptions is not a function [closed\]](https://stackoverflow.com/questions/66082397/typeerror-this-getoptions-is-not-a-function)

这个是loader版本不兼容，没有带版本下载loader，webpack4无法使用会报错，



npx webpack-dev-server在5版本不可以使用，必须降版本



webpack4就要用相应的版本的plugins和loader。可以查看github