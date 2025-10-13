const sequelize = require('../config/database');
const User = require('./user');

const models = {
    User
};

// Sincronizar modelos con la base de datos
sequelize.sync({ force: true }) // force: true elimina y recrea las tablas
    .then(() => console.log('Base de datos sincronizada'))
    .catch(err => console.error('Error sincronizando BD:', err));

module.exports = models;