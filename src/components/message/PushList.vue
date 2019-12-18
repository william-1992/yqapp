<template>
	<div class="list">

		<van-pull-refresh v-model="isLoading" @refresh="onRefresh">

		<van-list 
			v-model="loading" 
			:error-sync="errored"
			error-text="请求失败，点击重新加载"
			:finished="finished" 
			finished-text="没有更多了" 
			@load="onLoad"
		>

			<van-swipe-cell v-for="(item, index) in newlist" :key="item.id">

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
							<span>{{ item.site_name | nameLength }}</span>
						</div>
						<div class="timer-right">
							首次收录： {{item.pretimeStr}}
						</div>
					</div>
					<div class="desc" @click="openDetail(item.id, item.event_main_id, item.fid)">
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
						<div class="upcome-des" v-for="ite in item.logs" :key="ite.id" v-if="ite.type == '1'">
							<div class="upcome-des-left">
								<p>推送人： {{ ite.from_nickname }}</p>
								<p>留言： {{ ite.remark }}</p>
							</div>
							<div class="upcome-des-right">
								<img src="@img/speed1.png" v-if="item.is_over == '0'">
								<img src="@img/speed2.png" v-else>
							</div>
						</div>

						<div class="launch-list">
							<ul v-if="item.checked">
								<li v-for="ite in item.logs" :key="ite.id">
									<div class="launch-time">
										<h6>{{ ite.add_time | monthfil }}</h6>
										<p>{{ ite.add_time | datefil }}</p>
									</div>
									<div class="launch-line">
										<van-icon name="circle" />
										<div class="line1"></div>
									</div>
									<div class="launch-des">
										<h6>{{ ite.from_nickname }}转发给{{ ite.to_nickname }}</h6>
										<p>留言：{{ ite.remark }}</p>
									</div>
									<van-button @click="onClickRemind(ite.id)">催一下</van-button>
								</li>
							</ul>
							<div>
								<van-button v-if="item.checked" type="primary" size="large" color="#fff" @click.stop="onClickLaunch(2, index)">收起
									<van-icon name="arrow-up" />
								</van-button>
								<van-button v-else type="primary" size="large" color="#fff" @click.stop="onClickLaunch(1, index)">查看详情
									<van-icon name="arrow-down" />
								</van-button>
							</div>
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

		</van-pull-refresh>

		<van-popup 
			v-model="showDetailToggle" 
			closeable 
			close-icon="arrow-left" 
			close-icon-position="top-left" 
			get-container="body"
			position="right"
		 	:overlay="false" 
		 	:style="{ height: '100%', width: '100%' }"
		 >
			<detail :detailid="pushId" :eventid="eventId" :pageType="'juststore'" :fid="fidd"></detail>
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

		<!-- 完成点击弹框 -->
		<van-dialog
			v-model="remindToggle"
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
	import { mapState, mapGetters } from 'vuex';
	import { Dialog, Toast } from 'vant';
	import Detail from '@c/common/Detail';
	import EventList from '@c/common/EventList';
	export default {
		name: 'push-list',
		components: {
			Detail,
			EventList
		},
		data() {
			return {
				logId: '',
				message: '',
				remindToggle: false,
				launchToggle: true,
				showLinkEventToggle: false,
				showDetailToggle: false,
				loading: false,
				isLoading: false,
				finished: false,
				errored: false,
				allchecked: false,
				newlist: [],
				pushId: '',
				fidd: '',
				eventId: '',
				page: ''
			}
		},
		computed: {
			...mapState(['checkboxToggle']),
			...mapGetters(['getUserid', 'getSubid'])
		},
		mounted() {
			this.getPushList()
		},
		filters: {
			monthfil(data) {
				let str = data.split(' ')[0]
				return str.substring(5, 10)

			},
			datefil(data) {
				let str = data.split(' ')[1]
				return str.substring(0,5)
			},
			nameLength(val) {
				if(val.length > 10) {
					return val.slice(0, 10) + '...'
				}else {
					return val
				}
			}
		},
		methods: {
			onRefresh() {
				setTimeout(() => {
					this.newlist = []
					this.$toast('刷新成功');
        	this.getPushList()
        	this.page = 0
				}, 500)
			},
			onClickConfirm() {
				this.$axios({
					method: 'post',
					url: '/index.php/Push/remind',
					data: {
						uid: this.getUserid,
						sub_uid: this.getSubid,

						log_id: this.logId,
						remark: this.message
					}
				}).then((res) => {
					if(res.data.status == '1') {
						Toast.success(res.data.msg)
					}else {
						Toast.fail(res.data.msg)
					}
				})
			},
			onClickRemind(id) {
				this.logId = id
				this.remindToggle = true
			},
			onClickOneStore(id, eid, fidd) {
				this.fidd = fidd
				Dialog.confirm({
					message: '确定收藏？'
				}).then(() => {
					this.$axios({
						method: 'post',
						url: '/index.php/City/favorite',
						data: {
							uid: this.getUserid,
							sub_uid: this.getSubid,
							main_id: eid,
							event_id: eid
						}
					}).then((res) => {
						Toast.success(res.data.msg)
					}).catch((res) => {
						Toast.fail(res.data.msg)
					})
				})
			},
			getPushList() {
				let overtype = 0
				let timetype = 0
				if(this.newlist.length > 0) {
					overtype = this.newlist[this.newlist.length-1].is_over
					timetype = this.newlist[this.newlist.length-1].up_time
				}
				this.$axios({
					method: 'post',
					url: '/index.php/Push/getMyPushList',
					data: {
						uid: this.getUserid,
						sub_uid: this.getSubid,
						is_over: overtype,
						up_time: timetype
					}
				}).then((res) => {
					if(res.data.data.length > 0) {
						let list = res.data.data
						list.forEach((item) => {
							item.ewords = item.ewords.split('+')
						})
						this.newlist = this.newlist.concat(list)
						this.page++
					}else {
						this.finished = true
					}
					this.loading = false
					this.isLoading = false
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
					this.getPushList()
				}, 1500);
			},
			openDetail(id, eid, fid) {
				this.eventId = eid
				this.fidd = fid
				this.pushId = id
				this.showDetailToggle = true
			},
			onLinkEvent(id, eid, fid) {
				this.eventId = eid
				this.fidd = fid
				this.pushId = id
				this.showLinkEventToggle = true
			},
			onClickLaunch(type, index) {
				if(type == '1') {
					for(let i=0; i<this.newlist.length; i++) {
						this.newlist[index].checked = false
					}
					this.newlist[index].checked = true
				}else {
					this.newlist[index].checked = false
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
						background-size: 11px 16px;
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

					&:last-child {
						.van-button {
							display: block;
						}
					}

					.van-button {
						display: none;
						background: none;
						border: none;
						color: #ff6651;
					}

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
						flex: 1;
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
