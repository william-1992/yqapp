<template>
	<div class="detail-wrap" v-if="pageToggle">
		<h1>报告详情</h1>
		<div class="wrap-inner">
			<div>
				<header>
					<h2>{{ info.user.company_name }}</h2>
					<p>[内部报告，请勿外传]</p>
				</header>
				<hgroup>
					<div class="blue">
						<p>{{ info.title }}</p>
						<p class="font-big">方案监测分析报告</p>
					</div>
					<div class="desc">
						<p>监测时间：{{ info.s_timeStr }}~{{ info.e_timeStr }}</p>
						<p>监测方案：{{ info.plan.title }}</p>
						<p>数据提供商：{{ this.$store.state.company_short_name }}</p>
					</div>
				</hgroup>
				<article>
					<h2>一、 概述</h2>
					<p>通过监测20多万家网站、200多家APP、微信公众号、微博、贴吧、博客、论坛，在{{ info.s_timeStr }}至{{ info.e_timeStr }}期间，共总结具有一定影响、媒体信息{{ info.point_data.total }}条，具体内容如下。</p>
				</article>
				<article>
					<h2>二、 总览</h2>
					<figure>
						<h3>（一）、 信息极性分析</h3>
						<p>{{ message.point }}</p>
						<div class="echar01" ref="echar01"></div>
					</figure>
					<figure>
						<h3>(二)、 来源类型统计</h3>
						<p>{{ message.source }}</p>
						<div style="width: 100%; overflow: auto"><div class="echar02" ref="echar02"></div></div>
					</figure>
				</article>
			</div>
		</div>
	</div>	
</template>

<script>
import echarts from 'echarts';
import { Toast } from 'vant';
import { mapGetters, mapState } from 'vuex';
export default {
	name: 'doc-detail',
	porps: {
		token: Number
	},
	data() {
		return {
			pageToggle: false,
			info: '',
			message: '',
			mapprov: '',
			chart: null,
			category: [],
			token: this.$attrs.token
		}
	},
	computed: {
		cateName() {
			let arr = []
			for(let i=0; i<this.category.length; i++) {
				arr.push(this.category[i].name)
			}
			return arr
		},
		...mapGetters(['getUserid', 'getSubid']),
		...mapState(['reportToken'])
	},
	mounted() {
		this.$nextTick(function() {
			this.getInfo()
			setTimeout(() => {
				this.getPie()
				this.getCate()
			}, 1000)
		})
	},
	watch: {
		reportToken(val) {
			this.getInfo()
		}
	},
	methods: {
		getCate() {
			this.chart = echarts.init(this.$refs.echar02)
			this.chart.setOption({
				color: '#a7c3f6',
				grid: {
					left: '1%',
					right: '2%',
					bottom: '3%',
					containLabel: true
				},
				xAxis: {
					splitNumber: this.category.length,
					type: 'category',
					data: this.cateName
				},
				yAxis: {
					type: 'value'
				},
				series: [{
					data: this.category,
					type: 'bar',
					barWidth: '60%',
					label: {
						normal: {
							show: true,
							position: 'inside'
						}
					}
				}]
			})
		},
		getPie() {
			this.chart = echarts.init(this.$refs.echar01)
			this.chart.setOption({
        tooltip: {},
        legend: {
        	bottom: 10,
        	left: 'center',
        	data: ['正面', '中性', '负面'],
        	textStyle: {
        		fontSize: 18
        	}
        },
        series: [{
            type: 'pie',
            radius: '70%',
            center: ['50%', '50%'],
            selectedMode: 'single',
            color: ['#aff8bb', '#a7c3f6', '#ffa89c'],
            label: {
            	normal: {
            		position: 'inner'
            	}
            },
            data: [{
            	value: this.info.point_data.positive,
            	name: '正面' +':'+ this.info.point_data.positive,
            	label: {
            		fontSize: 18
            	}
            }, {
            	value: this.info.point_data.neutral,
            	name: '中性' +':'+ this.info.point_data.neutral,
            	label: {
            		fontSize: 18
            	}
            }, {
            	value: this.info.point_data.negative,
            	name: '负面' +':'+ this.info.point_data.negative,
            	label: {
            		fontSize: 18
            	}
            }]
        }]
			})
		},
		getInfo() {
			this.$axios({
				method: 'post',
				url: '/index.php/Report/getDocDetail',
				data: {
					uid: this.getUserid,
					sub_uid: this.getSubid,
					token: this.reportToken
				}
			}).then((res) => {
				this.info = res.data.data.info
				this.message = res.data.data.msg
				this.mapprov = res.data.data.prov
				this.pageToggle = true
				for(let i=0; i<res.data.data.info.source_data.length; i++) {
					this.category.push({value: res.data.data.info.source_data[i].totle, name: res.data.data.info.source_data[i].name})
				}
			}).catch((res) => {
				Toast.fail(res.data.msg)
			})
		}
	}
}
</script>

<style lang="scss" scoped>
@import '@css/constants.scss';
.detail-wrap {
	h1 {
		font-size: px2rem(18);
		line-height: px2rem(50);
		text-align: center;
	}
	.wrap-inner {
		position: absolute;
		left: 0;
		right: 0;
		bottom: 0;
		top: px2rem(50);
		overflow: auto;
	}
	header {
		padding: 0 px2rem(15);
		h2 {
			font-size: px2rem(16);
		}
		p {
			margin-top: px2rem(15);
			font-size: px2rem(14)
		}
	}
	hgroup {
		margin-top: px2rem(15);
		.blue {
			background-color: #3d80ff;
			padding: px2rem(15);
			p {
				font-size: px2rem(14);
				color: #fff;
			}
			.font-big {
				margin-top: px2rem(15);
				font-size: px2rem(22)
			}
		}
		.desc {
			margin-top: px2rem(15);
			padding: 0 px2rem(15);
			font-size: px2rem(15);
			p {
				line-height: px2rem(26)
			}
		}
	}
	article {
		margin-top: px2rem(15);
		padding: 0 px2rem(15);
		h2 {
			font-size: px2rem(14);
			line-height: px2rem(26);
			font-weight: bold
		}
		p {
			font-size: px2rem(12);
			text-indent: px2rem(24);
			line-height: px2rem(20);
			text-align: justify
		}
		figure {
			h3 {
				font-size: px2rem(12);
				font-weight: bold;
				line-height: px2rem(22);
			}
			.echar01 {
				width: 100%;
				height: px2rem(300)
			}
			.echar02 {
				width: 1000px;
				height: px2rem(300)
			}
		}
	}
}	
</style>