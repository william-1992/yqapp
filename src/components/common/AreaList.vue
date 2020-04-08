<template>
	<div class="area">
		<div class="area-title">
			<h1>请选择所在地区</h1>
			<van-button type="primary" size="small" @click="onClickSure">确定</van-button>
		</div>

		<van-tabs v-model="activeIndex">
			<van-tab v-for="(item, index) in namelist" :key="index" :title="item.name">
				<ul>
					<li v-for="ite in item.citylist" :key="ite.id" @click="getCity(ite)">{{ ite.name }}</li>
				</ul>
			</van-tab>
		</van-tabs>

		<!-- <div class="name-wrap">
			<p>
				<span 
					v-for="(item, index) in namelist" 
					:key="index" 
					:class="item.class" 
					@click="onClick(index)"
				>{{ item.name }}</span>
			</p> 
		</div>
		<div class="citylist" ref="wrapper222">
			<ul>
				<li 
					v-for="item in citylist" 
					:key="item.id"
					@click="getCity(item)"
				>{{ item.name }}</li>
			</ul>
		</div> -->
	</div>
</template>

<script>
import { mapState, mapGetters } from 'vuex';
import BScroll from 'better-scroll';
import { Toast } from 'vant';
export default {
	name: 'arealist',
	data() {
		return {
			activeIndex: 0,
			areaname: '',
			ppid: '',
			namelist: [{
				name: '全部',
				id: '',
				pid: '',
				level: '',
				class: 'active',
				citylist: []
			}]
		}
	},
	mounted() {
		this.$nextTick(() => {
			this.getArea()
		})
	},
	computed: {
		...mapState(['monitorQuery', 'areaList', 'pickerName', 'fid']),
		...mapGetters(['getUserid', 'getSubid'])
	},
	watch: {
		ppid(id) {
			this.monitorQuery.areaid = id
		},
		fid(id) {
			this.namelist = this.namelist.slice(0, 1)
			this.namelist[0].name = this.pickerName.name
			this.activeIndex = this.namelist.length-1
			if(this.areaList.length <= 0) {
				this.ppid = this.pickerName.id
				this.getArea()
			}else {
				this.namelist[0].citylist = this.areaList
			}
		}
	},
	methods: {
		onClickSure() {
			Toast.loading({
				message: '加载中...',
				forbidClick: true,
				loadingType: 'spinner',
				duration: 0
			})
			this.$emit('closeArea', false)
			this.$store.state.monitorQuery.areaid = this.ppid
			this.$store.commit('handleAddressName', {name: this.areaname, id: this.ppid})
			this.$axios({
				method: 'post',
				url: '/index.php/Monitor/getESearch',
				data: this.monitorQuery
			}).then((res) => {
				let list = res.data.data.eventList
				if(list.length > 0) {
					list.forEach((item, index) => {
						item.wordStr = item.wordStr.split('+')
					})
					this.$store.commit('handleMonitorList', list)
				}else {
					this.$store.commit('handleMonitorList', [])
				}
				Toast.clear()
			}).catch((res) => {
				Toast.fail(res.data.msg)
			})
		},
		getCity(data) {
			this.ppid = data.id
			this.areaname = data.name
			this.namelist[this.activeIndex].name = data.name
			this.namelist[this.activeIndex].id = data.id
			this.namelist[this.activeIndex].pid = data.pid
			this.namelist[this.activeIndex].level = data.level

			this.namelist = this.namelist.slice(0, this.activeIndex+1)

			if(this.namelist.length <= 4 && data.level < 4) {
				this.$axios({
					method: 'post',
					url: '/index.php/Monitor/getAreaChild',
					data: {
						uid: this.getUserid,
						sub_uid: this.getSubid,
						fid: this.$store.state.monitorQuery.fid,
						pid: this.ppid
					}
				}).then((res) => {
					let obj = {
						name: '全部',
						id: '',
						pid: '',
						level: '',
						class: 'active',
						citylist: res.data.data
					}
					setTimeout(() => {
						this.activeIndex = this.namelist.length-1
					}, 500)

					if(this.namelist.length <= 3) {
						this.namelist.push(obj)
					}

				}).catch((res) => {
					Toast.fail(res.data.msg)
				})
			}
		},
		getArea() {
			this.$axios({
				method: 'post',
				url: '/index.php/Monitor/getAreaChild',
				data: {
					uid: this.getUserid,
					sub_uid: this.getSubid,
					fid: this.$store.state.fid,
					pid: this.ppid
				}
			}).then((res) => {
				this.namelist[0].citylist = res.data.data
			}).catch((res) => {
				Toast.fail(res.data.msg)
			})
		},
		onClick(index) {
			this.namelist.forEach((item) => {
				item.class = ''
			})
			this.namelist[index].class = 'active'
		}
	}
}
</script>

<style lang="scss" scoped>
@import '@css/constants.scss';
.area {
	height: 100%;
	overflow: hidden;
	.area-title {
		position: relative;
		button {
			position: absolute;
			right: px2rem(10);
			top: px2rem(4)
		}
	}
	h1 {
		margin-top: px2rem(5);
		font-size: px2rem(18);
		text-align: center;
		line-height: px2rem(40)
	}
	.van-tabs__content {
		.van-tab__pane {
			position: absolute;
			left: 0;
			top: px2rem(50);
			bottom: 0;
			overflow: auto;
			height: px2rem(400)
		}
		li {
			line-height: px2rem(40);
			text-indent: px2rem(28);
			font-size: px2rem(14)
		}
	}
}
</style>