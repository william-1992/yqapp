<template>
	<div class="message">

		<van-tabs v-model="activeyu" :line-width="13" title-active-color="#323948" title-inactive-color="#acb7cf" :border="false">
		  <van-tab :title="item.title" name="a" v-for="item in list"></van-tab>
		</van-tabs>		

		<div class="tabsTwo">
			<p>
				<span v-for="(item, index) in tabs2" :key="item.id" :class="item.class" @click="onClickTabs2(index)">{{ item.title }}</span>
			</p>
		</div>

		<mes-list></mes-list>

	</div>
</template>

<script>
import MesList from '@c/message/List';
export default {
	name: 'message',
	components: {
		MesList
	},
	data() {
		return {
			activeyu: 0,
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
			}],
			tabs2: [{
				id: '1',
				title: '最新',
				class: ''
			}, {
				id: '2',
				title: '最紧急',
				class: 'active'
			}]		
		}
	},
	methods: {
		onClickTabs2(index) {
			this.tabs2.forEach((item) => {
				item.class = ''
			})
			this.tabs2[index].class = 'active'
		}
	}
}
</script>

<style lang="scss" scoped>
@import '@css/constants.scss';
.message {
	.van-tabs {

	}
	.tabsTwo {
		padding-left: px2rem(5);
		background-color: #fff;
		line-height: px2rem(30);
		span {
			padding: 0 px2rem(15);
			font-size: px2rem(14);
			color: $defaultColor;
		}
		span.active{
			color: $activeColor;
		}
	}
}
</style>