<template>
  <div id="app">
    <router-view v-if="reload" />
  </div>
</template>

<script>
export default {
	data() {
		return {
			isReload: true,
			arrtry: [1,2,3,4,5,4,3,2,1,12,23,56,32],
			arrend: []
		}
	},
	provide() {
		return {
			reload: this.reload
		}
	},
	mounted() {
		this.arrend = this.unique(this.arrtry)
	},
	methods: {
		unique(arr) {
			let result = []
			for(let i=0; i<arr.length; i++) {
				if(result.indexOf(arr[i]) == -1) {
					result.push(arr[i])
				}
			}
			return result
		},
		reload() {
			this.isReload = false
			this.$nextTick(function() {
				this.isReload = true
			})
		}
	}
}
</script>
