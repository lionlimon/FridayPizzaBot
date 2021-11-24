import { Product } from '../models/Product';
import db from 'sequelize';
import { appBot } from '../index';

/**
 * @param {object} msg
 * @param {array} matches
 * @return {Promise<void>}
 */
async function getRandomProductList(msg, matches) {
  const count = Number(matches[1]);
  const chatId = msg.chat.id;
  if (!Number.isNaN(Number(count))) {
    const products = await Product.findAll({
      order: db.Sequelize.literal('rand()'),
      limit: count || 3
    });

    products.forEach((item) => {
      appBot.bot.sendPhoto(chatId, item.img, { caption: item.name });
    });
  } else {
    await appBot.bot.sendMessage(chatId, 'Первый параметр должен быть числом');
  }
}

export default {
  getRandomProductList
};
