

class FileReader {
    // Función para escanear archivos en una carpeta
    async escanearArchivos(carpetaPath) {
        try {
            const archivos = await fs.readdir(carpetaPath);
            const resultado = [];

            for (const archivo of archivos) {
                const archivoPath = path.join(carpetaPath, archivo);
                const stats = await fs.stat(archivoPath);

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