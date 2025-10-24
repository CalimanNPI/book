const fs = require('fs');
const path = require('path');
const EPub = require('epub2').EPub;

const authorController = require('../controllers/authorController')
async function scanDirectory(dirPath, extensions) {
    try {
        console.log("INICIO SCAN DIRECTORY");
        const files = fs.readdirSync(dirPath)
            .filter(file => extensions.includes(path.extname(file).toLowerCase()))
            .map(file => ({
                name: path.basename(file),
                extension: path.extname(file).toLowerCase(),
                fullPath: path.join(dirPath, file)
            }));
        console.log(`Found ${files.length} files with specified extensions.`);
        for (const file of files) {
            let data = await getMetadataEpub(file);

            authorController.saveAutorBooks(data);
        }

    } catch (error) {
        console.log("Error scanning directory: ", error);
    }
}


async function getMetadataEpub(file) {
    const bookPath = file.fullPath;
    const metadata = await EPub.createAsync(bookPath);
    const data = {
        title: metadata.metadata.title,
        author: metadata.metadata.creator,
        publisher: metadata.metadata.publisher,
        metadata: {
            date: metadata.metadata.date,
            language: metadata.metadata.language,
            description: metadata.metadata.description,
            subject: metadata.metadata.subject,
            cover: metadata.metadata.cover,
            creatorFileAs: metadata.metadata.creatorFileAs,
        },
        extension: file.extension,
        fullPath: file.fullPath,
    };


    console.log(data)

    return data;
}


async function getmetadata2(file) {
    try {
        const filePath = file.fullPath;
        const epub = await EPub.createAsync(filePath);
        const data = {
            title: epub.metadata.title,
            author: epub.metadata.creator,
            publisher: epub.metadata.publisher,
            date: epub.metadata.date,
            language: epub.metadata.language,
            description: epub.metadata.description,
            subject: epub.metadata.subject,
            extension: file.extension,
            fullPath: file.fullPath,
        };
        return data;
    } catch (error) {
        // Si hay un error, lanzamos una excepción para que sea manejada.
        console.error(`Error al leer el EPUB: ${epubfile}`, error);
        throw error;
    }
}

function getChaptersEpub(epub) {
    epub.flow.forEach((chapter) => {
        console.log(`${chapter.id}- ${chapter.title}`);
    });
}

module.exports = { scanDirectory };