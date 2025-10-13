const fs = require('fs');
const pdf = require('pdf-parse');

class PdfService {
    constructor(filePath) {
        this.filePath = filePath;
    }

    async getMetadata() {
        const dataBuffer = fs.readFileSync(this.filePath);
        const data = await pdf(dataBuffer);
        return {
            info: data.info,
            numPages: data.numpages,
            text: data.text.substring(0, 500) + '...' // Primeros 500 caracteres
        };
    }

    async getPage(pageNumber) {
        const dataBuffer = fs.readFileSync(this.filePath);
        const data = await pdf(dataBuffer, {
            pagerender: (pageData) => {
                return pageData.getTextContent().then(textContent => {
                    return textContent.items.map(item => item.str).join(' ');
                });
            }
        });
        return data.text;
    }
    
    async getCover() {
        // Los PDFs no tienen una "portada" estándar, pero podríamos devolver la primera página como imagen
        const dataBuffer = fs.readFileSync(this.filePath);
        const data = await pdf(dataBuffer);
        return data.text.split('\n').slice(0, 10).join(' '); // Primeras 10 líneas como "portada"
    }
}

module.exports = PdfService;