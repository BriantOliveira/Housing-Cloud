import { Connection, createConnection, getConnectionOptions } from "typeorm";

import { configuration } from "../config";

const config = configuration();

export const createDBConnection = async (): Promise<Connection> => {
  const connectionOptions = await getConnectionOptions(config.nodeEnv);

  const connection = await createConnection({
    ...connectionOptions,
    name: "default",
  });

  return connection;
};
