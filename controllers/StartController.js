import { appBot } from '../index';
import { START_TEXT } from '../lang';

async function sendStartMessage(msg) {
  const chatId = msg.chat.id;

  appBot.bot.sendMessage(chatId, START_TEXT);
}

export default {
  sendStartMessage
};
