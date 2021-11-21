import db from 'sequelize';
import {
  DB_NAME, DB_PASSWORD, DB_PORT, DB_SERVER, DB_SOKET_PATH, DB_USER
} from './config';

export const sequelize = new db.Sequelize(DB_NAME, DB_USER, DB_PASSWORD, {
  host: DB_SERVER,
  port: DB_PORT,
  dialect: 'mysql',
  dialectOptions: {
    socketPath: DB_SOKET_PATH
  }
});

export const initDb = async () => {
  try {
    await sequelize.authenticate();
    await sequelize.sync();
  } catch (e) {
    console.error(e);
  }
};
