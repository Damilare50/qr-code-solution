/* tslint:disable */
/* eslint-disable */
declare module "node-config-ts" {
  interface IConfig {
    FE_URL: string
    APP_PORT: string
  }
  export const config: Config
  export type Config = IConfig
}
