'use strict';

export default function(sequelize, DataTypes) {
  return sequelize.define('Recipes', {
    _id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    name: DataTypes.STRING,
    description: DataTypes.STRING,
    rating: DataTypes.INTEGER,
    imageThumbnail: DataTypes.STRING,
    servingSize: DataTypes.INTEGER,
    ingredients: DataTypes.ARRAY(DataTypes.STRING),
    quantity: DataTypes.ARRAY(DataTypes.STRING),
    missingIngredients: DataTypes.ARRAY(DataTypes.STRING),
    steps: DataTypes.ARRAY(DataTypes.STRING),
    activeTime: DataTypes.STRING,
    totalTime: DataTypes.STRING,
    imageBackground: DataTypes.STRING,
    info: DataTypes.STRING,
    active: DataTypes.BOOLEAN
  });
}
