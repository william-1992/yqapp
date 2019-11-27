import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    token: '',                      // TOKEN值
    fid: '',                        // 监测中心fid
  	userid: '',						          // 用户ID
  	nickname: '',                   // 用户名称（中文）
  	company_name: '',				        // 公司名称
  	company_short_name: '',         // 公司簡稱
  	home_tabs_name: '监测中心',		   // 搜索组件title值
  	mesType: '',
    isComponent: 'message',         // Tabbar当前显示页面
    loginToggle: true,             // 登陆状态判断
    paddingTT: 0,                  // 状态栏高度
    toolbarToggle: true,           // 底部标签栏开关
    popupToggle: false,            // 搜索页面开关
    checkboxToggleCenter: false,   // 中心复选框开关
    checkboxToggleCity: false,     // 城市复选框开关
    checkboxToggleColl: false,     // 我的收藏复选框开关
    showPicker: false,             // 地址弹框开关
    pickerName: '杭州',            // 当前地址名
    overlayToggle: false,          // 遮罩开关
    cityEventList: [],              // 城市数据列表
    monitorEventList: [],          // 监测数据列表
    collEventList: [],              // 收藏数据列表
    warnEventList: [],              // 预警列表
    monitorQuery: {
      uid: '',
      fid: '',
      areaid: '',
      time: '',
      s_time: '',
      e_time: '',
      point: '',
      source: '',
      push: 'push_y',
      sort_type: 'pub_time',
      page: 0,
      keyword: '',
      es_type: ''
    },
    cityQuery: {
      uid: '',
      areaid: '',
      time: '',
      s_time: '',
      e_time: '',
      point: '',
      source: '',
      sort_type: '',
      page: 0,
      keyword: '',
      es_type: ''
    },
    collQuery: {
      uid: '',
      keyword: '',
      page: 0
    },
    warnQuery: {
      uid: '',
      fid: '',
      sort_type: 'urgent',
      page: 0,
      limit: 10
    }
  },
  getters: {
    tokens: state => {
      return state.token
    }
  },
  mutations: {
    handleToken(state, val) {
      state.token = val
    },
    handleWarnList(state, val) {
      state.warnEventList = val
    },
    handleCollList(state, val) {
      state.collEventList = val
    },
    handleMonitorList(state, val) {
      state.monitorEventList = val
    },
    handleCityList(state, val) {
      state.cityEventList = val
    },
    handleLogin(state, val) {
      state.loginToggle = val
    },
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
    handleCheckboxCenter(state, val) {
      state.checkboxToggleCenter = val
    },
    handleCheckboxCity(state, val) {
      state.checkboxToggleCity = val
    },
    handleCheckboxColl(state, val) {
      state.checkboxToggleColl = val
    },
    handleAddress(state, val) {
      state.showPicker = val
    },
    handleAddressName(state, val) {
      state.pickerName = val
    },
    handleOverlay(state, val) {
      state.overlayToggle = val
    },
    handlePadding(state, val) {
      state.paddingTT = val
    }
  },
  actions: {}
});
