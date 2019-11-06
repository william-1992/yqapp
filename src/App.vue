<template>
  <div id="app">
    <router-view v-if="reload" />
  </div>
</template>

<script>
export default {
	data() {
		return {
			isReload: true
		}
	},
	provide() {
		return {
			reload: this.reload
		}
	},
	methods: {
		reload() {
			this.isReload = false
			this.$nextTick(function() {
				this.isReload = true
			})
		}
	}
}
</script>
