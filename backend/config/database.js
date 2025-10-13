const { Sequelize, DataTypes } = require('sequelize');



// Option 2: Passing parameters separately (sqlite)
const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: './database.sqlite'
});

try {
    sequelize.authenticate();
    console.log('Connection has been established successfully.');
} catch (error) {
    console.error('Unable to connect to the database:', error);
}

module.exports = sequelize;

// const User = sequelize.define('User', {
//     username: {
//         type: DataTypes.STRING,
//         allowNull: false
//     },
//     email: {
//         type: DataTypes.STRING,
//         unique: true
//     }
// });
// 
// async function syncDatabase() {
//     await sequelize.sync();
//     console.log("All models were synchronized successfully.");
// }
// //syncDatabase();
// 
// async function createUser() {
//     const jane = await User.create({ username: 'JaneDoe', email: 'jane@example.com' });
//     console.log("Jane's auto-generated ID:", jane.id);
// }
// //createUser();
// 
// async function findUsers() {
//     const users = await User.findAll();
//     console.log("All users:", JSON.stringify(users, null, 2));
// 
//     const jane = await User.findOne({ where: { username: 'JaneDoe' } });
//     console.log("Jane:", JSON.stringify(jane, null, 2));
// }
// 
// async function updateUser() {
//     const jane = await User.findOne({ where: { username: 'JaneDoe' } });
//     if (jane) {
//         jane.email = 'new_jane@example.com';
//         await jane.save();
//         console.log("Jane's email updated.");
//     }
// }
// //updateUser();
// 
// 
// async function deleteUser() {
//     await User.destroy({
//         where: {
//             username: 'JaneDoe'
//         }
//     });
//     console.log("JaneDoe user deleted.");
// }
// //deleteUser();
// 
// findUsers();