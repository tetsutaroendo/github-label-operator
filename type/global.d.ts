declare module NodeJS {
  interface ProcessEnv {
    AUTH_KEY?: string;
    OPERATION?: string;
  }
}
