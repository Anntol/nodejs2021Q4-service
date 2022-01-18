import "reflect-metadata";
import pkg from "typeorm";

import app from './app.js';
import config from './common/config.js';
import ormconfig from './common/ormconfig.js'

const { createConnection } = pkg;
createConnection(ormconfig).then(async (connection) => {
  const start = async () => {
    const port = config.PORT ?? 4000;
    app.listen(port, '0.0.0.0', (err, address) => {
      if (err) {
        app.log.error(err);
        process.exit(1);
      }
      app.log.info(`server listening on ${address}`);
      app.log.info(`database connected: ${connection.isConnected}`);
    });
  }
  start();
}).catch ((error) => app.log.error(error));

