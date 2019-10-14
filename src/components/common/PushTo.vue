<template>
	<div class="push-to">
		<ul>
			<li v-for="(item, index) in pushlist" :key="item.id" @click="onClick(index)">
				<img :src="item.url">
				<p>{{item.title}}</p>
			</li>
		</ul>
		<footer>
			<van-button type="default" size="large" @click="onClose">取消</van-button>
		</footer>

		<van-popup v-model="pushpageToggle" closeable close-icon-position="top-left" position="right" :style="{ height: '100%', width: '100%' }">
			<push-page></push-page>
		</van-popup>

	</div>
</template>

<script>
import PushPage from '@c/common/PushPage';
export default {
	name: 'pushto',
	components: {
		PushPage
	},
	data() {
		return {
			pushpageToggle: false,
			pushlist: [{
				id: 1,
				title: '鲨舆',
				url: require('@img/push-bg1.png')
			}, {
				id: 2,
				title: '收信人',
				url: require('@img/push-bg2.png')
			}, {
				id: 3,
				title: '复制链接',
				url: require('@img/push-bg3.png')
			}]
		}
	},
	methods: {
		onClose() {
			this.$emit('closeThis', false)
		},
		onClick(index) {
			if(index === 0) {
				this.pushpageToggle = true
			}else if(index === 1) {

			}else {

			}
		}
	}
}
</script>

<style lang="scss" scoped>
@import '@css/constants.scss';
.push-to {
	ul>li {
		display: inline-block;
		margin: px2rem(20) px2rem(15) 0;
		img {
			width: px2rem(56);
			height: px2rem(56);
		}
		p {
			font-size: px2rem(12);
			text-align: center;
			line-height: px2rem(26);
		}
	}
	footer {
		margin-top: px2rem(13)
	}
}
</style>