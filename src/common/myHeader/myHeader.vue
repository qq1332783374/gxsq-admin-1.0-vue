<template>
    <div class="myHeader">
        <header class="lyear-layout-header">
            <nav class="navbar navbar-default">
                <div class="topbar">

                    <div class="topbar-left">
                        <div class="lyear-aside-toggler" >
                            <span class="lyear-toggler-bar" style="background-color: #2b99ff;"></span>
                            <span class="lyear-toggler-bar" style="background-color: #2b99ff;"></span>
                            <span class="lyear-toggler-bar" style="background-color: #2b99ff;"></span>
                        </div>
                        <span class="navbar-page-title" style="color: #2b99ff;"> {{routerTitle}} </span>
                    </div>

                    <div class="topbar-right">
                        <!-- <div class="userInfo">
                            <img class="img-avatar img-avatar-48 m-r-10" src="../../assets/image/default-avatar.jpeg" alt="">
                            <span>笔下光年 <span class="caret"></span></span>
                        </div> -->
                        <el-dropdown>
                            <span class="el-dropdown-link">
                               <img class="img-avatar img-avatar-48 m-r-10" src="../../../static/image/default-avatar.jpeg" alt="">
                                <span>{{userInfo.name}} <span class="caret"></span></span>
                            </span>
                            <el-dropdown-menu slot="dropdown">
                                <el-dropdown-item>
                                    <i class="mdi mdi-account"></i>个人信息
                                </el-dropdown-item>
                                <el-dropdown-item>
                                    <i class="mdi mdi-lock-outline"></i><span @click="dialogFormVisible = true">修改密码</span>
                                </el-dropdown-item>
                                <el-dropdown-item divided >
                                    <i class="mdi mdi-logout-variant"></i> <span @click="logout">退出登陆</span>
                                </el-dropdown-item>
                            </el-dropdown-menu>
                        </el-dropdown>
                    </div>

                </div>
            </nav>
        </header>

        <el-dialog title="修改密码" :visible.sync="dialogFormVisible"  width="35%">
            <div class="dialog-content">
                <form >
                    <div class="form-group has-info">
                        <label>账号</label>
                        <input type="text" name="telephone" class="form-control" v-model="changPasswordInfo.phone" placeholder="账号" disabled>
                    </div>
                    <div class="form-group has-info">
                        <label>新密码</label>
                        <input type="password" name="telephone" class="form-control" v-model="changPasswordInfo.pwd1" placeholder="请输入你的新密码">
                    </div>
                    <div class="form-group has-info">
                        <label>请再次输入密码</label>
                        <input type="password" name="telephone" class="form-control" v-model="changPasswordInfo.pwd2" placeholder="请再次输入密码">
                    </div>
                    <p class="text-danger animated shake" v-show="isSame">{{tips}}</p>
                </form>
            </div>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogFormVisible = false">取 消</el-button>
                <el-button type="primary" @click="changePwd()">确 定</el-button>
            </div>
        </el-dialog>
    </div>

</template>

<script>
export default {
    name: 'myHeader',
    data () {
        return {
            userInfo: null,
            routerTitle: '首页',
            dialogFormVisible: false,
            changPasswordInfo: {
                phone: '',
                pwd1: '',
                pwd2: '',
            },
            isSame: false,
            tips: '输入两次的密码不一致'
        }
    },
    methods: {
        logout () {  // 退出登陆
            this.$confirm('是否退出登陆, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                this.$message({
                    type: 'success',
                    message: '退出成功!'
                });
                sessionStorage.removeItem('user')
                this.$router.push({path: '/login'})
                // 关闭 IM
                this.$imConn.close()
            }).catch(() => {
                this.$message({
                    type: 'info',
                    message: '取消操作'
                });          
            });
        },
        changePwd () {
            if (this.changPasswordInfo.pwd1 != this.changPasswordInfo.pwd2) {
                this.isSame = true
                this.tips = '输入两次的密码不一致'
                setTimeout(() => {
                    this.isSame = false
                }, 1500)
                return
            } else if (this.changPasswordInfo.pwd1.length < 6 && this.changPasswordInfo.pwd2.length < 6) {
                this.isSame = true
                this.tips = '密码长度不能小于六位'
                setTimeout(() => {
                    this.isSame = false
                }, 1500)
                return
            } else {
                console.log(this.changPasswordInfo)
                this.isSame = false
                var params = new URLSearchParams
                params.append('telephone', this.changPasswordInfo.telephone)
                params.append('newPassword', this.changPasswordInfo.pwd2)
                this.$server.changePwd(params).then((res) => {
                    console.log(res)
                    if (res) {
                        this.$message({
                            message: '密码修改成功，请重新登录!',
                            type: 'success'
                        });
                        sessionStorage.removeItem('user')
                        this.$router.push({path: '/login'})
                    }
                }).catch((err) => {
                    console.log(err)
                    this.$message.error('修改失败')
                })
            }
        }
    },
    watch: {
        $route: {
            handler: function(val, oldVal){
                
                this.routerTitle = val.meta.title || '首页'
            },
            // 深度观察监听
            deep: true
        }
    },
    created () {
        if (sessionStorage.getItem('admin')) {
            this.userInfo = JSON.parse(sessionStorage.getItem('admin'))
        } else {
            this.userInfo = {
                teaName: '喵喵喵',
                telephone: '13719664493'
            }
        }
        console.log(this.userInfo)
        this.routerTitle = this.$route.meta.title || '首页'
        // 默认用户账号
        this.changPasswordInfo.phone = this.userInfo.phone
    }  
}
</script>

<style scoped>

</style>
