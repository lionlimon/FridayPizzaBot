import TelegramBot from 'node-telegram-bot-api';
import { BOT_NAME } from './config';

export default class AppBot {
  /**
   * Доступ к первичному апи пакета для телеграм бота
   * @return {TelegramBot}
   */
  get bot() {
    return this._bot;
  }

  /**
   * @param {string} token
   */
  constructor({ token }) {
    this._bot = new TelegramBot(token, { polling: true });
    this._commands = [];
    this._onBotAddedEvents = [];
    this._onBotDeletedEvents = [];

    this._bot.on('message', async (msg) => {
      const botIsAdded = msg.new_chat_members
        && msg.new_chat_members.findIndex(item => item.username === BOT_NAME) !== -1;

      if (botIsAdded) {
        this._onBotAddedEvents.forEach(fn => fn(msg));
      }

      const botIsDeleted = msg.left_chat_member && msg.left_chat_member.username === BOT_NAME;

      if (botIsDeleted) {
        this._onBotDeletedEvents.forEach(fn => fn(msg));
      }
    });
  }

  /**
   * Регистрация комманды для бота
   * @param {string} command
   * @param {function} callback
   * @param {string} description
   */
  command(command, callback, description) {
    this._commands.push({ command: command.replace('(.+)', ''), description });
    this._bot.onText(new RegExp(`\\/${command}`), (callback));
  }

  /**
   * @param {string} event
   * @param {function} callback
   */
  on(event, callback) {
    this._bot.on(event, callback);
  }

  /**
   * При добавлении бота в чат
   * @param {function} callback
   */
  onBotAddInChat(callback) {
    this._onBotAddedEvents.push(callback);
  }

  /**
   * При удаления бота из чата
   * @param callback
   */
  onBotDeleteFromChat(callback) {
    this._onBotDeletedEvents.push(callback);
  }

  setCommands() {
    this._bot.setMyCommands(this._commands);
  }
}
