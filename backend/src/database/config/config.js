require('dotenv').config();

module.exports = {
  development: {
    username: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.DB_NAME,
    host: process.env.MYSQL_HOST,
    dialect: process.env.DB_DIALECT,
  },
  test: {
    username: process.env.MYSQL_HOST,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.DB_NAME,
    host: process.env.MYSQL_HOST,
    dialect: process.env.DB_DIALECT,
  },
  production: {
    username: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.DB_NAME,
    host: process.env.MYSQL_HOST,
    dialect: process.env.DB_DIALECT,
  },
};
