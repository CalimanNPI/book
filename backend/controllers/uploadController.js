
const uploadController = {
    // Subir archivo único
    uploadSingle: async (req, res) => {
        try {
            if (!req.file) {
                return res.status(400).json({
                    success: false,
                    message: 'No se ha seleccionado ningún archivo'
                });
            }

            // Guardar información en base de datos

            res.json({
                success: true,
                message: 'Archivo subido exitosamente',
                file: fileInfo
            });
        } catch (error) {
            console.error('Error subiendo archivo:', error);
            res.status(500).json({
                success: false,
                message: 'Error al subir el archivo'
            });
        }
    },

    // Subir múltiples archivos
    uploadMultiple: async (req, res) => {
        try {
            if (!req.files || req.files.length === 0) {
                return res.status(400).json({
                    success: false,
                    message: 'No se han seleccionado archivos'
                });
            }

            // Guardar información en base de datos
            const filesInfo = [];

            res.json({
                success: true,
                message: `${req.files.length} archivos subidos exitosamente`,
                files: filesInfo
            });
        } catch (error) {
            console.error('Error subiendo archivos:', error);
            res.status(500).json({
                success: false,
                message: 'Error al subir los archivos'
            });
        }
    },

    // Subir diferentes tipos de archivos
    uploadFields: async (req, res) => {
        try {
            const result = {};

            // Guardar información en base de datos

            res.json({
                success: true,
                message: 'Archivos subidos exitosamente',
                ...result
            });
        } catch (error) {
            console.error('Error subiendo archivos:', error);
            res.status(500).json({
                success: false,
                message: 'Error al subir los archivos'
            });
        }
    },

    // Listar archivos
    listFiles: async (req, res) => {
        try {
            const files = await fileModel.listFiles();
            res.json({
                success: true,
                files: files
            });
        } catch (error) {
            console.error('Error listando archivos:', error);
            res.status(500).json({
                success: false,
                message: 'Error al listar archivos'
            });
        }
    },

    // Descargar archivo
    downloadFile: async (req, res) => {
        try {
            const { filename } = req.params;
            const fileInfo = await fileModel.getFileInfo(filename);

            if (!fileInfo) {
                return res.status(404).json({
                    success: false,
                    message: 'Archivo no encontrado'
                });
            }

            res.download(fileInfo.path, fileInfo.originalname);
        } catch (error) {
            console.error('Error descargando archivo:', error);
            res.status(500).json({
                success: false,
                message: 'Error al descargar el archivo'
            });
        }
    },

    // Eliminar archivo
    deleteFile: async (req, res) => {
        try {
            const { filename } = req.params;
            const success = await fileModel.deleteFile(filename);

            if (success) {
                res.json({
                    success: true,
                    message: 'Archivo eliminado exitosamente'
                });
            } else {
                res.status(404).json({
                    success: false,
                    message: 'Archivo no encontrado'
                });
            }
        } catch (error) {
            console.error('Error eliminando archivo:', error);
            res.status(500).json({
                success: false,
                message: 'Error al eliminar el archivo'
            });
        }
    }
};

module.exports = uploadController;