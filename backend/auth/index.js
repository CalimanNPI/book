const bcryptjs = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

const JWT_SECRET = 'your_jwt_secret'; // Cambia esto por una clave secreta segura

class AuthController {
    // Registro de usuario
    async register(req, res) {
        try {
            const { email, password } = req.body;
            const hashedPassword = await bcryptjs.hash(password, 10);
            const user = await User.create({ email, password: hashedPassword });
            res.status(201).json(user);
        } catch (error) {
            console.error('Error en el registro:', error);
            res.status(500).json({ error: 'Error en el registro' });
        }
    }

    // Inicio de sesión
    async login(req, res) {
        try {
            const { email, password } = req.body;
            const user = await User.findOne({ where: { email } });
            if (user && (await bcryptjs.compare(password, user.password))) {
                const token = jwt.sign({ id: user.id }, JWT_SECRET, { expiresIn: '1h' });
                res.status(200).json({ user, token });
            } else {
                res.status(401).json({ error: 'Credenciales inválidas' });
            }
        } catch (error) {
            console.error('Error en el inicio de sesión:', error);
            res.status(500).json({ error: 'Error en el inicio de sesión' });
        }
    }

    // Verificación de token
    verifyToken(req, res) {
        const token = req.headers['authorization'];
        if (!token) return res.status(401).json({ error: 'No token provided' });
        jwt.verify(token, JWT_SECRET, (err, decoded) => {
            if (err) return res.status(401).json({ error: 'Failed to authenticate token' });
            req.userId = decoded.id;
            res.status(200).json({ message: 'Token is valid' });
        });
    }

    // Cierre de sesión (opcional, dependiendo de la implementación)
    logout(req, res) {
        // En una implementación basada en tokens, el logout puede ser manejado en el cliente
        res.status(200).json({ message: 'Logged out successfully' });
    }
}

module.exports = new AuthController();
