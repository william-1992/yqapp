<template>
	<div class="filter">
		<h2>筛选</h2>
		<h5>时间</h5>
		<ul>
			<li v-for="(item, index) in timelist" :key="item.id" :class="item.class" @click="onClickDate(index)">{{item.title}}</li>
		</ul>
		<div class="zidingyi">
			<van-button type="warning" :class="zdyclass" @click="onClickTime" v-if="zdytoggle">自定义</van-button>
			<p v-else>
				<span @click="getDate('1')">{{ s_time }}</span>
				<i>TO</i>
				<span @click="getDate('2')">{{ e_time }}</span>
			</p>
		</div>
		<h5>观点</h5>
		<ul>
			<li v-for="(item, index) in viewlist" :key="item.id" :class="item.class" @click="onClickView(index)">{{item.title}}</li>
		</ul>
		<h5>来源</h5>
		<ul>
			<li v-for="(item, index) in sourcelist" :key="item.id" :class="item.class" @click="onClickSource(item.id, index)">{{item.title}}</li>
		</ul>
		<div class="btn-wrap">
			<van-button type="warning" color="#6f7ea0" @click="onReset">重置</van-button>
			<van-button type="danger" color="#ff6651" @click="onClickSure">保存</van-button>
		</div>

		<div class="datePicker" v-if="showDate">
			<div class="templa" @click="closedata"></div>
			<van-datetime-picker 
				v-model="currentDate" 
				type="date" 
				:min-date="minDate" 
				:title="dataTitle" 
				@confirm="onConfirm"
				@cancel="onCancel"
			></van-datetime-picker>
		</div>
	</div>
</template>

