# nuxt-meituan

项目名称：高仿美团网 PC 网页版

项目简介：前端 + 服务端实战课程

学习地址：https://coding.imooc.com/class/280.html

![](https://ws1.sinaimg.cn/large/9823cde9ly1g0pfqyhd09j20y60kktgt.jpg)

## 主要页面及模块

- 首页 -> 城市服务、搜索推荐服务
- 登录注册页 -> 邮箱验证 SMTP 服务
- 切换城市页
- 商品列表页
- 商品详情页
- 购物车页
- 订单页

地图服务 定位服务 注册登录实现 服务端缓存 接口设计 推荐搜索服务

![](https://ws1.sinaimg.cn/large/9823cde9gy1g5vjt1o3nuj20xx0brwkw.jpg)

## 技术栈

- Vue 全家桶
- Nuxt：Vue SSR 框架
- Element-UI：Vue 生态圈最流行的样式库
- Koa2：Node.js Web 框架
- MongoDB：非关系型数据库
- Mongoose：MongoDB 的一个对象模型工具
- Redis：数据缓存
- Apollo：分布式配置中心

![](https://ws1.sinaimg.cn/large/9823cde9ly1g0prj2tbn2j20xv0dh42k.jpg)

## 主要环境参数

- Nuxt.js 2.8.0
- Element-ui 2.4.7
- Node 8.15.0
- Koa 2.6.2
- Mongodb 4.0
- Redis 4.0.11
- Robo 3T 1.2.1

## 表结构设计

user 表：username、password、email

areas 表：id、city、name

menu 表：name、type、child[title, child[...]]

city 表：id、province、name

![](https://ws1.sinaimg.cn/large/9823cde9gy1g5vk2dzspxj20sp0ehwne.jpg)

## Init Project

这里记录初始化项目的相关操作

``` bash
# 使用脚手架工具 create-nuxt-app 安装
$ npm i -g npx
$ npx create-nuxt-app nuxt-meituan

# create-nuxt-app v2.9.2
# ✨  Generating Nuxt.js project in `nuxt-meituan`
# ? Project name `nuxt-meituan`
# ? Project description `My stunning Nuxt.js project`
# ? Author name `bxm0927`
# ? Choose the package manager `Yarn`
# ? Choose UI framework `Element`
# ? Choose custom server framework `Koa`
# ? Choose Nuxt.js modules `Axios`
# ? Choose linting tools `ESLint`
# ? Choose test framework `None`
# ? Choose rendering mode `Universal (SSR)`
```

## Build Setup

``` bash
# install dependencies
$ yarn install

# serve with hot reload at localhost:3000
$ yarn dev

# build for production and launch server
$ yarn build
$ yarn start

# generate static project
$ yarn generate
```

For detailed explanation on how things work, check out [Nuxt.js docs](https://nuxtjs.org).

## Deploy

服务器：CentOS 7.3 64bit

安装 Git、Node.js、NPM、Yarn、Nuxt
