require('dotenv').config();

module.exports = {
  // dev: {
  //   ENV-VARS: 'DATABASE_URL' //online db url is configured here
  // },

  development: {
    database: process.env.DB_NAME,
    username: process.env.DB_USER,
    password: process.env.DB_PASS,
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    dialect: 'postgres',
  },

  test: {
    database: 'user_test',
    username: process.env.DB_USER,
    password: process.env.DB_PASS,
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    dialect: 'postgres',
  },

  // production: {
  //   database: process.env.DB_NAME,
  //   username: process.env.DB_USER,
  //   password: process.env.DB_PASS,
  //   host: process.env.DB_HOST,
  //   port: process.env.DB_PORT,
  //   dialect: 'postgres',
  //   ssl: true,
  // },
  dialectOptions: {
    ssl: true,
  },
};
