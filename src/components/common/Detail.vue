<template>
	<div class="detail" :style="{ paddingTop: paddingTT + 'px' }" v-if="info.info">

		<header>
			<h3>新闻详情</h3>
			<span class="iconfont" @click="onClickFont">&#xe646;</span>
		</header>

		<div class="wrapper" ref="wrapper">
		<section>
			<h2>{{ info.info.title.slice(0, 35) + '...' }}</h2>
			<hgroup>
				<span>{{ info.info.pubtimeStr }}</span>
				<p v-if="info.info.site_name">
					来源: <span @click="onClickIframe">{{ info.info.site_name | siteLength }}</span>
					<!-- <a :href="info.info.url" target="_blank">{{ info.info.site_name }}</a> -->
				</p>
			</hgroup>
			<div class="des" :style="{ fontSize: fontValue + 'px' }" v-html="info.cache_text"></div>
		</section>
		</div>

		<div class="features" v-if="this.pageType == 'message'">
			<van-tabbar v-model="mesactive" active-color='#4e5a78'>
			  <van-tabbar-item @click="onClick(0)"><i class="iconfont">&#xe61b;</i><span>转发</span></van-tabbar-item>
			  <van-tabbar-item v-if="isfavo" @click="onClickdodel"><i class="iconfont">&#xe73a;</i><span>取消收藏</span></van-tabbar-item>
			  <van-tabbar-item v-else @click="onChange(1)"><i class="iconfont">&#xe73a;</i><span>收藏</span></van-tabbar-item>
			  <van-tabbar-item @click="onClick(2)"><i class="iconfont confrim-btn">&#xe639;</i><span>完成</span></van-tabbar-item>
			</van-tabbar>
		</div>
		<div class="features" v-else-if="this.pageType == 'juststore'">
			<van-tabbar v-model="mesactive" active-color='#4e5a78' v-if="isfavo">
			  <van-tabbar-item @click="onClickdodel"><i class="iconfont">&#xe73a;</i><span>取消收藏</span></van-tabbar-item>
			</van-tabbar>
			<van-tabbar v-model="mesactive" active-color='#4e5a78' v-else>
			  <van-tabbar-item @click="onChange(1)"><i class="iconfont">&#xe73a;</i><span>收藏</span></van-tabbar-item>
			</van-tabbar>
		</div>
		<div class="features" v-else-if="this.pageType == 'coll'">
			<van-tabbar v-model="mesactive" active-color='#4e5a78'>
			  <van-tabbar-item @click="onChange(0)"><i class="iconfont">&#xe61b;</i><span>推送</span></van-tabbar-item>
			  <van-tabbar-item @click="onClickdodel"><i class="iconfont">&#xe73a;</i><span>取消收藏</span></van-tabbar-item>
			</van-tabbar>
		</div>
		<div class="features" v-else>
			<van-tabbar v-model="active" active-color='#4e5a78'>
			  <van-tabbar-item @click="onChange(0)"><i class="iconfont">&#xe61b;</i><span>推送</span></van-tabbar-item>
			  <van-tabbar-item v-if="isfavo" @click="onClickdodel"><i class="iconfont">&#xe73a;</i><span>取消收藏</span></van-tabbar-item>
			  <van-tabbar-item v-else @click="onChange(1)"><i class="iconfont">&#xe73a;</i><span>收藏</span></van-tabbar-item>
			  <van-tabbar-item v-if="deletebtn" @click="onChange(2)"><i class="iconfont">&#xe66c;</i><span>删除</span></van-tabbar-item>
			</van-tabbar>
		</div>

		<div class="de-step" v-show="fontToggle">
			<span class="min-step">16</span>
			<van-slider v-model="fontValue" track-color="#000" active-color="#ff6651" bar-height="4px" :max="28" :min="16">
			  <div slot="button" class="custom-button">
			    {{ fontValue }}
			  </div>
			</van-slider>
			<span class="max-step">28</span>
		</div>

		<div class="de-push">
			<van-popup v-model="pushToggle" position='bottom' :style="{height: '23%'}">
				<push-to 
					@closeThis="closePush" 
					:idlist="[...detailid]" 
					:eventlist="[...eventid]" 
					:linktoggle="'true'"
					:linkurl="info.info.url"
					:fid="fid"
				></push-to>
			</van-popup>
		</div>

		<!-- 预警推送 -->
		<van-popup 
			v-model="pushpageToggle" 
			:overlay="false"
			closeable 
			close-icon-position="top-left" 
			position="right" 
			:style="{ height: '100%', width: '100%' }"
		>
				<push-page :idlist="[detailid]" :eventlist="[eventid]" :pushid="detailid" :fid="fid" @onCloseOne="closeHandle"></push-page>
			
		</van-popup>

		<!-- 完成弹框 -->
		<van-dialog
			v-model="finishToggle"
			title="添加留言"
			show-cancel-button
			@confirm="onClickConfirm"
		>
			<van-field
				v-model="message"
				rows="3"
				autosize
				type="textarea"
				placeholder="请输入留言"
				show-word-limit
			></van-field>
		</van-dialog>

		<!-- iframe -->
		<van-popup
			v-model="iframeToggle"
			:overlay="false"
			closeable
			position="right"
			close-icon-position="top-left"
			:style="{ height: '100%', width: '100%' }"
		>	
			<detail-iframe :texturl="textUrl"></detail-iframe>
		</van-popup>

	</div>
