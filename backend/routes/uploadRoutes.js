const router = require('express').Router();
const configController = require('../controllers/configController');
const { uploadSingle, uploadMultiple } = require('../middlewares/uploadMiddleware');

// Rutas para subida de archivos
router.post('/uploads/single', uploadSingle, configController.uploadSingle);
router.post('/uploads/multiple', uploadMultiple, configController.uploadMultiple);

// Rutas para configuración de directorios
router.post('/select-folder', configController.selectDirectory.bind(configController));
router.get('/load-books', configController.getFilesInDirectory.bind(configController));

module.exports = router;