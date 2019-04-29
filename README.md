## 基于vue的后台管理系统

## 一个很小的项目，当时与别人合作的，后台为java，所以当前情况下启动项目应该不会出来内容，或者会有问题，但前端代码是没有错误的
## server文件夹为前期开发时模拟数据的server，只有很少的一部分接口

直接用vue-cli 初始化的项目

> 技术：vue, vuex, iview, webpack

基于vue的后台管理系统，侧重权限控制（accessToken实现）。使用axios全局拦截器配合accessToken实现权限控制。
项目中并未过多使用vuex，因为基本没有共享状态的组件。只用在了loading的显示与隐藏，加载模态的显示与隐藏。
server文件夹为mock数据时候写的node服务。


## 文件夹结构：

![img](https://github.com/capslocktao/vue-backage/blob/master/intro.png)








