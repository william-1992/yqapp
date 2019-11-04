<template>
	<div class="center" :style="{ paddingTop: paddingTT + 'px' }">
		<center-index />
	</div>
</template>

<script>
import { mapState } from 'vuex';
import CenterIndex from '@c/center/Index';
export default {
	name: 'center',
	components: {
		CenterIndex
	},
	computed: {
		...mapState(['paddingTT'])
	},
	activated() {
		if(window.plus) {
			this.plusReady()
		}else {
			document.addEventListener('plusready', this.plusReady, false)
		}
	},
	methods: {
		plusReady() {
			plus.navigator.setStatusBarBackground('#ffffff');
			plus.navigator.setStatusBarStyle('dark');
		}
	}
}
</script>

<style lang="scss" scoped>
@import '@css/constants.scss';
.center {
}
</style>