import { ConnectionOptions } from 'typeorm';
import dotenv from 'dotenv';
import path from 'path';

dotenv.config({
  path: path.join(__dirname, '../../.env')
});

const config: ConnectionOptions = {
  type: 'postgres',
  host: process.env['TYPEORM_HOST'] || 'localhost',
  port: parseInt(process.env['DB_PORT'] ?? '', 10) || 5432,
  username: process.env['DB_USER'] || 'postgres',
  password: process.env['DB_PASSWORD'] || 'postgres',
  database: process.env['DB_NAME'] || 'postgres',
  entities: ['src/entities/*.{ts,js}'],
  logging: false,
  dropSchema: false,
  migrations: ['./src/migration/**/*.{ts,js}'],
  migrationsRun: true,
  cli: {
    migrationsDir: 'src/migration',
  }, 
};

export default config;
