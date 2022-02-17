'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class UserInfo extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      UserInfo.belongsTo(models.User, { 
        foreignKey: 'user_id',
        onDelete: 'CASCADE'
      })
    }
  }
  UserInfo.init({
    fullname: DataTypes.STRING,
    age: DataTypes.INTEGER,
    city: DataTypes.STRING,
    role: DataTypes.STRING,
    about_me: DataTypes.TEXT,
    user_id: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'UserInfo',
  });
  return UserInfo;
};
