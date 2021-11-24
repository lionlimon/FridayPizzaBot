import { appBot } from '../index';
import PollController from '../controllers/PollController';
import StartController from '../controllers/StartController';
import RandomController from '../controllers/RandomController';
import { COMMAND_POLL, COMMAND_RANDOM, COMMAND_START } from '../lang';

export const initCommands = () => {
  appBot.command('start', StartController.sendStartMessage, COMMAND_START);
  appBot.command('poll', PollController.createPoll, COMMAND_POLL);
  appBot.command('random (.+)', RandomController.getRandomProductList, COMMAND_RANDOM);
};
