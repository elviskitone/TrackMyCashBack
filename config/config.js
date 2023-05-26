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
    password: process.env.PASSWORD_PRODUCTION,
    dialect: "postgres",
    dialectOptions: {
      ssl: {
        rejectUnauthorized: false,
      },
    },
    apiKey: process.env.API_KEY_PRODUCTION
  },
};
