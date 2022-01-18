import { ConnectionOptions } from 'typeorm';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

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
  logging: true,
  synchronize: true,
  migrationsRun: false,
  entities: ['./src/entities/**/*.ts'],
  cli: {
    entitiesDir: './src/entities'
  },  
};

export default config;
