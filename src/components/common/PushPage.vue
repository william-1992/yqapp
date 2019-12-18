<template>
	<div class="push-page">
		<header>
			<van-button type="primary" size="small" @click="onPush">推送</van-button>
		</header>
		<section class="seleted-name">
			<p v-if="result.length == 0">收件人选择</p>
			<ul v-else>
				<li v-for="(item, index) in result" :key="index" @click="onClickDelete(index)">
					{{item}}
					<van-icon name="cross" />
				</li>
			</ul>
		</section>
		<section>
			<div class="staff-title">
				<h3>{{ this.$store.state.company_name }}</h3>
			</div>
			<van-collapse v-model="activeNames" class="staff-content">
			  <van-collapse-item title="标题1" name="1">
			  	<div slot="title" class="inner">
			  		<p>
			  			<van-icon name="play" color="#d3dbeb" />
			  			<span>{{ this.$store.state.company_short_name }}</span>
			  		</p>
			  		<!-- <time>{{ namelist.length }}</time> -->
			  	</div>
			  	<van-checkbox-group v-model="result" checked-color="#ff6651">
					  <van-checkbox v-for="(item, index) in namelist" :key="item.id" :name="item.nickname">
					  	<div class="item-wrap">
					  		<div class="item-wrap-circle">{{item.nickname.slice(0, 1)}}</div>
					  		<div class="item-wrap-des">
					  			<h3>{{item.nickname}}</h3>
					  			<p v-if="item.position">{{item.position}}</p>
					  		</div>
					  	</div>
						</van-checkbox>
					</van-checkbox-group>
				</van-collapse-item>
			</van-collapse>
		</section>
		<section class="textarea-wrap">
			  <van-field
			    v-model="message"
			    type="textarea"
			    placeholder="请输入留言"
			    rows="1"
			    autosize
			    :maxlength="50"
			    clearable
			  />
			  <p>{{this.message.length}} / 50</p>
		</section>

		<van-overlay :show="layshow" @click="layshow = false" />

	</div>
</template>

<script>
import { Toast } from 'vant';
import { mapGetters } from 'vuex';

export default {
	name: 'push-page',
	props: {
		idlist: Array,
		eventlist: Array,
		pushid: {
			type: String,
			default: ''
		},
		fid: {
			type: String,
			default: ''
		},
		storeType: {
			type: Boolean,
			default: false
		},
		fidlist: {
			type: Array,
			default: function() {
				return []
			}
		}
	},
	data() {
		return {
			layshow: false,
			sendradio: '1',
			checked: false,
			message: '',
			activeNames: ['1'],
			result: [],
			namelist: []
		}
	},
	mounted() {
		this.getUser()
	},
	computed: {
		...mapGetters(['getUserid', 'getSubid'])
	},
	methods: {
		onPush() {
			if(this.result.length === 0) {
				Toast.fail('请选择推送人')
				return false
			}else {
				let arr = []
				for(let i=0; i<this.namelist.length; i++) {
					for(let j=0; j<this.result.length; j++) {
						if(this.result[j] == this.namelist[i].nickname ) {
							arr.push(this.namelist[i].id)
						}
					}
				}
				// 判断storeType为true时走收藏页推送，为false时走转发和其它推送接口
				if(this.storeType) {
					// 收藏 - 推送
					this.pushToSubuser()
				}else {
					if(this.pushid !== '') {
						// 推送 - 转发
						this.pushForward()
					}else {
						// fid不为数组时，城市舆情页和监测中心页推送时
						this.pushToPage()
					}
				}
			}
		},
		pushToPage() {
			let eventarr = []
			let arr = []
			for(let i=0; i<this.namelist.length; i++) {
				for(let j=0; j<this.result.length; j++) {
					if(this.result[j] == this.namelist[i].nickname ) {
						arr.push(this.namelist[i].id)
					}
				}
			}
			for(let i=0; i<this.eventlist.length; i++) {
				if(eventarr.indexOf(this.eventlist[i]) == -1) {
					eventarr.push(this.eventlist[i])
				}
			}
			this.layshow = true
			Toast.loading({
				message: '推送中...',
				forbidClick: true,
				loadingType: 'spinner',
				duration: 0
			})
			this.$axios({
				method: 'post',
				url: '/index.php/Push/pushToSubUser',
				data: {
					uid: this.getUserid,
					sub_uid: this.getSubid,
					fid: this.fid,
					main_id: eventarr,
					sub_userlist: arr,
					remark: this.message
				}
			}).then((res) => {
				if(res.data.status == '1') {
					this.layshow = false
					Toast.success(res.data.msg)
					this.$emit('onCloseOne')
				}else {
					setTimeout(() => {
						this.layshow = false
						this.$emit('onCloseOne')
						Toast.clear()
					}, 800)
					Toast.fail({
						message: res.data.msg,
						duration: 800
					})
				}
			})	
		},
		pushToSubuser() {
			let arr = []
			for(let i=0; i<this.namelist.length; i++) {
				for(let j=0; j<this.result.length; j++) {
					if(this.result[j] == this.namelist[i].nickname ) {
						arr.push(this.namelist[i].id)
					}
				}
			}
			this.layshow = true
			Toast.loading({
				message: '推送中...',
				forbidClick: true,
				loadingType: 'spinner',
				duration: 0
			})
			this.$axios({
				method: 'post',
				url: '/index.php/Push/pushToSubUser',
				data: {
					uid: this.getUserid,
					sub_uid: this.getSubid,

					fid: this.fidlist,
					main_id: this.eventlist,
					sub_userlist: arr,
					remark: this.message
				}
			}).then((res) => {
				if(res.data.status == '1') {
					this.layshow = false
					Toast.success(res.data.msg)
					this.$emit('onCloseOne')
				}else {
					this.layshow = false
					Toast.fail(res.data.msg)
					this.$emit('onCloseOne')
				}
				Toast.clear()
			}).catch((res) => {
				this.layshow = false
				Toast.fail(res.data.msg)
			})
		},
		pushForward() {
			let arr = []
			for(let i=0; i<this.namelist.length; i++) {
				for(let j=0; j<this.result.length; j++) {
					if(this.result[j] == this.namelist[i].nickname ) {
						arr.push(this.namelist[i].id)
					}
				}
			}
			this.layshow = true
			Toast.loading({
				message: '推送中...',
				forbidClick: true,
				loadingType: 'spinner',
				duration: 0
			})
			this.$axios({
				method: 'post',
				url: '/index.php/Push/forward',
				data: {
					uid: this.getUserid,
					sub_uid: this.getSubid,
					event_push_id: this.pushid,
					sub_userlist: arr,
					remark: this.message
				}
			}).then((res) => {
				if(res.data.status == '1') {
					this.layshow = false
					Toast.success(res.data.msg)
					this.$emit('onCloseOne', this.pushid)
				}else {
					// this.layshow = false
					Toast.fail(res.data.msg)
					// this.$emit('onCloseOne')
				}
			}).catch((res) => {
				this.layshow = false
				Toast.fail(res.data.msg)
				this.$emit('onCloseOne')
			})
		},
		getUser() {
			this.$axios({
				method: 'post',
				url: '/index.php/User/getSubUserTree',
				data: {
					uid: this.getUserid,
					sub_uid: this.getSubid
				}
			}).then((res) => {
				if(res.data.status == '1') {
					this.namelist = res.data.data.userList
				}else {
					Toast.fail(res.data.msg)
				}
			}).catch((res) => {
				Toast.fail(res.data.msg)
			})
		},
		onClickDelete(index) {
			this.result.splice(index, 1)
		}
	}
}
</script>

