<template>
	<div class="event-list">
		<van-steps direction="vertical" :active="active" active-color="#969799">
		  <van-step>
		    <h3>【城市】物流状态1</h3>
		    <p>2016-07-12 12:40</p>
		  </van-step>
		  <van-step>
		    <h3>【城市】物流状态2</h3>
		    <p>2016-07-11 10:00</p>
		  </van-step>
		  <van-step>
		    <h3>快件已发货</h3>
		    <p>2016-07-10 09:30</p>
		  </van-step>
		  <van-step>
		    <h3>【城市】物流状态1</h3>
		    <p>2016-07-12 12:40</p>
		  </van-step>
		  <van-step>
		    <h3>【城市】物流状态2</h3>
		    <p>2016-07-11 10:00</p>
		  </van-step>
		  <van-step>
		    <h3>快件已发货</h3>
		    <p>2016-07-10 09:30</p>
		  </van-step>
		  <van-step>
		    <h3>【城市】物流状态1</h3>
		    <p>2016-07-12 12:40</p>
		  </van-step>
		  <van-step>
		    <h3>【城市】物流状态2</h3>
		    <p>2016-07-11 10:00</p>
		  </van-step>
		  <van-step>
		    <h3>快件已发货</h3>
		    <p>2016-07-10 09:30</p>
		  </van-step>
		  <van-step>
		    <h3>【城市】物流状态1</h3>
		    <p>2016-07-12 12:40</p>
		  </van-step>
		  <van-step>
		    <h3>【城市】物流状态2</h3>
		    <p>2016-07-11 10:00</p>
		  </van-step>
		  <van-step>
		    <h3>快件已发货</h3>
		    <p>2016-07-10 09:30</p>
		  </van-step>
		  <van-step>
		    <h3>【城市】物流状态1</h3>
		    <p>2016-07-12 12:40</p>
		  </van-step>
		  <van-step>
		    <h3>【城市】物流状态2</h3>
		    <p>2016-07-11 10:00</p>
		  </van-step>
		  <van-step>
		    <h3>快件已发货</h3>
		    <p>2016-07-10 09:30</p>
		  </van-step>
		  <van-step>
		    <h3>【城市】物流状态1</h3>
		    <p>2016-07-12 12:40</p>
		  </van-step>
		  <van-step>
		    <h3>【城市】物流状态2</h3>
		    <p>2016-07-11 10:00</p>
		  </van-step>
		  <van-step>
		    <h3>快件已发货</h3>
		    <p>2016-07-10 09:30</p>
		  </van-step>
		</van-steps>
	</div>
</template>

<script>
export default {
	name: 'event-list',
	data() {
		return {
			active: 0
		}
	},
	mounted() {
	}
}
</script>

<style lang="scss" scoped>
@import '@css/constants.scss';
.event-list {
	margin: px2rem(35) 0 0 px2rem(8);
	height: 93%;
	overflow: auto;
}
</style>