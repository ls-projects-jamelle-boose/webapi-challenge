module.exports = {
  development: {
    client: "sqlite3",
    useNullAsDefault: true,
    connection: {
      filename: "./src/database/lambda.db3"
    },
    pool: {
      afterCreate: (conn, done) => {
        conn.run("PRAGMA foreign_keys = ON", done);
      }
    },
    migrations: {
      directory: "./src/database/migrations",
      tableName: "dbmigrations"
    },
    seeds: {
      directory: "./src/database/seeds"
    }
  }
};
