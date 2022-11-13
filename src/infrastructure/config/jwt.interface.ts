export interface IJwtConfig {
  accessTokenSecret: string;
  accessTokenExpirationTime: number;
  refreshTokenSecret: string;
  refreshTokenExpirationTime: number;
}
