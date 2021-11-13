import TelegramBot from 'node-telegram-bot-api';
import {createPoll} from "./acitons";
import {TOKEN} from "./config";
import {START_TEXT} from "./lang";


export const bot = new TelegramBot(TOKEN, {polling: true});

bot.onText(/\/start/, (msg) => {
	const chatId = msg.chat.id;

	bot.sendMessage(chatId, START_TEXT);
});

bot.onText(/\/aboba/, async (msg) => {
	await createPoll(msg.chat.id);
});
