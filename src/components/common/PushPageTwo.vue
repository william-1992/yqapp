<template>
	<div class="push-page">
		<header>
			<van-button type="primary" size="small" @click="onClickPush">推送</van-button>
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
				<h3>{{ this.$store.state.company_short_name }}</h3>
				<van-checkbox v-model="checked" @click="onClickCheckbox"></van-checkbox>
			</div>
			<van-collapse v-model="activeNames" class="staff-content">
				<van-collapse-item v-for="item in namelist" :key="item.id" :name="item.id">
					<div slot="title" class="inner">
						<p>
							<van-icon name="play" color="#d3dbeb" />
							<span>{{ item.title }}</span>
						</p>
						<!-- <time>{{ namelist.length }}</time> -->
					</div>
					<van-checkbox-group v-model="result" checked-color="#ff6651">
						<van-checkbox v-for="childitem in childlist" :key="childitem.id" :name="childitem.name" v-if="childitem.groupid == item.id">
							<div class="item-wrap">
								<div class="item-wrap-circle">{{childitem.name.slice(0, 1)}}</div>
								<div class="item-wrap-des">
									<h3>{{childitem.name}}</h3>
									<p>{{childitem.position}}</p>
								</div>
							</div>
						</van-checkbox>
					</van-checkbox-group>
				</van-collapse-item>
				<!-- <van-collapse-item title="标题2" name="2">内容</van-collapse-item>
			  <van-collapse-item title="标题3" name="3">内容</van-collapse-item> -->
			</van-collapse>
		</section>
		<section class="send-wrap">
			<p>请选择发送方式</p>
			<van-radio-group v-model="sendradio">
				<van-radio name="2" checked-color="#ff6651">邮件</van-radio>
				<van-radio name="1" checked-color="#ff6651">短信</van-radio>
			</van-radio-group>
		</section>
		<!-- <section class="textarea-wrap">
			<van-field v-model="message" type="textarea" placeholder="请输入留言" rows="1" autosize :maxlength="50" clearable />
			<p>{{this.message.length}} / 50</p>
		</section> -->

		<van-overlay :show="layshow" @click="layshow = false" />

	</div>
</template>

<script>
	import {
		Toast
	} from 'vant';
	import { mapGetters } from 'vuex';
	export default {
		name: 'push-page-two',
		props: {
			fid: {
				type: String,
				default: 0
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
			},
			idlist: Array,
			eventlist: Array
		},
		data() {
			return {
				layshow: false,
				sendradio: '2',
				checked: false,
				message: '',
				activeNames: [],
				result: [],
				namelist: [],
				childlist: []
			}
		},
		watch: {
			result(val) {
				if(val.length == this.childlist.length) {
					this.checked = true
				}else {
					this.checked = false
				}
			}
		},
		mounted() {
			this.getPeople()
		},
		computed: {
			...mapGetters(['getUserid', 'getSubid'])
		},
		methods: {
			onClickCheckbox() {
				if (!this.checked) {
					this.result = []
					this.childlist.forEach((value) => {
						this.result.push(value.name)
					})
				} else {
					this.result = []
				}
			},
			onClickPush() {
				if (this.result.length > 0) {
					// 判断storeType为true时走收藏页推送，为false时走转发和其它推送接口
					if(this.storeType) {
						// 收藏推送
						this.pushToNew()
					}else {
						// 其它推送
						this.pushOther()
					}
				} else {
					Toast('未選擇推送人員')
				}
			},
			pushOther() {
				let receiveList = []
				let arr1 = []
				let arr2 = []
				for(let i=0; i<this.idlist.length; i++) {
					if(arr1.indexOf(this.idlist[i]) == -1) {
						arr1.push(this.idlist[i])
					}
					if(arr2.indexOf(this.eventlist[i]) == -1) {
						arr2.push(this.eventlist[i])
					}
				}
				for (let i = 0; i < this.childlist.length; i++) {
					for (let j = 0; j < this.result.length; j++) {
						if (this.result[j] == this.childlist[i].name) {
							receiveList.push(this.childlist[i].id)
						}
					}
				}
				Toast.loading({
					message: '推送中...',
					forbidClick: true,
					duration: 0
				})
				this.$axios({
					method: 'post',
					url: '/index.php/City/pushNews',
					data: {
						uid: this.getUserid,
						sub_uid: this.getSubid,

						fid: this.fid,
						idlist: arr1,
						event_idlist: arr2,
						receive_idlist: receiveList,
						push_styles_idlist: this.sendradio,
						content: this.message
					}
				}).then((res) => {
					if(res.data.status == '1') {
						Toast.success(res.data.msg);
						this.$emit('onCloseTwo')
					}else {
						setTimeout(() => {
							this.$emit('onCloseTwo')
						}, 800)
						Toast.fail({
							message: res.data.msg,
							duration: 800
						})
					}
				}).catch((res) => {
					Toast.clear()
					setTimeout(() => {
					}, 800)
					Toast.fail({
						message: res.data.msg,
						duration: 800
					})
				})
			},
			pushToNew() {
				let receiveList = []
				let arr1 = []
				let arr2 = []
				for(let i=0; i<this.idlist.length; i++) {
					if(arr1.indexOf(this.idlist[i]) == -1) {
						arr1.push(this.idlist[i])
					}
					if(arr2.indexOf(this.eventlist[i]) == -1) {
						arr2.push(this.eventlist[i])
					}
				}
				for (let i = 0; i < this.childlist.length; i++) {
					for (let j = 0; j < this.result.length; j++) {
						if (this.result[j] == this.childlist[i].name) {
							receiveList.push(this.childlist[i].id)
						}
					}
				}
				Toast.loading({
					message: '推送中...',
					forbidClick: true,
					duration: 0
				})
				this.$axios({
					method: 'post',
					url: '/index.php/City/pushNews',
					data: {
						uid: this.getUserid,
						sub_uid: this.getSubid,

						fid: this.fidlist,
						idlist: this.idlist,
						event_idlist: this.eventlist,
						receive_idlist: receiveList,
						push_styles_idlist: this.sendradio,
						content: this.message
					}
				}).then((res) => {
					if(res.data.status == '1') {
						Toast.success(res.data.msg);
						this.$emit('onCloseTwo')
					}else {
						setTimeout(() => {
							this.$emit('onCloseTwo')
						}, 800)
						Toast.fail({
							message: res.data.msg,
							duration: 800
						})
					}
				}).catch((res) => {
					Toast.clear()
					Toast.fail({
						message: res.data.msg,
						duration: 800
					})
				})
			},
			onClickDelete(index) {
				this.result.splice(index, 1)
			},
			getPeople() {
				this.$axios({
					method: 'post',
					url: '/index.php/City/groupTree',
					data: {
						uid: this.getUserid,
						sub_uid: this.getSubid
					}
				}).then((res) => {
					this.namelist = res.data.data.groupTree
					this.childlist = res.data.data.userList
					let alldata = res.data.data
					for (let i = 0; i < alldata.groupTree.length; i++) {

					}
				}).catch((res) => {
					Toast.fail(res.data.data.msg);
				})
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
