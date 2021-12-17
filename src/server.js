const { PORT } = require('./common/config');
const app = require('./app');

const start = async () => {
  try {
    await app.listen(PORT)
  } catch (error) {
    app.log.error(error)
    process.exit(1)
  }
}

start();
