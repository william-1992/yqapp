<template>
	<div class="center">
		<search></search>
		<van-tabs v-model="active" :line-width="14" title-active-color="#323948" title-inactive-color="#d3dbeb" :border='false' @change="getTabs">
			<van-tab v-for="item in list" :title="item.title" :key="item.id"></van-tab>
		</van-tabs>
		<hottest />
		<text-list />
	</div>
</template>

<script>
import Search from '@c/common/Search';
import Hottest from '@c/common/Hottest';
import TextList from '@c/center/List';
export default {
	name: 'center',
	components: {
		Search,
		Hottest,
		TextList
	},
	data() {
		return {
			active: 0,
			list: [{
				id: 1,
				title: '方案一'
			}, {
				id: 2,
				title: '方案二'
			}, {
				id: 3,
				title: '方案三'
			}, {
				id: 4,
				title: '方案四'
			}, {
				id: 5,
				title: '方案五'
			}]
		}
	},
	methods: {
		getTabs() {
			console.log(this.active)
		}
	}
}
</script>

<style lang="scss" scoped>
@import '@css/constants.scss';

.center {
	p {
		font-size: px2rem(14)
	}
	h1 {
		font-size: px2rem(18)
	}
	.van-tab__pane, .van-tab__pane-wrapper {
		font-size: px2rem(18)
	}
	/deep/.van-tabs--line .van-tabs__wrap {
		height: px2rem(38)
	}
}
</style>