import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    token: '',                     // TOKEN值
    fid: '',                       // 监测中心fid
  	userid: '',		                 // 用户ID - 主账户
    sub_uid: '',                    // 用户id - 子账户
  	nickname: '',                  // 用户名称（中文）
  	company_name: '',				       // 公司名称
  	company_short_name: '',         // 公司簡稱
  	home_tabs_name: '监测中心',		   // 搜索组件title值
  	mesType: '',
    isComponent: 'message',         // Tabbar当前显示页面
    loginToggle: true,             // 登陆状态判断
    paddingTT: 0,                  // 状态栏高度
    toolbarToggle: false,           // 底部标签栏开关
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
    reportToken: '',               // 报告详情token
    messageTepe: '0',            // 消息页面切换状态
    pushQuery: {},               // 个推消息所有参数 
    monitorQuery: {                 // 监测中心请求参数
      uid: '',
      sub_uid: '',
      fid: '',
      areaid: '',
      time: '',
      s_time: '',
      e_time: '',
      point: '',
      source: '',
      sort_type: 'pub_time',
      page: 1,
      keyword: '',
      es_type: ''
    },
    cityQuery: {                    // 城市舆情请求参数
      uid: '',
      sub_uid: '',
      areaid: '',
      time: '',
      s_time: '',
      e_time: '',
      point: '',
      source: '',
      sort_type: '',
      page: 1,
      keyword: '',
      es_type: ''
    },
    collQuery: {                    // 收藏请求参数
      uid: '',
      sub_uid: '',
      keyword: '',
      page: 1
    },
    warnQuery: {                    // 预警请求参数
      uid: '',
      sub_uid: '',
      fid: '',
      sort_type: 'urgent',
      page: 1,
      limit: 10
    }
  },
  getters: {
    tokens: state => {
      return localStorage.getItem('token')
    },
    getUserid: state => {
      let id = localStorage.getItem('userid')
      if(id) {
        return id
      }else {
        return state.userid
      }
    },
    getSubid: state => {
      let id = localStorage.getItem('subid')
      if(id) {
        return id
      }else {
        return state.sub_uid
      }
    },
    getNickname: state => {
      let name = localStorage.getItem('nickname')
      if(name) {
        return name
      }else {
        return state.nickname
      }
    },
    getCompany: state => {
      let name = localStorage.getItem('company_name')
      if(name) {
        return name
      }else {
        return state.company_name
      }
    },
    getCompanyShort: state => {
      let name = localStorage.getItem('company_short_name')
      if(name) {
        return name
      }else {
        return state.company_short_name
      }
    }
  },
  mutations: {
    handlePushQuery(state, val) {
      state.pushQuery = val
    },
    handleMessageType(state, val) {
      state.messageTepe = val
    },
    handleToolbar(state, val) {
      state.toolbarToggle = val
    },
    handleReportToken(state, val) {
      state.reportToken = val
    },
    handleSubid(state, val) {
      state.sub_uid = val
    },
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
