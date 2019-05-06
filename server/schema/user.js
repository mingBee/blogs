/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('user', {
    user_name: {
      type: DataTypes.STRING(50),
      allowNull: false
    },
    password: {
      type: DataTypes.STRING(128),
      allowNull: false
    },
    id: {
      type: DataTypes.INTEGER(11),
      primaryKey: true
    }
  }, {
    tableName: 'user'
  });
};
