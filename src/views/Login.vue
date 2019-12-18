<template>
  <div class="login">
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
  </div>
</template>

<script>
import { mapState } from 'vuex';
import md5 from 'js-md5';
import { Toast } from 'vant';
export default {
  name: "login",
  data() {
    return {
      message: "",
      passToggle: true,
      logoPic: require("@img/push-bg1.png"),
      username: "",
      password: "",
      eyesUrl: require("@img/eye02.png")
    };
  },
  computed: {
	...mapState(['nickname', 'company_name', 'userid'])
  },
  mounted() {
    if(window.plus){
    　this.plusReady();
    }else{
    　　document.addEventListener("plusready",this.plusReady,false);
    }
  },
  methods: {
    plusReady() {
      plus.navigator.setStatusBarBackground('#ffffff');
      plus.navigator.setStatusBarStyle('dark');
    },
    loginBefore() {
      if(this.username == '' || this.password == '') {
        Toast.fail('账号密码不能为空！')
      }else {
        this.onLogin()
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
          this.$store.commit('handleSubid', res.data.data.login.sub_id);
          this.$store.commit('handleToken', res.data.data.login.token);

          localStorage.setItem("token", res.data.data.login.token);
          localStorage.setItem("userid", res.data.data.login.id);
          localStorage.setItem("subid", res.data.data.login.sub_id);
          localStorage.setItem("nickname", res.data.data.login.nickname);
          localStorage.setItem("company_name", res.data.data.login.company_name);
          localStorage.setItem("company_short_name", res.data.data.login.company_short_name);

          Toast.success({
            message: res.data.msg,
            duration: 1200
          })
          setTimeout(() => {
            // this.$router.push('/home')
            this.$router.push('/message')
            this.$store.commit('handleToolbar', true)
          }, 1000)
        }else {
          this.message = res.data.msg
        }

      }).catch((res) => {
        this.message = res.data.msg
        // Toast.fail(res.data.msg)
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
