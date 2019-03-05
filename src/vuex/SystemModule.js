import axios from '@/tools/axios'
import apis from '@/apis'
/**
 * 
 * @param {*} commit 用于提交commit的对象
 * @param {*} mutationName  触发的mutation的函数
 * @param {*} payload 包含了 pageSize:单页数据长度,pageNo:页码, api:请求的链接  
 * 
 */
const loadData = (commit,mutationName,payload)=>{
    console.log(axios);
    axios.get(payload.api,{pageSize:payload.pageSize,pageNo:payload.pageNo}).then((resp)=>{
        commit(mutationName,resp.data)
    })
}
const state = {
    allUsers: [],
    allRoles: []
}
const getters = {
    allUsers(state){
        return state.allUsers;
    },
    allRoles(state){
        return state.allRoles;
    }
}
const mutations = {
    LOADALLACOUNT(state,payload){
        state.allUsers = payload.allUsers;
    },
    LOADALLROLES(state,payload){
        state.allRoles = payload.allRoles;
    }
}
const actions = {
    loadAllAccount({commit},payload){
        axios.get(apis.findAllUsers).then((resp)=>{
            console.log(resp);
            commit('LOADALLACOUNT',resp.data)
        })
    },
    loadAllRoles({commit},payload){
        // console.log("加载所有的角色");
       loadData(commit,'LOADALLROLES',payload)
    }
}
export default {
    state,
    getters,
    mutations,
    actions
}