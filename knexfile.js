module.exports = {
  development: {
    client: "sqlite3",
    connection: { filename: "./database/user.db3" },
    useNullAsDefault: true,
    migrations: {
      directory: "./database/migrations",
    },
    seeds: { directory: "./database/seeds" },
    pool: {
      afterCreate: (conn, done) => {
        conn.run("PRAGMA foreign_key = ON", done);
      },
    },
  },

  testing: {
    client: "sqlite3",
    connection: {
      filename: "./data/test.db3",
    },
    useNullAsDefault: true,
    migrations: {
      directory: "./data/migrations",
    },
    seeds: {
      directory: "./data/seeds",
    },
  },
};
