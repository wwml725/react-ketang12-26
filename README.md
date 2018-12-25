# webpack 4 配置react开发环境

## 

#### 目标
> 搭建一个个珠峰课堂的宣传网页

> 搭建一个react、react-router-dom、redux综合运用的网站

# 搭建开发环境
## 后端依赖
```
npm install body-parser express express-session -S
```


## 开发依赖
#### 1、webpack相关依赖
```
npm install webpack webpack-cli webpack-dev-server html-webpack-plugin clean-webpack-plugin --save-dev
```
#### 2、资源编译器
```
npm install less less-loader css-loader style-loader file-loader url-loader xml-loader csv-loader --save-dev
```
- 安装完了以上的依赖，需要在webpack.config.js中进行配置

#### 3、Babel转义器
- 安装完了的依赖，需要在webpack.config.js中进行配置Babel
- 转换react、es6/es7代码需要什么？

##### 方法一、bable之前语法
```
npm install babel-core babel-loader babel-preset-env babel-preset-react --save-dev
```
- babel-core：bable的核心包，想要使用babel-loader必须安装这个包
- babel-loader：bable加载器
- babel-preset-env：支持5
- babel-preset-react：支持react（jsx转换为js）

`.babelrc`
```
{ "presets": ["env","react"]}
```
---
#####方法二、babel-7的语法
- 这种方法已经实践过了
```
npm install babel-loader @babel/core @babel/preset-env @babel/preset-react --save-dev
```
根目录下创建`.babelrc文件
- 为了让 preset 生效，你需要像下面这样定义你的 .babelrc 文件：
```
{
  "presets": ["@babel/preset-env","@babel/preset-react"]
}
```

使用第二种方法会报错

必须安装以下依赖
```
npm install @babel/plugin-proposal-class-properties --save-dev
```
```
{
  "presets": ["@babel/preset-env","@babel/preset-react"],
  "plugins": ["@babel/plugin-proposal-class-properties"]
}
```





## 生产依赖
#### 1、react开发环境依赖
```
npm install react react-dom react-redux redux react-router-dom redux-logger redux-thunk  redux-promise --save
```
#### 2、所需要的小功能插件
```
npm install whatwg-fetch react-transition-group react-swipe  swipe-js-iso  --save
```
#### 3、这个插件可用可不用
```
npm install react-router-redux  history --save
```

---------------------------------------------------------------------------
---------------------

## package.json
```
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1",
    "build": "webpack",
    "start": "webpack-dev-server  --open",
    "watch": "webpack --watch",
    "server":"node server/server.js"
  },

```




