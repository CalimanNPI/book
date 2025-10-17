const { Author } = require('../models');

class AuthorController {
    // Obtener todos los autores
    async getAllAuthors(req, res) {
        try {
            const authors = await Author.findAll();
            res.json(authors);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    // Obtener autor por ID
    async getAuthorById(req, res) {
        try {
            const author = await Author.findByPk(req.params.id);
            if (!author) {
                return res.status(404).json({ error: 'Autor no encontrado' });
            }
            res.json(author);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    // Crear nuevo autor
    async createAuthor(req, res) {

        try {
            const author = await Author.create(req.body);
            res.status(201).json(author);
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }

    // Actualizar autor 
    async updateAuthor(req, res) {
        try {
            const author = await Author.findByPk(req.params.id);
            if (!author) {
                return res.status(404).json({ error: 'Autor no encontrado' });
            }
            await author.update(req.body);
            res.json(author);
        } catch (error) {
            res.status(400).json({ error: error.message });
        }

    }

    // Eliminar autor
    async deleteAuthor(req, res) {
        try {
            const author = await Author.findByPk(req.params.id);
            if (!author) {
                return res.status(404).json({ error: 'Autor no encontrado' });
            }
            await author.destroy();
            res.status(204).send();
        }
        catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    // Obtener libros del autor
    async getAuthorBooks(req, res) {
        try {
            const author = await Author.findByPk(req.params.id, { include: 'books' });
            if (!author) {
                return res.status(404).json({ error: 'Autor no encontrado' });
            }
            res.json(author.books);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
}
module.exports = new AuthorController();