<template>
	<div class="report">
			<van-nav-bar
				:title="mestTitle"
				:border="false"
				left-arrow
				@click-left="onClickLeft"
			></van-nav-bar>
			<ul v-if="itemType === 'A'">
				<li v-for="item in list" :key="item.id" @click="onClickItem(item.name)">
					<div>
						<span>{{ item.name.slice(-1) }}</span>
						<strong>{{ item.name }}</strong>
					</div>
					<van-icon name="arrow" />
				</li>
			</ul>
			<ul class="item-wrap" v-else>
				<li v-for="item in detailList" :key="item.id" @click="onClickDetail(item.id)">
					<div><strong>{{ item.value }}</strong></div>
					<i class="iconfont" @click="onClickDelete($event, item.id)">&#xe64c;</i>
				</li>
			</ul>
	</div>
</template>

<script>
import { Dialog } from 'vant';
export default {
	name: 'report',
	data() {
		return {
			mestTitle: '我的报告',
			itemType: 'A',
			list: [{
				id: '1',
				name: '方案一'
			}, {
				id: '2',
				name: '方案二'
			}, {
				id: '3',
				name: '方案三'
			}, {
				id: '4',
				name: '方案四'
			}, {
				id: '5',
				name: '方案五'
			}],
			detailList: [{
				id: 1,
				value: '2019-09-28 日报'
			}, {
				id: 2,
				value: '2019-09-29 日报'
			}, {
				id: 3,
				value: '2019-09-30 日报'
			}]
		}
	},
	methods: {
		onClickLeft() {
			if(this.itemType === 'A') {
				this.$store.commit('handleMesType', '')
				this.$store.commit('handleToolbar', true)
			}else {
				this.itemType = 'A'
			}
		},
		onClickItem(name) {
			this.mestTitle = name
			this.itemType = ''
		},
		onClickDetail(id) {
			console.log('进入详情页' + id)
		},
		onClickDelete(e, id) {
			console.log(id)
			Dialog.confirm({
				message: '确认删除？'
			}).then(() => {
				console.log('确认')
			}).catch(() => {
				console.log('取消')
			})
			e.cancelBubble = true
		}
	}
}
</script>

<style lang="scss" scoped>
@import '@css/constants.scss';
.report {
	ul li{
		display: flex;
		justify-content: space-between;
		padding: px2rem(20) px2rem(10);
		i {
			font-size: px2rem(19);
			line-height: px2rem(40);
			color: #acb7cf;
		}
		span {
			width: px2rem(40);
			height: px2rem(40);
			line-height: px2rem(40);
			border-radius: 50%;
			background-color: #6f7ea0;
			font-size: px2rem(14);
			color: #fff;
			margin-right: px2rem(10);
			display: inline-block;
			text-align: center;
		}
		strong {
			font-size: px2rem(16);
			line-height: px2rem(40);
			color: $activeColor;
		}
	}
	.item-wrap {
		border-top: 1px solid #dce2f4;
		li {
			border-bottom: 1px solid #dce2f4;
			margin: 0 px2rem(10);
			padding: px2rem(10) 0;
			strong {
				font-size: px2rem(14);
			}
		}
	}
}
</style>