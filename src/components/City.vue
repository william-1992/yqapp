<template>
	<div class="city">
		<city-index></city-index>
	</div>
</template>

<script>
import CityIndex from '@c/city/Index';
export default {
	name: 'city',
	data() {
		return {}
	},
	components: {
		CityIndex
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
