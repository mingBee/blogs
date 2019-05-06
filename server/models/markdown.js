const db=require('../config/db'),
      markModel="../schema/markdown"

const TodoListDb=db.Todolist;
const Markdown=TodoListDb.import(markModel);

/**
 * 新增
 * @param {*} info 
 */
const setMarkdown= async function(info){
  let result =Markdown.create(info);
  return result;
}

/**
 * id查询
 * @param {*} id 
 */
const getMarkdownById = async function(id){
  let result = Markdown.findOne({
    where:{
      id:id
    }
  })
  return result;
}

/**
 * user_id查询
 * @param {*} id 
 */
const getMarkdownByUser = async function(id){
  let result = Markdown.findAll({
    where:{
      user_id:id
    }
  })
  return result;
}

/**
 * 类型查询
 * @param {*} type 
 */
const getMarkdownByType = async function(type){
  let result = Markdown.findAll({
    where:{
      type:type
    }
  })
  return result;
}

/**
 * 删除
 * @param {*} id 
 */
const delMarkdownById = async function(id){
  let result = Markdown.destroy({
    where:{
      id:id
    }
  })
  return result;
}

/**
 * 更新
 * @param {*} info 
 */
const updateMarkdownById = async function(info){
  let item = await Markdown.findByPk(id);
  let result = item.update(info);
  return result;
}

module.exports={
  setMarkdown,
  getMarkdownById,
  getMarkdownByUser,
  getMarkdownByType,
  delMarkdownById,
  updateMarkdownById
}