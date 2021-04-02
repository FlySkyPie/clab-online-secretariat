'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class ApplicationForm extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  ApplicationForm.init({
    type: DataTypes.STRING,
    key: DataTypes.STRING,
    active: DataTypes.BOOLEAN,
    created_by: DataTypes.STRING,
    consumed_at: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'ApplicationForm',
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  });
  return ApplicationForm;
};