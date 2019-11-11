<template>
	<div class="mine">
		<div class="title">
			<div class="left">
				<h5>{{ nickname }}</h5>
				<p>{{ company_name }}</p>
			</div>
			<div class="right">{{ nickname.slice(0, 1) }}</div>
		</div>
		<div class="list-nav">
			<ul>
				<li v-for="item in list" :key="item.id" @click='handleClick(item.id)'>
					<div class="nav-text">
						<!-- <i class="iconfont" v-html="item.icon">{{item.icon}}</i> -->
						<img :src="item.url">
						{{item.title}}
					</div>
					<div class="nav-core">
						<van-icon name="arrow" />
					</div>
				</li>
			</ul>
		</div>

		<van-popup
			v-model="collToggle"
			closeable
			close-icon="arrow-left"
			close-icon-position="top-left"
			position="right"
			@close="onClickClose"
			:style="{ height: '100%', width: '100%', backgroundColor: '#f7f9fe' }"
		>
			<collection />
		</van-popup>

		<van-popup
			v-model="reportToggle"
			closeable
			close-icon="arrow-left"
			close-icon-position="top-left"
			position="right"
			@close="onClickClose"
			:style="{ height: '100%', width: '100%' }"
		>
			<report />
		</van-popup>

	</div>
</template>

<script>
import { Dialog } from 'vant';
import { mapState } from 'vuex';
import Collection from '@c/mine/Collection';
import Report from '@c/mine/Report';
export default {
	name: 'mine',
	components: {
		Collection,
		Report
	},
	inject: ['reload'],
	computed: {
		...mapState(['nickname', 'company_name'])
	},
	data() {
		return {
			reportToggle: false,
			collToggle: false,
			list: [{
				id: 'A',
				icon: '&#xe617;',
				title: '我的报告',
				url: require('@img/report.png')
			}, {
				id: 'B',
				icon: '&#xe73a;',
				title: '我的收藏',
				url: require('@img/hobrt.png')
			}, {
				id: 'C',
				icon: '&#xe639;',
				title: '退出登录',
				url: require('@img/close.png')
			}]
		}
	},
	methods: {
		onClickClose() {
			if(window.plus) {
				this.plusReady2()
			}else {
				document.addEventListener('plusready', this.plusReady2, false)
			}
		},
		plusReady() {
			plus.navigator.setStatusBarBackground('#ffffff');
			plus.navigator.setStatusBarStyle('dark');
		},
		plusReady2() {
			plus.navigator.setStatusBarBackground('#8091bb');
			plus.navigator.setStatusBarStyle('light');
		},
		handleClick(type) {
			if(type === 'C') {
				Dialog.confirm({
					message: '确定退出？',
					confirmButtonText: '退出',
					className: 'dialogtext'
				}).then(() => {
					this.reload()
					this.$store.commit('handleLogin', true)
				}).catch(() => {
					console.log('取消退出')
				})
			}else if(type === 'B') {
				this.collToggle = true
				if(window.plus) {
					this.plusReady()
				}else {
					document.addEventListener('plusready', this.plusReady, false )
				}
			}else {
				this.reportToggle = true
				if(window.plus) {
					this.plusReady()
				}else {
					document.addEventListener('plusready', this.plusReady, false )
				}
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
		background: -webkit-gradient(linear, 0 0, 0 100%, from(#8091bb), to(#4e5a78));
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
				img {
					width: px2rem(22);
					margin-right: px2rem(8);
				}
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