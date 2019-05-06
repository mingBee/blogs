<template>
  <div v-highlight v-html="content"></div>
</template>

<style lang="stylus" scoped>

</style>


<script>
  import marked from 'marked'
  import '@/assets/dark.css' //引入代码高亮的css
  import hljs from 'highlight.js'
  export default {
    data(){
      return {
        content:''
      }
    },
    created(){
      this.getArticleById();
    },
    directives: {
      highlight: {
        // 指令的定义
        inserted: function (el) {
          let blocks = el.querySelectorAll('pre code')
          blocks.forEach((block) => {
              hljs.highlightBlock(block)
          })
        }
      }
    },
    methods:{
      getArticleById(){
        this.$http.get('/markdown/getById/2').then(res=>{
          console.log(res);
          this.content = marked(res.ret.content);
        })
      }
    }
  }
</script>

