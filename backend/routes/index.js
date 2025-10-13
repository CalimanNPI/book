const FileSystemController = require("../controllers/FileSystemController");

const router = require("express").Router();

class ApiRouter {
    constructor() {
        this.router = router
        //this.router.disable('x-powered-by')
        this.init()
    }

    init() {
        // Rutas para diferentes tipos de archivos
        //
        // User Routes
        //
        // this.router.post('/users', UserController.middleware.bind(this), UserController.create.bind(this))
        // this.router.get('/users', UserController.middleware.bind(this), UserController.findAll.bind(this))
        // this.router.get('/users/online', UserController.getOnlineUsers.bind(this))
        // this.router.get('/users/:id', UserController.middleware.bind(this), UserController.findOne.bind(this))
        // this.router.patch('/users/:id', UserController.middleware.bind(this), UserController.update.bind(this))
        // this.router.delete('/users/:id', UserController.middleware.bind(this), UserController.delete.bind(this))
        // this.router.patch('/users/:id/openid-unlink', UserController.middleware.bind(this), UserController.unlinkFromOpenID.bind(this))
        // this.router.get('/users/:id/listening-sessions', UserController.middleware.bind(this), UserController.getListeningSessions.bind(this))
        // this.router.get('/users/:id/listening-stats', UserController.middleware.bind(this), UserController.getListeningStats.bind(this))
        // this.router.post('/users/:id/avatar', UserController.middleware.bind(this), UserController.uploadAvatar.bind(this))
        // this.router.delete('/users/:id/avatar', UserController.middleware.bind(this), UserController.deleteAvatar.bind(this))

        //
        // File System Routes
        //
                this.router.get('/filesystem', FileSystemController.getPaths.bind(this))
                this.router.post('/filesystem/pathexists', FileSystemController.checkPathExists.bind(this))            
        //
        // Author Routes
        //
        //   this.router.get('/authors/:id', AuthorController.middleware.bind(this), AuthorController.findOne.bind(this))
        //   this.router.patch('/authors/:id', AuthorController.middleware.bind(this), AuthorController.update.bind(this))
        //   this.router.delete('/authors/:id', AuthorController.middleware.bind(this), AuthorController.delete.bind(this))
        //   this.router.post('/authors/:id/match', AuthorController.middleware.bind(this), AuthorController.match.bind(this))
        //   this.router.get('/authors/:id/image', AuthorController.getImage.bind(this))
        //   this.router.post('/authors/:id/image', AuthorController.middleware.bind(this), AuthorController.uploadImage.bind(this))
        //   this.router.delete('/authors/:id/image', AuthorController.middleware.bind(this), AuthorController.deleteImage.bind(this))

        //
        // Series Routes
        //
        //   this.router.get('/series/:id', SeriesController.middleware.bind(this), SeriesController.findOne.bind(this))
        //   this.router.patch('/series/:id', SeriesController.middleware.bind(this), SeriesController.update.bind(this))

        //
        // Custom Metadata Provider routes
        //
        //  this.router.get('/custom-metadata-providers', CustomMetadataProviderController.middleware.bind(this), CustomMetadataProviderController.getAll.bind(this))
        //  this.router.post('/custom-metadata-providers', CustomMetadataProviderController.middleware.bind(this), CustomMetadataProviderController.create.bind(this))
        //  this.router.delete('/custom-metadata-providers/:id', CustomMetadataProviderController.middleware.bind(this), CustomMetadataProviderController.delete.bind(this))


    }
}




module.exports = ApiRouter