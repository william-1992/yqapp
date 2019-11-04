<template>
	<div class="mine-wrap">
		<!-- <report v-if="mesType == 'A'"></report> -->
		<!-- <collection v-else-if="mesType == 'B'"></collection> -->
		<mine-index></mine-index>
	</div>
</template>

<script>
import { mapState } from 'vuex';
import MineIndex from '@c/mine/Index';
import Report from '@c/mine/Report';
import Collection from '@c/mine/Collection';
export default {
	name: 'mine',
	components: {
		MineIndex,
		Report,
		Collection
	},
	data() {
		return {
		}
	},
	computed: {
		...mapState(['mesType'])
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
			plus.navigator.setStatusBarBackground('#8091bb');
			plus.navigator.setStatusBarStyle('light');
		}
	}
}
</script>

<style lang="scss" scoped>
@import '@css/constants.scss';
.mine-wrap {
	background-color: #fff;
	position: absolute;
	left: 0;
	right: 0;
	height: 100%;
}
</style>