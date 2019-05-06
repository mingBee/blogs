const Sequelize=require('sequelize');

const Todolist=new Sequelize('mysql://root:wow8815441.@localhost/todolist',{
  define:{
    timestamps:false
  }
})

module.exports={
  Todolist
} 