// epubReader.js
const fs = require('fs');
const path = require('path');
const AdmZip = require('adm-zip');
const xml2js = require('xml2js');

class EpubService {
    constructor(filePath) {
        this.filePath = filePath;
        this.zip = new AdmZip(filePath);
    }

    async getMetadata() {
        const containerXml = this.zip.readAsText('META-INF/container.xml');
        const parser = new xml2js.Parser();
        const container = await parser.parseStringPromise(containerXml);
        
        const opfPath = container.container.rootfiles[0].rootfile[0].$['full-path'];
        const opfContent = this.zip.readAsText(opfPath);
        const opf = await parser.parseStringPromise(opfContent);
        
        return opf.package.metadata[0];
    }

    async getTableOfContents() {
        // Implementar lógica para obtener el índice
        const containerXml = this.zip.readAsText('META-INF/container.xml');
        const parser = new xml2js.Parser();
        const container = await parser.parseStringPromise(containerXml);
        const opfPath = container.container.rootfiles[0].rootfile[0].$['full-path'];
        const opfContent = this.zip.readAsText(opfPath);
        const opf = await parser.parseStringPromise(opfContent);
        const manifest = opf.package.manifest[0].item;
        const spine = opf.package.spine[0].itemref;
        
        const toc = spine.map(itemref => {
            const idref = itemref.$.idref;
            const item = manifest.find(i => i.$.id === idref);
            return {
                id: idref,
                href: item.$.href,
                mediaType: item.$['media-type']
            };
        });
        return toc;
    }

    async getChapterContent() {
        const toc = await this.getTableOfContents();
        const chapters = {};
        for (const item of toc) {
            const content = this.zip.readAsText(item.href);
            chapters[item.id] = content;
        }
        return chapters;    
    }

    async getCover() {
        const metadata = await this.getMetadata();
        const coverId = metadata['meta'].find(m => m.$.name === 'cover').$.content;
        const containerXml = this.zip.readAsText('META-INF/container.xml');
        const parser = new xml2js.Parser();
        const container = await parser.parseStringPromise(containerXml);
        const opfPath = container.container.rootfiles[0].rootfile[0].$['full-path'];
        const opfContent = this.zip.readAsText(opfPath);
        const opf = await parser.parseStringPromise(opfContent);
        const manifest = opf.package.manifest[0].item;
        const coverItem = manifest.find(i => i.$.id === coverId);
        return coverItem ? coverItem.$.href : null;
    }
}

module.exports = EpubService;