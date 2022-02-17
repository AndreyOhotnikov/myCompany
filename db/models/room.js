'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Room extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Room.belongsTo(models.User, { 
        foreignKey: 'user_id',
        onDelete: 'CASCADE'
      }),
      Room.hasMany(models.UserRoom, {
        foreignKey: 'room_id',
        onDelete: 'CASCADE'
      }),
      Room.hasMany(models.Message, {
        foreignKey: 'room_id',
        onDelete: 'CASCADE'
      })
    }
  }
  Room.init({
    title: DataTypes.STRING,
    user_id: DataTypes.INTEGER,
    secret_key: DataTypes.STRING,
    body: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Room',
  });
  return Room;
};
