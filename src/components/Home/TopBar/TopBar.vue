<template>
	<div id="TopBar">
		<div class="titleBox">
			<span style="font-size: 1.2rem;text-indent:10px;">可米彩票</span>
			<el-button type="danger" plain size="mini" @click="Tuichu">退出用户</el-button>
		</div>
	</div>
</template>

<script>
	export default{
		name:'TopBar',
		methods:{
			Tuichu(){
				// this.$router.push({path:'/signIn'})
				this.$confirm('您是否退出当前用户？', '提示', {
	          	  confirmButtonText: '确定',
		          cancelButtonText: '取消',
		          type: 'warning'
		        }).then(() => {
		          this.$router.push('/signIn');
		          this.$message({
		            type: 'success',
		            message: '退出成功!'
		          });
			    }).catch(() => {
		          this.$message({
		            type: 'info',
            		message: '取消退出当前用户'
		          });          
		        });
			}
		}
	}
</script>

<style>
	#TopBar{
		width: 100%;
		height: 8%;
		background: #293543;
		border-bottom: 1px solid #000;
		box-sizing: border-box;
	}
	.titleBox{
		width: 100%;
		height: 100%;
		display: flex;
		justify-content: space-between;
		align-items: center;
		border-radius: 10px;
		background: linear-gradient(to right, red, blue);
		-webkit-background-clip: text;
		color: transparent;
		padding: 0 20px;
		box-sizing: border-box;
	}
</style>