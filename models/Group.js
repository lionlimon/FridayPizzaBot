import { sequelize } from '../db' ;
import db from 'sequelize';

const { DataTypes } = db;

export const Group = sequelize.define('Group', {
	id: { type: DataTypes.INTEGER, primaryKey: true, unique: true, autoIncrement: true },
	chatId: { type: DataTypes.STRING, primaryKey: true, unique: true },
});

