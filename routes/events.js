import { appBot } from '../index';
import ChatIdController from '../controllers/ChatIdController';

export const initEvents = () => {
  appBot.onBotAddInChat(ChatIdController.createChatLink);

  appBot.onBotDeleteFromChat(ChatIdController.removeChatLink);
};
