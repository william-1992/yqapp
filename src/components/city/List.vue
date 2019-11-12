<template>
	<div class="list">

		<van-list v-model="loading" :finished="finished" finished-text="没有更多了" @load="onLoad">

			<van-swipe-cell v-for="item in newlist" :key="item.id">

				<!-- <van-cell :border="false"> -->
				<div class="li-wrap">
					<div class="title">
						<div class="left">
							<van-checkbox v-show="checkboxToggleCity" v-model="item.checked" :key="item.id" :name="item.id" checked-color="#ff6651"
							 @click.stop="onClickRadio(item.id)"></van-checkbox>
							<div class="rect zheng" v-if="item.isnegative == '1'">正</div>
							<div class="rect fu" v-else-if="item.isnegative == '2'">负</div>
							<div class="rect zhong" v-else>中</div>
							<div class="frie" @click.stop="onLinkEvent(item.event_id, item.areaid)">{{ item.docount }}</div>
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

							<span>{{ item.site_name }}</span>
						</div>
						<div class="timer-right">
							首次收录： {{item.addtimeStr}}
						</div>
					</div>
					<div class="desc" @click="openDetail(item.event_id, item.areaid, item.id)">
						<p>{{item.light | textLength}}</p>
					</div>
				</div>
				<!-- </van-cell> -->
				<template slot="right">
					<van-button type="default"  @click="onClickOnePush(item.id, item.event_id)">
						<i class="iconfont">&#xe623;</i>
						<span>推送</span>
					</van-button>
					<van-button type="default" @click="onClickOneStore(item.id, item.event_id)">
						<i class="iconfont">&#xe6e7;</i>
						<span>收藏</span>
					</van-button>
				</template>
			</van-swipe-cell>

		</van-list>

		<div class="allSelect" v-show="checkboxToggleCity">
			<van-checkbox v-model="allchecked" checked-color="#ff6651">全选</van-checkbox>
			<div class="btn-wrap">
				<!-- <van-button color="#6f7ea0" plain size="small">删除</van-button> -->
				<van-button color="#6f7ea0" size="small" @click="onClickPush">推送</van-button>
			</div>
		</div>

		<!-- 详情页 -->
		<van-popup v-model="showDetailToggle" closeable close-icon="arrow-left" close-icon-position="top-left" position="right"
		 :overlay="false" :style="{ height: '100%', width: '100%' }">
			<detail :detailid="detail_id" :eventid="event_id" :deletebtn="false"></detail>
		</van-popup>

		<!-- 相似事件 -->
		<van-popup v-model="showLinkEventToggle" position="bottom" :style="{ height: '80%' }" closeable close-icon-position="top-left">
			<event-list :eid="event_id" :aid="area_id"></event-list>
		</van-popup>

		<!-- 去推送 -->
		<van-popup v-model="pushToggle" position='bottom' :style="{height: '23%'}">
			<push-to @closeThis="closePush" :idlist="idList" :eventlist="eventidList"></push-to>
		</van-popup>

	</div>
</template>

<script>
	import { mapState } from 'vuex';
	import { Toast } from 'vant';
	import Detail from '@c/common/Detail';
	import EventList from '@c/center/EventList';
	import PushTo from '@c/common/PushTo';
	export default {
		name: 'list',
		components: {
			Detail,
			EventList,
			PushTo
		},
		props: ['cityhot'],
		data() {
			return {
				pushToggle: false,
				showLinkEventToggle: false,
				showDetailToggle: false,
				loading: false,
				finished: false,
				allchecked: false,
				newlist: [],
				event_id: '',
				area_id: '',
				detail_id: '',
				idList: [],
				eventidList: [],
				page: 2
			}
		},
		computed: {
			...mapState(['checkboxToggleCity'])
		},
		watch: {
			newlist(data) {
				// console.log('123')
			},
			cityhot(val) {
				let sim = ''
				if (val == '1') {
					sim = ''
				} else {
					sim = 'sim_index'
				}
				this.getCityData(sim)
			},
			allchecked(val) {
				if (val) {
					this.newlist.forEach((item) => {
						item.checked = true
					})
				} else {
					this.newlist.forEach((item) => {
						item.checked = false
					})
				}
			}
		},
		filters: {
			textLength(val) {
				return val.slice(0, 38) + '...'
			}
		},
		mounted() {
			this.getCityData()
		},
		methods: {
			onClickOneStore(id, eid) {
				this.$axios({
					method: 'post',
					url: '/index.php/City/favorite',
					data: {
						uid: this.$store.state.userid,
						main_id: id,
						event_id: eid
					}
				}).then((res) => {
					Toast.success(res.data.msg)
				}).then((res) => {
					Toast.fail(res.data.msg)
				})
			},
			onClickOnePush(id) {
				for(let i=0; i<this.newlist.length; i++) {
					if(this.newlist[i].id == id) {
						this.newlist[i].checked = true
					}else {
						this.newlist[i].checked = false
					}
				}
				this.onClickPush()
			},
			getCityData(type) {
				this.$axios({
					method: 'post',
					url: '/index.php/City/getESearch',
					data: {
						uid: this.$store.state.userid,
						sort_type: type
					}
				}).then((res) => {
					this.newlist = res.data.data.eventList
				}).catch(() => {
					Toast.fail(res.data.msg)
				})
			},
			onClickRadio(id) {
				console.log(id)
			},
			onLoad() {
				// 异步更新数据
				setTimeout(() => {
					this.$axios({
						method: 'post',
						url: '/index.php/City/getESearch',
						data: {
							uid: this.$store.state.userid,
							page: this.page
						}
					}).then((res) => {
						if(res.data.data.eventList.length > 0) {
							this.newlist = this.newlist.concat(res.data.data.eventList)
							this.page++
						}else {
							this.finished = true;
						}
					}).catch(() => {
						Toast.fail(res.data.msg)
					})
					
					// for (let i = 0; i < 10; i++) {
					//   this.list.push(this.list.length + 1);
					// }
					// 加载状态结束
					this.loading = false;

					// 数据全部加载完成
					// if (this.newlist.length >= 40) {
					// 	this.finished = true;
					// }
				}, 2000);
			},
			openDetail(eid, aid, id) {
				this.showDetailToggle = true
				this.event_id = eid
				this.area_id = aid
				this.detail_id = id
				// this.idList = Array.from(new Set(this.idList.push(id)))
				// this.eventidList.push(eid)
			},
			onLinkEvent(eid, aid) {
				this.showLinkEventToggle = true
				this.event_id = eid
				this.area_id = aid
			},
			closePush() {

			},
			onClickPush() {
				this.idList = []
				this.eventidList = []
				for (let i = 0; i < this.newlist.length; i++) {
					if (this.newlist[i].checked) {
						this.idList.push(this.newlist[i].id)
						this.eventidList.push(this.newlist[i].event_id)
					}
				}
				if (this.idList.length > 0) {
					this.pushToggle = true
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
		padding-bottom: px2rem(50);
		font-size: 15px;

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
			padding: px2rem(20) px2rem(8) px2rem(10);
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
						background-size: 30% 60%;
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
