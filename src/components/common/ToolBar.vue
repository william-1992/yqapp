<template>
	<div class="tool-bar">
		<!-- <van-tabbar
		  v-model="active"
		  active-color="#07c160"
		  inactive-color="#000"
		>
		  <van-tabbar-item icon="home-o">标签</van-tabbar-item>
		  <van-tabbar-item icon="search">标签</van-tabbar-item>
		  <van-tabbar-item icon="freinds-o">标签</van-tabbar-item>
		  <van-tabbar-item icon="setting-o">标签</van-tabbar-item>
		</van-tabbar> -->
		<van-tabbar v-model="active" active-color="#323948" inactive-color="#d3dbeb" @change="getItemName(active)">
		  <van-tabbar-item v-for="(item, index) in list" :key="index">
		  	<img slot="icon" slot-scope="props" :src="props.active ? item.checked : item.default">
		  	<span>{{ item.title }}</span>
		  </van-tabbar-item>
		</van-tabbar>
	</div>
</template>

<script>
import { mapState } from 'vuex';
export default {
	data() {
		return {
			active: 1,
			componentName: 'message',
			list: [{
				title: '监测中心',
				default: require('@img/nav-center1.png'),
				checked: require('@img/nav-center2.png'),
				name: 'center'
			}, {
				title: '消息',
				default: require('@img/nav-message1.png'),
				checked: require('@img/nav-message2.png'),
				name: 'message'
			}, {
				title: '城市舆情',
				default: require('@img/nav-city1.png'),
				checked: require('@img/nav-city2.png'),
				name: 'city'
			}, {
				title: '我的',
				default: require('@img/nav-mine1.png'),
				checked: require('@img/nav-mine2.png'),
				name: 'mine'
			}]
		}
	},
	computed: {
		...mapState(['isComponent', 'token', 'nickname', 'monitorQuery', 'warnQuery'])
	},
	watch: {
		nickname(val) {
			this.active = 1
		}
	},
	mounted() {
		this.$nextTick(() => {
			if(this.token) {
				this.getItemName(this.active)
			}
		})
	},
	methods: {
		getItemName(index) {
			if(index === 0) {
				// this.componentName = 'center';
				this.$router.push('/monitor')
				this.$store.commit('handleHoneTabsName', '监测中心')
				if(window.plus) {
					this.plusReady()
				}else {
					document.addEventListener('plusready', this.plusReady, false)
				}
			}else if(index === 1) {
				this.monitorQuery.page = 1
				this.warnQuery.page = 1
				// this.componentName = "message"
				this.$router.push('/message')
				if(window.plus) {
					this.plusReady()
				}else {
					document.addEventListener('plusready', this.plusReady, false)
				}
			}else if(index === 2) {
				this.monitorQuery.page = 1
				// this.componentName = 'city';
				this.$router.push('/city')
				this.$store.commit('handleHoneTabsName', '城市舆情')
				if(window.plus) {
					this.plusReady()
				}else {
					document.addEventListener('plusready', this.plusReady, false)
				}
			}else if(index === 3) {
				this.monitorQuery.page = 1
				// this.componentName = 'mine'
				this.$router.push('/mine')
				if(window.plus) {
					this.plusReady2()
				}else {
					document.addEventListener('plusready', this.plusReady2, false)
				}
			}
			// this.$emit('onChangeBar', this.componentName)
			this.$store.commit('handleComponent', this.componentName)
			this.$store.commit('handleCheckboxCenter', false)
			this.$store.commit('handleCheckboxCity', false)
		},
		plusReady() {
			plus.navigator.setStatusBarBackground('#ffffff');
			plus.navigator.setStatusBarStyle('dark');
		},
		plusReady2() {
			plus.navigator.setStatusBarBackground('#8091bb');
			plus.navigator.setStatusBarStyle('light');
		},
	}
};
</script>

<style lang="scss" scoped>
.tool-bar{
		/deep/ .van-tabbar-item__icon {
			img {
				width: 25px;
				height: 25px;
			}
		}
		/deep/ .van-tabbar-item__text {
			display: flex;
			flex-direction: column;
			align-items: center;
			img {
				width: 25px;
				height: 25px;
			}
	}
}
</style>
