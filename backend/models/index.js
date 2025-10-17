const sequelize = require('../config/database');
const User = require('./user');
const Book = require('./book');
const Author = require('./author');
const Bookmark = require('./bookmark');
const ReadingProgress = require('./readingProgress');

const models = {
    User,
    Book,
    Author,
    Bookmark,
    ReadingProgress
};

// Sincronizar modelos con la base de datos
sequelize.sync({ force: false }) // force: true elimina y recrea las tablas
    .then(() => console.log('Base de datos sincronizada'))
    .catch(err => console.error('Error sincronizando BD:', err));

module.exports = models; 