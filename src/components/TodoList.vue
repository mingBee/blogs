<template>
  <el-row class="content">
    <el-col :xs="{span:20,offset:2}" :sm="{span:8,offset:8}">
      <span @click="navToEditArticle">
        欢迎：{{userInfo.userName}}！你的待办事项是：
      </span>
      <el-input placeholder="请输入待办事项" v-model="todos" @keyup.enter.native="addTodos"></el-input>
      <el-tabs v-model="activeName">
        <el-tab-pane label="待办事项" name="first">
          <el-col :xs="24">
            <template v-if="!Done"> <!--v-if和v-for不能同时在一个元素内使用，因为Vue总会先执行v-for-->
              <template v-for="(item, index) in unfinishList">
                <div class="todo-list" :key="item.id">
                  <span class="item">
                    {{ index + 1 }}. {{ item.content }}
                  </span>
                  <span class="pull-right">
                    <el-button size="small" type="primary" @click="finished(index)">完成</el-button>
                    <el-button size="small" :plain="true" type="danger" @click="remove(index)">删除</el-button>
                  </span>
                </div>
              </template> 
            </template>
            <div v-else-if="Done">
              暂无待办事项
            </div>
          </el-col>
        </el-tab-pane>
        <el-tab-pane label="已完成事项" name="second">
          <template v-if="count > 0">
            <template v-for="(item, index) in finishList">
              <div class="todo-list" :key="item.id">
                <span class="item finished">
                  {{ index + 1 }}. {{ item.content }}
                </span>
                <span class="pull-right">
                  <el-button size="small" type="primary" @click="restore(index)">还原</el-button>
                </span>
              </div>
            </template> 
          </template>
          <div v-else>
            暂无已完成事项
          </div>
        </el-tab-pane>
      </el-tabs>
    </el-col>
  </el-row>
</template>

<script>
export default {
  data () {
    return {
      todos: '',
      activeName: 'first',
      list:[],
      count: 0,
      userInfo:{},
    };
  },
  computed: { // 计算属性用于计算是否已经完成了所有任务
    Done(){
      let count = 0;
      let length = this.list.length;
      for(let i in this.list){
        this.list[i].status == true ? count += 1 : '';
      }
      this.count = count;
      if(count == length || length == 0){
        return true
      }else{
        return false
      }
    },
    finishList(){
      return this.list.filter(i=>{return i.status});
    },
    unfinishList(){
      return this.list.filter(i=>{return !i.status});
    }
  },
  /**
   * onload生命周期
   */
  created(){
    this.userInfo=JSON.parse(sessionStorage.getItem('userInfo'));
    //获取待做事项列表
    this.getList();
  },
  methods: {
    /**
     * 获取事项列表
     */
    getList(){
      this.$http.get('/todo/getAll').then(res=>{
        if(res  && res.code===0){
          this.list=res.ret;
        }
      })
    },
    /**
     * 新增项目
     */
    addTodos() {
      if(this.todos == '')
        return
      let item = {
        status: false,
        content: this.todos
      }
      this.$http.post('/todo/create',item).then(res=>{
        if(res &&  res.code===0){
          this.getList();
          this.todos = '';
        }
      })
    },
    /**
     * 完成项目
     */
    finished(index) {
      let param=this.unfinishList[index];
      this.$http.post(`/todo/finish`,param).then(res=>{
        if(res && res.code===0){
          this.getList();
          this.$message({
            type: 'success',
            message: '任务完成'
          })
        }
      })
    },
    /**
     * 删除项目
     */
    remove(index) {
      const id=this.unfinishList[index].id;
      this.$http.get(`/todo/del/${id}`).then(res=>{
        if(res &&  res.code===0){
          this.getList();
          this.$message({
            type: 'info',
            message: '任务删除'
          })
        }
      })
    },
    /**
     * 还原项目
     */
    restore(index) {
      let param=this.finishList[index];
      this.$http.post(`/todo/restore`,param).then(res=>{
        if(res &&  res.code===0){
          this.getList();
          this.$message({
            type: 'success',
            message: '任务还原'
          })
        }
      })
    },
    /**
     * 跳转到编辑文章
     */
    navToEditArticle(){
      this.$router.push('edit')
    }
  }
};
</script>

<style lang="stylus" scoped>
  .el-input
    margin 20px auto
  .todo-list
    width 100%
    margin-top 8px
    padding-bottom 8px
    border-bottom 1px solid #eee
    overflow hidden
    text-align left
    .item
      font-size 20px
      &.finished
        text-decoration line-through
        color #ddd
  .pull-right
    float right
</style>