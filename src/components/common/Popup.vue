<template>
	<van-popup
	  v-model="popupToggle"
	  position="top"
	  :style="{ height: '100%' }"
	>
		<div class="pop-wrap">

			<div class="search-wrap">
				<van-icon name="arrow-left" @click="onClickBack" />
				<van-dropdown-menu>
				  <van-dropdown-item v-model="value1" :options="option1" />
				</van-dropdown-menu>
				<van-search
				  v-model="value"
				  placeholder="请输入搜索关键词"
				  show-action
				  shape="round"
				  @search="onSearch"
				>
				  <div slot="action" @click="onSearch">搜索</div>
				</van-search>
			</div>

			<div class="search-history">
				<div class="title">
					<h5>历史记录</h5>
					<span>清空历史记录</span>
				</div>
				<ul>
					<li><a href="#">国庆七天小长假</a></li>
					<li><a href="#">西藏今年7月份开始下雪</a></li>
					<li><a href="#">内蒙停止暴乱</a></li>
					<li><a href="#">今年双十一天猫店铺销售量达到百亿</a></li>
				</ul>
			</div>

		</div>
	</van-popup>
</template>

<script>
import { mapState } from 'vuex';
export default {
	name: 'popup',
	computed: {
		...mapState(['popupToggle'])
	},
	data() {
		return {
			value: '',
			value1: 0,
      option1: [
        { text: '标题', value: 0 },
        { text: '内容', value: 1 }
      ],
		}
	},
	methods: {
		onSearch() {

		},
		onClickBack() {
			this.$store.commit('handlePopup', false)
		}
	}
}
</script>

<style lang="scss" scoped>
@import '@css/constants.scss';
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
</style>