<template>
	<div class="list">

		<van-list
		  v-model="loading"
		  :finished="finished"
		  finished-text="没有更多了"
		  @load="onLoad"
		>

		<van-swipe-cell v-for="item in newlist" :key="item.id" >

			<!-- <van-cell :border="false"> -->
				<div class="li-wrap" @click="openDetail(item.id)">
					<div class="title">
						<div class="left">
							<van-checkbox 
								v-show="checkboxToggle"
								v-model="item.checked" 
								:key="item.id" 
								:name="item.id" 
								checked-color="#ff6651"
								@change="onClickRadio(item.id)"
							></van-checkbox>
							<div class="rect">{{ item.type }}</div>
							<div class="frie">{{ item.number }}</div>
						</div>
						<div class="right">
							{{item.timer}}小时前更新
						</div>
					</div>
					<div class="timer">
						<div class="timer-left">
							<i class="iconfont">&#xe623;</i>
							<span v-if="item.source == 1">博客</span>
							<span v-else-if="item.source == 2">微信</span>
							<span v-else>头条</span>
						</div>
						<div class="timer-right">
							首次收录： {{item.firstTime}}
						</div>
					</div>
					<div class="desc">
						<p>{{item.des}}</p>
					</div>
					<div class="tags">
						<h5>监控词组：</h5>
						<p>
							<span v-for="(val, index) in item.tags" :key="index">{{val.title}}</span>
						</p>
					</div>
				</div>					
			<!-- </van-cell> --> 
			<template slot="right">
				<van-button type="default">
					<i class="iconfont">&#xe623;</i><span>推送</span>
				</van-button>
				<van-button type="default">
					<i class="iconfont">&#xe6e7;</i>
					<span>收藏</span>
				</van-button>
				<van-button type="default">
					<i class="iconfont">&#xe6e9;</i>
					<span>删除</span>
				</van-button>
			</template>
		</van-swipe-cell>

		</van-list>

		<div class="allSelect" v-show="checkboxToggle">
			<van-checkbox v-model="allchecked" checked-color="#ff6651">全选</van-checkbox>
			<div class="btn-wrap">
				<van-button color="#6f7ea0" plain size="small">删除</van-button>
				<van-button color="#6f7ea0" size="small">推送</van-button>
			</div>
		</div>

		<van-popup
		  v-model="showDetailToggle"
  		closeable
  		close-icon="arrow-left"
  		close-icon-position="top-left"
		  position="right"
		  :overlay="false"
		  :style="{ height: '100%', width: '100%' }"
		>
			<detail></detail>
		</van-popup>

	</div>
</template>

<script>
import {mapState} from 'vuex';
import Detail from '@c/common/Detail';
export default {
	name: 'list',
	components: {
		Detail
	},
	data() {
		return {
			showDetailToggle: false,
			loading: false,
			finished: false,
			allchecked: false,
			newlist: [{
				id: '1',
				checked: false,
				type: '正',
				number: 8,
				timer: 5,
				source: 1,
				firstTime: '2018-09-9 10:23',
				des: '邮箱是拥有国内用户最多、市场最大的邮箱就是巨作这次改版，特意从应用商城下载了各种邮...',
				tags: [
					{title: '食品安全',href: ''},
					{title: '有气味',href: ''},
					{title: '腐坏',href: ''},
					{title: '食品安全',href: ''},
					{title: '油漆味',href: ''},
					{title: '腐坏',href: ''},
					{title: '食品安全',href: ''},
				]
			}, {
				id: '2',
				checked: false,
				type: '负',
				number: 3,
				timer: 9,
				source: 2,
				firstTime: '2018-09-9 10:23',
				des: '邮箱是拥有国内用户最多、市场最大的邮箱就是巨作这次改版，特意从应用商城下载了各种邮...',
				tags: [
					{title: '食品安全',href: ''},
					{title: '有气味',href: ''},
					{title: '腐坏',href: ''},
					{title: '食品安全',href: ''},
					{title: '油漆味',href: ''},
					{title: '腐坏',href: ''},
					{title: '食品安全',href: ''},
				]
			}, {
				id: '3',
				checked: false,
				type: '负',
				number: 3,
				timer: 9,
				source: 2,
				firstTime: '2018-09-9 10:23',
				des: '邮箱是拥有国内用户最多、市场最大的邮箱就是巨作这次改版，特意从应用商城下载了各种邮...',
				tags: [
					{title: '食品安全',href: ''},
					{title: '有气味',href: ''},
					{title: '腐坏',href: ''},
					{title: '食品安全',href: ''},
					{title: '油漆味',href: ''},
					{title: '腐坏',href: ''},
					{title: '食品安全',href: ''},
				]
			}]
		}
	},
	computed: {
		...mapState(['checkboxToggle'])
	},
	watch: {
		allchecked(val) {
			if(val) {
				this.newlist.forEach((item) => {
					item.checked = true
				})
			}else {
				this.newlist.forEach((item) => {
					item.checked = false
				})
			}
		}
	},
	methods: {
		onClickRadio(id) {
			console.log(id)
		},
		onLoad() {
			console.log('load')
      // 异步更新数据
      setTimeout(() => {
        // for (let i = 0; i < 10; i++) {
        //   this.list.push(this.list.length + 1);
        // }
        // 加载状态结束
        // this.loading = false;

        // 数据全部加载完成
        if (this.newlist.length >= 40) {
          this.finished = true;
        }
      }, 500);
    },
    openDetail(id) {
    	this.showDetailToggle = true
    }
	}
}
</script>

