<template>
	<div class="push-to">
		<ul>
			<li @click="onClick(0)">
				<img src="@img/push-bg1.png">
				<p>鲨舆</p>
			</li>
			<li @click="onClick(1)">
				<img src="@img/push-bg2.png">
				<p>收信人</p>
			</li>
			<li v-if="linktoggle" @click="onClick(2)" :data-clipboard-text="linkurl" class="link">
				<img src="@img/push-bg3.png">
				<p>复制链接</p>
			</li>
		</ul>
		<footer>
			<van-button type="default" size="large" @click="onClose">取消</van-button>
		</footer>

		<van-popup 
			v-model="pushpageToggle" 
			:overlay="false"
			closeable 
			close-icon-position="top-left" 
			position="right" 
			:style="{ height: '100%', width: '100%' }"
		>
			<push-page :idlist="idlist" :eventlist="eventlist" :fid="fid" :fidlist="fidlist" :storeType="true" @onCloseOne="closeHandle"></push-page>
		</van-popup>

		<van-popup 
			v-model="pushpageTwoToggle" 
			:overlay="false"
			closeable 
			close-icon-position="top-left" 
			position="right" 
			:style="{ height: '100%', width: '100%' }"
		>
			<push-page-two :idlist="idlist" :eventlist="eventlist" :fid="fid" :fidlist="fidlist" :storeType="true" @onCloseTwo="closeHandle"></push-page-two>
		</van-popup>

	</div>
</template>

<script>
import Clipboard from 'clipboard';
import { Toast } from 'vant';
import PushPage from '@c/common/PushPage';
import PushPageTwo from '@c/common/PushPageTwo';
export default {
	name: 'pushto',
	props: {
		linktoggle: {
			type: Boolean,
			default: true
		},
		linkurl: {
			type: String,
			default: ''
		},
		fidlist: {
			type: Array,
			default: ''
		},
		idlist: Array,
		eventlist: Array
	},
	components: {
		PushPage,
		PushPageTwo
	},
	data() {
		return {
			pushpageToggle: false,
			pushpageTwoToggle: false,
			pushpageType: '1',
			pushlist: [{
				id: 1,
				title: '鲨舆',
				url: require('@img/push-bg1.png'),
				toggle: true
			}, {
				id: 2,
				title: '收信人',
				url: require('@img/push-bg2.png'),
				toggle: true
			}, {
				id: 3,
				title: '复制链接',
				url: require('@img/push-bg3.png'),
				toggle: false
			}]
		}
	},
	methods: {
		closeHandle() {
			this.pushpageToggle = false
			this.pushpageTwoToggle = false
		},
		onClose() {
			this.$emit('closeThis', false)
		},
		onClick(index) {
			if(index === 0) {
				this.pushpageToggle = true
			}else if(index === 1) {
				this.pushpageTwoToggle = true
			}else {
				let clipboard = new Clipboard('.link')
				clipboard.on('success', e => {
					Toast.success('复制成功')
					clipboard.destory()
				})
				clipboard.on('error', e => {
					Toast.fail('该机型不支持复制')
					clipboard.destory()
				})
			}
		}
	}
}
</script>

<style lang="scss" scoped>
@import '@css/constants.scss';
.push-to {
	height: 100%;
	display: flex;
	flex-direction: column;
	justify-content: flex-end;
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