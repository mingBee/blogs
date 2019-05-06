import Markdown from '../models/markdown'

const create = async function(ctx){
  let body = ctx.request.body;
  const userId = ctx.state.user.id;
  body.user_id = userId;
  let result = await Markdown.setMarkdown(body);
  if(result){
    ctx.body = {
      code : 0,
      retDsc : '新增成功',
      ret : null
    }
  }else {
    ctx.body = {
      code : -1,
      retDsc : "新增失败",
      ret :result
    }
  }
}

const del = async function(ctx){
  let id = ctx.params.id;
  let result = await Markdown.delMarkdownById(id);
  if(result){
    ctx.body = {
      code : 0,
      retDsc : '删除成功',
      ret : null
    }
  }else {
    ctx.body = {
      code : -1,
      retDsc : "删除失败",
      ret :result
    }
  }
}

const getMarkdownById = async function(ctx){
  let id = ctx.params.id;
  let result = await Markdown.getMarkdownById(id); 
  if(result){
    ctx.body = {
      code : 0,
      retDsc : '查询成功',
      ret : result
    }
  }else {
    ctx.body = {
      code : -1,
      retDsc : "查询失败",
      ret :result
    }
  }
} 

const getMarkdownByType = async function(ctx){
  let type = ctx.params.type;
  let result = await Markdown.getMarkdownByType(type); 
  if(result){
    ctx.body = {
      code : 0,
      retDsc : '查询成功',
      ret : result
    }
  }else {
    ctx.body = {
      code : -1,
      retDsc : "查询失败",
      ret :result
    }
  }
} 

const getMarkdownByUser = async function(ctx){
  let user_id = ctx.params.user_id;
  let result = await Markdown.getMarkdownByUser(user_id); 
  if(result){
    ctx.body = {
      code : 0,
      retDsc : '查询成功',
      ret : result
    }
  }else {
    ctx.body = {
      code : -1,
      retDsc : "查询失败",
      ret :result
    }
  }
} 

module.exports = {
  create,
  del,
  getMarkdownById,
  getMarkdownByType,
  getMarkdownByUser
}