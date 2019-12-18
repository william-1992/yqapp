<template>
	<div class="event-list">
		<van-steps direction="vertical" :active="active" active-color="#969799">
		  <van-step v-for="item in eventList" :key="item.docid">
		    <h3>{{ item.event_title | titleLength }}</h3>
		    <p>{{ item.timeStr }}</p>
		  </van-step>
		</van-steps>
	</div>
</template>

<script>
import { mapGetters } from 'vuex';
export default {
	name: 'event-list',
	props: {
		fid: {
			type: String,
			default: ''
		},
		eid: String,
		aid: [ String, Number ]
	},
	data() {
		return {
			active: 0,
			eventList: []
		}
	},
	filters: {
		titleLength(val) {
			return val.slice(0, 20) + '...'
		}
	},
	watch: {
		eid(val) {
			if(this.fid == '' || this.fid == '-1' || this.fid == '0') {
				this.getCity()
			}else {
				this.getCenter()
			}
		}
	},
	mounted() {
		if(this.fid == '' || this.fid == '-1' || this.fid == '0') {
			this.getCity()
		}else {
			this.getCenter()
		}
			
	},
	computed: {
		...mapGetters(['getUserid', 'getSubid'])
	},
	methods: {
		getCity() {
			this.$axios({
				method: 'post',
				url: '/index.php/City/context',
				data: {
					uid: this.getUserid,
					sub_uid: this.getSubid,
					event_id: this.eid,
					areaid: this.aid
				}
			}).then((res) => {
				if(res.data.status == '1') {
					this.eventList = res.data.data.list
				}else {
					Toast.fail(res.data.msg)
				}
			}).catch((res) => {
				Toast.fail(res.data.msg)
			})
		},
		getCenter() {
			this.$axios({
				method: 'post',
				url: '/index.php/Monitor/context',
				data: {
					uid: this.getUserid,
					sub_uid: this.getSubid,
					fid: this.fid,
					event_id: this.eid,
					areaid: this.aid
				}
			}).then((res) => {
				if(res.data.status == '1') {
					this.eventList = res.data.data.list
				}else {
					Toast.fail(res.data.msg)
				}
			}).catch((res) => {
				Toast.fail(res.data.msg)
			})
		}
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