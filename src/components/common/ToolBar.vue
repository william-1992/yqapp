<template>
	<div class="tool-bar">
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
			active: 0,
			componentName: 'center',
			list: [{
				title: '监测中心',
				default: require('@img/nav-center.png'),
				checked: require('@img/nav-center-checked.png'),
				name: 'center'
			}, {
				title: '消息',
				default: require('@img/nav-message.png'),
				checked: require('@img/nav-message-checked.png'),
				name: 'message'
			}, {
				title: '城市舆情',
				default: require('@img/nav-city.png'),
				checked: require('@img/nav-city-checked.png'),
				name: 'city'
			}, {
				title: '我的',
				default: require('@img/nav-mine.png'),
				checked: require('@img/nav-mine-checked.png'),
				name: 'mine'
			}]
		}
	},
	computed: {
		...mapState(['isComponent'])
	},
	methods: {
		getItemName(index) {
			if(index === 0) {
				this.componentName = 'center';
				this.$store.commit('handleHoneTabsName', '监测中心')
			}else if(index === 1) {
				this.componentName = "message"
			}else if(index === 2) {
				this.componentName = 'city';
				this.$store.commit('handleHoneTabsName', '城市舆情')
			}else if(index === 3) {
				this.componentName = 'mine'
			}
			// this.$emit('onChangeBar', this.componentName)
			this.$store.commit('handleComponent', this.componentName)
		}
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
