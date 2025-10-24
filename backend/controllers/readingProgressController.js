const { ReadingProgress } = require('../models');

class ReadingProgressController {
    // Métodos del controlador (crear, obtener, actualizar, eliminar)
    async createReadingProgress(req, res) {
        try {
            const { userId, bookId, progress, totalPages } = req.body;
            const newProgress = await ReadingProgress.create({ userId, bookId, progress, totalPages });
            res.status(201).json(newProgress);
        } catch (error) {
            res.status(500).json({ error: 'Failed to create reading progress' });
        }
    }

    async getReadingProgress(req, res) {
        try {
            const { userId, bookId } = req.params;
            const progress = await ReadingProgress.findOne({ where: { userId, bookId } });
            if (progress) {
                res.status(200).json(progress);
            } else {
                res.status(404).json({ error: 'Reading progress not found' });
            }
        } catch (error) {
            res.status(500).json({ error: 'Failed to retrieve reading progress' });
        }

    }

    async updateReadingProgress(req, res) {
        try {
            const { userId, bookId } = req.params;
            const { progress } = req.body;
            const [updated] = await ReadingProgress.update({ progress }, { where: { userId, bookId } });

            if (updated) {
                const updatedProgress = await ReadingProgress.findOne({ where: { userId, bookId } });
                res.status(200).json(updatedProgress);
            }
            else {
                res.status(404).json({ error: 'Reading progress not found' });
            }
        } catch (error) {
            res.status(500).json({ error: 'Failed to update reading progress' });
        }
    }
}

module.exports = new ReadingProgressController();