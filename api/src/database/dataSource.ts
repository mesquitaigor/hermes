import { DataSource } from 'typeorm';

const AppDataSource = new DataSource({
  type: 'mysql',
  host: 'localhost',
  port: 3306,
  username: 'igor.mesquita',
  password: 'tsCz6fmhAJErn3R',
  database: 'hermesDb',
  entities: [`${__dirname}/**/*.entity{.js,.ts}`],
  migrations: [`src/database/migrations/**/*{.js,.ts}`],
  logging: true,
  migrationsRun: true,
});

AppDataSource.initialize()
  .then(() => {
    console.log('Data Source has been initialized!');
  })
  .catch((err) => {
    console.error('Error during Data Source initialization', err);
  });

export { AppDataSource };
