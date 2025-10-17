const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const Book = require('./book');
const User = require('./user');

const ReadingProgress = sequelize.define('ReadingProgress', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'users',
            key: 'id'
        }
    },
    bookId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'books',
            key: 'id'
        }
    },
    currentPage: {
        type: DataTypes.INTEGER,
    },
    totalPages: {
        type: DataTypes.INTEGER,
        allowNull: true,
    },
}, {
    tableName: 'reading_progress',
    timestamps: true
});

// Relaciones
User.hasMany(ReadingProgress, { foreignKey: 'userId' });
ReadingProgress.belongsTo(User, { foreignKey: 'userId' });

// Relaciones
ReadingProgress.hasMany(Book, { foreignKey: 'bookId' });
Book.belongsTo(ReadingProgress, { foreignKey: 'bookId' });

module.exports = ReadingProgress;
