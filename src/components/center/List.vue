<template>
	<div class="list" :style="{ paddingTop: paddingTT + 'px' }">

		<van-pull-refresh v-model="isLoading" @refresh="onRefresh">

			<van-list 
				v-model="loading" 
				:error.sync="errored" 
				error-text="请求失败，点击重新加载" 
				:finished="finished" 
				finished-text="没有更多了" 
				:immediate-check="false"
				@load="onLoad"
			>
				<van-swipe-cell v-for="item in monitorEventList" :key="item.id">

					<!-- <van-cell :border="false"> -->
					<div class="li-wrap">
						<div class="title">
							<div class="left">
								<van-checkbox 
									v-show="checkboxToggleCenter" 
									v-model="item.checked" 
									:key="item.id" 
									:name="item.id" 
									checked-color="#ff6651"
								 	@click.stop="onClickRadio(item.id)"
								></van-checkbox>
								<div class="rect zheng" v-if="item.isnegative == '2'">正</div>
								<div class="rect fu" v-else-if="item.isnegative == '1'">负</div>
								<div class="rect zhong" v-else>中</div>
								<div class="frie" @click.stop="onLinkEvent(item.areaid, item.event_id)">{{ item.docount }}</div>
							</div>
							<div class="right">
								{{item.preTimeStr}}前更新
							</div>
						</div>
						<div class="timer">
							<div class="timer-left">
								<img v-if="item.site_icon_type == 2" src="../../assets/images/newicon05.png" />
								<img v-else-if="item.site_icon_type == 11" src="../../assets/images/newicon01.png" />
								<img v-else-if="item.site_icon_type == 10" src="../../assets/images/newicon12.png" />
								<img v-else-if="item.site_icon_type == 20" src="../../assets/images/newicon09.png" />
								<img v-else-if="item.site_icon_type == 6" src="../../assets/images/newicon10.png" />
								<img v-else-if="item.site_icon_type == 3" src="../../assets/images/newicon03.png" />
								<img v-else-if="item.site_icon_type == 9" src="../../assets/images/newicon04.png" />
								<img v-else-if="item.site_icon_type == 4" src="../../assets/images/newicon07.png" />
								<img v-else-if="item.site_icon_type == 5" src="../../assets/images/newicon08.png" />
								<img v-else-if="item.site_icon_type == 7" src="../../assets/images/newicon06.png" />
								<img v-else src="../../assets/images/newicon11.png" />
								<span>{{ item.site_name | nameLength }}</span>
								<!-- <i class="iconfont">&#xe623;</i>
								<span v-if="item.source == 1">博客</span>
								<span v-else-if="item.source == 2">微信</span>
								<span v-else>头条</span> -->
							</div>
							<div class="timer-right">
								首次收录： {{item.addtimeStr}}
							</div>
						</div>
						<div class="desc" @click="openDetail(item.id, item.event_id)">
							<p>{{item.event_title | textLength}}</p>
						</div>
						<div class="tags">
							<h5>监控词组：</h5>
							<p>
								<span v-for="(val, index) in item.wordStr" :key="index">{{ val }}</span>
							</p>
						</div>
					</div>
					<!-- </van-cell> -->
					<template slot="right">
						<van-button type="default" @click="onClickOnePush(item.id, item.event_id, item.event_url)">
							<i class="iconfont">&#xe623;</i><span>推送</span>
						</van-button>
						<van-button type="default" @click="onClickOneStore(item.id, item.event_id)">
							<i class="iconfont">&#xe6e7;</i>
							<span>收藏</span>
						</van-button>
						<van-button type="default" @click="onClickOneDelete(item.id, item.event_id)">
							<i class="iconfont">&#xe6e9;</i>
							<span>删除</span>
						</van-button>
					</template>
				</van-swipe-cell>

			</van-list>

		</van-pull-refresh>

		<div class="allSelect" v-show="checkboxToggleCenter">
			<van-checkbox v-model="allchecked" checked-color="#ff6651">全选</van-checkbox>
			<div class="btn-wrap">
				<van-button color="#6f7ea0" plain size="small" @click="onClickDelete">删除</van-button>
				<van-button color="#6f7ea0" size="small" @click="onClickPush">推送</van-button>
			</div>
		</div>

		<van-popup v-model="showDetailToggle" closeable close-icon="arrow-left" close-icon-position="top-left" position="right"
		 :overlay="false" :style="{ height: '100%', width: '100%' }">
			<detail :eventid="eventId" :detailid="detailId" :pageType="'monitor'" @backHandle="detailClose" :fid="fidd"></detail>
		</van-popup>

		<van-popup v-model="showLinkEventToggle" position="bottom" :style="{ height: '80%' }" closeable close-icon-position="top-left">
			<event-list :eid="event_id" :aid="area_id" :fid="fidd"></event-list>
		</van-popup>

		<!-- 去推送 -->
		<van-popup v-model="pushToggle" position='bottom' :style="{height: '23%'}">
			<push-to 
				@closeThis="closePush" 
				:idlist="idList" 
				:eventlist="eventidList" 
				:fid="fidd" 
				:linktoggle="linkToggle"
				:linkurl="detail_url"
			></push-to>
		</van-popup>

	</div>
