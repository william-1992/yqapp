<template>
	<div class="message">

		<van-tabs 
			v-model="activeyu" 
			:line-width="13" 
			title-active-color="#323948" 
			title-inactive-color="#acb7cf" 
			:border="false"
		>
		  <van-tab :title="item.title" v-for="item in list"></van-tab>
		</van-tabs>		

		<div class="tabsTwo">
			<p>
				<span 
					v-for="(item, index) in tabs2" 
					:key="item.id" 
					:class="item.class" 
					@click="onClickTabs2(index)"
				>{{ item.title }}</span>
			</p>
		</div>

		<warn-list v-if="warnToggle" :pageType="false" :finishtype="finishType"></warn-list>
	</div>
</template>

<script>
import { Toast } from 'vant';
import { mapState, mapGetters } from 'vuex';
import WarnList from '@c/message/WarnList';
export default {
	name: 'message',
	components: {
		WarnList
	},
	data() {
		return {
			finishType: false,
			warnToggle: false,
			activeyu: 0,
			list: [{
				title: '全部',
				id: '0'
			}],
			tabs2: [{
				id: '1',
				title: '最新',
				class: 'active'
			}, {
				id: '2',
				title: '最紧急',
				class: ''
			}]		
		}
	},
	mounted() {
		this.$nextTick(() => {
			setTimeout(() => {
				this.getPlanList()
				this.$store.state.warnQuery.page = 1
			}, 500)
		})
	},
	computed: {
		...mapState(['warnQuery']),
		...mapGetters(['getUserid', 'getSubid'])
	},
	watch: {
		activeyu(val) {
			Toast.loading({
				message: '加载中...',
				forbidClick: true,
				loadingType: 'spinner',
				duration: 0
			})
			this.$store.state.warnQuery.fid = this.list[val].id
			this.$store.state.warnQuery.page = 1

			this.$axios({
				method: 'post',
				url: '/index.php/Warning/getDataList',
				data: this.warnQuery
			}).then((res) => {
				let list = res.data.data
				if(list.length > 0) {
					list.forEach((item, index) => {
						item.words = item.words.split('+')
					})
					this.$store.commit('handleWarnList', list)
					this.finishType = false
				}else {
					this.$store.commit('handleWarnList', [])
					this.finishType = true
				}
				Toast.clear()
			}).catch((res) => {
				Toast.fail(res.data.msg)
			})
		}
	},
	methods: {
		getPlanList() {
			this.$axios({
				method: 'post',
				url: '/index.php/Monitor/getPlanList',
				data: {
					uid: this.getUserid,
					sub_uid: this.getSubid
				}
			}).then((res) => {
				this.list = this.list.concat(res.data.data)
				// this.$store.state.warnQuery.fid = res.data.data[0].id
				this.warnToggle = true
			}).catch((res) => {
				setTimeout(() => {
					this.getPlanList()
				}, 500)
			})
		},
		onClickTabs2(index) {
			Toast.loading({
				message: '加载中...',
				forbidClick: true,
				loadingType: 'spinner',
				duration: 0
			})
			this.tabs2.forEach((item) => {
				item.class = ''
			})
			this.tabs2[index].class = 'active'
			this.warnQuery.page = 1
			index == 1 ? this.$store.state.warnQuery.sort_type = 'urgent' : this.$store.state.warnQuery.sort_type = 'recent'
			this.$axios({
				method: 'post',
				url: '/index.php/Warning/getDataList',
				data: this.warnQuery
			}).then((res) => {
				let list = res.data.data
				if(list.length > 0) {
					list.forEach((item, index) => {
						item.words = item.words.split('+')
					})
					this.$store.commit('handleWarnList', list)
					
				}else {
					// Toast.fail(res.data.msg)
				}
				Toast.clear()
			}).catch((res) => {
				Toast.fail(res.data.msg)
			})
		}
	}
}
</script>

<style lang="scss" scoped>
@import '@css/constants.scss';
.message {
	.van-tabs {

	}
	.tabsTwo {
		padding-left: px2rem(5);
		background-color: #fff;
		line-height: px2rem(30);
		span {
			padding: 0 px2rem(15);
			font-size: px2rem(14);
			color: $defaultColor;
		}
		span.active{
			color: $activeColor;
		}
	}
}
</style>