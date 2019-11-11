<template>
	<div class="list">

		<van-list v-model="loading" :finished="finished" finished-text="没有更多了" @load="onLoad">

			<van-swipe-cell v-for="item in newlist" :key="item.id">

				<div class="sign-type sign01" v-if="item.sign === '1'"><span>紧急</span></div>
				<div class="sign-type sign02" v-else-if="item.sign === '2'"><span>严重</span></div>
				<div class="sign-type sign03" v-else><span>一般</span></div>

				<!-- <van-cell :border="false"> -->
				<div class="li-wrap">
					<div class="title">
						<div class="left">
							<van-checkbox v-show="checkboxToggle" v-model="item.checked" :key="item.id" :name="item.id" checked-color="#ff6651"
							 @change="onClickRadio(item.id)"></van-checkbox>
							<!-- <div class="rect">{{ item.type }}</div> -->
							<div class="frie" @click.stop="onLinkEvent(item.id)">{{ item.number }}</div>
							<h2>食品安全</h2>
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
					<div class="desc" @click="openDetail(item.id)">
						<p>{{item.des}}</p>
					</div>
					<div class="tags">
						<h5>监控词组：</h5>
						<p>
							<span v-for="(val, index) in item.tags" :key="index">{{val.title}}</span>
						</p>
					</div>
					<!-- 待办事项/我发起的/我转发的 -->
					<div class="upcome">
						<div class="upcome-des">
							<div class="upcome-des-left">
								<p>推送人： 张红</p>
								<p>留言： 这件事情尽快处理</p>
							</div>
							<div class="upcome-des-right">
								<img src="@img/speed1.png">
							</div>
						</div>

						<div class="upcome-btn" v-if="pushType === 'upcoming'">
							<van-button plain type="primary" color="#6f7ea0" size="small">一键转发</van-button>
							<van-button color="#6f7ea0" size="small">完成</van-button>
						</div>

						<div class="launch-list" v-else-if="pushType === 'launch'">
							<ul v-if="launchToggle">
								<li>
									<div class="launch-time">
										<h6>09-12</h6>
										<p>11:56</p>
									</div>
									<div class="launch-line">
										<van-icon name="circle" />
										<div class="line1"></div>
									</div>
									<div class="launch-des">
										<h6>张红转发给小明</h6>
										<p>留言：这是上级的任务，你去完成一下</p>
									</div>
								</li>
								<li>
									<div class="launch-time">
										<h6>09-12</h6>
										<p>11:56</p>
									</div>
									<div class="launch-line">
										<van-icon name="circle" />
										<div class="line1"></div>
									</div>
									<div class="launch-des">
										<h6>
											<span>张红转发给小明</span>
											<span>催一下</span>
										</h6>
										<p>留言：这是上级的任务，你去完成一下</p>
									</div>
								</li>
							</ul>
							<div>
								<van-button v-if="launchToggle" type="primary" size="large" color="#fff" @click.stop="onClickLaunch(2)">收起
									<van-icon name="arrow-up" />
								</van-button>
								<van-button v-else type="primary" size="large" color="#fff" @click.stop="onClickLaunch(1)">查看详情
									<van-icon name="arrow-down" />
								</van-button>
							</div>
						</div>

						<div class="forward" v-else-if="pushType == 'forward'">
							<p>已转发给： 张三</p>
							<p>留言： 这件事情尽快处理，这边急着要结果，最好明天做好。</p>
						</div>

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

		<van-popup v-model="showDetailToggle" closeable close-icon="arrow-left" close-icon-position="top-left" position="right"
		 :overlay="false" :style="{ height: '100%', width: '100%' }">
			<detail></detail>
		</van-popup>

		<van-popup v-model="showLinkEventToggle" position="bottom" :style="{ height: '80%' }" closeable close-icon-position="top-left">
			<event-list></event-list>
		</van-popup>

	</div>
</template>

<script>
	import {
		mapState
	} from 'vuex';
	import Detail from '@c/common/Detail';
	import EventList from '@c/center/EventList';
	export default {
		name: 'list',
		props: {
			pushType: String
		},
		components: {
			Detail,
			EventList
		},
		data() {
			return {
				launchToggle: false,
				showLinkEventToggle: false,
				showDetailToggle: false,
				loading: false,
				finished: false,
				allchecked: false,
				newlist: [{
					id: '1',
					sign: '1',
					checked: false,
					type: '正',
					number: 8,
					timer: 5,
					source: 1,
					firstTime: '2018-09-9 10:23',
					des: '邮箱是拥有国内用户最多、市场最大的邮箱就是巨作这次改版，特意从应用商城下载了各种邮...',
					tags: [{
							title: '食品安全',
							href: ''
						},
						{
							title: '有气味',
							href: ''
						},
						{
							title: '腐坏',
							href: ''
						},
						{
							title: '食品安全',
							href: ''
						},
						{
							title: '油漆味',
							href: ''
						},
						{
							title: '腐坏',
							href: ''
						},
						{
							title: '食品安全',
							href: ''
						},
					]
				}, {
					id: '2',
					sign: '2',
					checked: false,
					type: '负',
					number: 3,
					timer: 9,
					source: 2,
					firstTime: '2018-09-9 10:23',
					des: '邮箱是拥有国内用户最多、市场最大的邮箱就是巨作这次改版，特意从应用商城下载了各种邮...',
					tags: [{
							title: '食品安全',
							href: ''
						},
						{
							title: '有气味',
							href: ''
						},
						{
							title: '腐坏',
							href: ''
						},
						{
							title: '食品安全',
							href: ''
						},
						{
							title: '油漆味',
							href: ''
						},
						{
							title: '腐坏',
							href: ''
						},
						{
							title: '食品安全',
							href: ''
						},
					]
				}, {
					id: '3',
					sign: '3',
					checked: false,
					type: '负',
					number: 3,
					timer: 9,
					source: 2,
					firstTime: '2018-09-9 10:23',
					des: '邮箱是拥有国内用户最多、市场最大的邮箱就是巨作这次改版，特意从应用商城下载了各种邮...',
					tags: [{
							title: '食品安全',
							href: ''
						},
						{
							title: '有气味',
							href: ''
						},
						{
							title: '腐坏',
							href: ''
						},
						{
							title: '食品安全',
							href: ''
						},
						{
							title: '油漆味',
							href: ''
						},
						{
							title: '腐坏',
							href: ''
						},
						{
							title: '食品安全',
							href: ''
						},
					]
				}]
			}
		},
		computed: {
			...mapState(['checkboxToggle'])
		},
		watch: {
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
		methods: {
			onClickRadio(id) {
				console.log(id)
			},
			onLoad() {
				// console.log('load')
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
			},
			onLinkEvent(id) {
				console.log(id)
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

			.upcome {
				border: 1px solid $borderColor;

				.upcome-des {
					display: flex;
					justify-content: space-between;
					align-items: center;
					padding: px2rem(10);

					p {
						font-size: px2rem(14);
						line-height: px2rem(26)
					}

					img {
						width: px2rem(61);
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
