import User from '@modules/users/typeorm/entities/User';
import UserToken from '@modules/users/typeorm/entities/UserToken';
import { DataSource } from 'typeorm';
import { CreateUsers1698431076248 } from './migrations/1717080183925-CreateUsers';
import { CreateUserTokens1698495519179 } from './migrations/1717080213935-CreateUserTokens';
import { Entry } from '@modules/entries/typeorm/entities/Entry';

export const AppDataSource = new DataSource({
  type: 'mysql',
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  synchronize: true,
  logging: false,
  entities: [User, UserToken, Entry],
  migrations: [CreateUsers1698431076248, CreateUserTokens1698495519179],
  migrationsTableName: 'migrations',
  subscribers: [],
});
