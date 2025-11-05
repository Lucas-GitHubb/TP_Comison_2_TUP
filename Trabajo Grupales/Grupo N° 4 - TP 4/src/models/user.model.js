// src/models/user.model.js
const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db');

const User = sequelize.define('User', {
  id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
  name: { type: DataTypes.STRING(80), allowNull: false },
  email: { type: DataTypes.STRING(120), allowNull: false, unique: true, validate: { isEmail: true } },
  password: { type: DataTypes.STRING(120), allowNull: false },

  // Campos para reset de contraseña (opcionales por ahora)
  resetToken: { type: DataTypes.STRING(255), allowNull: true },
  resetTokenExp: { type: DataTypes.DATE, allowNull: true },
}, {
  tableName: 'users',
  timestamps: true,
});

module.exports = User;