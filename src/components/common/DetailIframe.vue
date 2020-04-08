<template>
	<div class="iframe-wrapper">
		<h3>查看原文</h3>
		<iframe :src="texturl"></iframe>
	</div>
</template>

<script>
export default {
	name: 'detail-iframe',
	props: {
		texturl: {
			type: String,
			required: true
		}
	}
}
</script>

<style lang="scss" scoped>
@import '@css/constants.scss';
.iframe-wrapper {
	h3 {
		font-size: px2rem(16);
		text-align: center;
		line-height: px2rem(50);
	}
	iframe {
		width: 100%;
		height: 92%;
		position: absolute;
		left: 0;
		right: 0;
		top: px2rem(50);
		bottom: 0;
	}
}
</style>