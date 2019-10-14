<template>
	<div class="mine">
		<div class="title">
			<div class="left">
				<h5>宋大大</h5>
				<p>卫数科技有限公司</p>
			</div>
			<div class="right">宋</div>
		</div>
		<div class="list-nav">
			<ul>
				<li v-for="item in list" :key="item.id" @click='handleClick(item.id)'>
					<div class="nav-text">
						<i class="iconfont" v-html="item.icon">{{item.icon}}</i>{{item.title}}
					</div>
					<div class="nav-core">
						<van-icon name="arrow" />
					</div>
				</li>
			</ul>
		</div>

	</div>
</template>

<script>
import { Dialog } from 'vant';
export default {
	name: 'mine',
	data() {
		return {
			list: [{
				id: 'A',
				icon: '&#xe617;',
				title: '我的报告'
			}, {
				id: 'B',
				icon: '&#xe73a;',
				title: '我的收藏'
			}, {
				id: 'C',
				icon: '&#xe639;',
				title: '退出登录'
			}]
		}
	},
	methods: {
		handleClick(type) {
			if(type === 'C') {
				Dialog.confirm({
					message: '确定退出？',
					confirmButtonText: '退出'
				}).then(() => {
					console.log('退出成功')
				}).catch(() => {
					console.log('取消退出')
				})
			}else {
				this.$store.commit('handleMesType', type)
				this.$store.commit('handleToolbar', false)
			}
		}
	}
}
</script>

<style lang="scss" scoped>
@import '@css/constants.scss';
.mine {
	.title {
		padding: px2rem(80) px2rem(20);
		display: flex;
		justify-content: space-between;
		align-items: center;
		background: url('~@img/mine_bg.png');
		.left {
			font-size: px2rem(20);
			color: #fff;
			h5 {
				margin-bottom: px2rem(18);
			}
			p {
				font-size: px2rem(14)
			}
		}
		.right {
			background-color: #fff;
			border-radius: 50%;
			height: px2rem(72);
			line-height: px2rem(72);
			width: px2rem(72);
			text-align: center;
			color: #6f7ea0;
			font-size: px2rem(37);
		}
	}
	.list-nav {
		padding: 0 px2rem(18);
		li {
			margin-top: px2rem(40);
			display: flex;
			justify-content: space-between;
			.nav-text {
				color: $activeColor;
				font-size: px2rem(14);
				display: flex;
				align-items: center;
				i {
					width: px2rem(26);
					text-align: center;
					font-size: px2rem(22);
					color: #5984d1;
					margin-right: px2rem(10)
				}
			}
			&:nth-of-type(2) {
				i {
					color: #ff6651;
					font-size: px2rem(26);
				}
			}
			&:last-child {
				i {
					color: #6f7ea0;
				}
			}
			.nav-core {
				i {
					color: #acb7cf;
					font-size: px2rem(18);
				}
			}
		}
	}
}
</style>