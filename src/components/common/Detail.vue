<template>
	<div class="detail" :style="{ paddingTop: paddingTT + 'px' }">

		<header>
			<h3>新闻详情</h3>
			<span class="iconfont" @click="onClickFont">&#xe646;</span>
		</header>

		<div class="wrapper" ref="wrapper">
		<section>
			<h2>在美国的极限施压下，德黑兰的处境更加糟糕自五月份的制裁</h2>
			<hgroup>
				<span>2019-08-05</span>
				<p>来源:<span>腾讯新闻</span></p>
			</hgroup>
			<div class="des" :style="{ fontSize: fontValue + 'px' }">在美国的极限施压下，德黑兰的处境更糟糕。自五月份的制裁和军事对峙开始，伊朗的原油出口量大幅度下降，这在一定程度上影响了德黑兰的财政收入来源，通过近期的情况来看，一事实已经成为鲁哈尼的心头之患。而正是因为如此，美国再一次把伊朗逼绝路，甚至是推向战争的边缘！在沙特油田遭遇袭击之后，美国在第一时间把策划者及组织者推卸到伊朗的身上，虽然胡塞武装已经承认，但无事于补。而正是因为如此，美国再一次把伊朗逼上绝路，甚至是推向战争的边缘！在沙特油田遭遇袭击之后，美国在第一时间把策划者及组织推卸到伊朗的身上，虽然胡塞武装已经承认，但无事于补。至是推向战争的边缘在者及组织者推卸到伊朗的身上，虽然胡塞武装已经承认，在美国的极限施压下，德黑兰的处境更糟糕。自五月份的制裁和军事对峙开始，伊朗的原油出口量大幅度下降，这在一定程度上影响了德黑兰的财政收入来源，通过近期的情况来看，一事实已经成为鲁哈尼的心头之患。而正是因为如此，美国再一次把伊朗逼绝路，甚至是推向战争的边缘！</div>
		</section>
		</div>

		<div class="features">
			<van-tabbar v-model="active" active-color='#4e5a78'>
			  <van-tabbar-item @click="onChange(0)"><i class="iconfont">&#xe61b;</i><span>推送</span></van-tabbar-item>
			  <van-tabbar-item @click="onChange(1)"><i class="iconfont">&#xe73a;</i><span>收藏</span></van-tabbar-item>
			  <van-tabbar-item @click="onChange(2)"><i class="iconfont">&#xe66c;</i><span>删除</span></van-tabbar-item>
			</van-tabbar>
		</div>

		<div class="de-step" v-show="fontToggle">
			<span class="min-step">16</span>
			<van-slider v-model="fontValue" active-color="#ff6651" bar-height="4px" :max="28" :min="16">
			  <div slot="button" class="custom-button">
			    {{ fontValue }}
			  </div>
			</van-slider>
			<span class="max-step">28</span>
		</div>

		<div class="de-push">
			<van-popup v-model="pushToggle" position='bottom' :style="{height: '23%'}">
				<push-to @closeThis="closePush"></push-to>
			</van-popup>
		</div>

	</div>
</template>

<script>
import { mapState } from 'vuex';
import { Dialog } from 'vant';
import PushTo from '@c/common/PushTo';
export default {
	name: 'detail-new',
	components: {
		PushTo
	},
	data() {
		return {
			active: 0,
			fontValue: 18,
			fontToggle: false,
			pushToggle: false,
			timer: null
		}
	},
	computed: {
		...mapState(['paddingTT'])
	},
	mounted() {
		// this.scroll = new Bscroll(this.$refs.wrapper, {mouseWheel: true, click: true, tag: true})
		this.timer = setInterval(() => {
			if(this.fontToggle) {
				this.fontToggle = false
			}
		}, 20000)
	},
	methods: {
		closePush() {
			this.pushToggle = false
		},
		onChange(value) {
			if(value === 0) {
				this.pushToggle = true
			}else if(value === 1) {

			}else {
				Dialog.confirm({
				  message: '确定要删除该信息？',
				  confirmButtonText: '删除'
				}).then(() => {
				  // on confirm
				}).catch(() => {
				  // on cancel
				});
			}
		},
		onClickFont() {
			this.fontToggle = this.fontToggle ? false : true
			// this.fontToggle = true
		}
	},
	activated() {
		clearInterval(this.timer)
	}
}
</script>

<style lang="scss" scoped>
@import '@css/constants.scss';
.detail {
	header {
		position: relative;
		line-height: 54px;
		h3 {
			font-size: px2rem(18);
			color: $activeColor;
			text-align: center;
		}
		span {
			position: absolute;
			right: px2rem(13);
			top: px2rem(0);
			font-size: px2rem(28)
		}
	}
	.wrapper {
		position: absolute;
		top: px2rem(54);
		bottom: px2rem(50);
		overflow: auto;
		z-index: 1;
		width: 100%;
	}
	section {
		padding: 0 px2rem(15);
		h2 {
			font-size: px2rem(20);
			line-height: px2rem(26);
		}
		hgroup {
			margin-top: px2rem(20);
			display: flex;
			justify-content: space-between;
			span {
				font-size: px2rem(14);
				color: #4e5a78;
			}
			p {
				font-size: px2rem(14);
				color: #4e5a78;
				span {
					margin-left: px2rem(5);
					color: #5984d1;
				}
			}
		}
		div.des {
			margin-top: px2rem(20);
			font-size: px2rem(18);
			line-height: px2rem(30);
			text-indent: px2rem(18);
			text-align: justify;
		}
	}
	.features {
		/deep/.van-tabbar-item__text {
			display: flex;
			flex-direction: column;
			text-align: center;
			i {
				font-size: px2rem(24)
			}
		}
	}
	.de-step {
		position: absolute;
		left: 0;
		right: 0;
		bottom: px2rem(45);
		height: px2rem(40);
		background-color: #fff;
		z-index: 100;
		border-bottom: 1px solid $borderColor;
		border-top: 2px solid #ccc;
		.min-step {
			position: absolute;
			left: px2rem(6);
			top: px2rem(16);
			font-size: px2rem(14);
		}
		.max-step {
			position: absolute;
			right: px2rem(6);
			top: px2rem(16);
			font-size: px2rem(14);
		}
		.van-slider {
			border-radius: 0;
			display: flex;
			align-items: center;
			padding: 0 px2rem(20);
			background-color: #fff;
			margin: px2rem(10) px2rem(15) 0 px2rem(10);
			.custom-button {
				width: px2rem(26);
				border-radius: px2rem(100);
				line-height: px2rem(18);
				font-size: px2rem(10);
				text-align: center;
				background-color: $rectBg3;
				color: #fff;
			}
		}
	}
}
</style>