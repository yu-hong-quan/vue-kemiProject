<template>
	<div id="Home">
		<top-bar></top-bar>
		<side-bar></side-bar>
		<router-view/>
	</div>
</template>

<script>
	import TopBar from '@/components/Home/TopBar/TopBar'
	import SideBar from '@/components/Home/SideBar/SideBar'
	export default{
		name:'Home',
		components:{TopBar,SideBar,System},
	}
</script>

<style scoped>
	#Home{
		width: 100%;
		height: 100%;
		background: #eee;
		moz-user-select: -moz-none; 
		-moz-user-select: none; 
		-o-user-select:none; 
		-khtml-user-select:none; 
		-webkit-user-select:none; 
		-ms-user-select:none; 
		user-select:none;
		flex-direction: row;
		display: flex;
		flex-wrap: wrap;
	}
</style>