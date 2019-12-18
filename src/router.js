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
    	component: Login
    },
    {
      path: '/monitor',
      name: 'monitor',
      component: Monitor
    },
    {
      path: '/message',
      name: 'message',
      component: Message
    },
    {
      path: '/city',
      name: 'city',
      component: City
    },
    {
      path: '/mine',
      name: 'mine',
      component: Mine
    },
    {
      path: '/detail',
      name: 'detail',
      component: Detail
    }
  ]
});
