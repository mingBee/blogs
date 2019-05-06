import koa from 'koa'
import koaRouter from 'koa-router'
import json from 'koa-json'
import bodyParse from 'koa-bodyparser'
import logger from 'koa-logger'
import jwt from 'koa-jwt'
import auth from './routers/auth'
import todoList from './routers/todoList'
import markdown from './routers/markdown'

let app=new koa();
const router=koaRouter();

app.use(bodyParse());
app.use(json());
app.use(logger());

app.use( async function(ctx, next){   //调用接口所用的时间
  let start = new Date();
  await next();
  let ms =new Date() - start;
  console.log('%s %s - %s', ctx.method, ctx.url,ms)
})

app.use(async function(ctx , next){     //jwt验证失败，返回失败信息
  try {
    await next()
  }catch(err) { 
    if(err.status===401){
      ctx.status=401;
      ctx.body={
        success:false,
        token:null,
        info:'Unauthorized'
      }
    }else {
      throw err
    }
  }
})

app.on('error',function(err,ctx){ //服务器错误信息
  console.log('server err', err);
})


router.use('/auth',auth.routes()); //挂载到koa-router上
router.use('/todo',jwt({secret:'koa-token-secret'}),todoList.routes())
router.use('/markdown',jwt({secret:'koa-token-secret'}),markdown.routes())

app.use(router.routes());  //将koa-router挂载到koa上

app.listen('8089',()=>{  //服务器监听的窗口
  console.log('server is listening in 8089');
})

export default app;