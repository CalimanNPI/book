const express = require("express");
const path = require("path");
const cors = require("cors");

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
// app.use(express.static("public"));
// app.use('/uploads', express.static('uploads'));

//setting
app.set("port", process.env.PORT || 3001);

//routes
app.use(require("./routes/index"));

console.log("object");

app.listen(app.get("port"), () => {
  console.log(`Servidor corriendo en http://localhost:${app.get("port")}`);
});