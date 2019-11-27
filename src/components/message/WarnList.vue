<template>
	<div class="list">

		<van-list 
			v-model="loading" 
			:finished="finished" 
			:error.sync="errored"
			error-text="请求失败，点击重新加载"
			finished-text="没有更多了" 
			@load="onLoad"
		>

			<van-swipe-cell v-for="item in warnEventList" :key="item.id">

				<div class="sign-type sign01" v-if="item.level === '2'"><span>紧急</span></div>
				<div class="sign-type sign02" v-else-if="item.level === '3'"><span>严重</span></div>
				<div class="sign-type sign03" v-else><span>一般</span></div>

				<!-- <van-cell :border="false"> -->
				<div class="li-wrap">
					<div class="title">
						<div class="left">
							<div class="frie" @click.stop="onLinkEvent(item.id, item.event_main_id, item.fid)">{{ item.docount }}</div>
							<h2>{{ item.f_title }}</h2>
						</div>
						<div class="right">
							{{item.event_uptime}}前更新
						</div>
					</div>
					<div class="timer">
						<div class="timer-left">
							<img v-if="item.show_icon_type == 2" src="../../assets/images/newicon05.png" />
							<img v-else-if="item.show_icon_type == 11" src="../../assets/images/newicon01.png" />
							<img v-else-if="item.show_icon_type == 10" src="../../assets/images/newicon12.png" />
							<img v-else-if="item.show_icon_type == 20" src="../../assets/images/newicon09.png" />
							<img v-else-if="item.show_icon_type == 6" src="../../assets/images/newicon10.png" />
							<img v-else-if="item.show_icon_type == 3" src="../../assets/images/newicon03.png" />
							<img v-else-if="item.show_icon_type == 9" src="../../assets/images/newicon04.png" />
							<img v-else-if="item.show_icon_type == 4" src="../../assets/images/newicon07.png" />
							<img v-else-if="item.show_icon_type == 5" src="../../assets/images/newicon08.png" />
							<img v-else-if="item.show_icon_type == 7" src="../../assets/images/newicon06.png" />
							<img v-else src="../../assets/images/newicon11.png" />
							<span>{{ item.show_name }}</span>
						</div>
						<div class="timer-right">
							首次收录： {{item.pubtimeStr}}
						</div>
					</div>
					<div class="desc" @click="openDetail(item.id, item.event_main_id, item.fid)">
						<p>{{item.title}}</p>
					</div>
					<div class="tags">
						<h5>监控词组：</h5>
						<p>
							<span v-for="(val, index) in item.words" :key="index">{{val}}</span>
						</p>
					</div>
					
				</div>
				<!-- </van-cell> -->
				<template slot="right">
					<van-button type="default" @click="onClickOnePush(item.id, item.event_id, item.fid, item.url)">
						<i class="iconfont">&#xe623;</i><span>推送</span>
					</van-button>
					<van-button type="default" @click="onClickOneStore(item.id, item.event_id, item.fid)">
						<i class="iconfont">&#xe6e7;</i><span>收藏</span>
					</van-button>
				</template>
			</van-swipe-cell>

		</van-list>

		<van-popup v-model="showDetailToggle" closeable close-icon="arrow-left" close-icon-position="top-left" position="right"
		 :overlay="false" :style="{ height: '100%', width: '100%' }">
			<detail :deletebtn="false" :detailid="detailId" :eventid="eventId" :fid="fidd" ></detail>
		</van-popup>

		<van-popup v-model="showLinkEventToggle" position="bottom" :style="{ height: '80%' }" closeable close-icon-position="top-left">
			<event-list :eventType="'message'" :aid="detailId" :eid="eventId" :fid="fidd"></event-list>
		</van-popup>

		<!-- 去推送 -->
		<van-popup v-model="pushToggle" position='bottom' :style="{height: '23%'}">
			<push-to 
				@closeThis="closePush" 
				:idlist="[...detailId]" 
				:eventlist="[...eventId]" 
				:fid="fidd" 
				:linktoggle="linkToggle" 
				:linkurl="linkUrl"
			></push-to>
		</van-popup>

	</div>
</template>

