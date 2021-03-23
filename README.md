![LOGO](https://github.com/robustNan/jQuery-development-environment/blob/master/static/logo.png)

![首页截图](https://github.com/robustNan/jQuery-development-environment/blob/master/static/index-page.png)

# JQDE

基于 Webpack 搭建的 jQuery 项目开发环境(jQuery development environment)，使 jQuery 项目能够以前后端分离模式进行开发，这是一种有效提高开发效率的先进模式。利用此环境前端开发人员无需搭建后台环境，只需要配置相应的代理地址即可实现前后端的数据流通。并且此环境配置了对 Sass 和 Stylus 两种 CSS 样式预编译语言的配置，可以直接使用这些语言高效快速的编写界面样式。

附加仿Element样式Select插件

**安装依赖**

`* 推荐使用cnpm安装，避免npm安装导致部分依赖安装失败`

```shell
$ cnpm install
$ cnpm i
$ npm install
$ npm i
```

**启动环境**

```shell
$ npm start
```

**打包输出**

```shell
$ npm run build
```

**node-sass升级**

`* 已针对node14版本进行修改，如果使用的node版本不同，需要替换对应版本的node-sass`
https://www.npmjs.com/package/node-sass
