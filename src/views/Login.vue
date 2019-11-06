<template>
	<div class="login">
		<div class="login-logo">
			<img :src="logoPic">
		</div>
		<div class="login-form">
			  <van-field
			    v-model="username"
			    clearable
			    placeholder="请输入用户名"
			  />
			  <van-field
			  	v-if="passToggle"
			    v-model="password"
			    type="password"
			    placeholder="请输入密码"
			    border
			  />
			  <van-field v-else v-model="password" placeholder="请输入密码" />
			  <img @click="onClickPass" class="eye" :src="eyesUrl" >
		</div>
		<van-button type="primary" size="large" color="#6f7ea0" @click="onLogin">登录</van-button>
	</div>
</template>

<script>
export default {
	name: 'login',
	data() {
		return {
			passToggle: true,
			logoPic: require('@img/push-bg1.png'),
			username: '',
			password: '',
			eyesUrl: require('@img/eye02.png')
		}
	},
	methods: {
		onLogin() {
			this.$store.commit('handleLogin', false)
		},
		onClickPass() {
			this.passToggle = !this.passToggle
			if(this.passToggle) {
				this.eyesUrl = require('@img/eye02.png')
			}else {
				this.eyesUrl = require('@img/eye01.png')
			}
		}
	}
}
</script>

<style lang="scss" scoped>
@import '@css/constants.scss';
.login {
	width: 100vw;
	height: 100vh;
	background-color: #fff;
	font-size: px2rem(18);
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
				content: ' ';
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