import { Product } from '../models/Product';
import db from 'sequelize';
import { appBot } from '../index';
import { RANDOM_CONTROLLER_PARAMETER_ERROR } from '../lang';

/**
 * @param {object} msg
 * @param {array} matches
 * @return {Promise<void>}
 */
async function getRandomProductList(msg, matches = []) {
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
    await appBot.bot.sendMessage(chatId, RANDOM_CONTROLLER_PARAMETER_ERROR);
  }
}

export default {
  getRandomProductList
};
