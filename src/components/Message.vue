<template>
	<div class="message-wrap">
		<div class="mes_tabs">
			<p>
				<span v-for="(item, index) in tabsList" :key="item.id" :class="item.class" @click="getTabs(index, item.name)">{{ item.name }}</span>
			</p>
		</div>
		<mes-index v-if="pageName === '预警'"></mes-index>
		<mes-push v-else-if="pageName === '推送'"></mes-push>
		<mes-placard v-else></mes-placard>
	</div>
</template>

<script>
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
			pageName: '预警',
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
	activated() {
		if(window.plus) {
			this.plusReady()
		}else {
			document.addEventListener('plusready', this.plusReady, false)
		}
	},
	methods: {
		plusReady() {
			plus.navigator.setStatusBarBackground('#ffffff');
			plus.navigator.setStatusBarStyle('dark');
		},
		getTabs(index, name) {
			for(let i=0; i<this.tabsList.length; i++) {
				this.tabsList[i].class = ''
			}
			this.tabsList[index].class = 'active'
			this.pageName = name
		}
	}
}
</script>

<style lang="scss" scoped>
@import '@css/constants.scss';
.message-wrap {
	.mes_tabs {
		height: px2rem(22);
		padding: px2rem(20) px2rem(16);
		padding-bottom: px2rem(0);
		background-color: #fff;
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