<script>
	import {
		mapState
	} from 'vuex';
	import { Dialog } from 'vant';
	import Detail from '@c/common/Detail';
	import EventList from '@c/common/EventList';
	import PushTo from '@c/common/PushTo';
	export default {
		name: 'warn-list',
		props: {
			pushType: String
		},
		components: {
			Detail,
			EventList,
			PushTo
		},
		data() {
			return {
				detailId: '',
				eventId: '',
				fidd: '',
				linkurl: '',
				linkToggle: true,
				pushToggle: false,
				launchToggle: false,
				showLinkEventToggle: false,
				showDetailToggle: false,
				loading: false,
				finished: false,
				errored: false,
				allchecked: false,
				newlist: []
			}
		},
		computed: {
			...mapState(['warnQuery', 'warnEventList'])
		},
		watch: {
			warnEventList(data) {
				if(data.length <= 3) {
					this.getList()
					this.loading = true
				}
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
		mounted() {
			this.$nextTick(() => {
					this.getList()
			})
		},
		methods: {
			onClickOneStore(id, eid, fid) {
				Dialog.confirm({
					message: '收藏此条信息？'
				}).then(() => {
					this.$axios({
						method: 'post',
						url: '/index.php/City/favorite',
						data: {
							fid: fid,
							uid: this.$store.state.userid,
							main_id: id,
							event_id: eid
						}
					}).then((res) => {
						Toast.success(res.data.msg)

					}).catch((res) => {
						Toast.fail(res.data.msg)
					})
				}).catch(() => {

				})
			},
			onClickOnePush(id, eid, fid, url) {
				this.detailId = id
				this.eventId = eid
				this.fidd = fid
				this.linkUrl = url 
				this.pushToggle = true
			},
			closePush() {
				this.pushToggle = false
			},
			getList() {
				this.$axios({
					method: 'post',
					url: '/index.php/Warning/getDataList',
					data: this.warnQuery
				}).then((res) => {
					let list = res.data.data
					if(list.length > 0) {
						list.forEach((item, index) => {
							item.words = item.words.split('+')
						})
						this.$store.commit('handleWarnList', this.warnEventList.concat(list))
					}else {
						this.finished = true
					}
					this.loading = false
				}).catch((res) => {
					this.loading = false
					this.errored = true
					Toast.fail(res.data.msg)
				})
			},
			onClickRadio(id) {
				console.log(id)
			},
			onLoad() {
				// 异步更新数据
				setTimeout(() => {
					this.getList()
				}, 500);
			},
			openDetail(id, eid, fid) {
				this.detailId = id
				this.eventId = eid
				this.fidd = fid
				this.showDetailToggle = true
			},
			onLinkEvent(id, eid, fid) {
				this.detailId = id
				this.eventId = eid
				this.fidd = fid
				this.showLinkEventToggle = true
			},
			onClickLaunch(type) {
				if (type == '1') {
					this.launchToggle = true
				} else {
					this.launchToggle = false
				}
			}
		}
	}
</script>

<style lang="scss" scoped>
	@import '@css/constants.scss';

	.list {
		border-top: 1px solid $borderColor;
		padding-bottom: px2rem(50);
		font-size: 15px;

		.van-popup {
			overflow: hidden;
		}

		.allSelect {
			position: fixed;
			left: 0;
			right: 0;
			bottom: px2rem(46);
			background-color: #fff;
			display: flex;
			justify-content: space-between;
			padding: px2rem(5);
			box-shadow: 0 7px 7px 8px #ccc;

			button {
				margin-left: px2rem(5)
			}
		}

		.van-swipe-cell {
			.sign-type {
				width: px2rem(72);
				height: px2rem(40);
				line-height: px2rem(26);
				position: absolute;
				right: 0;
				top: 0;
				background: url('~@img/urgent.png') no-repeat right top;
				text-align: right;
				color: #fff;

				span {
					padding-right: px2rem(6);
				}
			}

			.sign02 {
				background-image: url('~@img/critical.png')
			}

			.sign03 {
				background-image: url('~@img/oridinary.png')
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
			padding: px2rem(30) px2rem(8) px2rem(10);
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
						margin-right: px2rem(10);
						height: px2rem(24);
						line-height: px2rem(24);
						font-size: px2rem(14);
						color: #ff6651;
						background: #fff4f3 url('~@img/fire01.png') no-repeat 5px center;
						padding-left: px2rem(18);
						padding-right: px2rem(7);
						background-size: 30% 60%;
					}

					h2 {
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


			.launch-list {
				ul {
					margin: 0 px2rem(10);
				}

				.van-button--large {
					height: px2rem(30);
					line-height: px2rem(28);
					border-top: 1px solid $borderColor !important;
					color: $defaultColor !important;
					font-size: px2rem(12);

					i {
						margin-top: px2rem(5);
						margin-left: px2rem(5);
						font-size: px2rem(14);
						transform: translateY(3px);
					}
				}

				li {
					background-color: $bgColor;
					display: flex;

					.launch-time {
						padding-bottom: px2rem(15);
						width: px2rem(48);
						text-align: center;

						h6 {
							font-size: px2rem(12);
							line-height: px2rem(24);
						}

						p {
							font-size: px2rem(12);
							color: $defaultColor
						}
					}

					.launch-line {
						display: flex;
						flex-direction: column;
						align-items: center;
						padding-top: px2rem(5);

						i {
							font-size: px2rem(8);
							color: $defaultColor;
						}

						.line1 {
							width: 1px;
							height: 100%;
							background-color: #DCE2F4;
							margin-top: px2rem(5);
						}
					}

					.launch-des {
						padding-left: px2rem(10);

						h6 {
							display: flex;
							justify-content: space-between;
							line-height: px2rem(24);
							font-size: px2rem(12);

							span:last-child {
								color: red
							}
						}

						p {
							font-size: px2rem(12);
						}
					}
				}

				li:last-child {
					.launch-line {
						.line1 {
							opacity: 0
						}
					}
				}
			}

			.forward {
				padding: px2rem(10);
				padding-top: 0;

				p {
					line-height: px2rem(24);
					font-size: px2rem(14);
				}
			}
		}
	}
</style>
