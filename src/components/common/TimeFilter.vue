<template>
	<div class="filter">
		<h2>筛选</h2>
		<h5>时间</h5>
		<ul>
			<li v-for="item in timelist" :key="item.id" :class="item.class">{{item.title}}</li>
		</ul>
		<div class="zidingyi">
			<van-button type="warning" :class="zdyclass" @click="onClickTime" v-if="zdytoggle">自定义</van-button>
			<p v-else>
				<span @click="getDate('1')">开始时间</span>
				TO
				<span @click="getDate('2')">结束时间</span>
			</p>
		</div>
		<h5>观点</h5>
		<ul>
			<li v-for="item in viewlist" :key="item.id" :class="item.class">{{item.title}}</li>
		</ul>
		<h5>来源</h5>
		<ul>
			<li v-for="item in sourcelist" :key="item.id" :class="item.class">{{item.title}}</li>
		</ul>
		<div class="btn-wrap">
			<van-button type="warning" color="#6f7ea0">重置</van-button>
			<van-button type="danger" color="#ff6651">保存</van-button>
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
			/>
		</div>


	</div>
</template>

<script>
import crypto from '@js/crypto.js';
export default {
	name: 'time-filter',
	data() {
		return {
			showDate: false,
			minDate: new Date(2019, 4, 1),
			dataTitle: '开始时间',
			currentDate: new Date(),
			zdytoggle: true,
			zdyclass: '',
			timelist: [
				{id: 1, title: '全部', class: 'active'},
				{id: 2, title: '今天', class: ''},
				{id: 3, title: '昨天', class: ''},
				{id: 4, title: '本周', class: ''}
			],
			viewlist: [
				{id: 1, title: '全部', class: 'active'},
				{id: 2, title: '正面', class: ''},
				{id: 3, title: '中性', class: ''},
				{id: 4, title: '负面', class: ''}
			],
			sourcelist: [
				{id: 1, title: '全部', class: 'active'},
				{id: 2, title: '新闻', class: ''},
				{id: 3, title: '微博', class: ''},
				{id: 4, title: 'APP', class: ''},
				{id: 5, title: '微信', class: ''},
				{id: 6, title: '政务', class: ''},
				{id: 7, title: '其他', class: ''}
			]
		}
	},
	mounted() {
		let a = crypto.encrypt('欢迎登陆', 'hAw6eqnFLKxpsDv3');
		let b = crypto.decrypt(a, 'hAw6eqnFLKxpsDv3');
		console.log('加密后：' + a)
		console.log('解密后：' + b)
	},
	methods: {
		onClickTime() {
			this.zdytoggle = false
			this.zdyclass = 'active'
			// this.showDate = true
		},
		onConfirm(value) {
			console.log(value)
			this.showDate = false
		},
		onCancel() {
			this.showDate = false
		},
		getDate(type) {
			console.log(type)
			this.showDate = true
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
			background-color: rgba(0,0,0,.5);
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
		/deep/.van-picker__toolbar{
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
			span {
				margin: 0 px2rem(10);
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
