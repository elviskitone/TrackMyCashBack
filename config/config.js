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
    use_env_variable: "DATABASE_URL",
    database: "trackmycash",
    dialect: "postgres",
    dialectOptions: {
      ssl: {
        rejectUnauthorized: false,
      },
    },
  },
};
