/*
 * @Author: liuaobo 3376679936@qq.com
 * @Date: 2023-04-23 14:26:40
 * @LastEditors: liuaobo 3376679936@qq.com
 * @LastEditTime: 2023-04-24 11:13:55
 * @FilePath: \lab-project\src\router\index.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import Vue from "vue";
import VueRouter from "vue-router";
// import HomeView from '../views/HomeView.vue'

// 重写push方法
const routerPush = VueRouter.prototype.push;
VueRouter.prototype.push = function push(location) {
  return routerPush.call(this, location).catch((error) => error);
};
// q:解释一下上面的代码
// a:这是为了解决vue-router在3.0版本以上重复点击路由报错的问题
// q:为什么会报错
// a:因为vue-router在3.0版本以上使用了promise的方式处理路由跳转,如果不处理,重复点击路由会报错
// q:为什么要用call
// a:因为vue-router的源码中并没有直接调用push方法,而是调用了一个名为transitionTo的方法,所以我们要用call来改变this指向
// q:为什么要用catch
// a:因为promise的catch方法可以捕获错误,如果不用catch,重复点击路由会在控制台报错,但是代码不会报错
// q:为什么要return
// a:因为vue-router的源码中的transitionTo方法返回了一个promise
// q:为什么要return routerPush.call
// a:因为routerPush.call返回的是一个promise,如果不return,routerPush方法的返回值就是undefined,这样的话,重复点击路由就会报错  重写replace方法

const originalReplace = VueRouter.prototype.replace;
VueRouter.prototype.replace = function replace(location) {
  return originalReplace.call(this, location).catch((err) => err);
};

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "home",
    title: "首页",
    component: () => import("../views/home/homePage"),
    redirect: "/home",
    children: [
      {
        path: "home",
        name: "home",
        title: "首页组件",
        component: () => import("../views/home/homeHome"),
      },
    ],
  },
  {
    path: "/",
    name: "homePage",
    title: "fhf组件",
    icon:'aichong06',
    component: () => import("../views/home/homePage"),
    children: [
      // {
      //   path: "comT",
      //   name: "comT",
      //   title: "傅红福组件一",
      //   component: () => import("../views/fhfCom/comT"),
      // },
      {
        path: "tabelTransfer",
        name: "tabelTransfer",
        title: "表格穿梭框",
        icon:'biaoge1',
        component: () => import("../views/fhfCom/tabelTransfer/index.vue"),
      },
      {
        path: "map",
        name: "map",
        title: "地图",
        icon:'biaoge1',
        component: () => import("../views/fhfCom/map/index.vue"),
      },
      {
        path: "tabelMerge",
        name: "mtabelMergeap",
        title: "表格合并行",
        icon:'biaoge1',
        component: () => import("../views/fhfCom/tabelMerge/index"),
      },
      {
        path: "com",
        name: "com",
        title: "预留测试页",
        icon:'biaoge1',
        component: () => import("../views/fhfCom/comT.vue"),
      },
    ],
  },
  {
    path: "/",
    name: "liuaobo",
    title: "点点VS叉叉--lab",
    icon:'aichong02',
    component: () => import("../views/home/homePage"),
    children: [
      {
        path: "labCom",
        name: "labCom",
        // labCom: "labCom",
        title: "表格展示",
        icon:'biaoge1',
        component:  () => import("../views/labCom/cleanForm/index.vue")
      },
      {
        path: "qrCode",
        name: "qrCode",
        // labCom: "qrCode",
        title: "二维码生成",
        icon:'erweima',
        component: () => import("../views/labCom/qrCode/index.vue"),
      },
      {
        path: "verificationCode",
        name: "verificationCode",
        // labCom: "qrCode",
        title: "登录页面",
        icon:'jinrongxianxingge-',
        component: () => import("@/views/labCom/verificationCode/index.vue"),
      },
      {
        path: "directiveDemo",
        name: "directiveDemo",
        // labCom: "qrCode",
        title: "自定义指令",
        icon:'yuedu',
        component: () => import("@/views/labCom/directiveDemo/index.vue"),
      },
      {
        path: "inputDemo",
        name: "inputDemo",
        title: "输入框组件",
        icon:'shangchuan1',
        component: () => import("@/views/labCom/inputDemo/index.vue"),
      },
      {
        path: "uploadFile",
        name: "uploadFile",
        title: "文件上传",
        icon:'shangchuan1',
        component: () => import("@/views/labCom/uploadFile/index.vue"),
      },
      {
        path: "AboutView",
        name: "AboutView",
        title: "表格合并及鼠标右键菜单",
        icon:'mouseR',
        component: () => import("@/views/labCom/tableMerge/index.vue"),
      },
      {
        path: "gaspShow",
        name: "gaspShow",
        title: "翻牌动画",
        icon:'fanpaiqi',
        component: () => import("@/views/labCom/gaspShow/index.vue"),
      },
      {
        path: "textRoll",
        name: "textRoll",
        title: "文字滚动",
        icon:'m-gundongwenzi',
        component: () => import("@/views/labCom/textRoll/index.vue"),
      },
      {
        path: "richText",
        name: "richText",
        title: "富文本",
        icon:'m-gundongwenzi',
        component: () => import("@/views/labCom/richText/index.vue"),
      },
      {
        path: "labVideo",
        name: "labVideo",
        title: "视频组件",
        icon:'m-gundongwenzi',
        component: () => import("@/views/labCom/labVideo/index.vue"),
      },
      // {
      //   path: "qiankun",
      //   name: "qiankun",
      //   title: "微前端qiankun",
      //   icon:'m-gundongwenzi',
      //   component: () => import("@/views/labCom/qiankun/index.vue"),
      // },
      {
        path: "echatsTest",
        name: "echatsTest",
        title: "echars图表测试",
        icon:'m-gundongwenzi',
        component: () => import("@/views/labCom/echatsTest/index.vue"),
      },
      {
        path: "lab-canvas",
        name: "lab-canvas",
        title: "canvas练习",
        icon:'m-gundongwenzi',
        component: () => import("@/views/labCom/lab-canvas/index.vue"),
      },
      {
        path: "lab-scrollMessage",
        name: "lab-scrollMessage",
        title: "scrollMessage滚动",
        icon:'m-gundongwenzi',
        component: () => import("@/views/labCom/lab-scrollMessage/index.vue"),
      },
      // {
      //   path: "powerOutageMonitoring220kV",
      //   name: "powerOutageMonitoring220kV",
      //   title: "powerOutageMonitoring220kV",
      //   // isHidden:true,
      //   icon:'m-gundongwenzi',
      //   component: () => import("@/views/labCom/powerOutageMonitoring220kV/components/htTest.vue"),
      // },
      {
        path: "commonTest",
        name: "commonTest",
        title: "公共测试",
        icon:'m-gundongwenzi',
        component: () => import("@/views/labCom/echatsTest/index.vue"),
      }
    ],
  },
];

// 创建路由实例
const router = new VueRouter({
  mode: "history",
  routes,
});

// 全局路由守卫，为所有路由添加统一参数
router.beforeEach((to, from, next) => {
  const globalParam = {name:'liuaobo'}; // 替换为实际需要的值
  if (!to.query.globalParam) {
    next({
      ...to,
      query: {
        ...to.query,
        globalParam,
      },
    });
  } else {
    next();
  }
});

export default routes;
