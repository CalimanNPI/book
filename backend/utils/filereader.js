
const path = require('path');
const fs = require('fs');
const multer = require('multer');

class FileReader {
    async uploadFile(req, res) {
        const upload = multer({ dest: 'uploads/' }).single('file');
        upload(req, res, function (err) {
            if (err instanceof multer.MulterError) {
                return res.status(500).json({ error: err.message });
            } else if (err) {
                return res.status(500).json({ error: err.message });
            }
            res.status(200).json({ message: 'File uploaded successfully', file: req.file });
        });
    }

    async savePath(req, res) {
        const { newPath } = req.body;
        if (!newPath) {
            return res.status(400).json({ error: 'Path is required' });
        }
        // Here you would typically save the path to a database or configuration file
        res.status(200).json({ message: 'Path saved successfully', path: newPath });
    }

    async getPaths(req, res) {
        // Example: Return a list of predefined paths
        const paths = [
            path.join(__dirname, '../uploads'),
            path.join(__dirname, '../documents')
        ];
        res.status(200).json({ paths });
    }

    async checkPathExists(req, res) {
        const { checkPath } = req.body; // Expecting { "checkPath": "/some/path" }
        if (!checkPath) {
            return res.status(400).json({ error: 'Path is required' });
        }
        fs.access(checkPath, fs.constants.F_OK, (err) => {
            if (err) {
                return res.status(404).json({ exists: false });
            }
            res.status(200).json({ exists: true });
        });
    }

    async scanDirectory(req, res) {
        const { directoryPath } = req.body;
        if (!directoryPath) {
            return res.status(400).json({ error: 'Directory path is required' });
        }
        
        try {
            const files = await fs.readdir(directoryPath);
            const result = [];

            for (const file of files) {
                const filePath = path.join(directoryPath, file);
                const stats = await fs.stat(filePath);

                resultado.push({
                    nombre: archivo,
                    ruta: archivoPath,
                    esDirectorio: stats.isDirectory(),
                    tamaño: stats.size,
                    modificado: stats.mtime.toISOString(),
                    url: `/archivos/${archivo}`
                });
            }

            return resultado;
        } catch (error) {
            console.error('Error escaneando archivos:', error);
            return [];
        }
    }

    // Procesador de ebooks
    async processEbook(filePath, extension) {
        switch (extension.toLowerCase()) {
            case '.epub':
                return await processEPUB(filePath);
            case '.pdf':
                return await processPDF(filePath);
            case '.mobi':
                return await processMOBI(filePath);
            case '.txt':
                return await processTXT(filePath);
            case '.cbz':
                return await processCBZ(filePath);
            default:
                throw new Error('Formato no soportado');
        }
    }

    async processEPUB(filePath) {
        const EPub = require('epub');

        return new Promise((resolve, reject) => {
            const epub = new EPub(filePath);

            epub.on('end', () => {
                resolve({
                    metadata: epub.metadata,
                    toc: epub.flow,
                    spine: epub.spine
                });
            });

            epub.on('error', reject);
            epub.parse();
        });
    }

    async processPDF(filePath) {
        const pdf = require('pdf-parse');
        const dataBuffer = fs.readFileSync(filePath);
        const data = await pdf(dataBuffer);

        return {
            text: data.text,
            numPages: data.numpages,
            info: data.info
        };
    }

    async processTXT(filePath) {
        const content = fs.readFileSync(filePath, 'utf-8');
        return {
            content: content,
            lines: content.split('\n').length
        };
    }
}


module.exports = FileReader;

