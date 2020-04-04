<template>
	<div class="push-page">
		<van-tabs 
			v-model="activeName" 
			:line-width="16" 
			title-active-color="#323948" 
			title-inactive-color="#acb7cf" 
			:border="false"
			animated
		>
		  <van-tab title="待办事项" name="a">
			<keep-alive><todo-list v-if="this.pushType == 'a'"></todo-list></keep-alive>
		  </van-tab>
		  <van-tab title="我发起的" name="b">
			<keep-alive><push-list v-if="this.pushType == 'b'"></push-list></keep-alive>
		  </van-tab>
		  <van-tab title="我转发的" name="c">
			<keep-alive><forward-list v-if="this.pushType == 'c'"></forward-list></keep-alive>
		  </van-tab>
		  <van-tab title="我完成的" name="d">
			<keep-alive><finish-list v-if="this.pushType == 'd'"></finish-list></keep-alive>
		  </van-tab>
		</van-tabs>
	</div>
</template>

<script>
import TodoList from '@c/message/TodoList';
import PushList from '@c/message/PushList';
import ForwardList from '@c/message/ForwardList';
import FinishList from '@c/message/FinishList';
export default {
	name: 'push-page',
	components: {
		TodoList,
		PushList,
		ForwardList,
		FinishList
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