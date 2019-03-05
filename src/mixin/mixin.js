import Vue from 'vue'
Vue.mixin({
	methods:{
		// 所有的操作，如果希望用户二次确认，可以调用该方法
		operatorConfirm(message,action){
			this.$confirm(`您确定要${message}吗?`,'提示',{
				confirmButtonText:'确定',
				cancelButtonText:'取消',
				type:'warning'
			}).then(() => {
				action();
			}).catch((error) => {
				console.log(error);
			});
		},
		post(api,params){
			return this.$http.post(api,params).then((resp)=>{
				this.$message({
					message:resp.data.message,
					type:resp.data.success?'success':'danger'
				})
			})
		}
	}
})