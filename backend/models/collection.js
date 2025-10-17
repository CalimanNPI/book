const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const Book = require('./book');

const Collection = sequelize.define('Collection', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    title: {
        type: DataTypes.STRING,
        allowNull: false
    },
    bookId: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
            model: 'books',
            key: 'id'
        }
    },
    idCollection: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
            model: 'collections',
            key: 'id'
        }
    }
}, {
    tableName: 'collections',
    timestamps: true
});

// Relaciones
Book.hasMany(Collection, { foreignKey: 'bookId' });
Collection.belongsTo(Book, { foreignKey: 'bookId' });

Collection.hasMany(Collection, { foreignKey: 'idCollection' });
Collection.belongsTo(Collection, { foreignKey: 'idCollection' });

module.exports = Collection;
