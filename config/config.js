module.exports = {
  development: {
    username: "kitone",
    password: "kitone123",
    database: "trackmycash_development",
    host: "127.0.0.1",
    dialect: "postgres",
  },
  test: {
    username: "kitone",
    password: "kitone123",
    database: "trackmycash_test",
    host: "127.0.0.1",
    dialect: "postgres",
  },
  production: {
    use_env_variable: process.env.DATABASE_URL_PRODUCTION,
    host: process.env.HOST_PRODUCTION,
    username: process.env.USERNAME_PRODUCTION,
    password: process.env.PASSWORD_PRODUCTION,
    database: process.env.DATABASE_NAME_PRODUCTION,
    dialect: process.env.DIALECT_PRODUCTION,
    dialectOptions: {
      ssl: {
        rejectUnauthorized: false,
      },
    },
    apiKey: process.env.API_KEY_PRODUCTION
  },
};
