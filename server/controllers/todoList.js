import TodoList from '../models/todoList'

const create = async function(ctx){
  let userId=ctx.state.user.id;
  let body = ctx.request.body;
  body.user_id=userId;
  let result=await TodoList.create(body);
  if(result){
    ctx.body={
      code:0,
      retDsc:'新增成功',
      ret:null
    }
  }else{
    ctx.body={
      code:-1,
      retDsc:'新增失败',
      ret:null
    }
  }
}

const del = async function(ctx){
  let id=ctx.params.id;
  let result=await TodoList.del(id);
  if(result){
    ctx.body={
      code:0,
      retDsc:'删除成功',
      ret:null
    }
  }else{
    ctx.body={
      code:-1,
      retDsc:'删除失败',
      ret:null
    }
  }
}

const update = async function(ctx){
  let body=ctx.request.body;
  let result=await TodoList.update(body);
  if(result){
    ctx.body={
      code:0,
      retDsc:'更新成功',
      ret:null
    }
  }else{
    ctx.body={
      code:-1,
      retDsc:'更新失败',
      ret:null
    }
  }
}

const findAll = async function(ctx){
  let userId=ctx.state.user.id;
  let result=await TodoList.findAllByUserId(userId);
  if(result){
    ctx.body={
      code:0,
      retDsc:'查询成功',
      ret:result
    }
  }else{
    ctx.body={
      code:-1,
      retDsc:'查询失败',
      ret:result
    }
  }
}

const finish = async function(ctx){
  let body=ctx.request.body;
  body.status=true;
  let result=await TodoList.update(body);
  if(result){
    ctx.body={
      code:0,
      retDsc:'操作成功',
      ret:result
    }
  }else{
    ctx.body={
      code:-1,
      retDsc:'操作失败',
      ret:result
    }
  }
}

const restore =async function(ctx){
  let body=ctx.request.body;
  body.status=false;
  let result=await TodoList.update(body);
  if(result){
    ctx.body={
      code:0,
      retDsc:'操作成功',
      ret:result
    }
  }else{
    ctx.body={
      code:-1,
      retDsc:'操作失败',
      ret:result
    }
  }
}

module.exports={
  create,
  findAll,
  update,
  del,
  finish,
  restore
}