<style lang="scss" scoped>
@import '@css/constants.scss';
.list {
	padding-bottom: px2rem(50);
	font-size: 15px;
	.van-popup {
		overflow: hidden;
	}
	.allSelect {
		position: fixed;
		left: 0;
		right: 0;
		bottom: px2rem(50);
		background-color: #fff;
		display: flex;
		justify-content: space-between;
		padding: px2rem(5);
		box-shadow: 0 7px 7px 8px #ccc;
		button {
			margin-left: px2rem(5)
		}
	}
	/deep/.van-swipe-cell__right {
		display: flex;
		align-items: center;
		.van-button {
			border: none;
			background: none;
			height: auto;
			span {
				display: flex;
				flex-direction: column;
				i {
					font-size: px2rem(36)
				}
			}
			&:nth-of-type(1) {
				color: $rectBg3
			}
			&:nth-of-type(2) {
				color: $rectBg2
			}
			&:nth-of-type(3) {
				color: $deleteBg;
			}
		}
	}
	.li-wrap {
		padding: px2rem(20) px2rem(8) px2rem(5);
		background-color: #fff;
		margin-bottom: px2rem(10);
		.title {
			display: flex;
			justify-content: space-between;
			.left {
				display: flex;
				.van-checkbox {
					margin-right: px2rem(5);
				}
				.frie {
					margin-left: px2rem(10);
					height: px2rem(24);
					line-height: px2rem(24);
					font-size: px2rem(14);
					color: #ff6651;
					background: #fff4f3 url('~@img/fire01.png') no-repeat 5px center;
					padding-left: px2rem(18);
					padding-right: px2rem(7);
				}
			}
			.rect {
				float: left;
				width: px2rem(24);
				height: px2rem(24);
				line-height: 24px;
				font-size: px2rem(14);
				color: #fff;
				text-align: center;
				background-color: $rectBg1;
			}
			.right {
				line-height: px2rem(24);
				font-size: px2rem(12)
			}
		}
		.timer {
			display: flex;
			justify-content: space-between;
			margin-top: px2rem(8);
			line-height: px2rem(22);
			.timer-left {
				font-size: px2rem(12);
				color: #6f7ea0;
				i {
					margin-right: px2rem(10);
				}
			}
			.timer-right {
				font-size: px2rem(12);
				color: #6f7ea0;
			}
		}
		.desc {
			margin-top: px2rem(5);
			p {
				font-size: px2rem(16);
				color: $activeColor;
				line-height: px2rem(22);
			}
		}
		.tags {
			margin-top: px2rem(10);
			display: flex;
			h5 {
				width: px2rem(60);
				color: #6f7ea0;
				font-size: px2rem(12);
				line-height: px2rem(22);
			}
			p {
				flex: 1;
				span {
					margin: 0 px2rem(5) px2rem(5) 0;
					padding: 0 px2rem(5);
					height: px2rem(20);
					line-height: px2rem(20);
					display: inline-block;
					background-color: #f7f9fe;
					font-size: px2rem(12);
					color: #acb7cf;
				}
			}
		}
	}
}
</style>