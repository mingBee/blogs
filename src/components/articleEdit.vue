<template>
<div>
  <el-button size="mini" type="primary" @click="save">保存</el-button>
  <el-form ref="form" :model="form" label-width="80px">
    <el-form-item label="标题">
      <el-input v-model="form.title" class="title-input"></el-input>
    </el-form-item>
    <el-form-item label="所属类型">
    <el-select v-model="form.type" placeholder="请选择类型">
      <el-option label="文艺" value="1"></el-option>
      <el-option label="技术" value="3"></el-option>
    </el-select>
  </el-form-item>
  </el-form>
  <mavon-editor v-model="form.content"/>
</div>

</template>

<style lang="stylus" scoped>
  .title-input{
    width:300px;
  }
</style>


<script>
export default {
  data(){
    return {
      form:{
        title:'',
        user_id:undefined,
        content:'',
        type:'1',
      }
    }
  },
  /**
   * onload生命周期
   */
  created(){
    this.userInfo=JSON.parse(sessionStorage.getItem('userInfo'));
    this.form.user_id=this.userInfo.id;
  },
  methods:{
    save(){
      let params=Object.assign(this.form,{});
      params.type=Number(params.type);
      this.$http.post('/markdown/create',params).then(res=>{
       console.log(res); 
      })
    }
  }
}
</script>

