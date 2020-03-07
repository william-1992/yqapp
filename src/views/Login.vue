<template>
  <div class="login" :style="{ paddingTop: paddingTT + 'px' }">
    <div class="login-logo">
      <img :src="logoPic" />
    </div>
    <div class="login-form">
      <van-field v-model="username" clearable placeholder="请输入用户名" />
      <van-field
        v-if="passToggle"
        v-model="password"
        type="password"
        placeholder="请输入密码"
        border
      />
      <van-field v-else v-model="password" placeholder="请输入密码" />
      <img @click="onClickPass" class="eye" :src="eyesUrl" />
    </div>
    <p class="marning">{{ message }}</p>
    <van-button type="primary" size="large" color="#6f7ea0" @click="loginBefore">登录</van-button>
    <input class="hidden" ref="inputurl" :value="linkurl">
  </div>
</template>

<script>
import { mapState } from 'vuex';
import md5 from 'js-md5';
import { Toast, Dialog } from 'vant';
export default {
  name: "login",
  data() {
    return {
      downUrl: '',
      numbers: 0,
      loginToggle: false,
      linkurl: 'http://yq.wisedata.cc/index.php/Ps/downloadApp.html',
      message: "",
      passToggle: true,
      logoPic: require("@img/push-bg1.png"),
      username: "",
      password: "",
      eyesUrl: require("@img/eye02.png")
    };
  },
  computed: {
	...mapState(['nickname', 'company_name', 'userid', 'paddingTT'])
  },
  mounted() {
    this.$nextTick(() => {
      // 判断有无最新版本需要更新
      this.checkVersion()

      setTimeout(() => {
        // 判断是否自动登录
        // this.reloadLogin()
      }, 500)

    })
    if(window.plus){
    　this.plusReady();
    }else{
    　　document.addEventListener("plusready",this.plusReady,false);
    }
  },
  methods: {
    checkVersion() {
      this.$axios({
        method: 'post',
        url: '/index.php/Login/checkVersion',
        data: {
          version: '1.0.0'
        }
      }).then((res) => {
        if(res.data.status == '1') {
          if(res.data.data.forceStatus == '1') {
            this.loginToggle = true
            this.downUrl = res.data.data.downloadUrl
            this.linkurl = res.data.data.downloadUrl
            Dialog.confirm({
              message: '发现新版本',
              confirmButtonText: '更新'
            }).then(() => {
              if(window.plus) {
                this.handelDown()
              }else {
                document.addEventListener('plusready', this.handelDown, false )
              }
            })
          }else if(res.data.data.forceStatus == '2') {
            this.loginToggle = false
            Dialog.alert({
              message: '发现新版本',
              confirmButtonText: '更新',
              getContainer: 'body'
            }).then(() => {

              this.$refs.inputurl.select()
              document.execCommand("copy"); 
              Toast.success('复制成功，\n请前往浏览器下载此文件')

            })

          }else {
            this.loginToggle = true
            this.reloadLogin()
          }
        }
      }).catch(() => {
        this.numbers ++ 
        setTimeout(() => {
          if(this.numbers < 3) {
            this.checkVersion()
          }
        }, 500)
      })
    },
    reloadLogin() {
      let getToken = localStorage.getItem('token')
      if(getToken && this.loginToggle) {
        this.reload()
        this.$store.commit('handleHomeToggle', true)
        this.$router.push('/message')
        this.$store.commit('handleToolbar', true)


        this.$store.state.monitorQuery.uid = this.$store.getters.getUserid;
        this.$store.state.cityQuery.uid = this.$store.getters.getUserid;
        this.$store.state.collQuery.uid = this.$store.getters.getUserid;
        this.$store.state.warnQuery.uid = this.$store.getters.getUserid;

        this.$store.state.monitorQuery.sub_uid = this.$store.getters.getSubid;
        this.$store.state.cityQuery.sub_uid = this.$store.getters.getSubid;
        this.$store.state.collQuery.sub_uid = this.$store.getters.getSubid;
        this.$store.state.warnQuery.sub_uid = this.$store.getters.getSubid;

      }else {
        Toast.fail('更新后登录！')
        // this.$router.push('/')
      }
    },
    plusReady() {
      plus.navigator.setStatusBarBackground('#ffffff');
      plus.navigator.setStatusBarStyle('dark');
    },
    loginBefore() {
      if(this.loginToggle) {
        if(this.username == '' || this.password == '') {
          Toast.fail('账号密码不能为空！')
        }else {
          this.onLogin()
        }
      }else {
        Toast.fail('更新后登录！')
      }
      
    },
    onLogin() {
        this.$axios({
          method: "post",
          url: "/index.php/Login/doLogin",
          data: {
            username: this.username,
            password: md5(this.password)
          }
        }).then((res) => {
          if(res.data.status == '1') {

            this.$store.state.token = res.data.data.login.token;
            this.$store.state.userid = res.data.data.login.id;
            this.$store.state.monitorQuery.uid = res.data.data.login.id;
            this.$store.state.cityQuery.uid = res.data.data.login.id;
            this.$store.state.collQuery.uid = res.data.data.login.id;
            this.$store.state.warnQuery.uid = res.data.data.login.id;

            this.$store.state.monitorQuery.sub_uid = res.data.data.login.sub_id;
            this.$store.state.cityQuery.sub_uid = res.data.data.login.sub_id;
            this.$store.state.collQuery.sub_uid = res.data.data.login.sub_id;
            this.$store.state.warnQuery.sub_uid = res.data.data.login.sub_id;

            this.$store.state.nickname = res.data.data.login.nickname;
            this.$store.state.company_name = res.data.data.login.company_name;
            this.$store.state.company_short_name = res.data.data.login.company_short_name;
            // this.$store.commit("handleLogin", false)
            this.$store.commit('handleSubName', res.data.data.login.sub_username);
            this.$store.commit('handleSubid', res.data.data.login.sub_id);
            this.$store.commit('handleToken', res.data.data.login.token);
            this.$store.commit('handleCollList', [])

            localStorage.setItem("token", res.data.data.login.token);
            localStorage.setItem("userid", res.data.data.login.id);
            localStorage.setItem("subid", res.data.data.login.sub_id);
            localStorage.setItem("subname", res.data.data.login.sub_username);
            localStorage.setItem("nickname", res.data.data.login.nickname);
            localStorage.setItem("company_name", res.data.data.login.company_name);
            localStorage.setItem("company_short_name", res.data.data.login.company_short_name);

            Toast.success({
              message: res.data.msg,
              duration: 1200
            })
            setTimeout(() => {
              this.$store.commit('handleHomeToggle', true)
              this.$router.push('/message')
              this.$store.commit('handleToolbar', true)
            }, 1000)
          }else {
            this.message = res.data.msg
          }
        }).catch(() => {
          alert('登录失败，请检查网络是否连接')
        });
    },
    onClickPass() {
      this.passToggle = !this.passToggle;
      if (this.passToggle) {
        this.eyesUrl = require("@img/eye02.png");
      } else {
        this.eyesUrl = require("@img/eye01.png");
      }
    }
  }
};
</script>

