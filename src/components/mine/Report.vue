<template>
	<div class="report">
			<h2>我的报告</h2>
			<ul>
				<li v-for="item in list" :key="item.id" @click="onClickItem(item.title, item.id)">
					<div>
						<span>{{ item.title.slice(0, 1) }}</span>
						<strong>{{ item.title }}</strong>
					</div>
					<van-icon name="arrow" />
				</li>
			</ul>

			<van-popup
				v-model="itemToggle"
				position="right"
				:overlay="false"
				closeable
				close-icon="arrow-left"
				close-icon-position="top-left"
				:style="{ width: '100%', height: '100%' }"
			>
				<div class="item-wrap">
					<h4>{{ mestTitle }}</h4>
					<ul class="item-wrap">
						<li v-for="item in detailList" :key="item.id" @click="onClickDetail(item.token)">
							<div><strong>{{ item.title }}</strong></div>
							<i class="iconfont" @click="onClickDelete($event, item.id)">&#xe64c;</i>
						</li>
					</ul>
				</div>				
			</van-popup>

			<!-- 详情页 -->
			<van-popup
				v-model="detailToggle"
				position="right"
				:overlay="false"
				closeable
				close-icon="arrow-left"
				close-icon-position="top-left"
				:style="{ width: '100%', height: '100%' }"
			>
				<doc-detail :token="detailTk"></doc-detail>
			</van-popup>


	</div>
</template>

<script>
import { mapGetters } from 'vuex';
import { Dialog, Toast } from 'vant';
import DocDetail from './DocDetail';
export default {
	name: 'report',
	components: {
		DocDetail
	},
	data() {
		return {
			itemToggle: false,
			detailToggle: false,
			mestTitle: '我的报告',
			itemType: 'A',
			list: [],
			detailList: [],
			detailTk: ''
		}
	},
	mounted() {
		this.$axios({
			method: 'post',
			url: '/index.php/Monitor/getPlanList',
			data: {
				uid: this.getUserid,
				sub_uid: this.getSubid
			}
		}).then((res) => {
			this.list = res.data.data
		}).catch((res) => {
			Toast.fail(res.data.msg)
		})
	},
	computed: {
		...mapGetters(['getUserid', 'getSubid'])
	},
	methods: {
		onClickLeft() {
			if(this.itemType === 'A') {
				this.$store.commit('handleMesType', '')
				this.$store.commit('handleToolbar', true)
			}else {
				this.itemType = 'A'
			}
		},
		onClickItem(name, id) {
			this.mestTitle = name
			this.itemToggle = true
			this.$axios({
				method: 'post',
				url: '/index.php/Report/getDocList',
				data: {
					uid: this.getUserid,
					sub_uid: this.getSubid,
					fid: id,
					type: 'day'
				}
			}).then((res) => {
				this.detailList = res.data.data
			}).catch((res) => {
				Toast.fail(res.data.msg)
			})
		},
		onClickDetail(tk) {
			// this.detailTk = tk
			this.$store.commit('handleReportToken', tk)
			this.detailToggle = true
		},
		onClickDelete(e, id) {
			Dialog.confirm({
				message: '确认删除？'
			}).then(() => {
				this.$axios({
					method: 'post',
					url: '/index.php/Report/deleteDoc',
					data: {
						id: id
					}
				}).then((res) => {
					Toast.success(res.data.msg)
				}).catch((res) => {
					Toast.fail(res.data.msg)
				})
			}).catch(() => {
				console.log('取消')
			})
			e.cancelBubble = true
		}
	}
}
</script>

<style lang="scss" scoped>
@import '@css/constants.scss';
.report {
	h2 {
		font-size: px2rem(17);
		color: #323948;
		line-height: px2rem(50);
		text-align: center;
	}
	ul li{
		display: flex;
		justify-content: space-between;
		padding: px2rem(20) px2rem(10);
		i {
			font-size: px2rem(19);
			line-height: px2rem(40);
			color: #acb7cf;
		}
		span {
			width: px2rem(40);
			height: px2rem(40);
			line-height: px2rem(40);
			border-radius: 50%;
			background-color: #6f7ea0;
			font-size: px2rem(14);
			color: #fff;
			margin-right: px2rem(10);
			display: inline-block;
			text-align: center;
		}
		strong {
			font-size: px2rem(16);
			line-height: px2rem(40);
			color: $activeColor;
		}
	}
	.item-wrap {
		h4 {
			font-size: px2rem(17);
			line-height: px2rem(50);
			text-align: center;
		}
		ul {
			border-top: 1px solid #dce2f4;
			li {
				border-bottom: 1px solid #dce2f4;
				margin: 0 px2rem(10);
				padding: px2rem(10) 0;
				strong {
					font-size: px2rem(14);
				}
			}
		}
	}
}
</style>