import Vue from "vue";
import Router from "vue-router";
import Home from "./views/Home.vue";
import Login from './views/Login.vue';
import Monitor from './components/Center.vue';
import Message from './components/Message.vue';
import City from './components/City.vue';
import Mine from './components/Mine.vue';
import Detail from './components/common/PushDetail.vue';

Vue.use(Router);

export default new Router({
  mode: "hash",
  base: process.env.BASE_URL,
  routes: [
    {
      path: "/home",
      name: "home",
      component: Home
    },
    {
    	path: '/',
    	name: 'login',
    	component: Login,
      meta: {title: '登陆页'}
    },
    {
      path: '/monitor',
      name: 'monitor',
      component: Monitor,
      meta: {title: '监测'}
    },
    {
      path: '/message',
      name: 'message',
      component: Message,
      meta: {title: '预警'}
    },
    {
      path: '/city',
      name: 'city',
      component: City,
      meta: {title: '城市'}
    },
    {
      path: '/mine',
      name: 'mine',
      component: Mine,
      meta: {title: '个人中心'}
    },
    {
      path: '/detail',
      name: 'detail',
      component: Detail,
      meta: {title: '详情'}
    }
  ]
});
