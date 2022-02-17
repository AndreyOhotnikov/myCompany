'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Message extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Message.belongsTo(models.User, { 
        foreignKey: 'user_id',
        onDelete: 'CASCADE'
      }),
      Message.belongsTo(models.Room, { 
        foreignKey: 'room_id',
        onDelete: 'CASCADE'
      })
    }
  }
  Message.init({
    room_id: DataTypes.INTEGER,
    user_id: DataTypes.INTEGER,
    text: DataTypes.STRING,
    coord: DataTypes.STRING // true or false
  }, {
    sequelize,
    modelName: 'Message',
  });
  return Message;
};
