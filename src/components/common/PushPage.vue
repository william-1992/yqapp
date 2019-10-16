<template>
	<div class="push-page">
		<header>
			<van-button type="primary" size="small">推送</van-button>
		</header>
		<section class="seleted-name">
			<p v-if="result.length == 0">收件人选择</p>
			<ul v-else>
				<li v-for="(item, index) in result" :key="index" @click="onClickDelete(index)">
					{{item}}
					<van-icon name="cross" />
				</li>
			</ul>
		</section>
		<section>
			<div class="staff-title">
				<h3>卫数科技有限公司</h3>
				<van-checkbox v-model="checked"></van-checkbox>
			</div>
			<van-collapse v-model="activeNames" class="staff-content">
			  <van-collapse-item title="标题1" name="1">
			  	<div slot="title" class="inner">
			  		<p>
			  			<van-icon name="play" color="#d3dbeb" />
			  			<span>标题</span>
			  		</p>
			  		<time>{{ namelist.length }}</time>
			  	</div>
			  	<van-checkbox-group v-model="result" checked-color="#ff6651">
					  <van-checkbox v-for="(item, index) in namelist" :key="item.id" :name="item.name">
					  	<div class="item-wrap">
					  		<div class="item-wrap-circle">{{item.name.slice(0, 1)}}</div>
					  		<div class="item-wrap-des">
					  			<h3>{{item.name}}</h3>
					  			<p>{{item.office}}</p>
					  		</div>
					  	</div>
						</van-checkbox>
					</van-checkbox-group>
				</van-collapse-item>
			  <van-collapse-item title="标题2" name="2">内容</van-collapse-item>
			  <van-collapse-item title="标题3" name="3">内容</van-collapse-item>
			</van-collapse>
		</section>
		<section class="send-wrap">
			<p>请选择发送方式</p>
			<van-radio-group v-model="sendradio">
			  <van-radio name="1" checked-color="#ff6651">邮件</van-radio>
			  <van-radio name="2" checked-color="#ff6651">短信</van-radio>
			</van-radio-group>
		</section>
		<section class="textarea-wrap">
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
			sendradio: 1,
			checked: false,
			message: '',
			activeNames: ['1'],
			result: [],
			namelist: [
				{id: 1, name: '周恩来', office: '副总理'},
				{id: 2, name: '刘少奇', office: '副总理'},
				{id: 3, name: '邓小平', office: '副总理'},
				{id: 4, name: '夏建国', office: '科学家'},
				{id: 5, name: '田志远', office: '助理'},
				{id: 6, name: '邓颖超', office: '助理'},
				{id: 7, name: '陈毅', office: '市长'},
				{id: 8, name: '曹慧', office: '记者'},
				{id: 9, name: '天源', office: '知青'},
			]
		}
	},
	methods: {
		onClickDelete(index) {
			this.result.splice(index, 1)
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
			background-color: #fff;
			line-height: px2rem(34);
			display: flex;
			justify-content: space-between;
			padding: 0 px2rem(15);
			padding-top: px2rem(10);
			h3 {
				font-size: px2rem(18);
			}
		}
		.staff-content {
			.inner {
				display: flex;
				justify-content: space-between;
				span {
					margin-left: px2rem(10)
				}
			}
			/deep/.van-collapse-item__content {
				background-color: $bgColor;
			}
			/deep/.van-icon-arrow {
				display: none;
			}
			/deep/.van-checkbox {
				justify-content: space-between;
				flex-direction: row-reverse;
				.item-wrap {
					display: flex;
					margin-bottom: px2rem(20);
					.item-wrap-circle {
						margin-right: px2rem(8);
						background-color: $deleteBg;
						color: #fff;
						width: px2rem(32);
						height: px2rem(32);
						line-height: px2rem(32);
						border-radius: 50%;
						text-align: center;
						font-size: px2rem(16);
					}
					.item-wrap-des {
						h3 {
							font-size: px2rem(14)
						}
						p {
							font-size: px2rem(12);
							color: $deleteBg;
						}
					}
				}
			}
		}
	}
	.textarea-wrap {
		.van-field {
			min-height: px2rem(80);
			/deep/textarea::placeholder {
				color: $grayColor
			}
		}
		p {
			text-align: right;
			line-height: px2rem(24);
			padding-right: px2rem(10);
		}
	}
	.van-cell {
		margin-top: px2rem(10)
	}
	.send-wrap {
		background-color: #fff;
		margin: px2rem(10) 0;
		padding: px2rem(15);
		.van-radio-group {
			overflow: hidden;
		}
		.van-radio {
			margin-top: px2rem(10);
			float: left;
			margin-right: px2rem(20)
		}
	}
}
</style>