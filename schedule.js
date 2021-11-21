import cron from 'node-cron';
import PollController from './controllers/PollController';

export const initCron = () => {
  cron.schedule('30 7 * * 5', PollController.createAllPolls);
};
