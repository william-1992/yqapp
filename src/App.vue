<template>
  <div id="app">
    <router-view v-if="reload" />
    <tool-bar v-show="toolbarToggle"></tool-bar>
  </div>
</template>

<script>
import Clipboard from 'clipboard';
import { Toast, Dialog } from 'vant';
import{ mapGetters, mapState } from 'vuex';
import crypto from '@js/crypto.js';
import ToolBar from '@c/common/ToolBar';
export default {
	data() {
		return {
			linkurl: 'http://yq.wisedata.cc/index.php/Ps/downloadApp.html',
			numbers: 0,
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

      	let user_id = localStorage.getItem('userid')

      	if(user_id) {
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
      	}else {
      		Dialog.alert({
					  message: '未登录用户，请先登录。\n 登录后消息中查看。'
					}).then(() => {
					  this.$router.push('/')	
					})
      	}

      }, false); 
		},false);

		// 判断有无最新版本需要更新
		// this.checkVersion()

		// 判断是否自动登录
		// this.reloadLogin()

		// 系统状态栏背景色和文字颜色初始化
		if(window.plus){
    　this.plusReady();
    }else{
    　　document.addEventListener("plusready",this.plusReady,false);
    }

	},
	methods: {
		errorCB() {
			Toast.fail('更新失败')
		},
		handelDown() {
			alert('1233333')
			plus.runtime.openURL( this.downUrl, errorCB, 'com.syapp.demo' );
		},
		checkVersion() {
			this.$axios({
				method: 'post',
				url: '/index.php/Login/checkVersion',
				data: {
					version: '1.0.0'
				}
			}).then((res) => {
				if(res.data.status == '1') {
					if(res.data.data.forceStatus == '1') {
						this.downUrl = res.data.data.downloadUrl
						Dialog.confirm({
							message: '发现新版本',
							confirmButtonText: '更新'
						}).then(() => {
							if(window.plus) {
								this.handelDown()
							}else {
								document.addEventListener('plusready', this.handelDown, false )
							}
						})
					}else if(res.data.data.forceStatus == '2') {

						Dialog.alert({
							message: '发现新版本',
							confirmButtonText: '更新',
							getContainer: 'body'
						}).then(() => {

							this.$refs.inputurl.select()
							document.execCommand("copy"); 
							Toast.success('复制成功，\n请前往浏览器下载此文件')

						})

					}
				}
			}).catch(() => {
				this.numbers ++ 
				setTimeout(() => {
					if(this.numbers < 3) {
						this.checkVersion()
					}
				}, 500)
			})
		},
		plusReady() {
			plus.navigator.setStatusBarBackground('#ffffff');
			plus.navigator.setStatusBarStyle('dark');
		},
		reloadLogin() {
			let getToken = localStorage.getItem('token')
			if(getToken) {
				this.reload()
				this.$store.commit('handleHomeToggle', true)
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