</template>

<script>
import { mapState, mapGetters } from 'vuex';
import { Dialog, Toast } from 'vant';
import PushTo from '@c/common/PushTo';
import PushPage from '@c/common/PushPage';
import DetailIframe from '@c/common/DetailIframe';
export default {
	name: 'detail',
	components: {
		PushTo,
		PushPage,
		DetailIframe
	},
	props: {
		fid: {
			type: String,
			default: ''
		},
		detailid: {
			type: String,
			default: ''
		},
		eventid: {
			type: String,
			default: ''
		},
		deletebtn: {
			type: Boolean,
			default: true
		},
		pageType: {
			type: String,
			default: 'monitor'
		},
		isfavo: {
			type: Number,
			default: 0
		}
	},
	data() {
		return {
			textUrl: '',
			message: '',
			iframeToggle: false,
			finishToggle: false,
			pushpageToggle: false,
			mesactive: 0,
			active: 0,
			fontValue: 18,
			fontToggle: false,
			pushToggle: false,
			timer: null,
			info: ''
		}
	},
	computed: {
		...mapState(['paddingTT', 'monitorEventList', 'userid', 'sub_uid']),
		...mapGetters(['getUserid', 'getSubid'])
	},
	mounted() {
		this.timer = setInterval(() => {
			if(this.fontToggle) {
				this.fontToggle = false
			}
		}, 20000)
		this.$nextTick(() => {
			if(this.getUserid) {
				this.getDetailData(this.getUserid, this.getSubid)
			}else {
				this.getDetailData(this.userid, this.sub_uid)
			}
		})
	},
	watch: {
		isfavo(type) {
			console.log('detail'+":"+type)
			if(type) {
				this.info.info.is_favo = 1
			}else {
				this.info.info.is_favo = 0
			}
		},
		detailid() {
			this.getDetailData()
		}
	},
	filters: {
		siteLength(val) {
			if(val.length > 8) {
				return val.slice(0, 7) + '...'
			}else {
				return val
			}
		}
	},
	methods: {
		onClickIframe() {
			this.textUrl = this.info.info.event_url || this.info.info.url
			this.iframeToggle = true
		},
		closeHandle(id) {
			this.pushpageToggle = false
			this.$emit('onFinished', id)
		},
		onClickdodel() {
			Dialog.confirm({
				message: '确定取消收藏该条信息？'
			}).then(()=> {
				this.$axios({
					method: 'post',
					url: '/index.php/Favo/doDel',
					data: {
						uid: this.getUserid,
						sub_uid: this.getSubid,
						main_id: [this.eventid]
					}
				}).then((res) => {
					if(res.data.status == '1') {
						Toast.success(res.data.msg)
						this.$emit('backHandle', this.eventid)
						this.info.info.is_favo = 0
					}else {
						Toast.fail(res.data.msg)
					}
				}).catch((res) => {
					Toast.fail('操作异常，请刷新重试')
				})
			})
		},
		onClickConfirm() {
			if(this.message.length === 0) {
				Toast('请输入留言信息！')
			}else {
				this.$axios({
					method: 'post',
					url: '/index.php/Push/finish',
					data: {
						fid: this.fidd,
						uid: this.getUserid,
						sub_uid: this.getSubid,
						event_push_id: this.detailid,
						remark: this.message
					}
				}).then((res) => {
					this.$emit('onFinished', this.detailid)
					Toast.success(res.data.msg)
				}).catch((res) => {
					Toast.fail(res.data.msg)
				})
			}
		},
		onClick(type) {
			if(type == 0) {
				this.pushpageToggle = true
			}else {
				this.finishToggle = true
			}
		},
		getDetailData() {
			// alert('详情页事件id:' + this.eventid)
			if(this.fid == '' || this.fid == '-1' || this.fid == '0') {
				this.$axios({
					method: 'post',
					url: '/index.php/City/webcache',
					data: {
						uid: this.getUserid,
						sub_uid: this.getSubid,
						event_id: this.eventid
					}
				}).then((res) => {
					if(res.data.status == '1') {
						if(res.data.data.cache_text !== '暂无数据') {
							this.info = res.data.data
						}else {
							this.$emit('onFinished', 0)
							Toast.fail(res.data.data.cache_text)
						}
					}else {
						this.$emit('onFinished', 0)
						Toast.fail(res.data.msg)
					}
				}).catch((res) => {
					Toast.fail(res.msg)
				})
			}else {
				this.$axios({
					method: 'post',
					url: '/index.php/Monitor/webcache',
					data: {
						uid: this.getUserid,
						sub_uid: this.getSubid,
						fid: this.fid,
						mainid: this.eventid
					}
				}).then((res) => {
					if(res.data.status == '1') {
						if(res.data.data.cache_text !== '暂无数据') {
							this.info = res.data.data
						}else {
							this.$emit('onFinished', 0)
							Toast.fail(res.data.data.cache_text)
						}
					}else {
						this.$emit('onFinished', 0)
						Toast.fail(res.data.msg)
					}
				}).catch((res) => {
					Toast.fail(res.msg)
				})
			}
		},
		closePush() {
			this.pushToggle = false
		},
		onChange(value) {
			if(value === 0) {
				this.pushToggle = true
			}else if(value === 1) {
				// 收藏事件
				this.onForward()
			}else {
				// 删除事件
				this.onDelete()
			}
		},
		onDelete() {
			Dialog.confirm({
				message: '确定删除该条信息？\n（收藏与消息，同时删除）'
			}).then(() => {
				this.$axios({
					method: 'post',
					url: '/index.php/Monitor/eventBatchDelete',
					data: {
						fid: this.fid,
						uid: this.getUserid,
						sub_uid: this.getSubid,
						event_idlist: [this.eventid]
					}
				}).then((res) => {
					if(res.data.status == '1') {
						Toast.success(res.data.msg)
						this.$emit('backHandle', false)
						for(let i=0; i<this.monitorEventList.length; i++) {
							if(this.monitorEventList[i].id == this.detailid) {
								this.monitorEventList.splice(i, 1)
							}
						}
					}else {
						Toast.fail(res.data.msg)
					}
				}).catch((res) => {
					Toast.fail(res.data.msg)
				})
			})
		},
		onForward() {
			Dialog.confirm({
				message: '收藏此条信息？'
			}).then(() => {
				this.$axios({
					method: 'post',
					url: '/index.php/City/favorite',
					data: {
						fid: this.fid,
						uid: this.getUserid,
						sub_uid: this.getSubid,
						main_id: this.eventid,
						event_id: this.eventid
					}
				}).then((res) => {
					if(res.data.status == '1') {
						Toast.success(res.data.msg)
						this.info.info.is_favo = 1
						this.$emit('backHandle', this.eventid)
					}else {
						Toast.fail(res.data.msg)
					}
				}).catch((res) => {
					Toast.fail(res.data.msg)
				})
			})
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
			margin-top: px2rem(10);
			display: flex;
			justify-content: space-between;
			span {
				font-size: px2rem(14);
				color: #4e5a78;
				margin-bottom: px2rem(10);
			}
			p {
				font-size: px2rem(14);
				color: #4e5a78;
				margin-bottom: px2rem(10);
				span {
					margin-left: px2rem(5);
					color: #5984d1;
				}
			}
		}
		div.des {
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
			.confrim-btn {
				font-size: px2rem(20)
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
