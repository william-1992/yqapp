<template>
	<div class="message">
		<div class="mes_tabs">
			<p>
				<span v-for="(item, index) in tabsList" :key="item.id" :class="item.class" @click="getTabs(index)">{{ item.name }}</span>
			</p>
		</div>
		<van-tabs v-model="activeName" :line-width="13" title-active-color="#323948" title-inactive-color="#acb7cf">
		  <van-tab title="待办事项" name="a">内容 1</van-tab>
		  <van-tab title="我发起的" name="b">内容 2</van-tab>
		  <van-tab title="我转发的" name="c">内容 3</van-tab>
		</van-tabs>
	</div>
</template>

<script>
export default {
	name: 'message',
	data() {
		return {
			activeName: 'a',
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
			}]
		}
	},
	methods: {
		getTabs(index) {
			for(let i=0; i<this.tabsList.length; i++) {
				this.tabsList[i].class = ''
			}
			this.tabsList[index].class = 'active'
		}
	}
}
</script>

<style lang="scss" scoped>
@import '@css/constants.scss';
.message {
	.mes_tabs {
		height: px2rem(22);
		padding: px2rem(20) px2rem(16);
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
}
</style>