const router = require("express").Router();

// Rutas para diferentes tipos de archivos
// app.post('/upload', upload.single('file'), (req, res) => {
//     // Lógica para procesar el archivo subido
// });

router.get('/', (req, res) => {
    res.send("prueba de ruta")

});
router.get('/book/:filename', (req, res) => {
    // Servir contenido 
});

router.get('/book/:filename/reader', (req, res) => {
    // Servir contenido 
});

router.get('/books', (req, res) => {
    // Servir contenido 
});

router.get('/authors', (req, res) => {
    // Servir contenido 
});

router.get('/upload', (req, res) => {
    // Servir contenido 
});

router.get('/config', (req, res) => {
    // Servir contenido 
});

router.get('/stats', (req, res) => {
    // Servir contenido 
});

router.get('/logs', (req, res) => {
    // Servir contenido 
});

module.exports = router;