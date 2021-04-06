declare namespace NodeJS {
  interface ProcessEnv {
    NODE_ENV: string;
    APP_PORT: string;
    APP_HOSTNAME: string;
    APP_PROTOCOL: string;
    APP_SECRET: string;
    MONGO_USERNAME: string;
    MONGO_PASSWORD: string;
    MONGO_HOST: string;
    MONGO_PORT: string;
    MONGO_DATABASE: string;
    REDIS_PORT: string;
    REDIS_HOST: string;
    REDIS_PASSWORD: string;
    SESSION_SECRET: string;
    SESSION_NAME: string;
    SESSION_IDLE_TIMEOUT: string;
    SESSION_ABSOLUTE_TIMEOUT: string;
  }
}