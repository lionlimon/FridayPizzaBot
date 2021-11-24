import { appBot } from '../index';
import PollController from '../controllers/PollController';
import StartController from '../controllers/StartController';
import RandomController from '../controllers/RandomController';

export const initCommands = () => {
  appBot.command('start', StartController.sendStartMessage, 'Начало работы');
  appBot.command('poll', PollController.createPoll, 'Начать голосование');
  appBot.command('random (.+)', RandomController.getRandomProductList, 'Получить случайный список пицц');
};
