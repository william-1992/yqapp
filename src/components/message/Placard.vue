<template>
	<div class="placard">
		<ul>
			<li v-for="item in list" :key="item.id">
				<div class="item-title">
					<span>{{ item.time }}</span>
				</div>
				<div class="item-card">
					<img :src="item.url">
					<h3>{{ item.title }}</h3>
					<p>{{ item.des }}</p>
				</div>
			</li>
		</ul>
	</div>
</template>

<script>
export default {
	name: 'placard',
	data() {
		return {
			list: [{
				id: 1,
				time: '16:30 2019-09-24',
				title: '鲨舆APP又添新功能了',
				des: '邮箱是拥有国内用户最多、市场最大的邮箱就是我们巨作这次改版，特意从应用商城下载了各种邮政邮箱是拥有国内用户最多、市场最大的邮箱就是我们巨作这次改版，特意从应用商城下载了各种邮政',
				url: require('@img/feng.jpg')
			}, {
				id: 2,
				time: '6:30 2019-10-24',
				title: '鲨舆APP又添新功能了',
				des: '邮箱是拥有国内用户最多、市场最大的邮箱就是我们巨作这次改版，特意从应用商城下载了各种邮政邮箱是拥有国内用户最多、市场最大的邮箱就是我们巨作这次改版，特意从应用商城下载了各种邮政',
				url: require('@img/timg.jpg')
			}]
		}
	}
}
</script>

<style lang="scss" scoped>
@import '@css/constants.scss';
.placard {
	padding: px2rem(20) px2rem(10);
	ul {
		padding-bottom: px2rem(30);
	}
	li {
		margin-bottom: px2rem(20);
		.item-title {
			text-align: center;
			span {
				display: inline-block;
				border-radius: px2rem(3);
				background-color: #d2d4d8;
				padding: px2rem(3) px2rem(5);
				font-size: px2rem(12);
				color: #fff;
			}
		}
		.item-card {
			margin-top: px2rem(10);
			background-color: #fff;
			padding-bottom: px2rem(5);
			img {
				width: 100%;
			}
			h3 {
				margin-top: px2rem(5);
				padding: 0 px2rem(10);
				line-height: px2rem(32);
				font-size: px2rem(18)
			}
			p {
				padding: 0 px2rem(10);
				line-height: px2rem(22);
				font-size: px2rem(14);
				color: $deleteBg;
			}
		}
	}
}
</style>