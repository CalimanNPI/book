const router = require("express").Router();
const AuthController = require("../auth");

// Rutas de autenticación
router.post("/register", AuthController.register.bind(AuthController));
router.post("/login", AuthController.login.bind(AuthController));
router.get("/verify-token", AuthController.verifyToken.bind(AuthController));
router.post("/logout", AuthController.logout.bind(AuthController));

module.exports = router;
