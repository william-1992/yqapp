<template>
	<div class="center-wrap">
		<search :pageType="'monitor'"></search>
		<van-tabs 
			v-model="active" 
			:line-width="14" 
			title-active-color="#323948" 
			title-inactive-color="#d3dbeb" 
			:border='false'
			@change="getTabs"
		>
			<van-tab v-for="item in flist" :title="item.title" :key="item.id"></van-tab>
		</van-tabs>
		<hottest hotType="centerpage"></hottest>
		<text-list :fidd="fidd"/>
	</div>
</template>

<script>
import { Toast } from 'vant';
import { mapGetters, mapState } from 'vuex';
import Search from '@c/common/Search';
import Hottest from '@c/common/Hottest';
import TextList from '@c/center/List';
export default {
	name: 'center',
	components: {
		Search,
		Hottest,
		TextList
	},
	data() {
		return {
			active: 0,
			flist: [],
			search_val: {},
			fidd: ''
		}
	},
	watch: {
		active(index) {
			this.$store.state.fid = this.flist[index].id
			this.fidd = this.flist[index].id
			this.$store.state.monitorQuery.fid = this.fidd
			this.$store.state.monitorQuery.page = 1
			let len = this.flist[index].area_list.length
			if(len > 1) {
				this.$store.commit('handleArealist', this.flist[index].area_list)
				this.$store.commit('handleAddressName', {name: '全部', id: 0})
			}else {
				this.$store.commit('handleAddressName', this.flist[index].area_list[0])
				this.$store.commit('handleArealist', [])
			}
		} 
	},
	mounted() {
		this.$nextTick(() => {
			this.getPlanList()
		})
	},
	computed: {
		...mapState(['paddingTT']),
		...mapGetters(['getUserid', 'getSubid'])
	},
	methods: {
		getData(data) {
			this.search_val = data
		},
		getPlanList() {
			this.$axios({
				method: 'post',
				url: '/index.php/Monitor/getPlanList',
				data: {
					uid: this.getUserid,
					sub_uid: this.getSubid
				}
			}).then((res) => {
				if(res.data.status == '1') {
					this.flist = res.data.data
					this.fidd = res.data.data[0].id
					this.$store.state.fid = res.data.data[0].id
					this.$store.state.monitorQuery.fid = res.data.data[0].id
					let info2 = res.data.data[0].area_list
					if(info2.length > 1) {
						this.$store.commit('handleArealist', info2)
						this.$store.commit('handleAddressName', {name: '全部', id: 0})
					}else {
						this.$store.commit('handleAddressName', info2[0])
						this.$store.commit('handleArealist', [])
					}
				}else {
					Toast.fail(res.data.msg)
				}
			}).catch((res) => {
				Toast.fail(res.data.msg)
			})
		},
		getTabs() {
			// console.log(this.active)
		}
	}
}
</script>

<style lang="scss" scoped>
@import '@css/constants.scss';

.center-wrap {
	p {
		font-size: px2rem(14)
	}
	h1 {
		font-size: px2rem(18)
	}
	.van-tab__pane, .van-tab__pane-wrapper {
		font-size: px2rem(18)
	}
	/deep/.van-tabs--line .van-tabs__line {
		bottom: px2rem(18)
	}
}
</style>