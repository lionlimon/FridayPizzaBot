import {ADDITIONAL_POLL_TEXT, MAIN_POLL_TEXT} from "./lang";
import {additionalPoll, mainPoll} from "./poll";
import {POLL_TIMEOUT} from "./config";
import {bot} from "./index";
import {Group} from "./models/Group";


/**
 * Создаёт опрос по выбору пиццы
 *
 * @param {number} chatId
 */
export async function createPoll(chatId) {
	await bot.sendPoll(chatId, MAIN_POLL_TEXT, mainPoll, {
		is_anonymous: false,
		allows_multiple_answers: true
	});

	await bot.sendPoll(chatId, ADDITIONAL_POLL_TEXT, additionalPoll, {
		is_anonymous: false,
	});

}


export async function saveChatID(chatId) {
	await Group.findOrCreate({where: {chatId}});
}

export async function removeChatID(chatId) {
	let chat = await Group.findOne({where: {chatId}});
	if (chat) chat.destroy();
}

