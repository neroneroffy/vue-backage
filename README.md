## 后台管理系统

> 技术：vue, vuex, iview, webpack

## 文件夹结构：

![img](https://github.com/capslocktao/vue-backage/blob/master/intro.png)

## 通用说明

模块的划分是以左侧菜单为准则，一个一级菜单为一个模块，模块建立在src/containers文件夹内。src/containers/container文件夹是右侧页面容器。
搭建二级菜单页面时候需注意：为了准确划分目录结构，需要将对应的二级菜单页面建立在其所属的一级菜单模块文件夹下。页面在src/router/index.js中统一引入
管理。

- 网络请求：this.$http;
- 全局api变量：this.$api;
- 全局域名变量：this.$host;
- 通用样式：在stylus文件夹的base.styl中定义变量，如组件中需要用到，则引入base.styl;
- 如需定义工具类，则在util中定义方法，需要的时候引入;
- 通用组件要在src/components文件夹中建立。




