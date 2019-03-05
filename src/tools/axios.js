import Vue from 'vue'
import axios from 'axios'

// 配置基础路径
// 该路径会根据环境自动转换成开发环境的路径或者生产环境的路径
// 并且我以后发起请求就不再需要写基础路径，只需要将路径后半部分添加即可
// 例如http://localhost:3000/api/home  我们就不用写http://localhost:3000
// 发起请求的时候只需要axios.get('/api/home')
	axios.defaults.baseURL = process.env.VUE_APP_baseURL;

// 拦截器：对http请求和响应进行拦截

// 请求拦截器： 当程序向服务器发起http请求的时候，在请求开始到服务器端之间进行拦截，
// 				拦截可以给请求带上你希望带上的数据，
//				也可进行二次处理在上传
axios.interceptors.request.use(function(config){
	const token = localStorage.getItem('token');
	// 将token放到请求头内，在请求的时候一起带给后台程序
	config.headers.common['Authorizaition'] = 'Bearer '+token;
	return config;
},function(error){
	return Promise.reject(error);
});

// 响应拦截器： 在请求之后服务器返回数据，就是一个响应过程，响应拦截器就是拦截数据从后台返回前端的过程
// 				在响应拦截器里，我们可以优先对4xx,5xx开头的状体码进行处理
// 				可以进行弹框，也可以跳转到指定的页面
axios.interceptors.response.use(function(response){
	console.log(response);
	return response;
},function(error){
	return Promise.reject(error);
});

// 封装axios请求
const mtAxios = {
	get:(url,params)=>{
		return axios.get(url,{params});
	},
	post:(url,params)=>{
		return axios.post(url,params);
	}
}

// 注册实例方法，当我们创建一个vue实例的时候，可以在该实例组件内通过this.$http的方式访问axios
Vue.prototype.$http = mtAxios;
// 导出一个自定义的axios对象
export default mtAxios;