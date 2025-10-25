const express = require("express");
const cors = require("cors");

require('./models/index');

// Initializations  
const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//setting
app.set("port", process.env.PORT || 3000);

//routes
app.use('/users', require('./routes/userRoutes'));
app.use('/uploads', require('./routes/uploadRoutes'));
app.use('/books', require('./routes/bookRoutes'));
app.use('/auth', require('./routes/authRoutes'));

app.listen(app.get("port"), () => {
  console.log(`Servidor corriendo en http://localhost:${app.get("port")}`);
}); 