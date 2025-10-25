const router = require('express').Router();
const configController = require('../controllers/configController');
const { uploadSingle, uploadMultiple } = require('../middlewares/uploadMiddleware');

// Rutas para subida de archivos
router.post('/single', uploadSingle, configController.uploadSingle);
router.post('/multiple', uploadMultiple, configController.uploadMultiple);

router.post('/select-folder', configController.selectDirectory.bind(configController));
router.get('/load-books', configController.getFilesInDirectory.bind(configController));

module.exports = router;