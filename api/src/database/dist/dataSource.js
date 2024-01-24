"use strict";
exports.__esModule = true;
exports.AppDataSource = void 0;
var typeorm_1 = require("typeorm");
var AppDataSource = new typeorm_1.DataSource({
    type: 'mysql',
    host: 'localhost',
    port: 3306,
    username: 'igor.mesquita',
    password: 'tsCz6fmhAJErn3R',
    database: 'hermesDb',
    entities: [__dirname + "/**/*.entity{.js,.ts}"],
    migrations: ["src/database/migrations/**/*{.js,.ts}"],
    logging: true,
    migrationsRun: true
});
exports.AppDataSource = AppDataSource;
AppDataSource.initialize()
    .then(function () {
    console.log('Data Source has been initialized!');
})["catch"](function (err) {
    console.error('Error during Data Source initialization', err);
});
