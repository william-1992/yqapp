const path = require('path');
const dataLogin = require('./data/doLogin.json');                 // 登录校验
const dataCity = require('./data/getESearch.json');               // 城市新闻列表
const dataCityContext = require('./data/citycontext.json'); 	    // 城市相似事件
const dataGroup = require('./data/groupTree.json');			          // 收信人人员名单
const dataSource = require('./data/showSourceList.json');	        // 城市筛选来源
const cityDetail = require('./data/citywebcache.json');           // 城市详情
const dataPlan = require('./data/getPlanList.json');              // 监测中心方案
const dataMonitor = require('./data/mgetESearch.json');           // 监测中心新闻列表
const dataMonitorContext = require('./data/monitorcontext.json');          // 监测相似事件
const datamonitorsource = require('./data/monitorshowSourceList.json');    // 监测筛选来源
const monitorDetall = require('./data/monitorwebcache.json');      // 监测中心详情
const dataTodoList = require('./data/getTodoList.json');           // 待办事项
const dataPushList = require('./data/getMyPushList.json');         // 我发起的
const dataForwardList = require('./data/getMyForwardList.json');   // 我转发的
const dataUser = require('./data/getSubUserTree.json');            // 鲨舆子账户
const dataArea = require('./data/getAreaChild.json');              // 地域选择
const dataNotice = require('./data/ngetList.json');                // 公告页
const dataNoticeDetail = require('./data/ngetDetail.json');        // 公告页详情
const docList = require('./data/getDocList.json');                 // 报告fid返回列表
const docDetail = require('./data/getDocDetail.json');             // 报告详情页
const dataFavo = require('./data/Favo_getList.json');              // 收藏列表
const dataFavoContext = require('./data/Favo_context.json');       // 收藏相似事件
const dataWarn = require('./data/getDataList.json');               // 预警列表

var DEV_HOST = JSON.stringify('http://192.168.32.12：8080');
var PUB_HOST = JSON.stringify('http://yqapp.wisedata.cc');

module.exports = {
  publicPath: './',
  lintOnSave: false,
  devServer: {
        // host: '192.168.2.182', // ip
        // port: 8088, // 设置端口号
        // https: false, // https:{type:Boolean}
        // open: false, //配置自动启动浏览器
        // proxy: {
        //   '/': {
        //     target: 'http://syapp.wisedata.cc',
        //     changeOrign: true
        //   }
        // },
		before(app) {
			app.post('/index.php/Login/doLogin', function(req, res) {
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
			});
			app.post('/index.php/City/showSourceList', function(req, res) {
				res.json(dataSource)
			});
      app.post('/index.php/City/webcache', function(req, res) {
        res.json(cityDetail)
      });
      app.post('/index.php/Monitor/getPlanList', function(req, res) {
        res.json(dataPlan)
      });
      app.post('/index.php/Monitor/getESearch', function(req, res) {
        res.json(dataMonitor)
      });
      app.post('/index.php/Monitor/context', function(req, res) {
        res.json(dataMonitorContext)
      });
      app.post('/index.php/Monitor/showSourceList', function(req, res) {
        res.json(datamonitorsource)
      });
      app.post('/index.php/Monitor/webcache', function(req, res) {
        res.json(monitorDetall)
      });
      app.post('/index.php/Push/getTodoList', function(req, res) {
        res.json(dataTodoList)
      });
      app.post('/index.php/Push/getMyPushList', function(req, res) {
        res.json(dataPushList)
      });
      app.post('/index.php/Push/getMyForwardList', function(req, res) {
        res.json(dataForwardList)
      });
      app.post('/index.php/User/getSubUserTree', function(req, res) {
        res.json(dataUser)
      });
      app.post('/index.php/Monitor/getAreaChild', function(req, res) {
        res.json(dataArea)
      });
      app.post('/index.php/Notice/getList', function(req, res) {
        res.json(dataNotice)
      });
      app.post('/index.php/Notice/getDetail', function(req, res) {
        res.json(dataNoticeDetail)
      });
      app.post('/index.php/Report/getDocList', function(req, res) {
        res.json(docList)
      });
      app.post('/index.php/Report/getDocDetail', function(req, res) {
        res.json(docDetail)
      });
      app.post('/index.php/Favo/getList', function(req, res) {
        res.json(dataFavo)
      });
      app.post('/index.php/Favo/context', function(req, res) {
        res.json(dataFavoContext)
      });
      app.post('/index.php/Warning/getDataList', function(req, res) {
        res.json(dataWarn)
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