import { PostgresConnectionOptions } from 'typeorm/driver/postgres/PostgresConnectionOptions';

const typeormConfig: PostgresConnectionOptions = {
  type: 'postgres',
  host: process.env.POSTGRESQL_HOST,
  port: +process.env.POSTGRESQL_PORT,
  database: process.env.POSTGRESQL_DATABASE,
  username: process.env.POSTGRESQL_USERNAME,
  password: process.env.POSTGRESQL_PASSWORD,
  migrationsRun: false,
  synchronize: false,
  entities: ['**/*.entity.js'],
};

export default typeormConfig;
