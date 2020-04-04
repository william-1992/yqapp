import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import axios from 'axios';
import { Tabbar, TabbarItem, Tab, Tabs, Icon, NavBar, Button, SwipeCell, Popup, Search, DropdownMenu, DropdownItem, List, Checkbox, CheckboxGroup, Picker, Overlay, Area, DatetimePicker, Slider, Collapse, CollapseItem, Field, RadioGroup, Radio, Step, Steps, Toast, Dialog, Lazyload, PullRefresh } from 'vant';
import '@css/reset.css';
import '@font/iconfont.css';
import '@js/htmlFontSize.js';
import md5 from 'js-md5';
import Qs from 'qs';
import { mapState } from 'vuex';


Vue.prototype.$axios = axios;
Vue.config.productionTip = false;
Vue.use(Tabbar).use(TabbarItem).use(Tab).use(Tabs).use(Icon).use(NavBar).use(Button).use(SwipeCell).use(Popup).use(Search).use(DropdownMenu).use(DropdownItem).use(List).use(Checkbox).use(CheckboxGroup).use(Picker).use(Overlay).use(Area).use(DatetimePicker).use(Slider).use(Collapse).use(CollapseItem).use(Field).use(Radio).use(RadioGroup).use(Step).use(Steps).use(Toast).use(PullRefresh).use(Dialog).use(Lazyload, { lazyComponent: true });

// let token2 = localStorage.getItem("token");
let token = '345RTY555';


function onprn() {
	let rand = Math.ceil(Math.random()*99999);
	let timestamp =  Math.round( (new Date).getTime()/1000 );
	let secret = md5('timestamp=' + timestamp + '&rand=' + rand + '&token=' + token);
	axios.defaults.baseURL =  process.env.NODE_ENV === 'development' ? "./" : 'http://syapp.wisedata.cc';
	axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
	axios.defaults.headers.post['X-RAND'] = rand;
	axios.defaults.headers.post['X-TIMESTAMP'] = timestamp;
	axios.defaults.headers.post['X-SECRET'] = secret;
}

function randTime() {
	return Math.round( (new Date).getTime()/1000 )
}
setInterval(function() {
	onprn()
}, 0)

axios.defaults.transformRequest = function(data) {
	let ret = '';
	ret = Qs.stringify(data);
	return ret;
}

Vue.config.silent = false;



router.beforeEach((to, from, next)=> {
	if(to.path == '/message') {
		next()
	}else if(to.path == '/home') {
		next()
	}else if(to.path == '/monitor') {
		next()
	}else if(to.path == '/city') {
		next()
	}else if(to.path == '/mine') {
		next()
	}else if(to.path == '/detail') {
		next()
	}else if(to.path == '/') {
		next()
	}else {
		next({path: '/'})
	}
})

router.afterEach((to, from) => {
	// console.log(to)
})

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
