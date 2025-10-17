const Colleaction = require('../models/Collection');

class CollectionController {
    // Obtener todas las colecciones
    async getAllCollections(req, res) {
        try {
            const collections = await Collection.findAll();
            res.json(collections);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    // Obtener colección por ID
    async getCollectionById(req, res) {
        try {
            const collection = await Collection.findByPk(req.params.id);
            if (!collection) {
                return res.status(404).json({ error: 'Colección no encontrada' });
            }
            res.json(collection);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    // Crear nueva colección
    async createCollection(req, res) {
        try {
            const collection = await Collection.create(req.body);
            res.status(201).json(collection);
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }

    // Actualizar colección
    async updateCollection(req, res) {
        try {
            const collection = await Collection.findByPk(req.params.id);
            if (!collection) {
                return res.status(404).json({ error: 'Colección no encontrada' });
            }
            await collection.update(req.body);
            res.json(collection);
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }
    
    // Eliminar colección
    async deleteCollection(req, res) {
        try {
            const collection = await Collection.findByPk(req.params.id);
            if (!collection) {
                return res.status(404).json({ error: 'Colección no encontrada' });
            }
            await collection.destroy();
            res.status(204).end();
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    // Obtener libros de una colección
    async getCollectionBooks(req, res) {
        try {
            const collection = await Collection.findByPk(req.params.id);
            if (!collection) {
                return res.status(404).json({ error: 'Colección no encontrada' });
            }
            const books = await collection.getBooks();
            res.json(books);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    // Añadir libro a una colección
    async addBookToCollection(req, res) {
        try {
            const collection = await Collection.findByPk(req.params.id);
            if (!collection) {
                return res.status(404).json({ error: 'Colección no encontrada' });
            }
            await collection.addBook(req.body.bookId);
            res.status(200).json({ message: 'Libro añadido a la colección' });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    // Eliminar libro de una colección
    async removeBookFromCollection(req, res) {
        try {
            const collection = await Collection.findByPk(req.params.id);
            if (!collection) {
                return res.status(404).json({ error: 'Colección no encontrada' });
            }
            await collection.removeBook(req.body.bookId);
            res.status(200).json({ message: 'Libro eliminado de la colección' });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }


}

module.exports = new CollectionController();