<style lang="scss" scoped>
@import '@css/constants.scss';
.push-page {
	height: 100%;
	background-color: $bgColor;
	header {
		background-color: #fff;
		padding: px2rem(10) px2rem(10) 0 0;
		text-align: right;
	}
	section.seleted-name {
		background-color: #fff;
		padding: px2rem(15) px2rem(15) px2rem(10);
		border-bottom: 1px solid $borderColor;
		p {
			font-size: px2rem(16);
			color: $grayColor;
		}
		ul {
			overflow: auto;
			white-space: nowrap;
			li {
				display: inline-block;
				background-color: $bgColor;
				padding: 0 px2rem(5);
				margin-right: px2rem(5);
				line-height: px2rem(24);
				font-size: px2rem(14);
				i {
					background-color: #e0e2e6;
					position: relative;
					top: px2rem(2);
					border-radius: px2rem(15);
					color: #fff;
				}
			}
		}
	}
	section {
		.staff-title {
			background-color: #fff;
			line-height: px2rem(34);
			display: flex;
			justify-content: space-between;
			padding: 0 px2rem(15);
			padding-top: px2rem(10);
			h3 {
				font-size: px2rem(18);
			}
		}
		.staff-content {
			.inner {
				display: flex;
				justify-content: space-between;
				span {
					margin-left: px2rem(10)
				}
			}
			/deep/.van-collapse-item__content {
				background-color: $bgColor;
			}
			/deep/.van-icon-arrow {
				display: block;
			}
			/deep/.van-checkbox {
				justify-content: space-between;
				flex-direction: row-reverse;
				margin-bottom: px2rem(15);
				.item-wrap {
					display: flex;
					.item-wrap-circle {
						margin-right: px2rem(8);
						background-color: $deleteBg;
						color: #fff;
						width: px2rem(32);
						height: px2rem(32);
						line-height: px2rem(32);
						border-radius: 50%;
						text-align: center;
						font-size: px2rem(16);
					}
					.item-wrap-des {
						display: flex;
						align-items: center;
						h3 {
							font-size: px2rem(14)
						}
						p {
							font-size: px2rem(12);
							color: $deleteBg;
						}
					}
				}
			}
		}
	}
	.textarea-wrap {
		.van-field {
			min-height: px2rem(80);
			/deep/textarea::placeholder {
				color: $grayColor
			}
		}
		p {
			text-align: right;
			line-height: px2rem(24);
			padding-right: px2rem(10);
		}
	}
	.van-cell {
		margin-top: px2rem(10)
	}
	.send-wrap {
		background-color: #fff;
		margin: px2rem(10) 0;
		padding: px2rem(15);
		.van-radio-group {
			overflow: hidden;
		}
		.van-radio {
			margin-top: px2rem(10);
			float: left;
			margin-right: px2rem(20);
			font-size: px2rem(12);
		}
	}
}
</style>