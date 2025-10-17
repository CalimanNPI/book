const { Bookmark } = require('../models');

// Create a new bookmark
class BookmarkController {
    
    // create a new bookmark
    static async createBookmark(req, res) {
        try {
            const { userId, bookId, page, note, color } = req.body;
            const newBookmark = await Bookmark.create({ userId, bookId, page, note, color });
            res.status(201).json(newBookmark);
        }
        catch (error) {
            res.status(500).json({ error: 'Failed to create bookmark' });
        }
    }

    // Get all bookmarks for a user
    static async getUserBookmarksByBook(req, res) {
        try {
            const { userId, bookId } = req.params;
            const bookmarks = await Bookmark.findAll({ where: { userId, bookId } });
            res.status(200).json(bookmarks);
        }
        catch (error) {
            res.status(500).json({ error: 'Failed to retrieve bookmarks' });
        }
    }

    // Delete a bookmark
    static async deleteBookmark(req, res) {
        try {
            const { id } = req.params;
            const deleted = await Bookmark.destroy({ where: { id } });
            if (deleted) {
                res.status(204).send();
            } else {
                res.status(404).json({ error: 'Bookmark not found' });
            }
        }
        catch (error) {
            res.status(500).json({ error: 'Failed to delete bookmark' });
        }
    }
}

module.exports = BookmarkController;
