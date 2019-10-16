<template>
	<div class="hot-test">
		<div class="left">
			<span v-for="(item, index) in list" :key="item.id" :class="item.className" @click="onClickHandle(index)">
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
				{{ pickerName }}<i class="iconfont">&#xe65a;</i>
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
			<time-filter></time-filter>
		</van-popup>
	</div>
</template>

<script>
import { mapState } from 'vuex';
import TimeFilter from '@c/common/TimeFilter';
export default {
	name: 'hottest',
	props: {
		hotType: String
	},
	components: {
		TimeFilter
	},
	data() {
		return {
			show: false,
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
		...mapState(['pickerName'])
	},
	methods: {
		onClickHandle(index) {
			this.list.forEach((item) => {
				item.className = ''
			})
			this.list[index].className = 'active'
		},
		onClickAddress() {
      		this.$store.commit('handleOverlay', true)

			this.$store.commit('handleAddress', true)
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