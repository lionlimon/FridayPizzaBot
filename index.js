import { TOKEN } from './config';
import { initDb } from './db';
import { initCron } from './schedule';
import AppBot from './BotApp';
import { initCommands } from './routes/commands';
import { initEvents } from './routes/events';

initDb();
initCron();

export const appBot = new AppBot({ token: TOKEN });

initCommands();
initEvents();

appBot.setCommands();
