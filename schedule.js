import cron from 'node-cron';
import {Group} from "./models/Group";
import {createPoll} from "./actions";

export const initCron = () => {
	cron.schedule('30 7 * * 5', async () => {
		console.log(new Date());
		const groups = await Group.findAll();

		groups.forEach(group => {
			createPoll(group.chatId);
		})
	});
};


