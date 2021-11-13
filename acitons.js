import {ADDITIONAL_POLL_TEXT, MAIN_POLL_TEXT} from "./lang";
import {additionalPoll, mainPoll} from "./poll";
import {POLL_TIMEOUT} from "./config";
import {bot} from "./index";


/**
 * Создаёт опрос по выбору пиццы
 *
 * @param {number} chatId
 */
export async function createPoll(chatId) {
	const mainResult = await bot.sendPoll(chatId, MAIN_POLL_TEXT, mainPoll, {
		is_anonymous: false,
		open_period: POLL_TIMEOUT
	});

	const additionalResult = await bot.sendPoll(chatId, ADDITIONAL_POLL_TEXT, additionalPoll, {
		is_anonymous: false,
		open_period: POLL_TIMEOUT
	});

}

