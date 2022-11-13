import * as defaultConfig from '../../../../../infrastructure/config/typeorm.config';
import { DataSource } from 'typeorm';
import * as dotenv from 'dotenv';
dotenv.config();
export const schema = 'users';
const typeormConfig: DataSource = new DataSource({
  ...defaultConfig.default,
  entities: ['dist/**/user-infrastructure/database/**.entity{.ts,.js}'],
  migrations: ['dist/**/user-infrastructure/database/migrations/*.js'],
  schema,
});

export default typeormConfig;
