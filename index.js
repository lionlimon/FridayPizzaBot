import TelegramBot from 'node-telegram-bot-api';
import {createPoll, removeChatID, saveChatID} from "./actions";
import {BOT_NAME, TOKEN} from "./config";
import {BOT_ADDED_IN_GROUP, START_TEXT} from "./lang";
import { connect } from './db';
import {initCron} from "./schedule";

connect();
initCron();

export const bot = new TelegramBot(TOKEN, {polling: true});

bot.on('message', async(msg) => {
	const chatId = msg.chat.id;

	// Бота добавили в группу
	if (msg.new_chat_members && msg.new_chat_members.findIndex(item => item.username === BOT_NAME) !== -1) {
		try {
			await saveChatID(chatId);
			await bot.sendMessage(chatId, BOT_ADDED_IN_GROUP);
		} catch(e) {
			console.error(e);
		}
	}


	// Бота убрали из группы
	if (msg.left_chat_member && msg.left_chat_member.username === BOT_NAME) {
		try {
			console.log('Меня убрали(');
			await removeChatID(chatId);
		} catch(e) {
			console.error(e);
		}
	}

});

bot.onText(/\/start/, (msg) => {
	console.log('\n TEXT', msg);
	const chatId = msg.chat.id;

	bot.sendMessage(chatId, START_TEXT);
});

bot.onText(/\/poll/, async (msg) => {
	const chatId = msg.chat.id;

	await createPoll(chatId);
});

bot.onText(/\/aboba/, async (msg) => {
	await createPoll(msg.chat.id);
});
