/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('markdown', {
    id: {
      type: DataTypes.INTEGER(11),
      primaryKey: true
    },
    content: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    title: {
      type: DataTypes.STRING(50),
      allowNull: false
    },
    type: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      defaultValue: '1'
    },
    user_id: {
      type: DataTypes.INTEGER(11),
      allowNull: true
    }
  }, {
    tableName: 'markdown'
  });
};
