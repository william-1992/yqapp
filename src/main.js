import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import axios from 'axios';
import { Tabbar, TabbarItem, Tab, Tabs, Icon, NavBar, Button, SwipeCell, Popup, Search, DropdownMenu, DropdownItem, List, Checkbox, CheckboxGroup, Picker, Overlay, Area, DatetimePicker, Slider, Collapse, CollapseItem, Field, RadioGroup, Radio, Step, Steps, Toast, Dialog, Lazyload } from 'vant';
import '@css/reset.css';
import '@font/iconfont.css';
import '@js/htmlFontSize.js';
import md5 from 'js-md5';
import Qs from 'qs';
import { mapState } from 'vuex';



Vue.prototype.$axios = axios;
Vue.config.productionTip = false;
Vue.use(Tabbar).use(TabbarItem).use(Tab).use(Tabs).use(Icon).use(NavBar).use(Button).use(SwipeCell).use(Popup).use(Search).use(DropdownMenu).use(DropdownItem).use(List).use(Checkbox).use(CheckboxGroup).use(Picker).use(Overlay).use(Area).use(DatetimePicker).use(Slider).use(Collapse).use(CollapseItem).use(Field).use(Radio).use(RadioGroup).use(Step).use(Steps).use(Toast).use(Dialog).use(Lazyload, { lazyComponent: true });

// let token2 = localStorage.getItem("token");
let token = '345RTY555';

let rand = Math.ceil(Math.random()*99999);
let timestamp =  randTime() ;
let secret = md5('timestamp=' + timestamp + '&rand=' + rand + '&token=' + token);

function randTime() {
	return Math.round( (new Date).getTime()/1000 )
}
setTimeout(function() {
	timestamp = randTime()
}, 60000)

axios.defaults.baseURL =  process.env.NODE_ENV === 'development' ? "./" : 'http://syapp.wisedata.cc';
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
axios.defaults.headers.post['X-RAND'] = rand;
axios.defaults.headers.post['X-TIMESTAMP'] = timestamp;
axios.defaults.headers.post['X-SECRET'] = secret;
axios.defaults.transformRequest = function(data) {
	let ret = '';
	ret = Qs.stringify(data);
	return ret;
}

Vue.config.silent = false;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
