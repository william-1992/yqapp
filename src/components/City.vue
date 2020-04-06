<template>
	<div class="city" :style="{ paddingTop: paddingTT + 'px' }" v-if="homeToggle">
		<city-index></city-index>
	</div>
</template>

<script>
import { mapState } from 'vuex';
import CityIndex from '@c/city/Index';
export default {
	name: 'city',
	data() {
		return {}
	},
	components: {
		CityIndex
	},
	computed: {
		...mapState(['paddingTT', 'homeToggle'])
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

<style lang="scss" scoped></style>
