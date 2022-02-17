'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class UserRoom extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      UserRoom.belongsTo(models.User, { 
        foreignKey: 'user_id',
        onDelete: 'CASCADE'
      }),
      UserRoom.belongsTo(models.Room, { 
        foreignKey: 'room_id',
        onDelete: 'CASCADE'
      })
    }
  }
  UserRoom.init({
    room_id: DataTypes.INTEGER,
    user_id: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'UserRoom',
  });
  return UserRoom;
};
