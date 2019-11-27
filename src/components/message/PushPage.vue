<template>
	<div class="push-page">
		<van-tabs 
			v-model="activeName" 
			:line-width="16" 
			title-active-color="#323948" 
			title-inactive-color="#acb7cf" 
			:border="false"
			:swipeable="true"
			animated
		>
		  <van-tab title="待办事项" name="a">
			<todo-list v-if="this.pushType == 'a'"></todo-list>
		  </van-tab>
		  <van-tab title="我发起的" name="b">
			<push-list v-if="this.pushType == 'b'"></push-list>
		  </van-tab>
		  <van-tab title="我转发的" name="c">
			<forward-list v-if="this.pushType == 'c'"></forward-list>
		  </van-tab>
		</van-tabs>
	</div>
</template>

<script>
import TodoList from '@c/message/TodoList';
import PushList from '@c/message/PushList';
import ForwardList from '@c/message/ForwardList';
export default {
	name: 'push-page',
	components: {
		TodoList,
		PushList,
		ForwardList
	},
	data() {
		return {
			activeName: 'a',
			pushType: 'a'
		}
	},
	watch: {
		activeName(val) {
			this.pushType = val
		}
	}
}
</script>

<style lang="scss" scoped>
@import '@css/constants.scss';
.push-page {
	font-size: 16px;
	.van-tabs {
		.van-tabs__line {
			bottom: px2rem(22)
		}
	}
}
</style>