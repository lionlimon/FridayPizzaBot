import TelegramBot from 'node-telegram-bot-api';
import {createPoll} from "./acitons";


export const bot = new TelegramBot(TOKEN, {polling: true});

bot.on('message', (msg) => {
	const chatId = msg.chat.id;

	console.log('MESSAGE', msg, chatId);

	// bot.sendMessage(chatId);
});


bot.onText(/\/start/, (msg) => {
	const chatId = msg.chat.id;

	bot.sendMessage(chatId, START_TEXT);
});

bot.onText(/\/aboba/, async (msg) => {
	await createPoll(msg.chat.id);
});
