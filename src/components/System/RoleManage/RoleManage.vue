<template>
	<div id="RoleManage">
		<div class="roleContainer">
			<div class="RoleManageTop">
				<span>角色列表</span>
				<el-button type="primary" size="mini">新增</el-button>
			</div>
			<table>
				<tr>
					<th>角色名</th>
					<th>角色描述</th>
					<th>操作</th>
				</tr>
				<tr v-for="item in allRoles" :key="item._id">
					<td>{{item.roleName}}</td>
					<td>{{item.roleDesc}}</td>
					<td>
						<template v-if="item.roleName!='admin'">
							<span style="color:red" @click="deleteRole(item)">删除</span>
							|
							<span style="color:blue">编辑</span>
						</template>
					</td>
				</tr>
			</table>
		</div>
		<div class="roleRight">
            <transition name="slideDown">
                <div class="addNewRole" v-show="showAddNew">
                    <div class="addNewRoleTop">
                        <span>新增角色</span>
                        <i class="fa fa-times" @click="handleClose"></i>
                    </div>
                    <el-form :model="roleInfo" :rules="rules" ref="roleInfo">
                        <div class="addNewInput">
                            <div>
                                <span>角色名:</span>
                                <el-form-item prop="roleName">
                                    <el-input v-model="roleInfo.roleName"></el-input>
                                </el-form-item>
                            </div>
                            <div>
                                <el-form-item prop="roleDesc">
                                    <span>角色描述:</span>
                                    <el-input v-model="roleInfo.roleDesc"></el-input>
                                </el-form-item>
                            </div>
                        </div>
                    </el-form>
                    <div class="addNewFooter">
                        <el-button type="danger" size="mini" @click="handleClose">取消</el-button>
                        <el-button type="primary" size="mini" @click="addNewRole">确定</el-button>
                    </div>
                </div>
            </transition>
        </div>
	</div>
</template>

<script>
	import {mapGetters} from 'vuex'
	export default {
    data(){
        return {
            showAddNew:false,
            roleInfo: {},
            rules: { 
                roleName: [
                    {required:true,message:'请输入角色名',trigger:'blur'}
                ],
                roleDesc: [
                    {required:true,message:'请输入角色描述',trigger:'blur'}
                ]
            }
        }
    },    
    computed: {
        ...mapGetters(['allRoles'])
    },
    methods: {
        handleClose(){
            this.showAddNew = true;
            this.roleInfo = {};
            this.resetForm('roleInfo')
        },
        deleteRole(item){
            const action = ()=>{
                this.post(this.$apis.deleteRole,{_id:item._id}).then(()=>{
                    this.$store.dispatch('loadAllRoles',{api:this.$apis.findAllRoles,pageSize:10,pageNo:1});
                })
            }
            this.operatorConfirm(`删除${item.roleDesc}角色`,action);
        },
        addNewRole(){
            this.$refs['roleInfo'].validate((valid)=>{
                if(valid){
                    this.post(this.$apis.addNewRole,this.roleInfo).then(()=>{
                            this.$store.dispatch('loadAllRoles',{api:this.$apis.findAllRoles,pageSize:10,pageNo:1});
                            this.handleClose();
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
	#RoleManage {
		width: 97.8%;
		height: 100%;
        position: absolute;
        top: 1px;
        bottom: 0;
        right: 0;
        left: 39px;
        background: rgba(246, 250, 253, 1);
        display:flex;
        .roleContainer {
             width: 50%;
             height:93%;
             box-shadow: 0 0 5px 5px rgba(200, 200, 200, 0.5);
             margin: 20px;
            .RoleManageTop{
                width: 100%;
                height: 44px;
                display: flex;
                justify-content: space-between;
                align-items: center;
                // padding: 10px;
                padding-left: 10px;
                padding-right: 20px;
                box-sizing: border-box;
            }
            table {
                width: 100%;
                margin-top: 10px;
                tr {
                    width: 100%;
                    height: 40px;
                    text-align: center;
                    line-height: 40px;
                    &:nth-child(2n-1){
                        background-color: rgba(195, 240, 240,.4)
                    }
                }
            }
        }
        .roleRight{
            width: 50%;
             margin: 20px 20px 10px 0px;
            .addNewRole {
                width: 100%;
                box-shadow: 0 0 5px 5px rgba(200, 200, 200, 0.5);
                background: white;
                .addNewRoleTop {
                    width: 100%;
                    height: 30px;
                    display: flex;
                    flex-direction: row;
                    justify-content: space-between;
                    padding: 5px;
                    box-sizing: border-box;
                }
                .addNewInput{
                    width: 100%;
                    display: flex;
                    flex-direction: row;
                    justify-content: space-around;
                    >div {
                       display: flex;
                       flex-direction: row; 
                       height: 44px;
                       >span {
                           width: 80px;
                           line-height: 44px;
                       }
                       .el-input{
                           width:140px;
                           height: 44px;
                       } 
                    }
                }
                .addNewFooter{
                    width: 100%;
                    display: flex;
                    flex-direction: row;
                    justify-content: flex-end;
                    padding: 20px;
                    box-sizing: border-box;
                    margin-top: 20px;
                    
                }
            }
        }
    }
</style>