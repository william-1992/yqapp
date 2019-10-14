<template>
	<div class="push-page">
		<header>
			<van-button type="primary" size="small">推送</van-button>
		</header>
		<section class="seleted-name">
			<p v-if="result.length == 0">收件人选择</p>
			<ul v-else>
				<li v-for="(item, index) in result" :key="index">
					{{item}}
					<van-icon name="cross" />
				</li>
			</ul>
		</section>
		<section>
			<div class="staff-title">
				<h3>卫数科技有限公司</h3>
			</div>
			<van-collapse v-model="activeNames">
			  <van-collapse-item title="标题1" name="1">
			  	<div slot="title">
			  		<p>
			  			<van-icon name="play" color="#d3dbeb" />
			  			<span>标题</span>
			  		</p>
			  		<time>4</time>
			  	</div>
			  	<van-checkbox-group v-model="result">
					  <van-checkbox v-for="(item, index) in namelist" :key="index" :name="item">{{item}}</van-checkbox>
					</van-checkbox-group>
				</van-collapse-item>
			  <van-collapse-item title="标题2" name="2">内容</van-collapse-item>
			  <van-collapse-item title="标题3" name="3">内容</van-collapse-item>
			</van-collapse>
		</section>
		<section>
			  <van-field
			    v-model="message"
			    type="textarea"
			    placeholder="请输入留言"
			    rows="1"
			    autosize
			    :maxlength="50"
			    clearable
			  />
			  <p>{{this.message.length}} / 50</p>
		</section>
	</div>
</template>

<script>
export default {
	name: 'push-page',
	data() {
		return {
			message: '',
			activeNames: ['1'],
			result: [],
			namelist: ['周恩来', '刘少奇', '邓小平', '夏建国', '田致远', '邓颖超', '陈毅', '曹慧', '田源']
		}
	}
}
</script>

<style lang="scss" scoped>
@import '@css/constants.scss';
.push-page {
	height: 100%;
	background-color: $bgColor;
	header {
		background-color: #fff;
		padding: px2rem(10) px2rem(10) 0 0;
		text-align: right;
	}
	section.seleted-name {
		background-color: #fff;
		padding: px2rem(15) px2rem(15) px2rem(10);
		border-bottom: 1px solid $borderColor;
		p {
			font-size: px2rem(16);
			color: $grayColor;
		}
		ul {
			overflow: auto;
			white-space: nowrap;
			li {
				display: inline-block;
				background-color: $bgColor;
				padding: 0 px2rem(5);
				margin-right: px2rem(5);
				line-height: px2rem(24);
				font-size: px2rem(14);
				i {
					background-color: #e0e2e6;
					position: relative;
					top: px2rem(2);
					border-radius: px2rem(15);
					color: #fff;
				}
			}
		}
	}
	section {
		.staff-title {
			padding-top: px2rem(10);
			background-color: #fff;
			line-height: px2rem(34);
			h3 {
				margin-left: px2rem(15);
				font-size: px2rem(18);
			}
		}
	}
	.van-cell {
		margin-top: px2rem(10)
	}
}
</style>