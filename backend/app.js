const express = require("express");
const path = require("path");
const cors = require("cors");

require('./models/index');

const userRoutes = require('./routes/userRoutes');

// Initializations  
const app = express();

// Middleware
app.use(cors());
app.use(express.json());

//setting
app.set("port", process.env.PORT || 3001);

//routes
app.use('/users', userRoutes);

require('./config/database');

app.listen(app.get("port"), () => {
  console.log(`Servidor corriendo en http://localhost:${app.get("port")}`);
});