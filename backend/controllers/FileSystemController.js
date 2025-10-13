const path = require('path');
const fs = require('fs');
const multer = require('multer');

class FileSystemController {

    async uploadFile(req, res) {
        const storage = multer.diskStorage({
            destination: function (req, file, cb) {
                cb(null, path.join(__dirname, '../uploads'));
            },
            filename: function (req, file, cb) {
                cb(null, Date.now() + path.extname(file.originalname));
            }
        });

        const upload = multer({ storage: storage }).single('file');

        upload(req, res, function (err) {
            if (err) {
                return res.status(500).json({ error: err.message });
            }
            res.status(200).json({ message: 'File uploaded successfully', file: req.file });
        });
    }

    async listFiles(req, res) {
        const { checkPath } = req.body; // Expecting { "checkPath": "/some/path" }
        if (!checkPath) {
            return res.status(400).json({ error: 'Path is required' });
        }

        const directoryPath = path.join(__dirname, checkPath);

        fs.readdir(directoryPath, (err, files) => {
            if (err) {
                return res.status(500).json({ error: err.message });
            }
            res.status(200).json({ files });
        });
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

}

module.exports = new FileSystemController();
// backend/routes/index.js