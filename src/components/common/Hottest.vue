<template>
	<div class="hot-test">
		<div class="left">
			<span v-for="(item, index) in list" :key="item.id" :class="item.className" @click="onClickHandle(index, item.id)">
				{{item.title}}
			</span>
		</div>
		<div class="right">
			<van-button 
				v-if="hotType === 'centerpage'"
				type="primary" 
				size="small" 
				color="#f7f9fe" 
				@click="onClickAddress"
			>
				{{ pickerName.name }}<i class="iconfont">&#xe65a;</i>
			</van-button>
			<van-button type="primary" size="small" color="#f7f9fe" @click="onClickFilter">筛选<i class="iconfont">&#xe65a;</i></van-button>
		</div>

		<!-- 时间筛选弹框页 -->
		<van-popup
		  v-model="show"
		  closeable
		  close-icon-position="top-left"
		  position="right"
		  :overlay="false"
		  :style="{ height: '100%', width: '100%' }"
		>
			<time-filter :sorttype="this.sort_type" :pageType="hotType" @closePopup="handleBack"></time-filter>
		</van-popup>

		<!-- 地域选择 -->
		<van-popup
			v-model="region"
			round
			closeable
			close-icon-position="top-left"
			position="bottom"
			:style="{ height: '70%' }"
		>
			<area-chooice @closeArea="handleClose"></area-chooice>
		</van-popup>
	</div>
</template>

<script>
import { Toast } from 'vant';
import { mapState } from 'vuex';
import TimeFilter from '@c/common/TimeFilter';
import AreaChooice from '@c/common/AreaList';
export default {
	name: 'hottest',
	props: {
		hotType: String
	},
	components: {
		TimeFilter,
		AreaChooice
	},
	data() {
		return {
			region: false,
			show: false,
			sort_type: '',
			list: [{
				id: 1,
				title: '最新',
				className: 'active'
			}, {
				id: 2,
				title: '最热',
				className: ''
			}]
		}
	},
	computed: {
		...mapState(['pickerName', 'monitorQuery', 'cityQuery', 'areaList'])
	},
	methods: {
		handleClose() {
			this.region = false
		},
		handleBack() {
			this.show = false
		},
		onClickHandle(index, id) {
			Toast.loading({
				message: '加载中...',
				forbidClick: true,
				loadingType: 'spinner',
				duration: 0
			})
			this.list.forEach((item) => {
				item.className = ''
			})
			this.list[index].className = 'active'
			if(id == '1') {
				this.sort_type = 'pub_time'
			}else {
				this.sort_type = 'sim_index'
			}
			
			if(this.hotType == 'centerpage') {
				// 监测中心
				this.$store.state.monitorQuery.sort_type = this.sort_type
				this.$store.state.monitorQuery.page = 1
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
							this.$store.state.monitorQuery.page = 2
						}else {
							this.$store.commit('handleMonitorList', [])
						}
						Toast.clear()
					}else {
						Toast.fail(res.data.msg)
					}
				}).catch((res) => {
					Toast.fail(res.data.msg)
				})
			}else {
				// 城市舆情
				this.$store.state.cityQuery.sort_type = this.sort_type
				this.$store.state.cityQuery.page = 1
				this.$axios({
					method: 'post',
					url: '/index.php/City/getESearch',
					data: this.cityQuery
				}).then((res) => {
					if(res.data.status == '1') {
						if(res.data.data.eventList.length > 0) {
							let list = res.data.data.eventList
							this.$store.commit('handleCityList', list)
							this.$store.state.cityQuery.page = 2
						}else {
							this.$store.commit('handleCityList', [])
						}
						Toast.clear()
					}else {
						Toast.fail(res.data.msg)
					}
				}).catch((res) => {
					Toast.fail(res.data.msg)
				})
			}
		},
		onClickAddress() {
			this.region = true

      		// this.$store.commit('handleOverlay', true)
			// this.$store.commit('handleAddress', true)
		},
		onClickFilter() {
			this.show = true
		}
	}
}
</script>

<style lang="scss" scoped>
@import '@css/constants.scss';
.hot-test {
	display: flex;
	justify-content: space-between;
	padding: px2rem(10);
	border-bottom: 1px solid $borderColor;
	background-color: #fff;
	padding-top: 0;
	.left {
		font-size: px2rem(14);
		line-height: px2rem(30);
		span {
			margin-right: px2rem(10);
			color: $defaultColor;
		}
		.active {
			color: $activeColor
		}
	}
	.right {
		button {
			margin-left: px2rem(10);
			color: $activeColor !important;
		}
		span {
			position: relative;
			i {
				position: relative;
				top: px2rem(13);
				left: px2rem(-2);
				width: px2rem(6);
				height: px2rem(6);
				display: inline-block;
				transform: rotate(-54deg);
				color: $borderColor;
				font-size: px2rem(14);
			}
		}
	}
	.ppp {font-size:18px}
}
</style>