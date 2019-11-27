<template>
<div class="placard-wrap">
	<div class="placard">
		<van-list 
			v-model="loading" 
			error.sync="errored"
			error-text="请求失败，点击重新加载"
			:finished="finished" 
			finished-text="没有更多了" 
			@load="onLoad"
		>
			<ul>
				<li v-for="item in list" :key="item.id" @click="getDetail(item.id)">
					<div class="item-title">
						<span>{{ item.addtime }}</span>
					</div>
					<div class="item-card">
						<img v-lazy="item.image">
						<h3>{{ item.title }}</h3>
						<p>{{ item.desc }}</p>
					</div>
				</li>
			</ul>
		</van-list>
	</div>

	<van-popup
		v-model="show"
		get-container="body"
		:overlay="false"
		position="right"
		:style="{ width: '100%', height: '100%' }"
		closeable
		close-icon="arrow-left"
		close-icon-position="top-left"
	>
		<div class="detail-wrap">
			<h4>公告详情</h4>
			<h2>{{ detailInfo.title }}</h2>
			<img v-lazy="detailInfo.image" />
			<p v-html="detailInfo.content"></p>
		</div>	
	</van-popup>

</div>
</template>

<script>
import { Toast } from 'vant';
import BScroll from 'better-scroll';
export default {
	name: 'placard',
	data() {
		return {
			loading: false,
			finished: false,
			errored: false,
			show: false,
			detailInfo: '',
			list: []
		}
	},
	mounted() {
		this.getNotice()
	},
	methods: {
		onLoad() {
			setTimeout(() => {
				this.getNotice()
			}, 2000)
		},
		getDetail(id) {
			this.show = true
			this.getData(id)
		},
		getData(id) {
			this.$axios({
				method: 'post',
				url: '/index.php/Notice/getDetail',
				data: {
					id: id,
					limit: '5'
				}
			}).then((res) => {
				this.detailInfo = res.data.data
			}).catch((res) => {
				Toast.fail(res.data.msg)
			})
		},
		getNotice() {
			let idd = ''
			if(this.list.length > 0) {
				idd = this.list[this.list.length-1].id
			}else {
				idd = ''
			}
			this.$axios({
				method: 'post',
				url: '/index.php/Notice/getList',
				data: {
					last_id: idd,
					limit: '5'
				}
			}).then((res) => {
				if(res.data.data.length > 0) {
					this.list = this.list.concat(res.data.data)
				}else {
					this.finished = true
				}
				this.loading = false
			}).catch((res) => {
				this.loading = false
				this.errored = true
				Toast.fail(res.data.msg)
			})
		}
	}
}
</script>

<style lang="scss" scoped>
@import '@css/constants.scss';
.placard {
	padding: px2rem(20) px2rem(10);
	overflow: hidden;
	ul {
		padding-bottom: px2rem(5);
	}
	li {
		margin-bottom: px2rem(20);
		.item-title {
			text-align: center;
			span {
				display: inline-block;
				border-radius: px2rem(3);
				background-color: #d2d4d8;
				padding: px2rem(3) px2rem(5);
				font-size: px2rem(12);
				color: #fff;
			}
		}
		.item-card {
			margin-top: px2rem(10);
			background-color: #fff;
			padding-bottom: px2rem(5);
			img {
				width: 100%;
			}
			h3 {
				margin-top: px2rem(5);
				padding: 0 px2rem(10);
				line-height: px2rem(32);
				font-size: px2rem(18)
			}
			p {
				padding: 0 px2rem(10);
				line-height: px2rem(22);
				font-size: px2rem(14);
				color: $deleteBg;
			}
		}
	}
}
.detail-wrap{
	padding: 0 px2rem(15);
	h4 {
		line-height: px2rem(50);
		font-size: px2rem(18);
		text-align: center;
	}
	h2 {
		line-height: px2rem(40);
		font-size: px2rem(16);
		text-align: center;
	}
	img {
		width: 100%;
		height: auto;
	}
	p {
		line-height: px2rem(24);
		font-size: px2rem(12);
		text-indent: px2rem(24)
	}
}
</style>