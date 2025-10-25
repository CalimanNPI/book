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
app.use('/api', require('./routes/userRoutes'));
app.use('/api', require('./routes/uploadRoutes'));
app.use('/api', require('./routes/bookRoutes'));
app.use('/api', require('./routes/authRoutes'));

app.listen(app.get("port"), () => {
  console.log(`Servidor corriendo en http://localhost:${app.get("port")}`);
}); 