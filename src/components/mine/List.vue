<template>
	<div class="list">



		<van-pull-refresh v-model="isLoading" @refresh="onRefresh">

		<van-list 
			v-model="loading" 
			:finished="finished" 
			:error.sync="errored" 
			error-text="请求失败，点击重新加载" 
			finished-text="没有更多了" 
			:immediate-check="false"
			@load="onLoad"
		>

			<van-swipe-cell v-for="item in collEventList" :key="item.id">
				<!-- <van-cell :border="false"> -->
				<div class="li-wrap">
					<div class="title">
						<div class="left">
							<van-checkbox v-show="checkboxToggleColl" v-model="item.checked" :key="item.id" :name="item.id" checked-color="#ff6651"
							 @click.stop="onClickRadio(item.id)"></van-checkbox>
							<div class="rect zheng" v-if="item.point == '2'">正</div>
							<div class="rect fu" v-else-if="item.point == '1'">负</div>
							<div class="rect zhong" v-else>中</div>
							<div class="frie" @click.stop="onLinkEvent(item.event_id, item.id, item.fid || 0)">{{ item.docount }}</div>
						</div>
						<div class="right">
							{{item.preTimeStr}}前更新
						</div>
					</div>
					<div class="timer">
						<div class="timer-left">
							<!-- <i class="iconfont">&#xe623;</i> -->
							<img v-if="item.site_icon_type == 9" src="../../assets/images/newicon04.png" />
							<img v-else-if="item.site_icon_type == 20" src="../../assets/images/newicon09.png" />
							<img v-else-if="item.site_icon_type == 11" src="../../assets/images/newicon07.png" />
							<img v-else-if="item.site_icon_type == 4" src="../../assets/images/newicon01.png" />
							<img v-else-if="item.site_icon_type == 6" src="../../assets/images/newicon10.png" />
							<img v-else src="../../assets/images/newicon11.png" />

							<span>{{ item.site_name | nameLength }}</span>
						</div>
						<div class="timer-right">
							首次收录： {{item.addtimeStr}}
						</div>
					</div>
					<div class="desc" @click="openDetail(item.event_id, item.id, item.fid || 0)">
						<p>{{item.light | textLength}}</p>
					</div>
					<div class="tags">
						<h5>监控词组：</h5>
						<p>
							<span v-for="(val, index) in item.ewords" :key="index">{{ val }}</span>
						</p>
					</div>
				</div>
				<!-- </van-cell> -->
				<template slot="right">
					<van-button type="default"  @click="onClickOnePush(item.id, item.event_id, item.fid || 0, item.url)">
						<i class="iconfont">&#xe623;</i>
						<span>推送</span>
					</van-button>
					<van-button type="default" @click="onClickOneStore(item.event_id)">
						<i class="iconfont">&#xe6e7;</i>
						<span>取消收藏</span>
					</van-button>
				</template>
			</van-swipe-cell>

		</van-list>

		</van-pull-refresh>




		<div class="allSelect" v-show="checkboxToggleColl">
			<van-checkbox v-model="allchecked" checked-color="#ff6651">全选</van-checkbox>
			<div class="btn-wrap">
				<van-button color="#6f7ea0" plain size="small" @click="onClickCancle">取消收藏</van-button>
				<van-button color="#6f7ea0" size="small" @click="onClickPush">推送</van-button>
			</div>
		</div>

		<van-popup 
			v-model="showDetailToggle" 
			closeable 
			close-icon="arrow-left" 
			close-icon-position="top-left" 
			get-container="body"
			position="right"
		 	:overlay="false" 
		 	:get-container="collection" 
		 	:style="{ height: '100%', width: '100%' }"
		 >
			<detail :eventid="eventId" :detailid="detailId" :pageType="'coll'" @backHandle="detailClose" :fid="fidd"></detail>
		</van-popup>

		<van-popup 
			v-model="showLinkEventToggle" 
			position="bottom" 
			:style="{ height: '80%' }" 
			get-container="body"
			closeable 
			close-icon-position="top-left"
		>
			<event-list :eventType="'favo'" :fid="fidd" :eid="eventId" :aid="detailId"></event-list>
		</van-popup>

		<van-popup
			v-model="pushToggle"
			position="bottom"
			get-container="body"
			:style="{ height: '23%' }"
		>
			<push-to 
				:fidlist="[...fidlist]" 
				:eventlist="[...eventlist]" 
				:idlist="[...idlist]" 
				:linkurl="detailUrl" 
				:linktoggle="linkToggle"
				@closeThis="closePush"
			></push-to>
		</van-popup>

	</div>
</template>

