import { appBot } from '../index';
import PollController from '../controllers/PollController';
import StartController from '../controllers/StartController';

export const initCommands = () => {
  appBot.command('start', StartController.sendStartMessage);
  appBot.command('poll', PollController.createPoll);
};
