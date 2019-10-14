<template>
  <div class="home">
  	<keep-alive>
  		<component :is="isComponent"></component>
  	</keep-alive>
    <tool-bar v-show="toolbarToggle"></tool-bar>
    <!-- <popup></popup> -->
    <van-overlay :show="overlayToggle" @click="closeOverlay"></van-overlay>
    <picker></picker>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import ToolBar from '@c/common/ToolBar';
import Center from '@c/Center';
import City from '@c/City';
import Message from '@c/Message';
import Mine from '@c/Mine';
import Popup from '@c/common/Popup';
import Picker from '@c/common/Picker';
export default {
  name: "home",
  components: {
    ToolBar,
    Popup,
    Picker,
  	'center': Center,
  	'city': City,
  	'message' :Message,
  	'mine': Mine
  },
  computed: {
    ...mapState(['isComponent', 'toolbarToggle', 'overlayToggle'])
  },
  methods: {
    closeOverlay() {
      this.$store.commit('handleOverlay', false)
      this.$store.commit('handleAddress', false)

    }
  }
};
</script>
