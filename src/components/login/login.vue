<template>
    <div class="row login-wrapper">
        <div class="login">
            <div class="login-content">
                <div class="login-header text-center">
                    <h2 style="color: #2b99ff; margin: 0;">广现社区管理员登陆</h2>
                </div>
                <div class="login-body">
                    <form>
                        <div class="form-group has-feedback feedback-left">
                            <span class="mdi mdi-account form-control-feedback"></span>
                            <input type="text" placeholder="请输入您的用户名" class="form-control" name="username" v-model="username">
                        </div>
                        <div class="form-group has-feedback feedback-left">
                            <span class="mdi mdi-lock form-control-feedback" style="left: 0;"></span>
                            <input type="password" placeholder="请输入密码" class="form-control" name="password" v-model="password" @keyup.enter="login()">
                        </div>
                        <div class="form-group">
                            <button type="button" class="btn btn-block btn-primary" style="background-color: #2b99ff; border-color: #2b99ff;" @click="login()">立即登陆</button>
                        </div>
                        <div class="form-group text-right">
                            <span style="color: #2b99ff; cursor: pointer;">忘记密码？</span>
                        </div>
                    </form>
                </div>
                <footer class="col-sm-12 text-center">
                    <p>广现社区管理员端</p>
                </footer>
            </div>
            <div class="alert">
                <el-alert
                    :title="tips"
                    type="error"
                    show-icon
                    v-show="isAlertShow"
                    >
                </el-alert>
            </div>
        </div>
    </div>
</template>

<script>
export default {
  name: "login",
  data() {
    return {
      username: "",
      password: "",
      tips: "",
      isAlertShow: false
    };
  },
  methods: {
    login() {
      if (this.username == "") {
        this.alertShow("请输入用户名");
        return;
      } else if (this.password == "") {
        this.alertShow("请输入密码");
        return;
      } else {
        const user = {
          username: this.username,
          password: this.password
        };

        // 加载动画
        this.$loading({
          lock: true,
          text: 'Loading'
        });
        var params = new URLSearchParams
        params.append('account', user.username)
        params.append('passwords', user.password)
        
        this.$server.login(params).then((res) => {
          console.log(res)
          if (res != 401) {
            sessionStorage.setItem('admin', JSON.stringify(res))
            
            this.$message({
                message: '登陆成功',
                type: 'success'
            })
            this.$router.push({path: '/index'})
            this.$loading().close()
          } else {
              this.$message.error('账号或密码错误')
              this.$loading().close()
              return
          }
        }).catch((err) => {
          console.log(err)
          this.$message.error('登陆失败');
          this.$loading().close()
          return
        })
      }
    },
    alertShow(tips) {
      this.isAlertShow = true;
      this.tips = tips;
      setTimeout(() => {
        this.isAlertShow = false;
      }, 2000);
    },
  },
  created() {
    
  }
};
</script>

<style scoped>
.login-wrapper {
  position: relative;
}
.login {
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
}
.login-content {
  background: #fff;
  min-width: 38.25rem;
  padding: 2.14286em 3.57143em;
  border-radius: 5px;
  margin: 2.85714em 0;
  box-shadow: 0px 0px 12px #ddd;
}
.login-header {
  margin-bottom: 1.5rem;
}
.login-content .has-feedback.feedback-left .form-control {
  padding-left: 38px;
  padding-right: 12px;
}
.login-content .has-feedback.feedback-left .form-control-feedback {
  left: 0;
  right: auto;
  width: 38px;
  height: 38px;
  line-height: 38px;
  z-index: 4;
  color: #dcdcdc;
}
.login-content .form-control {
  height: 38px;
  border-color: #ebebeb;
  -webkit-border-radius: 2px;
  border-radius: 2px;
  color: #8b95a5;
  padding: 5px 12px;
  line-height: inherit;
  -webkit-transition: 0.2s linear;
  transition: 0.2s linear;
  -webkit-box-shadow: none;
  box-shadow: none;
}
.alert {
  width: 20rem;
  position: fixed;
  top: 30px;
}
</style>