</template>

<script>
	import {
		mapState, mapGetters
	} from 'vuex';
	import {
		Toast,
		Dialog
	} from 'vant';
	import Detail from '@c/common/Detail';
	import EventList from '@c/common/EventList';
	import PushTo from '@c/common/PushTo';
	export default {
		name: 'monitor-list',
		props: {
			fidd: String
		},
		components: {
			Detail,
			EventList,
			PushTo
		},
		data() {
			return {
				isLoading: false,
				detail_url: '',
				linkToggle: false,
				pushToggle: false,
				showLinkEventToggle: false,
				showDetailToggle: false,
				loading: false,
				finished: false,
				errored: false,
				allchecked: false,
				newlist: [],
				event_id: '',
				eventId: '',
				detailId: '',
				area_id: '',
				page: 0,
				idList: [],
				eventidList: []
			}
		},
		computed: {
			...mapState(['checkboxToggleCenter', 'paddingTT', 'monitorEventList', 'fid', 'monitorQuery']),
			...mapGetters(['getUserid', 'getSubid'])
		},
		watch: {
			page(val) {
				this.monitorQuery.page = val
			},
			allchecked(val) {
				if (val) {
					this.monitorEventList.forEach((item) => {
						item.checked = true
					})
				} else {
					this.monitorEventList.forEach((item) => {
						item.checked = false
					})
				}
			},
			fidd() {
				Toast.loading({
					message: '加载中...',
					forbidClick: true,
					loadingType: 'spinner',
					duration: 0
				})
				this.$axios({
					method: 'post',
					url: '/index.php/Monitor/getESearch',
					data: this.monitorQuery
				}).then((res) => {
					if(res.data.status == '1') {
						let list = res.data.data.eventList
						if(list.length > 0) {
							list.forEach((item, index) => {
								item.wordStr = item.wordStr.split('+')
							})
							this.$store.commit('handleMonitorList', list)
							this.$store.state.monitorQuery.page = 1
							// this.page++
						}
						if(list.length == 0){
							this.$store.commit('handleMonitorList', [])
							this.finished = true
						}
						this.loading = false
					}else {
						this.loading = false
						this.errored = true	
					}
					Toast.clear()
				}).catch((res) => {
					this.loading = false
					this.errored = true
					Toast.fail(res.data.msg)
				})
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
			this.$nextTick(function() {
				// this.getESearch()
			})
		},
		methods: {
			onRefresh() {
				setTimeout(() => {
					this.$store.commit('handleMonitorList', [])
					this.$toast('刷新成功');
					this.getESearch()
					this.$store.state.monitorQuery.page = 0
        	this.isLoading = false;
        	// this.count++;
				}, 500)
			},
			closePush() {
				this.pushToggle = false
			},
			detailClose() {
				this.showDetailToggle = false
			},
			onClickOneDelete(id, eid) {
				Dialog.confirm({
					message: '确定删除该条信息？'
				}).then(() => {
					this.$axios({
						method: 'post',
						url: '/index.php/Monitor/eventBatchDelete',
						data: {
							fid: this.fidd,
							uid: this.getUserid,
							sub_uid: this.getSubid,
							event_idlist: [eid]
						}
					}).then((res) => {
						Toast.success(res.data.msg)

					}).catch((res) => {
						Toast.fail(res.data.msg)
					})
				})
			},
			onClickOneStore(id, eid) {
				Dialog.confirm({
					message: '收藏此条信息？'
				}).then(() => {
					this.$axios({
						method: 'post',
						url: '/index.php/City/favorite',
						data: {
							fid: this.fidd,
							uid: this.getUserid,
							sub_uid: this.getSubid,
							main_id: id,
							event_id: eid
						}
					}).then((res) => {
						if(res.data.status == '1') {
							Toast.success(res.data.msg)
						}else {
							Toast.fail(res.data.msg)
						}
					}).catch((res) => {
						Toast.fail(res.data.msg)
					})
				})
			},
			onClickOnePush(id, eid, url) {
				this.linkToggle = true
				this.detail_url = url
				this.idList = []
				this.eventidList = []
				for(let i=0; i<this.monitorEventList.length; i++) {
					if(this.monitorEventList[i].id == id) {
						this.monitorEventList[i].checked = true
						this.idList.push(this.monitorEventList[i].id)
						this.eventidList.push(this.monitorEventList[i].event_id)
					}else {
						this.monitorEventList[i].checked = false
					}
				}
				this.pushToggle = true
			},
			getESearch() {
				this.$axios({
					method: 'post',
					url: '/index.php/Monitor/getESearch',
					data: this.monitorQuery
				}).then((res) => {
					if(res.data.status == '1') {
						let list = res.data.data.eventList
						if(list.length > 0) {
							list.forEach((item, index) => {
								item.wordStr = item.wordStr.split('+')
							})
							this.$store.commit('handleMonitorList', this.monitorEventList.concat(list))
							this.$store.state.monitorQuery.page = this.$store.state.monitorQuery.page + 1
							// this.page++
						}
						if(list.length == 0){
							// this.$store.commit('handleMonitorList', this.monitorEventList.concat(list))
							this.finished = true
						}
						this.loading = false
					}else {
						this.loading = false
						this.errored = true
						Toast.fail(res.data.msg)
					}
					this.isLoading = false
				}).catch((res) => {
					this.loading = false
					this.errored = true
				})
			},
			onClickRadio(id) {
				console.log(id)
				let len = this.monitorEventList.length
				let list = []
				for(let i=0; i<len; i++) {
					if(this.monitorEventList[i].checked) {
						list.push(this.monitorEventList[i].id)
					}
				}
				// if(len == list.length) {
				// 	this.allchecked = true
				// }else {
				// 	this.allchecked = false
				// }
			},
			onLoad() {
				console.log('滚动')
				// 异步更新数据
				setTimeout(() => {
					this.getESearch()
					// this.loading = false;
				}, 1500);
			},
			openDetail(id, eid) {
				this.detailId = id
				this.eventId = eid
				this.showDetailToggle = true
			},
			onLinkEvent(aid, eid) {
				this.area_id = aid
				this.event_id = eid
				this.showLinkEventToggle = true
			},
			onClickPush() {
				this.linkToggle = false
				for (let i = 0; i < this.monitorEventList.length; i++) {
					if (this.monitorEventList[i].checked) {
						this.idList.push(this.monitorEventList[i].id)
						this.eventidList.push(this.monitorEventList[i].event_id)
					}
				}
				if (this.idList.length > 0) {
					this.pushToggle = true
					// this.$axios({
					// 	method: 'post',
					// 	url: '/index.php/Monitor/pushNews',
					// 	data: {
					// 		uid: this.$store.state.userid,
					// 		fid: this.$store.state.fid
					// 	}
					// }).then((res) => {
					// 	Toast.success(res.data.msg)
					// }).catch((res) => {
					// 	Toast.fail(res.data.msg)
					// })
				} else {
					Toast('你还没有选择事件哦')
				}
			},
			onClickDelete() {
				let arr = []
				for (let i = 0; i < this.monitorEventList.length; i++) {
					if (this.monitorEventList[i].checked) {
						arr.push(this.monitorEventList[i].id)
					}
				}
				if (arr.length > 0) {
					Dialog.confirm({
						message: '确认删除？'
					}).then(() => {
						this.$axios({
							method: 'post',
							url: '/index.php/Monitor/eventBatchDelete',
							data: {
								fid: this.$store.state.fid,
								uid: this.getUserid,
								sub_uid: this.getSubid,
								event_idlist: arr
							}
						}).then((res) => {
							for(let i=0; i<this.monitorEventList.length; i++) {
								if(this.monitorEventList[i].checked) {
									this.monitorEventList(i, 1)
								}
							}
							Toast.success(res.data.msg)
						}).catch((res) => {
							Toast.fail(res.data.msg)
						})
					}).catch(() => {

					})
					// 走接口
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
		padding-bottom: px2rem(20);
		font-size: 15px;
		position: absolute;
		left: 0;
		right: 0;
		bottom: px2rem(25);
		top: px2rem(120);
		overflow: auto;
		.van-popup {
			overflow: hidden;
		}

		.allSelect {
			position: fixed;
			left: 0;
			right: 0;
			bottom: 50px;
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

				.zhong {
					background-color: $rectBg2;
				}

				.fu {
					background-color: $rectBg3;
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
