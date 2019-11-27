<template>
	<div class="picker-wrapper" v-if="showPicker">
		<van-area :area-list="arealist" value="110101" @confirm="onConfirm" columns-num="4" />
	</div>
</template>

<script>
import { mapState } from 'vuex';
export default {
	name: 'picker',
	data() {
		return {
			show: true,
			value: ''
		}
	},
	computed: {
		...mapState({
			showPicker: state => state.showPicker,
			pickerName: state => state.pickerName,
			arealist: state => state.arealist
		})
	},
	methods: {
		onConfirm(value) {
	      this.value = value;
	      this.$store.commit('handleAddressName', value[value.length-1].name)
	      this.$store.commit('handleAddress', false)
      	this.$store.commit('handleOverlay', false)
      	for(let key in this.arealist.county_list) {
      		if(this.arealist.county_list[key] == value[value.length-1].name) {
      			this.$store.state.monitorQuery.areaid = key
      		}
      	}
      	this.$axios({
					method: 'post',
					url: '/index.php/Monitor/getESearch',
					data: this.monitorQuery
				}).then((res) => {
					let list = res.data.data.eventList
					list.forEach((item, index) => {
						item.wordStr = item.wordStr.split('+')
					})
					this.$store.commit('handleMonitorList', list)
				}).catch((res) => {
					Toast.fail(res.data.msg)
				})
	  },
	  close() {
	      this.$store.commit('handleAddress', false)
      	this.$store.commit('handleOverlay', false)

	  }
	}
}
</script>

<style lang="scss" scoped>
.picker-wrapper {
	position: fixed;
	bottom: 0;
	left: 0;
	right: 0;
	z-index: 10;
}
</style>