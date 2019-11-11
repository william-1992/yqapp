const path = require('path');
const dataLogin = require('./data/doLogin.json');
const dataCity = require('./data/getESearch.json');
const dataCityContext = require('./data/context.json');
const dataGroup = require('./data/groupTree.json')

module.exports = {
  publicPath: './',
  lintOnSave: false,
  devServer: {
        // host: '192.168.2.182', // ip
        // port: 8088, // 设置端口号
        // https: false, // https:{type:Boolean}
        // open: false, //配置自动启动浏览器
        // proxy:null  //设置代理
		before(app) {
			app.get('/index.php/Login/doLogin', function(req, res) {
				res.json(dataLogin)
			});
			app.post('/index.php/City/getESearch', function(req, res) {
				res.json(dataCity)
			});
			app.post('/index.php/City/context', function(req, res) {
				res.json(dataCityContext)
			});
			app.post('/index.php/City/groupTree', function(req, res) {
				res.json(dataGroup)
			})
		}
    },
    configureWebpack: config => {
      if (process.env.NODE_ENV === 'production') {
        // 为生产环境修改配置...
      } else {
        // 为开发环境修改配置...

        // 只修改开发环境配置，打包会出现找不到定义的别名的错误
        // return {
        //     resolve: {
        //         alias: {
        //             '@c': path.resolve(__dirname, './src/components/'),
        //             '@css': path.resolve(__dirname, './src/assets/css'),
        //             '@img': path.resolve(__dirname, './src/assets/img'),
        //             '@js': path.resolve(__dirname, './src/assets/js'),
        //         }
        //     }
        // }
      }

      return {
          resolve: {
              alias: {
                  '@c': path.resolve(__dirname, './src/components/'),
                  '@css': path.resolve(__dirname, './src/assets/css'),
                  '@img': path.resolve(__dirname, './src/assets/images'),
                  '@js': path.resolve(__dirname, './src/assets/js'),
                  '@font': path.resolve(__dirname, './src/assets/font'),
              }
          }
      }
    }
  }