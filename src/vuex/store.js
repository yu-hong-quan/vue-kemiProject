import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const toTree = (item)=>{
	var obj = {};
	var length = item.length;
	for(let i=0; i<length;i++){
		//获取单个权限
		var permission = item[i];
		// 如果该权限的parentid为0，则表示该权限为顶层权限，它会有相应的子权限列表
		if(!permission.parentid){
			// 为该权限创建一个空的自权限列表
			permission.children = [];
			// 以该权限的id为属性名，该无权限作为值，存储到obj中
			// 为了自权限可以通过该属性名来找到父级权限
			obj[permission._id] = permission;
		}
	}
	for(let i=0;i<length;i++){
		var permission = item[i];
		for(var key in obj){
			if(permission.parentid == key){
				obj[key].children.push(permission);
			}
		}
	}
	var arr = [];
	for(let key in obj){
		arr.push(obj[key]);
	}
	return arr;
}

export default new Vuex.Store({
  state: {
  	accountPermission:[],
  	accountRoles:[]
  },
  getters:{
  	accountPermission(){
  		return toTree(JSON.parse(localStorage.getItem("accountInfo")).permissions);
  	},
  	accountRoles(){
  		return JSON.parse(localStorage.getItem("accountInfo")).roles;
  	}
  },
  mutations: {

  },
  actions: {

  }
})
