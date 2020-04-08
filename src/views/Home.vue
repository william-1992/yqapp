<template>
  <div class="home">

    <div>
    	<!-- <keep-alive>
    		<component :is="isComponent"></component>
    	</keep-alive> -->

      <van-overlay :show="overlayToggle" @click="closeOverlay"></van-overlay>
      <picker></picker>

      <div>1</div>

    </div>
  </div>
</template>

<script>
import { mapState, mapGetters } from 'vuex';
import Login from './Login';
import Center from '@c/Center';
import City from '@c/City';
import Message from '@c/Message';
import Mine from '@c/Mine';
import Popup from '@c/common/Popup';
import Picker from '@c/common/Picker';
export default { 
  name: "home",
  components: {
    Login,
    Popup,
    Picker,
  	'center': Center,
  	'city': City,
  	'message' :Message,
  	'mine': Mine
  },
  data() {
    return {
      paddingTo: 0
    }
  },
  computed: {
    ...mapState(['isComponent', 'toolbarToggle', 'overlayToggle', 'loginToggle', 'token']),
    ...mapGetters(['getUserid', 'getSubid'])
  },
  mounted() {

    if(window.plus){
    　this.plusReady();
    }else{
    　　document.addEventListener("plusready",this.plusReady,false);
    }

  },
  methods: {
    // app设备绑定
    plusReady() {
      // 设置系统状态栏背景为红色/文字为黑色
    　plus.navigator.setStatusBarBackground( "#ffffff" );
      plus.navigator.setStatusBarStyle('dark');
      let navH = plus.navigator.getStatusbarHeight();

      // 获取 APP 终端标识
      let pinf = plus.push.getClientInfo();  
      let cid = pinf.clientid;//客户端标识 
      alert('cid' +":"+ cid)
      
      if(window.webkit) {
        this.platform = '2'
      }else {
        this.platform = '1'
      }
      this.$axios({
        method: 'post',
        url: '/index.php/Apppush/register',
        data: {
          uid: this.getUserid,
          sub_uid: this.getSubid,
          partform: 'getui',
          platform: this.platform,
          device_id: cid
        }
      }).then((res) => {
        alert(res.data.msg)
      }).catch((res) => {
        alert(res.data.msg)
      })

    },
    closeOverlay() {
      this.$store.commit('handleOverlay', false)
      this.$store.commit('handleAddress', false)

    }
  }
};
</script>

<style lang="scss">
@import '@css/constants.scss';
@media only screen and (device-width: 375px) and (device-height: 812px) and (-webkit-device-pixel-ratio: 3) {
  .home {
    /deep/.van-popup {
      .van-popup__close-icon--top-left {
        font-size: px2rem(28);
      }
    }
    .center {
      padding-top: $paddingT;
      .pop-wrap {
        padding-top: $paddingT;
      }
      .detail {
        padding-top: $paddingT;
        .wrapper {
          top: px2rem(74);
        }
      }
      .list {
        .van-popup {
          .van-popup__close-icon {
            top: px2rem(36);
          }
        }
      }
      .push-page {
        padding-top: $paddingT;
      }
      .hot-test {
        .filter {
          padding-top: $paddingT;
        }
        .van-popup {
          .van-popup__close-icon {
            top: px2rem(36);
          }
        }
      }
    }
    .message-wrap {
      padding-top: $paddingT;
      .pop-wrap {
        padding-top: $paddingT;
      }
      .detail {
        padding-top: $paddingT;
        .wrapper {
          top: px2rem(74);
        }
      }
      .list {
        .van-popup {
          .van-popup__close-icon {
            top: px2rem(36);
          }
        }
      }
      .push-page {
        padding-top: $paddingT;
      }
      .hot-test {
        .filter {
          padding-top: $paddingT;
        }
        .van-popup {
          .van-popup__close-icon {
            top: px2rem(36);
          }
        }
      }
    }
    .city-index {
      padding-top: $paddingT;
      .pop-wrap {
        padding-top: $paddingT;
      }
      .detail {
        padding-top: $paddingT;
        .wrapper {
          top: px2rem(74);
        }
      }
      .list {
        .van-popup {
          .van-popup__close-icon {
            top: px2rem(36);
          }
        }
      }
      .push-page {
        padding-top: $paddingT;
      }
      .hot-test {
        .filter {
          padding-top: $paddingT;
        }
        .van-popup {
          .van-popup__close-icon {
            top: px2rem(36);
          }
        }
      }
    }
    .mine-wrap {
      .report {
        padding-top: $paddingT;
      }
      .collection {
        padding-top: $paddingT;
      }
    }
  }
}
</style>
