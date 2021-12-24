import pino from 'pino';

const transport = pino.transport({
  targets: [{
    level: 'trace',
    target: 'pino/file',
    options: { destination: 'logs/combined.log' }
  }]
});

const logger = pino(transport);

export default logger;
