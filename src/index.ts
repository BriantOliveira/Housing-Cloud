import { Server } from "http";

import App from "./app";
import { configuration } from "./config";
import { createDBConnection } from "./utils/createTypeormConnection";
import logger from "./utils/logger";

const config = configuration();
const app = App;

// eslint-disable-next-line consistent-return
export const startDB = async (): Promise<Server | undefined> => {
  try {
    await createDBConnection();
    logger.info(`Connected to ${config.nodeEnv} Database.`);

    const server = app.listen(config.port, () => {
      logger.info(`Housing Cloud listening on port ${config.port} `);
    });

    return server;
  } catch (err) {
    logger.error(`Failed to connect to ${config.nodeEnv} Database: ${err}`);
    process.exit(1);
  }
};

startDB();
