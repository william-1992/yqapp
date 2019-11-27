<template>
	<div class="message">

		<van-tabs v-model="activeyu" :line-width="13" title-active-color="#323948" title-inactive-color="#acb7cf" :border="false">
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

		<mes-list :pageType="false"></mes-list>

	</div>
</template>

<script>
import { Toast } from 'vant';
import { mapState } from 'vuex';
import MesList from '@c/message/WarnList';
export default {
	name: 'message',
	components: {
		MesList
	},
	data() {
		return {
			activeyu: 0,
			list: [],
			tabs2: [{
				id: '1',
				title: '最新',
				class: ''
			}, {
				id: '2',
				title: '最紧急',
				class: 'active'
			}]		
		}
	},
	mounted() {
		this.getPlanList()
	},
	computed: {
		...mapState(['warnQuery'])
	},
	watch: {
		activeyu(val) {
			this.$store.state.warnQuery.fid = this.list[val].id

			this.$axios({
				method: 'post',
				url: '/index.php/Warning/getDataList',
				data: this.warnQuery
			}).then((res) => {
				let list = res.data.data
				list.forEach((item, index) => {
					item.words = item.words.split('+')
				})
				this.$store.commit('handleWarnList', list)
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
					uid: this.$store.state.userid
				}
			}).then((res) => {
				this.list = res.data.data
				this.$store.state.warnQuery.fid = res.data.data[0].id
			}).catch((res) => {
				Toast.fail(res.data.msg)
			})
		},
		onClickTabs2(index) {
			this.tabs2.forEach((item) => {
				item.class = ''
			})
			this.tabs2[index].class = 'active'
			index == 1 ? this.$store.state.warnQuery.sort_type = 'recent' : this.$store.state.warnQuery.sort_type = 'urgent'
			this.$axios({
				method: 'post',
				url: '/index.php/Warning/getDataList',
				data: this.warnQuery
			}).then((res) => {
				let list = res.data.data
				list.forEach((item, index) => {
					item.words = item.words.split('+')
				})
				this.$store.commit('handleWarnList', list)
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