import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import axios from 'axios';
import { Tabbar, TabbarItem, Tab, Tabs, Icon, NavBar, Button, SwipeCell, Popup, Search, DropdownMenu, DropdownItem, List, Checkbox, CheckboxGroup, Picker, Overlay, Area, DatetimePicker, Slider, Collapse, CollapseItem, Field, RadioGroup, Radio, Step, Steps, Toast } from 'vant';
import '@css/reset.css';
import '@font/iconfont.css';
import '@js/htmlFontSize.js';

Vue.prototype.$axios = axios;
Vue.config.productionTip = false;
Vue.use(Tabbar).use(TabbarItem).use(Tab).use(Tabs).use(Icon).use(NavBar).use(Button).use(SwipeCell).use(Popup).use(Search).use(DropdownMenu).use(DropdownItem).use(List).use(Checkbox).use(CheckboxGroup).use(Picker).use(Overlay).use(Area).use(DatetimePicker).use(Slider).use(Collapse).use(CollapseItem).use(Field).use(Radio).use(RadioGroup).use(Step).use(Steps).use(Toast);

Vue.config.silent = false;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
