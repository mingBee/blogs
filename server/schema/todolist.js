/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('todolist', {
    id: {
      type: DataTypes.INTEGER(11),
      primaryKey: true
    },
    content: {
      type: DataTypes.STRING(150),
      allowNull: false
    },
    user_id: {
      type: DataTypes.INTEGER(11),
      allowNull: false
    },
    status: {
      type: DataTypes.INTEGER(11),
      allowNull: false
    }
  }, {
    tableName: 'todolist'
  });
};
