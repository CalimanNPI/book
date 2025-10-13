const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const Author = require('./author');

const Book = sequelize.define('Book', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    title: {
        type: DataTypes.STRING,
        allowNull: false
    },
    authorId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'Authors',
            key: 'id'
        }
    },
    format: {
        type: DataTypes.ENUM('epub', 'pdf', 'mobi', 'txt', 'cbz', 'cbr'),
        allowNull: false,
        validate: {
            isIn: [['epub', 'pdf', 'mobi', 'txt', 'cbz', 'cbr']]
        }
    },
    metadata: {
        type: DataTypes.JSONB,
        allowNull: false,
        defaultValue: {}
    },
    file: {
        type: DataTypes.TEXT,
        allowNull: false,
    },
    lastRead: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW
    },
}, {
    tableName: 'books',
    timestamps: true
});

// Relaciones
Author.hasMany(Book, { foreignKey: 'authorId' });
Book.belongsTo(Author, { foreignKey: 'authorId' });

module.exports = Book;
