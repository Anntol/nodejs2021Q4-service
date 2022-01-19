import pino from 'pino';
import config from './config';

let logLevel = config.LOG_LEVEL;
if (!logLevel || !pino().isLevelEnabled(logLevel)) {
  logLevel = 'trace';
}

const transport = pino.transport({
  targets: [{
    level: logLevel as pino.LevelWithSilent,
    target: 'pino/file',
    options: { destination: 'logs/combined.log' }
  },
  {
    level: 'error',
    target: 'pino/file',
    options: { destination: 'logs/error.log' }
  }]
});

const logger = pino(transport);

export default logger;
