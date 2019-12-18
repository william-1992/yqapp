<template>
	<div class="message-wrap">
		<!-- <div class="mes_tabs">
			<p>
				<span 
					v-for="(item, index) in tabsList" 
					:key="item.id" 
					:class="item.class" 
					@click="getTabs(index, item.name)"
				>{{ item.name }}</span>
			</p>
		</div>
		<div class="message-content-wrap">
			<mes-index v-if="messageTepe === '预警'"></mes-index>
			<mes-push v-else-if="messageTepe === '推送'"></mes-push>
			<mes-placard v-else></mes-placard>
		</div> -->
		<van-tabs 
			v-model="messageTepe"
			class="tabs_side" 
			type="card" 
			animated 
			title-inactive-color="#acb7cf" 
			title-active-color="#323233" 
			color="#fff"
			sticky
		>
		  <van-tab title="预警">
		  	<mes-index></mes-index>
		  </van-tab>
		  <van-tab title="推送">
		  	<mes-push></mes-push>
		  </van-tab>
		  <van-tab title="公告">
		  	<mes-placard></mes-placard>
		  </van-tab>
		</van-tabs>
	</div>
</template>

<script>
import { Toast } from 'vant';
import { mapState, mapGetters } from 'vuex';
import MesIndex from '@c/message/Index';
import MesPush from '@c/message/PushPage';
import MesPlacard from '@c/message/Placard';
export default {
	name: 'messageIndex',
	components: {
		MesIndex,
		MesPush,
		MesPlacard
	},
	data() {
		return {
			messageTepe: 0,
			tabsList: [{
				id: 1,
				class: 'active',
				name: '预警'
			}, {
				id: 2,
				class: '',
				name: '推送'
			}, {
				id: 3,
				class: '',
				name: '公告'
			}],
		}
	},
	computed: {
		...mapState([ 'monitorQuery']),
		...mapGetters(['getUserid', 'getSubid'])
	},
	activated() {
		if(window.plus) {
			this.plusReady()
		}else {
			document.addEventListener('plusready', this.plusReady, false)
		}
	},
	mounted() {
		// 客户端id绑定
		if(window.plus){
    　this.onRegister();
    }else{
    　　document.addEventListener("plusready",this.onRegister,false);
    }
	},
	methods: {
    onRegister() {
      // 设置系统状态栏背景为红色/文字为黑色
    　plus.navigator.setStatusBarBackground( "#ffffff" );
      plus.navigator.setStatusBarStyle('dark');
      let navH = plus.navigator.getStatusbarHeight();

      // 获取 APP 终端标识
      let pinf = plus.push.getClientInfo();  
      let cid = pinf.clientid;
      // alert('cid' +":"+ cid)
      
      if(window.webkit) {
        this.platform = '2'
      }else {
        this.platform = '1'
      }
      if(cid) {
	      this.$axios({
	        method: 'post',
	        url: '/index.php/Apppush/register',
	        data: {
	          uid: this.getUserid,
	          sub_uid: this.getSubid,
	          partform: 'getui',
	          platform: this.platform,
	          device_id: cid
	        }
	      }).then((res) => {
	        // Toast.success(res.data.msg)
	      }).catch((res) => {
	        Toast.fail(res.data.msg)
	      })
      }else {
      	Toast.fail('客户端标识获取失败！')
      }
    },
		plusReady() {
			plus.navigator.setStatusBarBackground('#ffffff');
			plus.navigator.setStatusBarStyle('dark');
		},
		getTabs(index, name) {
			for(let i=0; i<this.tabsList.length; i++) {
				this.tabsList[i].class = ''
			}
			this.tabsList[index].class = 'active'
			this.$store.commit('handleMessageType', name)
		}
	}
}
</script>

<style lang="scss" scoped>
@import '@css/constants.scss';
.message-wrap {
	.van-tabs {
		padding-top: 0;
		/deep/.van-tabs__wrap {
			width: 100%;
		}
		/deep/.van-tabs__nav--card {
			margin: 0;
			.van-tab {
			span {
					font-size: 18px
				}
			}
		}

	}
	.mes_tabs {
		position: fixed;
		left: 0;
		right: 0;
		top: 0;
		height: px2rem(22);
		padding: px2rem(20) px2rem(16);
		padding-bottom: px2rem(0);
		background-color: #fff;
		z-index: 1000;
		span {
			margin-right: px2rem(20);
			font-size: px2rem(16);
			color: $defaultColor;
			transition: all .3s;
		}
		span.active {
			font-size: px2rem(20);
			color: $activeColor;
		}
	}
	.message-content-wrap {
		position: absolute;
		top: px2rem(40);
		left: 0;
		right: 0;
	}
}
</style>