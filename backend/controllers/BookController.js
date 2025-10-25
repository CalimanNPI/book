const { Book, Author } = require("../models");

class BookController {
  // Obtener todos los libros
  async getAllBooks(req, res) {
    try {
      const books = await Book.findAll();
      res.json(books);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  // Obtener libro por ID
  async getBookById(req, res) {
    try {
      const book = await Book.findByPk(req.params.id);
      if (!book) {
        return res.status(404).json({ error: "Libro no encontrado" });
      }
      const author = await Author.findByPk(book.authorId);
      res.json({ book, author });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  // Crear nuevo libro
  async createBook(req, res) {
    try {
      const book = await Book.create(req.body);
      res.status(201).json(book);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  // Actualizar libro
  async updateBook(req, res) {
    try {
      const book = await Book.findByPk(req.params.id);
      if (!book) {
        return res.status(404).json({ error: "Libro no encontrado" });
      }
      await book.update(req.body);
      res.json(book);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  // Eliminar libro
  async deleteBook(req, res) {
    try {
      const book = await Book.findByPk(req.params.id);
      if (!book) {
        return res.status(404).json({ error: "Libro no encontrado" });
      }
      await book.destroy();
      res.status(204).end();
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
}
module.exports = new BookController();
