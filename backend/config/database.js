const { Sequelize } = require("sequelize");

const sequelize = new Sequelize({
  dialect: "sqlite",
  storage: "./database.sqlite",
  // Configuraciones de conexión 
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000,
  },
  // Configuraciones de reintento
  retry: {
    max: 3,
  },
  // Configuraciones específicas de SQLite
  dialectOptions: {
    // Timeout más largo para operaciones
    timeout: 30000,
  },
  // Para WAL mode (mejor concurrencia)
  logging: false,
});

// Habilitar WAL mode para mejor concurrencia
sequelize.query("PRAGMA journal_mode = WAL;");

// Habilitar claves foráneas
sequelize.query("PRAGMA foreign_keys = ON;");

try {
  sequelize.authenticate();
  console.log("Connection has been established successfully.");
} catch (error) {
  console.error("Unable to connect to the database:", error);
}

module.exports = sequelize;
