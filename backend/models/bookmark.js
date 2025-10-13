const { DataTypes, col } = require('sequelize');
const sequelize = require('../config/database');
const Book = require('./book');
const User = require('./user');

const Bookmark = sequelize.define('Bookmark', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'Users',
            key: 'id'
        }
    },
    bookId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'Books',
            key: 'id'
        }
    },
    page: {
        type: DataTypes.INTEGER,
    },
    text: {
        type: DataTypes.TEXT,
    },
    note: {
        type: DataTypes.TEXT,
        allowNull: true,
    },
    color: {
        type: DataTypes.STRING,
        allowNull: false,
    }
}, {
    tableName: 'Bookmarks',
    timestamps: true
});

// Relaciones
User.hasMany(Bookmark, { foreignKey: 'userId' });
Bookmark.belongsTo(User, { foreignKey: 'userId' });

// Relaciones
Bookmark.hasMany(Book, { foreignKey: 'bookId' });
Book.belongsTo(Bookmark, { foreignKey: 'bookId' });

module.exports = Bookmark;
