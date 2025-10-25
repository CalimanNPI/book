const router = require('express').Router();
const AutorController = require('../controllers/authorController');
const BookController = require('../controllers/bookController');
const BookmarkController = require('../controllers/bookmarkController');
const ReadingProgressController = require('../controllers/readingProgressController');

// Author Routes
router.get('/authors', AutorController.getAllAuthors);
router.get('/authors/:id', AutorController.getAuthorById);
router.post('/authors', AutorController.createAuthor);
router.put('/authors/:id', AutorController.updateAuthor);
router.delete('/authors/:id', AutorController.deleteAuthor);

// Book Routes
router.get('/books', BookController.getAllBooks);
router.get('/books/:id', BookController.getBookById);
router.post('/books', BookController.createBook);
router.put('/books/:id', BookController.updateBook);
router.delete('/books/:id', BookController.deleteBook);

// Bookmark Routes
router.post('/bookmarks', BookmarkController.createBookmark);
router.get('/bookmarks/user/:userId/book/:bookId', BookmarkController.getUserBookmarksByBook);
router.delete('/bookmarks/:id', BookmarkController.deleteBookmark);

// Reading Progress Routes
router.post('/reading-progress', ReadingProgressController.createReadingProgress);
router.get('/reading-progress/user/:userId/book/:bookId', ReadingProgressController.getReadingProgress);
router.put('/reading-progress/user/:userId/book/:bookId', ReadingProgressController.updateReadingProgress);
 
module.exports = router;
