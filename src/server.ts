import app from './app.js';
import config from './common/config.js';

const start = async () => {
  try {
    const port = config.PORT ?? 4000;
    await app.listen(port);
  } catch (error) {
    app.log.error(error)
    process.exit(1)
  }
}

start();
