const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const Book  = require('./book');

const Author = sequelize.define('Author', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    bio: {
        type: DataTypes.TEXT,
        allowNull: true
    },
    birthdate: {
        type: DataTypes.DATE,
        allowNull: true
    },
    books: {
        type: DataTypes.JSONB,
        allowNull: false,
        defaultValue: []
    },
    nationality: {
        type: DataTypes.STRING,
        allowNull: true
    },
    awards: {
        type: DataTypes.JSONB,
        allowNull: false,
        defaultValue: []
    },
    photo: {
        type: DataTypes.TEXT,
        allowNull: true
    },
}, {
    tableName: 'authors',
    timestamps: true
});

module.exports = Author;
