import Vue from 'vue'
import Router from 'vue-router'
// 导入登录组件
import SignIn from '@/components/Signin/Signin.vue'
import System from '@/components/System/System'

// 路由懒加载：路由被访问的时候才加载对应组件
const Home = () => import(/*webpackChunkName: "Home" */ '@/components/Home/Home');

Vue.use(Router);

export default new Router({
  // 配置路由跳转
  routes: [
  {
  	path:'/',
  	redirect:'home'
  },
   	{
   		path:'/signIn',
   		component:SignIn,
   		name:'signIn'
   	},
   	{
   		path:'/home',
   		component:Home,
   		name:'home',
      children:[
        {
          path:'System',
          component:()=>import(/*webpackChunkName: 'System' */ '@/components/System/System'),
          name:'系统管理',
          children:[
            {
              path:'AccountManage',
              component:()=>import(/*webpackChunkName: 'AccountManage' */ '@/components/System/AccountManage/AccountManage'),
              name:'用户管理',
              children:[
                {
                  path:'AddNewUser',
                  component:()=>import(/*webpackChunkName: 'AddNewUser'*/ '@/components/System/AccountManage/AddNewUser'),
                  name:'新增用户'
                }
              ]
            },
            {
              path:'PermissionManage',
              component:()=>import(/*webpackChunkName: 'PermissionManage' */ '@/components/System/PermissionManage/PermissionManage'),
              name:'权限管理'
            },
            {
              path:'RoleManage',
              component:()=>import(/*webpackChunkName: 'RoleManage' */ '@/components/System/RoleManage/RoleManage'),
              name:'角色管理',
            },
          ]
        },
        {
          path:'Lottery',
          component:()=>import(/*webpackChunkName: 'Lottery' */ '@/components/Lottery/Lottery'),
          name:'彩票管理'
        },
        {
          path:'Advertising',
          component:()=>import(/*webpackChunkName: 'Advertising' */ '@/components/Advertising/Advertising'),
          name:'广告管理'
        }
      ]
   	}
  ]
})
