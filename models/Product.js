import { sequelize } from '../db';
import db from 'sequelize';

const { DataTypes } = db;

export const Product = sequelize.define('Product', {
  id: {
    type: DataTypes.INTEGER, primaryKey: true, unique: true, autoIncrement: true
  },
  img: { type: DataTypes.STRING, unique: true },
  name: { type: DataTypes.STRING, unique: true },
  price: { type: DataTypes.STRING }
});
