import Vue from "vue";
import Vuex from "vuex";
import area from '@js/area';

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    area
  },
  state: {
  	home_tabs_name: '监测中心',
  	mesType: '',
    isComponent: 'center',
    toolbarToggle: true,   // 底部标签栏开关
    popupToggle: false,   // 搜索页面开关
    checkboxToggle: false,   // 新闻复选框开关
    showPicker: false,     // 地址弹框开关
    pickerName: '杭州',     // 当前地址名
    overlayToggle: false,   // 遮罩开关

  },
  mutations: {
  	handleHoneTabsName(state, val) {
  		state.home_tabs_name = val
  	},
  	handleMesType(state, val) {
  		state.mesType = val
  	},
    handleComponent(state, val) {
      state.isComponent = val
    },
    handleToolbar(state, val) {
      state.toolbarToggle = val
    },
    handlePopup(state, val) {
      state.popupToggle = val
    },
    handleCheckbox(state, val) {
      state.checkboxToggle = val
    },
    handleAddress(state, val) {
      state.showPicker = val
    },
    handleAddressName(state, val) {
      state.pickerName = val
    },
    handleOverlay(state, val) {
      state.overlayToggle = val
    }
  },
  actions: {}
});
