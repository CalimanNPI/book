const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
// const bookController = require('../controllers/bookController');
// const authorController = require('../controllers/authorController');
// const bookmarkController = require('../controllers/bookmarkController');
// const collectionController = require('../controllers/collectionController');
// const readingSettingsController = require('../controllers/readingSettingsController');


// CRUD routes
router.get('/', userController.getAllUsers);
router.get('/:id', userController.getUserById);
router.post('/', userController.createUser);
router.put('/:id', userController.updateUser);
router.delete('/:id', userController.deleteUser);


module.exports = router;