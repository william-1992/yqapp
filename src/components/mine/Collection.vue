<template>
	<div class="collection">
		<van-nav-bar
			title="我的收藏"
			left-arrow
			@click-left="onClickLeft"
		></van-nav-bar>
	</div>
</template>

<script>
export default {
	name: 'collection',
	data() {
		return {

		}
	},
	methods: {
		onClickLeft() {
			this.$store.commit('handleMesType', '')
		}
	}
}
</script>

<style lang="scss" scoped>
@import '@css/constants.scss';
</style>