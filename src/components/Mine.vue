<template>
	<div class="mine-wrap">
		<report v-if="mesType == 'A'"></report>
		<collection v-else-if="mesType == 'B'"></collection>
		<mine-index v-else></mine-index>
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
	}
}
</script>

<style lang="scss" scoped>
@import '@css/constants.scss';

</style>