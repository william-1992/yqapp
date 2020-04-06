<template>
	<div class="city-index">
		<search :pageType="'city'"></search>
		<hottest hotType="citypage" @get-type="getType"></hottest>
		<keep-alive><text-list :cityhot="cityHotType"></text-list></keep-alive>
	</div>
</template>

<script>
import Search from '@c/common/Search';
import Hottest from '@c/common/Hottest';
import TextList from '@c/city/List';
export default {
	name: 'city-index',
	components: {
		Search,
		Hottest,
		TextList
	},
	data() {
		return {
			cityHotType: '1'
		}
	},
	methods: {
		getType(val) {
			this.cityHotType = val
		}
	}
}
</script>

<style lang="scss" scoped>
@import '~@css/constants.scss';
.city-index {
	/deep/.hot-test {
		padding-top: px2rem(10);
	}
}
</style>
