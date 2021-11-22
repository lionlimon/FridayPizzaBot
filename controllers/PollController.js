import { appBot } from '../index';
import { ADDITIONAL_POLL_TEXT, MAIN_POLL_TEXT } from '../lang';
import { additionalPoll, mainPoll } from '../poll';
import { Group } from '../models/Group';

async function createPoll(msg) {
  const chatId = msg.chat.id;
  await appBot.bot.sendPoll(chatId, MAIN_POLL_TEXT, mainPoll, {
    is_anonymous: false,
    allows_multiple_answers: true
  });

  await appBot.bot.sendPoll(chatId, ADDITIONAL_POLL_TEXT, additionalPoll, {
    is_anonymous: false
  });
}

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
