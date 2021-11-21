import { appBot } from '../index';
import { BOT_ADDED_IN_GROUP } from '../lang';
import { Group } from '../models/Group';

async function createChatLink(msg) {
  const chatId = msg.chat.id;

  try {
    await Group.findOrCreate({ where: { chatId } });
    await appBot.bot.sendMessage(chatId, BOT_ADDED_IN_GROUP);
  } catch (e) {
    console.error(e);
  }
}

async function removeChatLink(msg) {
  const chatId = msg.chat.id;
  let chat = await Group.findOne({ where: { chatId } });
  if (chat) chat.destroy();
}

export default {
  createChatLink,
  removeChatLink
};
