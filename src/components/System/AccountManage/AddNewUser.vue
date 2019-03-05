<template>
	<el-dialog 
		title="新增用户"
		:visible.sync="dialogVisible"
		width="40%"
		:before-close="handleClose">
		<el-form :model="userInfo" :rules="rules" ref="userInfo">
			<div class="uploadInput">
				<div>
					<span>用户名：</span>
					<el-form-item prop="username">
						<el-input v-model="userInfo.username"></el-input>
					</el-form-item>
				</div>
				<div>
					<span>密码：</span>
						<el-form-item prop="password">
							<el-input v-model="userInfo.password">
								
							</el-input>
						</el-form-item>
				</div>
			</div>
		</el-form>
		<span slot="footer" class="dialog-footer">
			<el-button @click="handleClose()">取消</el-button>
			<el-button type="primary" @click="uploadData">确定</el-button>
		</span>
	</el-dialog>
</template>

<script>
	export default{
		data(){
			// 自定义校验函数
			const checkUsername = (rule,value,callback)=>{
				var re = /^[a-zA-z]\w{2,19}$/;
				var rs = re.test(value);
				if(!rs){
					return callback(new Error("用户名不能存在特殊字符"))
				}
				return callback();
			}
			return {
				dialogVisible:true,
				userInfo:{},
				rules:{
					username:[
						{required:true,message:'请填写用户名',trigger:'change'},
						{min:3,max:20,message:'用户名长度不能大于20且不小于3位',trigger:'change'},
						{validator:checkUsername,trigger:'change'}
					],
					password:[
						{required:true,message:'请填写密码',trigger:'blur'},
						{min:6,max:20,message:'密码长度不大于20且不小于6'}
					]
				}
			}
		},
		methods:{
			handleClose(){
				this.dialogVisible = false;
				this.$router.go(-1);
			},
			uploadData(){
				this.$refs['userInfo'].validate((valide)=>{
					if(valide){
						this.$http.post(this.$apis.addNewUser,this.userInfo).then((resp)=>{
							this.$message({
								message:resp.data.message,
								type:resp.data.success?'success':'danger'
							});
							this.handleClose();
							this.$store.dispatch('loadAllAccount')
						})
					}else{
						return false;
					}
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
    .uploadInput{
        width:100%;
        display: flex;
        flex-direction: row;
        div {
            width: 50%;
            height:44px;
            display: flex;
            flex-direction: row;
            span {
                width: 70px;
                margin-right: 20px;
                line-height: 44px;
            }
            
            .el-input {
                width: 150px;
            }

        }
            
    }
</style>
