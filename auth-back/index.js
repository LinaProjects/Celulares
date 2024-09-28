const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const authenticateToken = require("./auth/authenticateToken");
const log = require("./lib/trace");
require("dotenv").config();

// Inicialización de la app
const app = express();
app.use(express.json());
app.use(cors());

// Configurar el puerto
const port = process.env.PORT || 3000;

// Conectar a la base de datos
mongoose.connect(process.env.DB_CONNECTION_STRING, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

mongoose.connection.on("connected", () => {
  console.log("Conectado a la base de datos MongoDB");
});

mongoose.connection.on("error", (err) => {
  console.error("Error en la conexión a la base de datos:", err);
});

// Rutas de la API
app.use("/api/signup", require("./routes/signup"));
app.use("/api/login", require("./routes/login"));
app.use("/api/signout", require("./routes/logout"));

// Ruta para renovar el token de acceso utilizando el token de actualización
app.use("/api/refresh-token", require("./routes/refreshToken"));

// Rutas protegidas
app.use("/api/posts", authenticateToken, require("./routes/posts"));
app.use("/api/user", authenticateToken, require("./routes/user"));

// Iniciar el servidor
app.listen(port, () => {
  console.log(`Servidor corriendo en el puerto ${port}`);
});

module.exports = app;
