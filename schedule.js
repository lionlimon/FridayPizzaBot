import cron from 'node-cron';
import PollController from './controllers/PollController';
import ParsingController from './controllers/ParsingController';

export const initCron = () => {
  cron.schedule('30 7 * * 5', PollController.createAllPolls);
  cron.schedule('0 0 * * *', ParsingController.parseProducts);
};
//
