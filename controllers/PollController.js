import { appBot } from '../index';
import { MAIN_POLL_TEXT } from '../lang';
import { Group } from '../models/Group';
import { Product } from '../models/Product';
import db from 'sequelize';

/**
 * Создаёт опрос с выборкой случаныйх пицц
 *
 * @param {object} msg
 * @return {Promise<void>}
 */
async function createPoll(msg) {
  const chatId = msg.chat.id;

  const random = await Product.findAll({
    order: db.Sequelize.literal('rand()'),
    limit: 10
  });

  await appBot.bot.sendPoll(chatId, MAIN_POLL_TEXT, random.map(product => product.name), {
    is_anonymous: false,
    allows_multiple_answers: true
  });
}

/**
 * Создаёт опросы всех групп, добавленных в бд
 * @return {Promise<void>}
 */
async function createAllPolls() {
  const groups = await Group.findAll();

  groups.forEach(group => {
    createPoll({ chat: { id: group.chatId } });
  });
}

export default {
  createPoll,
  createAllPolls
};
