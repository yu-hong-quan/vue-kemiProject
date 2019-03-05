<template>
	<div id="sigin">
		<div class="coverLayer">
			<div class="signPanel">
				<div class="signTitle">
					<span>可米彩票</span>
				</div>
				<!-- 
					:model  验证对象		:rules	配置的验证规则对象	prop:   验证规则数组名	ref:
				 -->
				<el-form class="signInput" :model="userInfo" :rules="rules" ref="userInfo">
					<el-form-item prop="accountName">
						<el-input v-model="userInfo.accountName" placeholder="用户名"></el-input>
					</el-form-item>
					<el-form-item prop="password">
						<el-input v-model="userInfo.password" placeholder="密码" type="password"></el-input>
					</el-form-item>
					<el-form-item style="margin:30px 0px;">
						<el-switch
						  v-model="signSwitch"
						  active-color="#409EFF"
						  inactive-color="#ccc"
						  active-text="记住密码?">
						</el-switch>
					</el-form-item>
					<el-form-item class="signSuccessBox">
						 <el-button type="success" @click="signIn">登录</el-button>
					</el-form-item>
				</el-form>
			</div>
		</div>
	</div> 
</template>

<script>
	export default{
		name:'Signin',
		data(){
			return {
				userInfo:{
					accountName:'zmt',
					password:'12345'
				},
				signSwitch:true,
				// 使用elementUI form表单  
				rules:{
					// 条件规则
					accountName:[
						{required:true,message:'*请输入用户名~',trigger:'blur'}
					],
					// 条件规则
					password:[
						{required:true,min:5,message:'*请输入密码哦~',trigger:'blur'}
					]
				}
			}
		},
		methods:{
			signIn(){
				// 便于在点击登录的时候对所有的输入框进行查看是否已经全部验证通过
				this.$refs['userInfo'].validate((valid)=>{
					if(valid){
						// 发送请求
						this.$http.post('/signin',this.userInfo)
						.then((resp)=>{
							// 获取服务器端返回饿数据，如果返回的success为true，则表示登录成功后台验证通过
							if(resp.data.success){
								// 由于在main入口中配置了全局路由守卫，该守卫对所有的路由跳转进行拦截
								// 如果发现用户没有登录则跳转到登录页面，
								// 反之则将登录信息token存入到localStorage中避免路由查询不到，localStorage里的token值而导致有跳转回登录页面
								localStorage.setItem("token",resp.data.token);

								// 是否记住用户的选择存到本地，等下次用户打开登录页面的时候，默认会选择做上一次的选择
								localStorage.setItem("isRemember",this.signSwitch)
								// 将当前账号的信息存储到本地
								localStorage.setItem("accountInfo",JSON.stringify(resp.data.response))

								// 如果原本想要打开页面不是登录页面，因此在登录成功之后，应该跳转回与拿来想要打开的页面
								if(this.$route.query.redirect){
									// 跳转到想要打开的页面
									this.$router.push(this.$route.query.redirect);
								}else{
									// 如果没有想要打开的页面，则直接跳转到home页面
									this.$router.push({path:'/home'});
								}
							}
						})
					}else{
						return false;
					}
				})
			}
		},
		created(){
			this.signSwitch = localStorage.getItem("isRemember")==='true'?true:false

			// 监听浏览器关闭动作，当用户关闭标签或者浏览器的时候，
			// 如果signSwitch为true，则将数据保存到localStorage
			// 否则，页面关闭，清空localStorage数据清空
			window.onbeforeunload=function(e){
				if(!this.signSwitch){
					localStorage.removeItem("token");
				}
			}
		}
	}
</script>

<style lang="scss" scoped>
	#sigin{
		width:100%;
		height:100%;
		background:url(../../assets/bg.jpg);
		background-repeat:no-repeat;
		background-size:100%;
		moz-user-select: -moz-none; 
		-moz-user-select: none; 
		-o-user-select:none; 
		-khtml-user-select:none; 
		-webkit-user-select:none; 
		-ms-user-select:none; 
		user-select:none;
	}
	.coverLayer{
		width:100%;
		height:100%;
		background:rgba(0,0,0,0.5);
		.signPanel{
			width:25%;
			height:100%;
			background:rgba(0,0,0,0.7);
			float:right;
			.signTitle{
				width:100%;
				height:40%;
				font-size:3rem;
				background: linear-gradient(to right, red, blue);
				-webkit-background-clip: text;
        		color: transparent;
				display: flex;
				justify-content:center;
				align-items:center;
				font-family:'楷体';
			}
			.signInput{
				width:100%;
				height:auto;
				display:flex;
				flex-direction:column;
				align-items:center;
				div{
					width:80%;
					margin-top:10px;
					margin-bottom:5px;
					text-align:center;
					button{
						width:100%;
					}
				}
				.signSuccessBox{
					width:65%;
				}
				.el-input{
					/deep/ input{
						background:none;
						border:none;
						border-bottom:1px solid;
						border-radius:0px;
					}
				}
				/deep/ .el-form-item__error{
					left:100px;
				}
			}
		}
	}
</style>