<script>
	import { Toast, Dialog } from 'vant';
	import {
		mapState, mapGetters
	} from 'vuex';
	import Detail from '@c/common/Detail';
	import EventList from '@c/common/EventList';
	import PushTo from '@c/mine/PushTo';
	export default {
		name: 'store-list',
		components: {
			Detail,
			EventList,
			PushTo
		},
		data() {
			return {
				isLoading: false,
				linkToggle: false,
				pushToggle: false,
				showLinkEventToggle: false,
				showDetailToggle: false,
				loading: false,
				finished: false,
				errored: false,
				allchecked: false,
				newlist: [],
				page: 0,
				fidd: '',
				eventId: '',
				detailId: '',
				detailUrl: '',
				eventlist: [],
				idlist: [],
				fidlist: []
			}
		},
		computed: {
			...mapState(['checkboxToggleColl', 'collEventList', 'collQuery']),
			...mapGetters(['getUserid', 'getSubid'])
		},
		watch: {
			page(val) {
				// this.collQuery.page = val
			},
			allchecked(val) {
				if (val) {
					this.collEventList.forEach((item) => {
						item.checked = true
					})
				} else {
					this.collEventList.forEach((item) => {
						item.checked = false
					})
				}
			}
		},
		filters: {
			textLength(val) {
				if(val.length > 40) {
					return val.slice(0, 38) + '...'
				}else {
					return val
				}
			},
			nameLength(val) {
				if(val.length > 10) {
					return val.slice(0, 10) + '...'
				}else {
					return val
				}
			}
		},
		mounted() {
			this.getList()
		},
		methods: {
			onRefresh() {
				setTimeout(() => {
					this.$store.commit('handleCollList', [])
					this.$store.state.collQuery.page = 0
					this.getList()
					Toast('刷新成功')
				}, 500)
			},
			closePush() {
				this.pushToggle = false
			},
			onClickOnePush(id, eid, fid, url) {
				this.idlist = []
				this.eventlist = []
				this.fidlist = []

				this.linkToggle = true
				this.detailId = id
				this.eventId = eid
				this.idlist.push(id)
				this.eventlist.push(eid)
				this.fidlist.push(fid)
				// this.fidd = fid
				this.detailUrl = url
				this.pushToggle = true
			},
			onClickOneStore(id) {
				Dialog.confirm({
					message: '确定取消收藏该条信息？'
				}).then(() => {
					this.$axios({
						method: 'post',
						url: '/index.php/Favo/doDel',
						data: {
							uid: this.getUserid,
							sub_uid: this.getSubid,
							main_id: id
						}
					}).then((res) => {
						if(res.data.status == '1') {
							for(let i=0; i<this.collEventList.length; i++) {
								if(this.collEventList[i].checked) {
									this.collEventList.splice(i, 1)
								}
							}
							Toast.success(res.data.msg)
						}else {
							Toast.fail(res.data.msg)
						}
					}).catch((res) => {
						Toast.fail(res.data.msg)
					})
				})
			},
			detailClose(data) {
				console.log(data)
				this.showDetailToggle = false
			},
			getList() {
				this.$axios({
					method: 'post',
					url: '/index.php/Favo/getList',
					data: this.collQuery
				}).then((res) => {
					if(res.data.status == '1') {
						if(res.data.data.length > 0) {
							this.$store.commit('handleCollList', this.collEventList.concat(res.data.data))
							this.$store.state.collQuery.page = this.$store.state.collQuery.page + 1
						}else {
							this.finished = true;
						}
						this.loading = false
					}else {
						this.loading = false
						this.errored = true
					}
					this.isLoading = false
				})
			},
			onClickRadio(id) {
				console.log(id)
			},
			onLoad() {
				console.log('load')
				setTimeout(() => {

					this.getList()
					// 加载状态结束
					// this.loading = false;

					// 数据全部加载完成
					
				}, 2000);
			},
			openDetail(eid, id, fid) {
				this.eventId = eid
				this.detailId = id
				this.idlist.push(id)
				this.eventlist.push(eid)
				this.fidd = fid
				this.showDetailToggle = true
			},
			onLinkEvent(eid, id, fid) {
				this.eventId = eid
				this.detailId = id
				this.idlist.push(id)
				this.eventlist.push(eid)
				this.fidd = fid
				this.showLinkEventToggle = true
			},
			collection() {
				return document.querySelector('.collection')
			},
			onClickPush() {
				this.linkToggle = false
				this.idlist = []
				this.eventlist = []
				this.fidlist = []
				for (let i = 0; i < this.collEventList.length; i++) {
					if (this.collEventList[i].checked) {
						this.idlist.push(this.collEventList[i].id)
						this.eventlist.push(this.collEventList[i].event_id)
						this.fidlist.push(this.collEventList[i].fid || '-1')
					}
				}
				if (this.idlist.length > 0) {
					this.pushToggle = true
				} else {
					Toast('你还没有选择事件哦')
				}
			},
			onClickCancle() {
				let arr = []
				for (let i = 0; i < this.newlist.length; i++) {
					if (this.newlist[i].checked) {
						arr.push(this.newlist[i].id)
					}
				}
				if (arr.length > 0) {
					this.$axios({
						method: 'post',
						url: '/index.php/Favo/doDel',
						data: {
							uid: this.getUserid,
							sub_uid: this.getSubid,
							main_id: arr
						}
					}).then((res) => {
						if(res.data.status == 1) {
							for(let i=0; i<this.newlist.length; i++) {
								if(this.newlist[i].checked) {
									this.newlist.splice(i, 1)
								}
							}
						}else {
							Toast.fail(res.data.msg)
						}
					}).catch((res) => {
						Toast.fail(res.data.msg)
					})
				} else {
					Toast('你还没有选择事件哦')
				}
			}
		}
	}
</script>

<style lang="scss" scoped>
	@import '@css/constants.scss';

	.list {
		position: fixed;
		left: 0;
		right: 0;
		bottom: 0;
		top: 1rem;
		overflow: auto;
		font-size: 15px;

		.van-popup {
			overflow: hidden;
		}

		.allSelect {
			position: fixed;
			left: 0;
			right: 0;
			bottom: 0;
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
						background-size: 11px 16px;
					}

					h2 {
						margin-left: .1rem;
						font-size: px2rem(18);
						line-height: px2rem(24);
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
					display: flex;
					font-size: px2rem(12);
					color: #6f7ea0;

					i {
						margin-right: px2rem(10);
					}
					img {
						margin-right: px2rem(5);
						width: px2rem(18);
						height: px2rem(18);
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
