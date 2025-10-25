const fs = require("fs");
const path = require("path");
const EPub = require("epub2").EPub;

const authorController = require("../controllers/authorController");
async function scanDirectory(dirPath, extensions) {
  try {
    console.log("INICIO SCAN DIRECTORY");
    const files = fs
      .readdirSync(dirPath)
      .filter((file) => extensions.includes(path.extname(file).toLowerCase()))
      .map((file) => ({
        name: path.basename(file),
        extension: path.extname(file).toLowerCase(),
        fullPath: path.join(dirPath, file),
      }));
    console.log(`Found ${files.length} files with specified extensions.`);
    for (const file of files) {
      let data = await getMetadataEpub(file);
      await authorController.saveAuthorBooks(data);
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
  return data;
}

module.exports = { scanDirectory };
