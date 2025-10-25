const router = require('express').Router();
const userController = require('../controllers/userController');

// CRUD routes
router.get('/user/', userController.getAllUsers);
router.get('/user/:id', userController.getUserById);
router.post('/user/', userController.createUser);
router.put('/user/:id', userController.updateUser);
router.delete('/user/:id', userController.deleteUser);

module.exports = router;