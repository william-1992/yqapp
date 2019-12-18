<template>
  <div id="app">
    <router-view v-if="reload" />
    <tool-bar v-show="toolbarToggle"></tool-bar>
  </div>
</template>

<script>
import { Toast } from 'vant';
import{ mapGetters, mapState } from 'vuex';
import crypto from '@js/crypto.js';
import ToolBar from '@c/common/ToolBar';
export default {
	data() {
		return {
			isReload: true,
			arrtry: [1,2,3,4,5,4,3,2,1,12,23,56,32],
			arrend: [],
      platform: ''
		}
	},
	components: {
		ToolBar
	},
	provide() {
		return {
			reload: this.reload
		}
	},
	computed: {
		...mapState(['toolbarToggle']),
		...mapGetters(['getUserid', 'getSubid'])
	},
	mounted() {

		let a = crypto.encrypt('欢迎登陆', 'hAw6eqnFLKxpsDv3');
		let b = crypto.decrypt(a, 'hAw6eqnFLKxpsDv3');
		// console.log('加密后：' + a)
		// console.log('解密后：' + b)
		this.arrend = this.unique(this.arrtry)



		document.addEventListener('background', () => {
			alert('监听1' +":"+ plus.navigator.isBackground)
		}, false)

		document.addEventListener('popstate', () => {
			alert('监听2' +":"+ '退出程序')
		}, false)

		// 推送消息触发事件
		document.addEventListener("plusready",() => {
			plus.push.addEventListener('click', (msg) => {
          // alert('click' +":"+ msg.content)
      }, false);   
      plus.push.addEventListener('receive', (msg) => { 
        
      	let str1 = msg.content.split('{')[1]
      	let str2 = str1.split('}')[0]
      	let str3 = str2.split(',')
      	let objs = {}
      	for(let i=0; i<str3.length; i++) {
      		let result = str3[i].split('=')
      		objs[result[0].trim()] = result[1]
      	}
      	this.$router.push('/message')	
      	this.$store.commit('handlePushQuery', objs)
      	// push_event为待办，其它为预警
      	// push_log_type 1普通 2紧急 3严重   其它：忽略
      	// fid， event_id, 
      	// event_push_id 此条推送id
      	if(objs.type == 'push_event') {
      		this.$store.commit('handleMessageType', 1)
      		setTimeout(() => {
      			this.$router.push('/detail')
      		}, 1000)
      	}else {
      		this.$store.commit('handleMessageType', 0)
      		setTimeout(() => {
      			this.$router.push('/detail')
      		}, 1000)
      	}


      }, false); 
		},false);

		// 判断是否自动登录
		this.reloadLogin()

		// 系统状态栏背景色和文字颜色初始化
		if(window.plus){
    　this.plusReady();
    }else{
    　　document.addEventListener("plusready",this.plusReady,false);
    }

	},
	methods: {
		plusReady() {
			plus.navigator.setStatusBarBackground('#ffffff');
			plus.navigator.setStatusBarStyle('dark');
		},
		reloadLogin() {
			let getToken = localStorage.getItem('token')
			if(getToken) {
				this.reload()
				this.$router.push('/message')
				this.$store.commit('handleToolbar', true)


        this.$store.state.monitorQuery.uid = this.$store.getters.getUserid;
        this.$store.state.cityQuery.uid = this.$store.getters.getUserid;
        this.$store.state.collQuery.uid = this.$store.getters.getUserid;
        this.$store.state.warnQuery.uid = this.$store.getters.getUserid;

        this.$store.state.monitorQuery.sub_uid = this.$store.getters.getSubid;
        this.$store.state.cityQuery.sub_uid = this.$store.getters.getSubid;
        this.$store.state.collQuery.sub_uid = this.$store.getters.getSubid;
        this.$store.state.warnQuery.sub_uid = this.$store.getters.getSubid;

			}else {
				this.$router.push('/')
			}
		},
		unique(arr) {
			let result = []
			for(let i=0; i<arr.length; i++) {
				if(result.indexOf(arr[i]) == -1) {
					result.push(arr[i])
				}
			}
			return result
		},
		reload() {
			this.isReload = false
			this.$nextTick(function() {
				this.isReload = true
			})
		}
	}
}
</script>
