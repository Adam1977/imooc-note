'use strict';
module.exports = (sequelize, DataTypes) => {
  const Todo = sequelize.define('Todo', {
    name: DataTypes.STRING,
    deadline: DataTypes.DATE,
    content: DataTypes.STRING,
    status: {
      type: DataTypes.INTEGER,
      defaultValue: 1
    },
    test: {
      type: DataTypes.INTEGER,
      defaultValue: 1
    }
  }, {
    // 去除默认字段
    timestamps: false
  });
  Todo.associate = function(models) {
    // associations can be defined here
  };
  return Todo;
};