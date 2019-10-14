<template>
	<div class="picker-wrapper" v-if="showPicker">
		<van-area :area-list="arealist" value="110101" @confirm="onConfirm" />
	<!-- <van-popup v-model="showPicker" position="bottom" :overlay="false">
	  <van-picker
	    show-toolbar
	    :columns="columns"
	    @cancel="close"
	    @confirm="onConfirm"
	  />
	</van-popup> -->
	</div>
</template>

<script>
import { mapState } from 'vuex';
export default {
	name: 'picker',
	data() {
		return {
			value: '',
			columns: ['杭州', '宁波', '温州', '嘉兴', '湖州']
		}
	},
	computed: {
		...mapState({
			showPicker: state => state.showPicker,
			pickerName: state => state.pickerName,
			arealist: state => state.area
		})
	},
	methods: {
		onConfirm(value) {
	      this.value = value;
	      this.$store.commit('handleAddressName', value[value.length-1].name)
	      this.$store.commit('handleAddress', false)
      	this.$store.commit('handleOverlay', false)

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