import db from '../config/db'
const todolistModel = '../schema/todolist'

const TodolistDb=db.Todolist;
const Todolist=TodolistDb.import(todolistModel);

const create=async function(item){
  let result = Todolist.create(item);
  return result;
}

const findAllByUserId= async function(id){
  let list=Todolist.findAll({
    where:{
      user_id:id
    }
  });
  return list;
}

const del = async function(id){
  let result = Todolist.destroy({
    where:{
      id:id
    }
  })
  return result;
}

const update = async function(info){
  const item=await Todolist.findByPk(info.id);
  const result=item.update(info);
  return result;
}

module.exports={
  create,
  findAllByUserId,
  del,
  update
}