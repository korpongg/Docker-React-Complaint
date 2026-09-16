const { DataTypes, Sequelize } = require("sequelize");
const sequelize = require("../config/dbConn").sequelize;

const personcomplaint = sequelize.define('personcomplaint', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  reportid: {
    type: DataTypes.STRING(20),
    allowNull: true
  },
    number: {
    type: DataTypes.NUMBER,
    allowNull: true
  },
    name: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  department: {
    type: DataTypes.STRING(20),
    allowNull: true
  },
    department: {
    type: DataTypes.STRING(20),
    allowNull: true
  },

  faction: {
    type: DataTypes.STRING(20),
    allowNull: true
  },
  createby: {
    type: DataTypes.STRING(20),
    allowNull: false
  },
  createAt: {
    type: DataTypes.DATE,
    allowNull: true
  },
  updateAt: {
    type: DataTypes.DATE,
    allowNull: true
  },


}, {
  tableName: 'person_complaint',
  timestamps: false // Disable automatic timestamps
});

module.exports = personcomplaint;