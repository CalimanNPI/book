const fs = require('fs');
const path = require('path');

class FileController {

    constructor() {
        this.configFile = path.join(__dirname, '..', 'config', 'fileConfig.json');
        this.ensureConfigDirectory();
    }

    ensureConfigDirectory() {
        const configDir = path.dirname(this.configFile);
        if (!fs.existsSync(configDir)) {
            fs.mkdirSync(configDir, { recursive: true });
        }

        // Inicializar archivo de configuración si no existe
        if (!fs.existsSync(this.configFile)) {
            this.initializeConfigFile();
        }
    }

    initializeConfigFile() {
        const initialConfig = {
            selectedDirectory: null,
            history: [],
            lastUpdated: new Date().toISOString(),
            version: "1.0.0"
        };
        fs.writeFileSync(this.configFile, JSON.stringify(initialConfig, null, 2));
    }

    loadDataConfig() {
        try {
            const fileContent = fs.readFileSync(this.configFile, 'utf8');
            return JSON.parse(fileContent);
        } catch (error) {
            console.error('Error loading config, reinitializing:', error);
            this.initializeConfigFile();
            //return this.loadData();
        }
    }

    // Función para verificar si una ruta es un directorio
    async selectDirectory(req, res) {
        try {
            if (!req.body || !req.body.path) {
                return res.status(400).json({ error: 'La ruta es requerida en el cuerpo de la petición' });
            }

            const absolutePath = path.resolve(req.body.path);

            if (!fs.existsSync(absolutePath)) {
                return res.status(400).json({ error: 'La ruta no existe' });
            }

            const stats = fs.statSync(absolutePath);

            if (!stats.isDirectory()) {
                return res.status(400).json({ error: 'La ruta proporcionada no es un directorio' });
            }

            // Cargar configuración actual
            const config = this.loadDataConfig();
            //
            // // Actualizar configuración
            // const previousDirectory = config.selectedDirectory;
            // config.selectedDirectory = absolutePath;
            // config.lastUpdated = new Date().toISOString();
            //
            // // Agregar al historial (máximo 10 entradas)
            // if (previousDirectory && previousDirectory !== absolutePath) {
            //     config.history.unshift({
            //         path: absolutePath,
            //         timestamp: config.lastUpdated
            //     });
            //
            //     // Mantener solo los últimos 10 elementos
            //     config.history = config.history.slice(0, 10);
            // }
            //
            // // Guardar configuración
            // this.saveConfig(config);
            //
            // console.log(`Directorio seleccionado: ${absolutePath}`);
            // res.status(200).json({
            //     message: 'Directorio seleccionado correctamente',
            //     path: absolutePath,
            //     history: config.history
            // });

        } catch (error) {
            console.error('Error en selectDirectory:', error);
            res.status(500).json({
                error: 'Error interno del servidor',
                details: error.message

            });
        }
    }


    async getFilesInDirectory(ruta) {
        try {
            const rutaAbsoluta = path.resolve(ruta);
            const files = fs.readdirSync(rutaAbsoluta);
            const extensions = ['.epub', '.pdf', '.cbz', '.mobi', '.txt'];
            return files.filter(file => extensions.includes(path.extname(file)));
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

}

module.exports = new FileController();