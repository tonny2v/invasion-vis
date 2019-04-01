标准化地图应用组件开发
==========

命名规范
-------

* 文件夹名 小写与下划线组合， 如custom_widgets, test_pages
* 组件文件夹名 - 大写英文单词组合，如LeafletEchart, LeafletTaxiTrip，组件文件夹内部index.js为入口函数，index.css为样式
* 组件名 - 内部的export组件名与组件文件夹名相同，LeafletEchart -> export default class LeafletEchart ...
* js引入 - 小写与下划线组合，如app_helper.js, string_utils.js

assets
-------

* fonts 字体文件
* images 图片文件
* style 自定义样式文件

components
------
React组件

### widgets 
窗口控件，包括布局，导航栏，边栏，拖动切片，按钮，菜单等等

### router.config.js 
前端路由设置

### app.js 
前端入口，默认端口3000，通过 `yarn start` 启动

### webpack.config.js 

### package.json 
请务必将与部署无关的包加到devDependencies中（`yarn add -D [packageName]`)**
 
工作流
------
在开发分之前请务必pull最新的master分支，严禁提交任何修改到master分支

```bash
git pull 
git branch [your branch name]
git commit -a -m "[your message]"
```
完成修改后确认页面没有问题，然后push你的分支到gitlab并在gitlab中发起merge请求。

ESLint
------
代码规范以 airbnb 为基础，并根据实际开发做部分修改，详查阅[.eslintrc](.eslintrc)。后期可根据情况修改

```bash
缩进 tab 2
引号 单引号
分号 除了部分花括号（如函数）结尾，其他要挂分号
...
```

如果使用 vscode，建议安装 eslint 插件。[ESLint规则说明文档](http://eslint.cn/docs/rules/)

欢迎完善补充文档
------