<style lang="scss" scoped>
@import "@css/constants.scss";
.login {
  width: 100vw;
  height: 100vh;
  background-color: #fff;
  font-size: px2rem(18);
  .hidden {
    position: fixed;
    left: 0;
    bottom: 0;
    opacity: 0;
    height: 0;
    overflow: hidden;
    display: block;
    color: #fff;
    border: none;
    background: none;
  }
  p.marning {
    width: 80vw;
    margin: 0 auto;
    font-size: px2rem(12);
    color: red;
    text-align: left;
    line-height: px2rem(22);
    text-indent: px2rem(12);
  }
  .login-logo {
    padding: px2rem(80) 0;
    text-align: center;
    img {
      width: px2rem(56);
    }
  }
  .login-form {
    width: 80vw;
    margin: 0 auto;
    position: relative;
    text-align: center;
    .van-cell:last-child {
      padding-right: px2rem(25);
      &:after {
        content: " ";
        display: block;
        border-bottom: px2rem(1) solid #ebedf0;
        position: absolute;
        left: px2rem(16);
        right: 0;
        bottom: 0;
      }
    }
    .eye {
      width: px2rem(24);
      position: absolute;
      right: 0;
      bottom: px2rem(5);
      padding: px2rem(5);
    }
  }
  .van-button {
    width: 80vw;
    margin: px2rem(40) auto 0;
    display: block;
  }
}
</style>
