<template>
	<div class="city-index">
		<search></search>
		<hottest hotType="citypage"></hottest>
		<text-list></text-list>
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
