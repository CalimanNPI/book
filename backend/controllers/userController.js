const { User } = require("../models");

class UserController {
  // Obtener todos los usuarios
  async getAllUsers(req, res) {
    try {
      const users = await User.findAll();
      res.json(users);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  // Obtener usuario por ID
  async getUserById(req, res) {
    try {
      const user = await User.findByPk(req.params.id);
      if (!user) {
        return res.status(404).json({ error: "Usuario no encontrado" });
      }
      res.json(user);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  // Crear nuevo usuario
  async createUser(req, res) {
    try {
      const { email, password, name } = req.body;
      const hashedPassword = await bcryptjs.hash(password, 10);
      const [user, created] = await User.findOrCreate({
        where: { email },
        defaults: { password: hashedPassword, name: name, email: email },
      });

      if (!created) {
        return res.status(409).json({ error: "User already exists" });
      }

      res.status(201).json(user);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  // Actualizar usuario
  async updateUser(req, res) {
    try {
      const user = await User.findByPk(req.params.id);
      if (!user) {
        return res.status(404).json({ error: "Usuario no encontrado" });
      }

      await user.update(req.body);
      res.json(user);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  // Eliminar usuario
  async deleteUser(req, res) {
    try {
      const user = await User.findByPk(req.params.id);
      if (!user) {
        return res.status(404).json({ error: "Usuario no encontrado" });
      }

      await user.destroy();
      res.status(204).send();
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
}

module.exports = new UserController();
