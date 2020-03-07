<template>
	<div class="search">
		<h1>{{ name }}</h1>
		<p v-if="name === '监测中心'">
			<span class="iconfont" @click="onClickPopup">&#xe605;</span>
			<span v-if="checkboxToggleCenter == true" @click="setUp(2)">完成</span>
			<span @click="setUp(1)" v-else>管理</span>
		</p>
		<p v-else>
			<span class="iconfont" @click="onClickPopup">&#xe605;</span>
			<span v-if="checkboxToggleCity == true" @click="setUp(2)">完成</span>
			<span @click="setUp(1)" v-else>管理</span>
		</p>
		<!-- <popup></popup> -->

		<!-- 搜索弹框页 -->
		<van-popup
		  v-model="show"
		  position="right"
		  :overlay="false"
		  :style="{ height: '100%', width: '100%' }"
		>
			<div class="pop-wrap" :style="{ paddingTop: paddingTT + 'px' }">

				<div class="search-wrap">
					<van-icon name="arrow-left" @click="onClickBack"></van-icon>
					<van-dropdown-menu>
					  <van-dropdown-item v-model="value1" :options="option1"></van-dropdown-item>
					</van-dropdown-menu>
					<van-search
					  v-model="value"
					  placeholder="请输入搜索关键词"
					  show-action
					>
					  <div slot="action" @click="onSearch">搜索</div>
					</van-search>
				</div>

				<div class="search-history">
					<div class="title">
						<h5>历史记录</h5>
						<span @click="onClearHistory">清空历史记录</span>
					</div>
					<ul>
						<li v-for="item in historylist" @click="onItemClick(item)"><a href="javascript:;">{{ item }}</a></li>
					</ul>
				</div>

			</div>
		</van-popup>


	</div>
</template>

<script>
import { Toast, Dialog } from 'vant';
import { mapState } from 'vuex';
import Popup from '@c/common/Popup';
export default {
	name: 'search',
	props: {
		pageType: String
	},
	components: {
		Popup
	},
	data() {
		return {
			show: false,
			popupToggle: true,
			value: '',
			value1: 1,
			historylist: [],
      option1: [
        { text: '标题', value: 1 },
        { text: '内容', value: 2 }
      ]
		}
	},
	computed: {
		...mapState({
			name: state => state.home_tabs_name,
			checkboxToggleCenter: state => state.checkboxToggleCenter,
			checkboxToggleCity: state => state.checkboxToggleCity,
			paddingTT: state => state.paddingTT,
			monitorQuery: state => state.monitorQuery,
			cityQuery: state => state.cityQuery
		})
	},
	watch: {
		value1(val) {
			if(this.pageType == 'monitor') {
				this.$store.state.monitorQuery.es_type = val
			}else if(this.pageType == 'city') {
				this.$store.state.cityQuery.es_type = val
			}else {

			}
		},
		value(val) {
			if(this.pageType == 'monitor') {
				this.$store.state.monitorQuery.keyword = val
			}else if(this.pageType == 'city') {
				this.$store.state.cityQuery.keyword = val
			}else {

			}
		}
	},
	mounted() {
		this.getHistory()
	},
	methods: {
		onClearHistory() {
			Dialog.confirm({
				message: '确定删除所有历史记录吗？'
			}).then(() => {
				localStorage.removeItem('history')
				this.historylist = []
			})
		},
		onItemClick(val) {
			this.value = val
			if(this.pageType == 'monitor') {
				this.getMoni()
			}else {
				this.getCity()
			}
		},
		onClickPopup() {
			this.show = true
			// this.$store.commit('handlePopup', true)
		},
		setUp(type) {
			if(type === 1) {
				if(this.name == '监测中心') {
					this.$store.commit('handleCheckboxCenter', true)
				}else {
					this.$store.commit('handleCheckboxCity', true)
				}
			}else {
				if(this.name == '监测中心') {
					this.$store.commit('handleCheckboxCenter', false)
				}else {
					this.$store.commit('handleCheckboxCity', false)
				}
			}
		},
		onSearch() {
			if(this.pageType == 'monitor') {
				this.getMoni()
			}else if(this.pageType == 'city') {
				this.getCity()
			}
			if(this.historylist.length > 0) {
				if(this.historylist.indexOf(this.value) == -1) {
					this.historylist.unshift(this.value)
				}
			}else {
				this.historylist.push(this.value)
			}
			localStorage.setItem('history', JSON.stringify(this.historylist))
		},
		getHistory() {
			let list = JSON.parse(localStorage.getItem('history'))
			if(list && list.length > 0) {
				this.historylist = list
			}
		},
		onClickBack() {
			this.show = false
			// this.$store.commit('handlePopup', false)
		},
		getMoni() {
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
					}
					setTimeout(() => {
						this.show = false
					}, 500)
					this.value = ''
					Toast.success(res.data.msg)
				}else {
					Toast.fail(res.data.msg)
				}
			}).catch((res) => {
				Toast.fail(res.data.msg)
			})
		},
		getCity() {
			this.$store.state.cityQuery.page = 1
			this.$axios({
				method: 'post',
				url: '/index.php/City/getESearch',
				data: this.cityQuery
			}).then((res) => {
				if(res.data.status == '1') {
					if(res.data.data.eventList.length > 0) {
						this.$store.commit('handleCityList', res.data.data.eventList)
					}
					setTimeout(() => {
						this.show = false
					})
					this.value = ''
					Toast.success(res.data.msg)
				}else {
					Toast.fail(res.data.msg)
				}
			}).catch(() => {
				Toast.fail(res.data.msg)
			})
		}
	}
}
</script>

<style lang="scss" scoped>
@import '@css/constants.scss';
.search {
	display: flex;
	justify-content: space-between;
	padding: px2rem(15) px2rem(10) 0;
	background-color: #fff;
	h1 {
		font-size: $searchTitleSize;
	}
	p {
		font-size: px2rem(16);
		line-height: px2rem(22);
		span {
			padding: 0 px2rem(10);
		}
		.iconfont {
			font-size: px2rem(20);
		}
		span:last-child {
			position: relative;
			top: -2px;
		}
	}
}

.pop-wrap {
	.search-wrap {
		display: flex;
		align-items: center;
		.van-search {
			flex: 1;
		}
		/deep/.van-dropdown-menu:after {
			border: none;
		}
	}
	.search-wrap>i {
		width: px2rem(25);
		height: px2rem(25);
		line-height: px2rem(24);
		font-size: px2rem(18);
		text-align: center;
	}
	.search-history {
		margin-top: px2rem(15);
		padding: 0 px2rem(10);
		.title {
			display: flex;
			justify-content: space-between;
			h5 {
				font-size: px2rem(12);
				color: $activeColor;
			}
			span {
				font-size: px2rem(12);
				color: #6f7ea0;
			}
		}
		ul {
			margin-top: px2rem(15);
		}
		ul>li>a{
			font-size: px2rem(14);
			color: $activeColor;
			line-height: px2rem(40);
		}
	}
}
</style>