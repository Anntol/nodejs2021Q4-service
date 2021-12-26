import pino from 'pino';

const transport = pino.transport({
  targets: [{
    level: 'trace',
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