<script>
	import { mapState, mapGetters } from 'vuex';
	import {
		Toast
	} from 'vant';
	export default {
		name: 'time-filter',
		props: {
			pageType: String,
			sorttype: {
				type: String,
				default: ""
			}
		},
		data() {
			return {
				showDate: false,
				minDate: new Date(2012, 1, 1),
				dataTitle: '开始时间',
				currentDate: new Date(),
				zdytoggle: true,
				zdyclass: '',
				timelist: [
					{ id: 1, title: '全部', class: 'active' },
					{ id: 2, title: '今天', class: '' },
					{ id: 3, title: '昨天', class: '' },
					{ id: 4, title: '本周', class: '' }
				],
				viewlist: [
					{ id: 1, title: '全部', class: 'active' },
					{ id: 2, title: '正面', class: '' },
					{ id: 3, title: '中性', class: '' },
					{ id: 4, title: '负面', class: '' }
				],
				sourcelist: [],
				time: '',
				s_time: '开始时间',
				e_time: '结束时间',
				es_source: '1',
				point: '',
				source: ''
			}
		},
		mounted() {
			console.log('123')
			this.showSourceList()
			if(this.pageType == 'citypage') {
					for(let i=0; i<this.timelist.length; i++) {
						this.timelist[i].class = ''
						this.viewlist[i].class = ''
					}
					this.timelist[1].class = 'active'
					this.viewlist[3].class = 'active'
				}else {
					for(let i=0; i<this.timelist.length; i++) {
						this.timelist[i].class = ''
						this.viewlist[i].class = ''
					}
					this.timelist[0].class = 'active'
					this.viewlist[0].class = 'active'
				}
		},
		computed: {
			...mapState(['monitorQuery', 'cityQuery']),
			...mapGetters(['getUserid', 'getSubid'])
		},
		watch: {
			pageType(type) {
				console.log(type)
				if(type == 'citypage') {
					for(let i=0; i<this.timelist.length; i++) {
						this.timelist[i].class = ''
						this.viewlist[i].class = ''
					}
					this.timelist[1].class = 'active'
					this.viewlist[3].class = 'active'
				}else {
					for(let i=0; i<this.timelist.length; i++) {
						this.timelist[i].class = ''
						this.viewlist[i].class = ''
					}
					this.timelist[0].class = 'active'
					this.viewlist[0].class = 'active'
				}
			},
			es_source(val) {
				if(val == '1') {
					this.dataTitle = '开始时间'
				}else {
					this.dataTitle = '结束时间'
				}
			},
			source(val) {
				if(this.pageType == 'centerpage') {
					this.monitorQuery.source = val
				}else {
					this.cityQuery.source = val
				}
			},
			point(val) {
				if(this.pageType == 'centerpage') {
					this.monitorQuery.point = val
				}else {
					this.cityQuery.point = val
				}
			},
			e_time(val) {
				if(this.pageType == 'centerpage') {
					this.monitorQuery.e_time = val
				}else {
					this.cityQuery.e_time = val
				}
			},
			s_time(val) {
				if(this.pageType == 'centerpage') {
					this.$store.state.monitorQuery.s_time = val
				}else {
					this.$store.state.cityQuery.s_time = val
				}
			},
			time(val) {
				if(this.pageType == 'centerpage') {
					this.monitorQuery.time = val
				}else {
					this.cityQuery.time = val
				}
				if(val !== 'custom') {
					this.$store.state.monitorQuery.s_time = ''
					this.$store.state.cityQuery.s_time = ''
					this.$store.state.monitorQuery.e_time = ''
					this.$store.state.cityQuery.e_time = ''
				}
			},
			zdytoggle(val) {
				if(val) {
					// this.s_time = ''
					// this.e_time = ''
				}
			}
		},
		methods: {
			onReset() {
				// this.source = ''
				// this.point = ''
				// this.time = ''
				this.onClickDate('0')
				this.onClickView('0')
				this.onClickSource('', '0')
			},
			onClickSure() {
				Toast.loading({
					message: '加载中...',
					forbidClick: true,
					loadingType: 'spinner',
					duration: 0
				})
				if(this.pageType == 'citypage') {
					let startTime = ''
					let endTime = ''
					this.s_time == '开始时间' ? startTime = '' : startTime = this.s_time
					this.e_time == '结束时间' ? endTime = '' : endTime = this.e_time
					this.$store.state.cityQuery.page = 1
					this.$axios({
						method: 'post',
						url: '/index.php/City/getESearch',
						data: this.cityQuery
					}).then((res) => {
						if(res.data.status == '1') {
							let list = res.data.data.eventList
							if(list.length > 0) {
								this.$store.commit('handleCityList', list)
							}else {
								this.$store.commit('handleCityList', [])
							}
							this.$emit('closePopup', false)
							Toast.clear()
						}else {
							Toast.fail(res.data.msg)
						}
					}).catch((res) => {
						Toast.fail(res.data.msg)
					})
				}else {
					let startTime = ''
					let endTime = ''
					this.s_time == '开始时间' ? startTime = '' : startTime = this.s_time
					this.e_time == '结束时间' ? endTime = '' : endTime = this.e_time
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
							}else {
								this.$store.commit('handleMonitorList', [])
							}
							this.$emit('closePopup', false)
							Toast.clear()
						}else {
							Toast.fail(res.data.msg)
						}
					}).catch((res) => {
						Toast.fail(res.data.msg)
					})
				}
			},
			onClickSource(id, index) {
				this.sourcelist.forEach((item, index) => {
					item.class = ''
				})
				this.sourcelist[index].class = "active"
				this.source = id
			},
			onClickView(index) {
				this.viewlist.forEach((item, index) => {
					item.class = ''
				})
				this.viewlist[index].class = 'active'
				switch(index) {
					case 3:
						this.point = 'n';
						break;
					case 1:
						this.point = 'p';
						break;
					case 2:
						this.point = 'm';
						break;
					default:
						this.point = '';
						break;
				}
			},
			onClickDate(index) {
				if(index == 0) {
					this.time = ''
				}else if(index == 1) {
					this.time = 'd'
				}else if(index === 2) {
					this.time = 'yd'
				}else if(index === 3) {
					this.time = 'w'
				}
				this.timelist.forEach((item, index) => {
					item.class = ''
				})
				this.zdytoggle = true
				this.zdyclass = ''
				this.timelist[index].class = 'active'
			},
			showSourceList() {
				if(this.pageType == 'centerpage') {
					this.$axios({
						method: 'post',
						url: '/index.php/Monitor/showSourceList',
						data: {
							uid: this.getUserid,
							sub_uid: this.getSubid,
							fid: this.$store.state.fid
						}
					}).then((res) => {
						res.data.data.forEach((item, index) => {
							this.sourcelist.push(Object.assign({}, item, {'class':''}))
						})
						let obj = {
							id: '',
							title: '全部',
							class: 'active'
						}
						this.sourcelist.unshift(obj)
					}).catch((res) => {
						Toast.fail(res.data.msg)
					})
				}else {
					this.$axios({
						method: 'post',
						url: '/index.php/City/showSourceList',
						data: {
							uid: this.getUserid,
							sub_uid: this.getSubid
						}
					}).then((res) => {
						res.data.data.forEach((item, index) => {
							this.sourcelist.push(Object.assign({}, item, {'class':''}))
						})
						let obj = {
							id: '',
							title: '全部',
							class: 'active'
						}
						this.sourcelist.unshift(obj)
					}).catch((res) => {
						Toast.fail(res.data.msg)
					})
				}
			},
			onClickTime() {
				this.zdytoggle = false
				this.zdyclass = 'active'
				this.time = 'custom'
				for(let item of this.timelist) {
					item.class = ''
				}
				// this.showDate = true
			},
			onConfirm(value) {
				let year = value.getFullYear() + ''
				let month = value.getMonth() + 1 + ''
				let date = value.getDate() + ''
				month.length == 1 ? month = '0' + month : month = month
				date.length == 1 ? date = '0' + date : date = date

				
				this.showDate = false
				let str = year +'-'+ month +'-'+ date
				this.es_source == 1 ? this.s_time = str : this.e_time = str
			},
			onCancel() {
				this.showDate = false
			},
			getDate(type) {
				this.es_source = type
				this.showDate = true

				if(type == '1') {
					this.minDate = new Date(2012, 1, 1)
					let arr = []
					if(this.s_time == '开始时间') {
						this.currentDate = new Date()
					}else {
						arr = this.s_time.split('-')
						this.currentDate = new Date(arr[0], arr[1]-1, arr[2])
					}
					
				}else {
					let arr = []
					let endarr = []
					if(this.s_time !== '开始时间') {
						arr = this.s_time.split('-')
						this.minDate = new Date(arr[0], arr[1]-1, arr[2])
					}
					if(this.e_time !== '结束时间') {
						endarr = this.e_time.split('-')
						this.currentDate = new Date(endarr[0], endarr[1]-1, endarr[2])
					}

					
				}
			},
			closedata() {
				this.showDate = false
			}
		}
	}
