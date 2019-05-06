<template>
  <div class="wrap">
    <el-tabs v-model="activeName" type="card">
        <el-tab-pane label="登录" name="login">
            <el-form ref="form" class="login-form" :model="form" label-width="80px">

              <el-form-item label="账号">
                <el-input v-model="form.user_name"></el-input>
              </el-form-item>

              <el-form-item label="密码">
                <el-input v-model="form.password"></el-input>
              </el-form-item>

              <el-form-item>
                <el-button type="primary" @click="login">登录</el-button>
              </el-form-item>

            </el-form>
        </el-tab-pane>
        <el-tab-pane label="注册" name="register">
            <el-form ref="form" class="login-form" :model="form" label-width="80px">

              <el-form-item label="账号">
                <el-input v-model="regist_form.user_name"></el-input>
              </el-form-item>

              <el-form-item label="密码">
                <el-input v-model="regist_form.password"></el-input>
              </el-form-item>

              <el-form-item>
                <el-button @click="regist">注册</el-button>
              </el-form-item>

            </el-form>
        </el-tab-pane>
      </el-tabs>
  </div>
</template>

<style lang="stylus" scoped>
  .wrap
    margin-top:300px;
    width:30%;
    margin:0 auto;
    
</style>
  
<script>
  export default {
    data(){
      return {
        activeName:'login',
        form:{
          user_name:'',
          password:''
        },
        regist_form:{
          user_name:'',
          password:''
        }
      }
    },
    methods:{
      login(){
        this.$http.post('/auth/user',this.form).then(res=>{
          if(res.code===0){
            const result=res.ret;
            sessionStorage.setItem('token',result.token);
            sessionStorage.setItem('userInfo',JSON.stringify(result.userInfo));
            this.$router.push('todoList');
          }
        },err=>{
          console.log(err);
        })
      },
      regist(){
        this.$http.post('/auth/user/regist',this.regist_form).then(res=>{
          console.log(res);
        },err=>{
          console.log(err);
        })
      }
    }
  }
</script>

