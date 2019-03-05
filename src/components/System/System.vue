<template>
    <div id="System">
        <ul>
            <li v-for="(item,key) in accountPermission.children" :key="item._id"
                @click="$router.push({name:item.permissionDesc})"
            >
                <i :class='["fa",fontIcons[key]]' style="font-size:130px"></i>
                <span>{{item.permissionDesc}}</span>
            </li>
        </ul>
        <transition name="fade">
            <router-view></router-view>
        </transition>
    </div>
</template>

<script>
export default {
    data(){
        return {
            fontIcons: ["fa-lock",'fa-address-card-o','fa-users']
        }
    },
    computed: {
        accountPermission(){
            var accountPermission = this.$store.getters['accountPermission'];
            var obj = {}
            accountPermission.forEach((item)=>{
                if(item.permissionDesc=="系统管理"){
                    obj = item;
                    return;
                }
            })
            return obj;
        }
    }
}
</script>

<style lang="scss" scoped>
    #System {
        width: 87%;
        height: 92%;
        position:absolute;
        left: 165px;
        top:52px;
        ul {
        	width:93%;
            position: absolute;
            display: flex;
            left: 70px;
            right: 0;
            flex-direction: row;
            li {
               flex:1;
               height: 200px;
               background: red;
               margin: 20px;
               display: flex;
               flex-direction: column;
               justify-content: center;
               align-items: center;
               color:white;
               font-size:25px; 
               i {
                    color: rgba(255, 255, 255, 0.5);
               }
               &:nth-child(1){
                   background: linear-gradient(to right,lightblue,blue 99%);
               }
               &:nth-child(2){
                   background: linear-gradient(to right,lightcyan,cyan)
               }
               &:nth-child(3){
                   background: linear-gradient(to right,rgb(242, 157, 0),lightcoral)
               }
            }
        }
        #routerView{
            position: absolute;
            top: 0px;
            bottom: 0;
            left: 200px;
            right: 0;
            background: cyan;
        }
    }
</style>
