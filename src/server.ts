import app from './app.js';
import config from './common/config.js';

const start = async () => {
  const port = config.PORT ?? 4000;
  app.listen(port, '0.0.0.0', (err, address) => {
    if (err) {
      app.log.error(err);
      process.exit(1);
    }
    app.log.info(`server listening on ${address}`);
  });
}

start();
