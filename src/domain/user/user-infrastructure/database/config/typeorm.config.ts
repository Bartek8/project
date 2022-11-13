import * as defaultConfig from '@infrastructure/config/typeorm.config';
import { PostgresConnectionOptions } from 'typeorm/driver/postgres/PostgresConnectionOptions';

export const schema = 'users';
const typeormConfig: PostgresConnectionOptions = {
  ...defaultConfig.default,
  entities: ['dist/**/user-infrastructure/database/**.entity{.ts,.js}'],
  migrations: ['dist/**/user-infrastructure/database/migrations/*.js'],
  schema,
};

export default typeormConfig;
