import { config } from "dotenv";

config();

interface Configuration {
  port: number;
  nodeEnv: string;
  jwtToken: string;
  typeorm: {
    host: string;
    port: number;
    user: string;
    password: string;
    database: string;
  };
}

export const configuration = (): Configuration => {
  const defaultConfiguration: Configuration = {
    port: Number(process.env.PORT) ?? 3000,
    nodeEnv: process.env.NODE_ENV as string,
    jwtToken: process.env.SECRET_TOKEN as string,
    typeorm: {
      host: process.env.TYPEORM_HOST as string,
      port: Number(process.env.TYPEORM_PORT),
      user: process.env.TYPEORM_USER as string,
      password: process.env.TYPEORM_PASSWORD as string,
      database: process.env.TYPEORM_DATABASE as string,
    },
  };

  const developmentConfiguration: Configuration = {
    port: Number(process.env.PORT) ?? 3000,
    nodeEnv: process.env.NODE_ENV as string,
    jwtToken: process.env.SECRET_TOKEN as string,
    typeorm: {
      host: process.env.DEVELOPMENT_TYPEORM_HOST as string,
      port: Number(process.env.DEVELOPMENT_TYPEORM_PORT),
      user: process.env.DEVELOPMENT_TYPEORM_USER as string,
      password: process.env.DEVELOPMENT_TYPEORM_PASSWORD as string,
      database: process.env.DEVELOPMENT_TYPEORM_DATABASE as string,
    },
  };

  const stagingConfiguration: Configuration = {
    port: Number(process.env.PORT) ?? 3000,
    nodeEnv: process.env.NODE_ENV as string,
    jwtToken: process.env.SECRET_TOKEN as string,
    typeorm: {
      host: process.env.STAGING_TYPEORM_HOST as string,
      port: Number(process.env.STAGING_TYPEORM_PORT),
      user: process.env.STAGING_TYPEORM_USER as string,
      password: process.env.STAGING_TYPEORM_PASSWORD as string,
      database: process.env.STAGING_TYPEORM_DATABASE as string,
    },
  };

  const productionConfiguration: Configuration = {
    port: Number(process.env.PORT) ?? 3000,
    nodeEnv: process.env.NODE_ENV as string,
    jwtToken: process.env.SECRET_TOKEN as string,
    typeorm: {
      host: process.env.PRODUCTION_TYPEORM_HOST as string,
      port: Number(process.env.PRODUCTION_TYPEORM_PORT),
      user: process.env.PRODUCTION_TYPEORM_USER as string,
      password: process.env.PRODUCTION_TYPEORM_PASSWORD as string,
      database: process.env.PRODUCTION_TYPEORM_DATABASE as string,
    },
  };

  if (process.env.NODE_ENV === "development") {
    return developmentConfiguration;
  }
  if (process.env.NODE_ENV === "staging") {
    return stagingConfiguration;
  }
  if (process.env.NODE_ENV === "production") {
    return productionConfiguration;
  }
  return defaultConfiguration;
};
