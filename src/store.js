import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    homeToggle: false,
    clientID: '',                  // 设备id
    token: '',                     // TOKEN值
    fid: '',                       // 监测中心fid
  	userid: '',		                 // 用户ID - 主账户
    sub_uid: '',                    // 用户id - 子账户
    sub_name: '',                  // 用户名称 - 二级
  	nickname: '',                  // 用户名称（中文）- 一级
  	company_name: '',				       // 公司名称
  	company_short_name: '',         // 公司簡稱
  	home_tabs_name: '监测中心',		   // 搜索组件title值
  	mesType: '',
    isComponent: 'message',         // Tabbar当前显示页面
    loginToggle: true,              // 登陆状态判断
    paddingTT: 0,                   // 状态栏高度
    toolbarToggle: false,           // 底部标签栏开关
    popupToggle: false,             // 搜索页面开关
    checkboxToggleCenter: false,    // 中心复选框开关
    checkboxToggleCity: false,      // 城市复选框开关
    checkboxToggleColl: false,      // 我的收藏复选框开关
    showPicker: false,              // 地址弹框开关
    overlayToggle: false,           // 遮罩开关
    cityEventList: [],              // 城市数据列表
    monitorEventList: [],           // 监测数据列表
    collEventList: [],              // 收藏数据列表
    warnEventList: [],              // 预警列表
    reportToken: '',                // 我的-报告详情token
    messageTepe: '0',               // 消息页面切换状态
    pushQuery: {},                  // 个推消息所有参数 
    pickerName: '',                 // 监测中心-当前地址信息
    areaList: [],                   // 监测中心-方案切换时area_list长度大于1时，保存于此
    monitorQuery: {                 // 监测中心-请求参数
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
      time: 'd',
      s_time: '',
      e_time: '',
      point: 'n',
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
      fid: '0',
      sort_type: 'recent',
      page: 1,
      limit: 10
    }
  },
  getters: {
    tokens: state => {
      return localStorage.getItem('token')
    },
    getUserid: state => {
      if(state.userid) {
        return state.userid
      }else {
        return localStorage.getItem('userid')
      }
    },
    getSubid: state => {
      if(state.sub_uid) {
        return state.sub_uid
      }else {
        return localStorage.getItem('subid')
      }
    },
    getSubName: state => {
      // return localStorage.getItem('subname')
      if(state.sub_name) {
        return state.sub_name
      }else {
        return localStorage.getItem('subname')
      }
    },
    getNickname: state => {
      if(state.nickname) {
        return state.nickname
      }else {
        return localStorage.getItem('nickname')
      }
    },
    getCompany: state => {
      if(state.company_name) {
        return state.company_name
      }else {
        return localStorage.getItem('company_name')
      }
    },
    getCompanyShort: state => {
      if(state.company_short_name) {
        return state.company_short_name
      }else {
        return localStorage.getItem('company_short_name')
      }
    }
  },
  mutations: {
    handleClientId(state, val) {
      state.clientID = val
    },
    handleSubName(state, val) {
      state.sub_name = val
    },
    handleAddressName(state, val) {
      state.pickerName = val
    },
    handleArealist(state, val) {
      state.areaList = val
    },
    handleHomeToggle(state, val) {
      state.homeToggle = val
    },
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
    handleOverlay(state, val) {
      state.overlayToggle = val
    },
    handlePadding(state, val) {
      state.paddingTT = val
    }
  },
  actions: {}
});
