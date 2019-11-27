<template>
	<div class="list">

		<van-list 
			v-model="loading" 
			:error.sync="errored"
			error-text="请求失败，点击重新加载"
			:finished="finished" 
			finished-text="没有更多了" 
			@load="onLoad"
		>

			<van-swipe-cell v-for="item in newlist" :key="item.id">

				<div class="sign-type sign01" v-if="item.warning_level === '2'"><span>紧急</span></div>
				<div class="sign-type sign02" v-else-if="item.warning_level === '3'"><span>严重</span></div>
				<div class="sign-type sign03" v-else-if="item.warning_level === '1'"><span>一般</span></div>

				<!-- <van-cell :border="false"> -->
				<div class="li-wrap">
					<div class="title">
						<div class="left">
							<div class="frie" @click.stop="onLinkEvent(item.id, item.event_main_id, item.fid || 0)">{{ item.docount }}</div>
							<h2>{{ item.f_title }}</h2>
						</div>
						<div class="right">
							{{item.uptimeStr}}前更新
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
							<span>{{ item.site_name }}</span>
						</div>
						<div class="timer-right">
							首次收录： {{item.pretimeStr}}
						</div>
					</div>
					<div class="desc" @click="openDetail(item.id, item.event_main_id, item.fid || 0)">
						<p>{{item.title}}</p>
					</div>
					<div class="tags">
						<h5>监控词组：</h5>
						<p>
							<span v-for="(val, index) in item.ewords" :key="index">{{val}}</span>
						</p>
					</div>
					<!-- 待办事项/我发起的/我转发的 -->
					<div class="upcome">

						<div class="upcome-des" v-for="(ite, index) in item.logs" :key="ite.id">
							<div class="upcome-des-left">
								<p>推送人： {{ ite.from_nickname }}</p>
								<p>留言： {{ ite.remark }}</p>
							</div>
							<div class="upcome-des-right">
								<img v-if="item.my_is_over == '1'" src="@img/speed3.png">
								<img v-else src="@img/speed1.png">
							</div>
						</div>

						<div class="upcome-btn" v-if="item.my_is_over !== '1'">
							<van-button plain type="primary" color="#6f7ea0" size="small" @click="onClickPush(item.id, item.fid || 0)">一键转发</van-button>
							<van-button color="#6f7ea0" size="small" @click="onClickFinish(item.id, item.fid || 0)">完成</van-button>
						</div>

					</div>
				</div>
				<!-- </van-cell> -->
				<template slot="right">
					<van-button type="default" @click="onClickOneStore(item.id, item.event_main_id, item.fid || 0)">
						<i class="iconfont">&#xe6e7;</i>
						<span>收藏</span>
					</van-button>
				</template>
			</van-swipe-cell>

		</van-list>

		<van-popup 
			v-model="showDetailToggle" 
			closeable 
			close-icon="arrow-left" 
			close-icon-position="top-left" 
			position="right"
			get-container="body"
		 	:overlay="false" 
		 	:style="{ height: '100%', width: '100%' }"
		 >
			<detail :detailid="pushId" :eventid="eventId" :pageType="'message'" :fid="fidd"></detail>
		</van-popup>

		<van-popup 
			v-model="showLinkEventToggle" 
			position="bottom" 
			:style="{ height: '80%' }" 
			get-container="body"
			closeable 
			close-icon-position="top-left"
		>
			<event-list :eventType="'message'" :fid="fidd" :eid="eventId" :aid="pushId"></event-list>
		</van-popup>

		<!-- 去推送 -->
		<van-popup 
			v-model="pushToggle" 
			:overlay="false"
			closeable 
			close-icon-position="top-left" 
			get-container="body"
			position="right" 
			:style="{ height: '100%', width: '100%' }"
		>
			<push-page :idlist="idList" :eventlist="eventidList" :pushid="pushId" :fid="fidd"></push-page>
		</van-popup>

		<!-- 完成点击弹框 -->
		<van-dialog
			v-model="finishToggle"
			title="添加留言"
			show-cancel-button
			get-container='body'
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

	</div>
</template>

<script>
	import {
		mapState
	} from 'vuex';
	import { Toast, Dialog } from 'vant';
	import Detail from '@c/common/Detail';
	import EventList from '@c/common/EventList';
	import PushPage from '@c/common/PushPage';
	export default {
		name: 'todo-list',
		components: {
			Detail,
			EventList,
			PushPage
		},
		data() {
			return {
				message: '',
				finishToggle: false,
				pushToggle: false,
				launchToggle: false,
				showLinkEventToggle: false,
				showDetailToggle: false,
				loading: false,
				finished: false,
				errored: false,
				allchecked: false,
				newlist: [],
				idList: [],
				eventidList: [],
				pushId: '',
				fidd: '',
				eventId: '',
				page: 0
			}
		},
		computed: {
			...mapState(['checkboxToggle'])
		},
		mounted() {
			this.getTodoList()
		},
		methods: {
			onClickOneStore(id, eid, fidd) {
				this.fidd = fidd
				Dialog.confirm({
					message: '确定收藏？'
				}).then(() => {
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
					}).catch((res) => {
						Toast.fail(res.data.msg)
					})
				})
			},
			onClickConfirm() {
				if(this.message.length === 0) {
					Toast.fail('请输入留言！')
				}else {
					this.$axios({
						method: 'post',
						url: '/index.php/Push/finish',
						data: {
							fid: this.fidd,
							uid: this.$store.state.userid,
							event_push_id: this.pushId,
							remark: this.message
						}
					}).then((res) => {
						Toast.success(res.data.msg)
					}).catch((res) => {
						Toast.fail(res.data.msg)
					})
				}
			},
			onClickFinish(id, fidd) {
				this.fidd = fidd
				this.pushId = id
				this.finishToggle = true
			},
			onClickPush(id, fidd) {
				this.fidd = fidd
				this.pushId = id
				this.pushToggle = true
			},
			getTodoList() {
				let timetype = ''
				if(this.newlist.length > 0) {
					timetype = this.newlist[this.newlist.length-1].up_time
				}
				this.$axios({
					method: 'post',
					url: '/index.php/Push/getTodoList',
					data: {
						uid: this.$store.state.userid,
						up_time: timetype
					}
				}).then((res) => {
					if(res.data.data.length > 0) {
						let list = res.data.data
						for(let i=0; i<list.length; i++) {
							list[i].ewords = list[i].ewords.split('+')
						}
						this.newlist = this.newlist.concat(list)
						this.page++
					}else {
						this.finished = true;
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
					this.getTodoList()
				}, 2000);
			},
			openDetail(id, eid, fidd) {
				this.pushId = id
				this.eventId = eid
				this.fidd = fidd
				this.showDetailToggle = true
			},
			onLinkEvent(id, fidd, eid) {
				this.pushId = id
				this.fidd = fidd
				this.eventId = eid
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

			.upcome {
				border: 1px solid $borderColor;

				.upcome-des {
					display: flex;
					justify-content: space-between;
					align-items: center;
					padding: 0 px2rem(10) px2rem(10);
					.upcome-des-right {
						display: none;
					}
					p {
						font-size: px2rem(14);
						line-height: px2rem(26)
					}

					img {
						width: px2rem(61);
					}
					&:first-child {
						padding-top: px2rem(10);
						.upcome-des-right {
							display: inline-block;
						}
					}
				}

				.upcome-btn {
					border-top: 1px solid $borderColor;
					padding: px2rem(10);
					text-align: right;

					button {
						margin-left: px2rem(10)
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
