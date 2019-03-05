import systemApi from './systemApi'
import Vue from 'vue'
var apis = {
	...systemApi
}
Vue.prototype.$apis = apis;
export default apis;