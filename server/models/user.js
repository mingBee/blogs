const db=require('../config/db'),
      userModel='../schema/user'

const TodolistDb = db.Todolist;
const User = TodolistDb.import(userModel);

const getUserById = async function(id){
  let userInfo=User.findOne({
    where:{
      id:id
    }
  })
  return userInfo;
}

const getUserByName = async function(name){
  let result = User.findOne({
    where:{
      user_name:name
    }
  })
  return result;
}

const createUser = async function(info){
  let result=User.create(info)
  return result;
}


module.exports={
  getUserById,
  getUserByName,
  createUser
}