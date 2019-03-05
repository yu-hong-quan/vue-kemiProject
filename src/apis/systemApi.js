// 系统管理相关的api
	export default {
		signIn: '/signin',
	    findUserInfoById: '/system/user/findUserInfoById', //通过id查询账号信息
	    findRoleInfoById: '/system/role/findRoleInfoById',//通过id查询角色的信息
	    findAllPermission: '/system/permission/showAllPermission',
	    addNewPermission: '/system/permission/addNewPersmission',
	    deletePermissionById: '/system/permission/deletePermission',//根据权限id删除对应的权限
	    /*-----------账户管理---------------------*/
	    findAllUsers: '/system/user/findAllUsers', //获取所有的的账户
	    addNewUser: '/system/user/addNewUser',
	    deleteUser: '/system/user/deleteUser',
	    /*-----------角色管理---------------------*/
	    findAllRoles: '/system/role/findAllRoles',
	    deleteRole: '/system/role/deleteRole',
	    addNewRole: '/system/role/addNewRole'
	}