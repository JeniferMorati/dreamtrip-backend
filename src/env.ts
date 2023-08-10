import pkg from "../package.json";

const ENV = {
  Application: {
    APP_NAME: pkg.name,
    APP_VERSION: pkg.version,
    ENVIRONMENT: process.env.ENVIRONMENT as string,
    PORT: Number(process.env.PORT),
    MONGO_DB_CONNECTION: process.env.MDB_CONNECTION_STRING as string,
  },
  Mailtrap: {
    INBOX_ALIAS: process.env.MAILTRAP_INBOX_ALIAS as string,
    HOST: process.env.MAILTRAP_HOST as string,
    PORT: Number(process.env.MAILTRAP_PORT),
    USERNAME: process.env.MAILTRAP_USERNAME,
    PASSWORD: process.env.MAILTRAP_PASSWORD,
    AGENCY_EMAIL: process.env.MAILTRAP_AGENCY_EMAIL as string,
    AGENCY_NAME: process.env.MAILTRAP_AGENCY_NAME as string,
  },
  Security: {
    JWT_SECRET: process.env.SECURITY_JWT_PRIVATE_KEY as string,
    JWT_EXPIRES_IN: process.env.JWT_EXPIRES as string,
    SALT_FOR_HASH: process.env.SALT_FOR_HASH,
  },
  Log: {
    FILE: process.env.FILE as string,
    FOLDER: process.env.FOLDER as string,
  },
};

export default ENV;
