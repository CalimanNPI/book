const multer = require('multer');
const path = require('path');
const fs = require('fs');

// Crear directorio de uploads si no existe
const uploadDir = path.join(__dirname, '../uploads');
if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
}

// Configuración de almacenamiento
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, uploadDir);
    },
    filename: (req, file, cb) => {
        // Nombre único para el archivo
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
    }
});

// Filtro para tipos de archivo
const fileFilter = (req, file, cb) => {
    const allowedTypes = /epub|pdf|mobi|txt|cbz|cb7|zip|rar/;
    const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = allowedTypes.test(file.mimetype);

    if (mimetype && extname) {
        return cb(null, true);
    } else {
        cb(new Error('Tipo de archivo no permitido'));
    }
};

// Configuración de Multer
const upload = multer({
    storage: storage,
    limits: {
      // fileSize: 5 * 1024 * 1024 // 5MB límite
    },
    fileFilter: fileFilter
});

// Middlewares específicos
const uploadSingle = upload.single('file');
const uploadMultiple = upload.array('files', 5); // Máximo 5 archivos
const uploadFields = upload.fields([
    { name: 'avatar', maxCount: 1 },
    { name: 'documents', maxCount: 3 }
]);

module.exports = {
    uploadSingle,
    uploadMultiple,
};