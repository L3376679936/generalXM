import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)
import createPersistedState from "vuex-persistedstate";
export default new Vuex.Store({
  //创建持久化存储
  plugins: [
    createPersistedState({
      storage: sessionStorage,
      //指定需要持久化存储的数据路径
      paths: ['navList', 'currentNav']
    })
  ],
  state: {
    navList: [
      {
        path: "",
        title: "首页"
      },
    ],
    currentNav: ""
  },
  getters: {
  },
  mutations: {
    // 点击不同的菜单，改变面包屑数组
    navListChange(state, payload) {
      state.currentNav = payload.path
      console.log(payload, "点击的菜单");
      for (var i = 0; i < state.navList.length; i++) {
        if (state.navList[i].path == payload.path) {
          return
        }
      }
      state.navList.push(payload)
      // console.log(state.navList, '当前面包屑数组');
      // console.log(state.currentNav, '当前路由');
    },
    //关闭面包屑，改变面包屑数组
    navListChangeClose(state, payload) {
      console.log(payload, "点击的面包屑索引");
      if(state.currentNav==state.navList[payload].path ){
        state.currentNav = state.navList[payload - 1].path
      }
      state.navList.splice(payload, 1)
      // console.log(state.navList, '当前面包屑数组');
      // console.log(state.currentNav, '当前路由');
    },
    //点击面包屑
    clickEveryNav(state, payload){
      console.log(payload, "点击的面包屑路径");
      state.currentNav = payload
    }
  },
  actions: {
  },
  modules: {
  }
})
