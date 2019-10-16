<template>
	<div class="push-page">
		<van-tabs v-model="activeName" :line-width="16" title-active-color="#323948" title-inactive-color="#acb7cf" :border="false">
		  <van-tab title="待办事项" name="a"></van-tab>
		  <van-tab title="我发起的" name="b"></van-tab>
		  <van-tab title="我转发的" name="c"></van-tab>
		</van-tabs>
		<push-list :pushType="pushType"></push-list>
	</div>
</template>

<script>
import PushList from '@c/message/List';
export default {
	name: 'push-page',
	components: {
		PushList
	},
	data() {
		return {
			activeName: 'a',
			pushType: 'upcoming'
		}
	},
	watch: {
		activeName(val) {
			if(val === 'a') {
				this.pushType = 'upcoming'
			}else if(val === 'b') {
				this.pushType = 'launch'
			}else if(val === 'c') {
				this.pushType = 'forward'
			}
		}
	}
}
</script>

<style lang="scss" scoped>
@import '@css/constants.scss';
.push-page {
	font-size: 16px;
	.van-tabs {
		.van-tabs__line {
			bottom: px2rem(22)
		}
	}
}
</style>