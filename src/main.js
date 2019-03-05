import Vue from 'vue'
import App from './App.vue'
import router from './router/router.js'
import store from '@/vuex/store'
import './tools/axios'
import './registerServiceWorker'
import '@/mixin/mixin'

import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import 'reset-css';
import '../node_modules/font-awesome/css/font-awesome.min.css'

Vue.use(ElementUI);
Vue.config.productionTip = false;

console.log(process.env)

// 配置全局路由守卫
router.beforeEach((to,from,next)=>{
	// 如果用户跳转的页面是登陆页面，则直接放行，
	//	并且表示用户选择退出当前账号
	//	且浏览器应该删除和该用户相关的信息
	if(to.path == '/signIn'){
		// 清理浏览器里当前用户存有的所有数据
		localStorage.removeItem("token");
		next();
	}else {
		const token = localStorage.getItem('token');
		// 如果token存在（登录了） 则直接放行
		if(token){
			next();
		}else {
			// 没有登录则必须跳转到登录页面
			// 并且要带上用户原来想要打开的页面的地址，方便用户在登录成功之后直接跳转到原来想到的页面
			next({path:'/signIn',query:{redirect:to.path}});
		}
	}
	
})

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
