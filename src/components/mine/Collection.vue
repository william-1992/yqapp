<template>
	<div class="collection">

		<van-nav-bar
			title="我的收藏"
			@click-left="onClickLeft"
		>
			<div slot="right">
				<i class="iconfont" @click="onClickSearch">&#xe605;</i>
				<!-- <van-icon name="search" @click="onClickSearch" /> -->
				<van-button v-if="!checkboxToggleColl" type="default" @click="onSetup('1')">管理</van-button>
				<van-button v-else type="default" @click="onSetup('2')">完成</van-button>
			</div>
		</van-nav-bar>

		<coll-list></coll-list>

		<!-- 搜索弹框页 -->
		<van-popup
		  v-model="show"
		  position="right"
		  :overlay="false"
		  :style="{ height: '100%', width: '100%' }"
		>
			<div class="pop-wrap">

				<div class="search-wrap">
					<van-icon name="arrow-left" @click="onClickBack"></van-icon>
					<van-dropdown-menu>
					  <van-dropdown-item v-model="value1" :options="option1"></van-dropdown-item>
					</van-dropdown-menu>
					<van-search
					  v-model="value"
					  placeholder="请输入搜索关键词"
					  show-action
					  shape="round"
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
						<li v-for="item in historylist" @click="onItemClick(item)"><a href="#">{{ item }}</a></li>
					</ul>
				</div>

			</div>
		</van-popup>

	</div>
</template>

<script>
import { mapState } from 'vuex';
import { Toast, Dialog } from 'vant';
import CollList from './List';
export default {
	name: 'collection',
	components: {
		CollList
	},
	data() {
		return {
			show: false,
			value: '',
			value1: 0,
			historylist: [],
      option1: [
        { text: '标题', value: 0 }
      ]
		}
	},
	computed: {
		...mapState(['collQuery', 'checkboxToggleColl'])
	},
	watch: {
		value(val) {
			this.collQuery.keyword = val
		}
	},
	mounted() {
		this.getHistory()
	},
	methods: {
		onItemClick(val) {
			this.value = val
			this.getColl()
		},
		getColl() {
			this.$store.state.collQuery.page = 1
			this.$axios({
				method: 'post',
				url: '/index.php/Favo/getList',
				data: this.collQuery
			}).then((res) => {
				if(res.data.data.length > 0) {
					this.$store.commit('handleCollList', res.data.data)
				}
				setTimeout(() => {
					this.show = false
					this.value = ''
				}, 500)
				Toast.success(res.data.msg)
			}).catch((res) => {
				Toast.fail(res.data.msg)
			})

			if(this.historylist.length > 0) {
				if(this.historylist.indexOf(this.value) == -1) {
					this.historylist.unshift(this.value)
				}
			}else {
				this.historylist.push(this.value)
			}
			localStorage.setItem('history', JSON.stringify(this.historylist))
		},
		onClearHistory() {
			Dialog.confirm({
				message: '确定删除所有历史记录吗？'
			}).then(() => {
				localStorage.removeItem('history')
				this.historylist = []
			})
		},
		getHistory() {
			let list = JSON.parse(localStorage.getItem('history'))

			if(list && list.length > 0) {
				this.historylist = list
			}
		},
		onClickLeft() {
			this.$store.commit('handleToolbar', true)
			this.$store.commit('handleMesType', '')
		},
		onClickSearch() {
			this.show = true
		},
		onClickBack() {
			this.show = false
		},
		onSearch() {
			this.getColl()
		},
		onSetup(type) {
			if(type == '1') {
				this.$store.commit('handleCheckboxColl', true)
			}else {
			 this.$store.commit('handleCheckboxColl', false)
			}
		}
	}
}
</script>

<style lang="scss" scoped>
@import '@css/constants.scss';
.collection {
	.van-nav-bar__title {
		font-size: px2rem(18);
		font-weight: normal;
	}
	.van-nav-bar__right {
		right: 0;
		.iconfont {
			display: inline-block;
			padding: 0 px2rem(5) 0 px2rem(10);
			font-size: px2rem(18);
			color: #323948;
		}
		.van-button {
			border: none;
			font-size: px2rem(16);
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
				margin-top: px2rem(10);
			}
			ul>li>a{
				font-size: px2rem(14);
				color: $activeColor;
				line-height: px2rem(34);
			}
		}
	}
}
</style>