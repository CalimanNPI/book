const express = require('express');
const router = express.Router();
const uploadController = require('../controllers/uploadController');
const fileController = require('../controllers/fileController');
const { uploadSingle, uploadMultiple } = require('../middlewares/uploadMiddleware');

// Rutas para subida de archivos
router.post('/upload/single', uploadSingle, uploadController.uploadSingle);
router.post('/upload/multiple', uploadMultiple, uploadController.uploadMultiple);

router.post('/folder', fileController.selectDirectory);

module.exports = router;