</script>

<style lang="scss" scoped>
	@import '@css/constants.scss';

	.filter {
		height: 100%;

		.datePicker {
			.templa {
				position: absolute;
				top: 0;
				width: 100%;
				height: 100%;
				background-color: rgba(0, 0, 0, .5);
				z-index: 100;
			}
		}

		.van-datetime-picker {
			position: fixed;
			bottom: 0;
			left: 0;
			right: 0;
			z-index: 100;
			box-shadow: 0 5px 5px 5px #ccc;

			/deep/.van-picker__toolbar {
				background-color: #fff;
			}

			/deep/.van-picker__columns {
				background-color: #fff;
			}
		}

		.zidingyi {
			margin-left: px2rem(10);

			button {
				background-color: #f7f9fe;
				border-color: #fff;
				color: $activeColor;
				padding: 0 px2rem(19);
				height: px2rem(34);
				line-height: px2rem(34);
			}

			.active {
				background-color: #6f7ea0;
				color: #fff;
			}

			p {
				background-color: #6f7ea0;
				color: $rectBg3;
				font-weight: bold;
				line-height: px2rem(32);
				width: 60%;
				font-size: px2rem(15);
				text-align: center;
				i {
					margin: 0 px2rem(10);
				}
				span {
					color: #fff;
					font-size: px2rem(14);
					font-weight: normal;
				}
			}
		}

		.btn-wrap {
			display: flex;
			position: absolute;
			left: px2rem(15);
			right: px2rem(15);
			bottom: px2rem(15);

			button {
				flex: 1;

				&:first-child {
					flex: .6;
					margin-right: px2rem(10);
				}
			}
		}

		h2 {
			margin-top: px2rem(6);
			color: $activeColor;
			font-size: px2rem(18);
			text-align: center;
			line-height: px2rem(40);
		}

		h5 {
			margin-top: px2rem(15);
			padding: 0 px2rem(10);
			color: $activeColor;
			font-weight: bold;
			font-size: px2rem(16);
		}

		ul {
			display: flex;
			flex-wrap: wrap;
			margin-top: px2rem(10);
			padding: 0 px2rem(10);

			li {
				width: 23%;
				margin-right: px2rem(9);
				margin-bottom: px2rem(10);
				background-color: $bgColor;
				line-height: px2rem(32);
				font-size: px2rem(14);
				color: $activeColor;
				text-align: center;

				&:nth-of-type(4n+0) {
					margin-right: 0;
				}
			}

			.active {
				background-color: $deleteBg;
				color: #fff;
			}
		}
	}
</style>
