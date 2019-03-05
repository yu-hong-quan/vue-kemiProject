<template>
	<div id="SiderBar">
		<el-menu
	      default-active="1"
	      background-color="#545c64"
	      text-color="#fff"
	      active-text-color="#ffd04b">
	      <el-submenu v-for="(item,key) in accountPermission" :index="key+' '" :key="item._id">
                <template slot="title">
                    <i class="el-icon-location"></i>
                <span @click="$router.push({name:item.permissionDesc})">{{item.permissionDesc}}</span>
                </template>
                <el-menu-item :index="key+'-'+index" v-for="(child,index) in item.children" :key="child._id" @click="$router.push({name:child.permissionDesc})">{{child.permissionDesc}}</el-menu-item>
            </el-submenu>
	    </el-menu>
	</div>
</template>

<script>
	import {mapGetters} from 'vuex'
	export default{
		name:'SideBar',
		computed:{
			...mapGetters(['accountPermission'])
		}
	}

</script>

<style scoped>
	#SiderBar{
		width: 15%;
		height: 92%;
		background: #293543;
		overflow: hidden;
		border-right: 1px solid #ccc;
		box-sizing: border-box;
	}
	.el-menu{
		width: 100%;
		border: none;
	}
	.el-submenu{
		width: 100%;
		box-sizing: border-box;
	}

</style>