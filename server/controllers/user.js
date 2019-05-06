const User=require('../models/user')
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'

const getUserById = async function(ctx){
  let id=ctx.params.id;
  let result=await User.getUserById(id);
  if(result){
    ctx.body={
      code:0,
      retDsc:'查询成功',
      ret:result
    }
  }else {
    ctx.body = {
      code: -1,
      retDsc: '用户不存在',
      ret:null
    }
  }
}

const postUserAuth = async function(ctx){
  let body = ctx.request.body;
  let userInfo= await User.getUserByName(body.user_name)
  if(userInfo){
    let sign=bcrypt.compareSync(body.password,userInfo.password);
    // let sign = body.password === userInfo.password
    if(sign){
      let userToken={
        userName:userInfo.user_name,
        id:userInfo.id
      }
      let secret='koa-token-secret'
      let token=jwt.sign(userToken ,secret ,{ expiresIn: '2h' });
      ctx.body={
        code:0,
        retDsc:'获取token成功',
        ret:{
          token,
          userInfo:userToken
        }
      }
    }else {
      ctx.body={
        code:-1,
        retDsc:'密码错误',
        ret:null
      }
    }
  }else {
    ctx.body={
      code : -1,
      retDsc:'账号不存在',
      ret : null
    }
  }
}

const postCreateUser = async function(ctx){
  let body = ctx.request.body;
  let salt = bcrypt.genSaltSync(10);
  body.password = bcrypt.hashSync(body.password, salt);
  let result=await User.createUser(body);
  if(result){
    ctx.body={
      code: 0,
      retDsc : '注册成功',
      ret : null
    }
  }else {
    ctx.body={
      code: 0,
      retDsc : '注册失败',
      ret : null
    }
  }
}

module.exports = {
  getUserById,
  postUserAuth,
  postCreateUser
}