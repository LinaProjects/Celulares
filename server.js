require('dotenv').config(); // Cargar variables de entorno desde el archivo .env
const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const cors = require('cors');

// Crear una instancia de Express
const app = express();
const port = process.env.PORT || 3000; // Usa el puerto de .env o el predeterminado

// Configuración de middlewares
app.use(cors());
app.use(express.json());

// Conectar a MongoDB usando Mongoose
mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        console.log("¡Conectado a MongoDB con Mongoose!");
    })
    .catch(err => {
        console.error("Error conectando a MongoDB:", err);
    });

// Rutas de la API
app.use("/api/signup", require("./auth-back/routes/signup.js"));
app.use("/api/login", require("./auth-back/routes/login.js"));
app.use("/api/user", require("./auth-back/routes/user.js"));
app.use("/api/logout", require("./auth-back/routes/logout.js"));
app.use("/api/posts", require("./auth-back/routes/posts.js"));
app.use("/api/refreshToken", require("./auth-back/routes/refreshToken.js"));
app.use("/api/celulares", require("./routes/celulares.js")); // Agregar ruta para celulares

// Servir archivos estáticos desde la carpeta 'public'
app.use(express.static(path.join(__dirname, 'public')));

// Ruta para servir la página principal (index.html)
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'html', '1index.html'));
});

// Ruta para servir cualquier archivo HTML en la carpeta 'html'
app.get('/:page', (req, res) => {
    const page = req.params.page;
    const filePath = path.join(__dirname, 'public', 'html', `${page}.html`);
    res.sendFile(filePath, err => {
        if (err) {
            res.status(404).send('Página no encontrada');
        }
    });
});

// Ruta para manejar solicitudes con '.html' en la URL
app.get('/:page.html', (req, res) => {
    const page = req.params.page;
    const filePath = path.join(__dirname, 'public', 'html', `${page}.html`);
    res.sendFile(filePath, err => {
        if (err) {
            res.status(404).send('Página no encontrada');
        }
    });
});

// Configuración para servir la aplicación React desde la carpeta 'build'
if (process.env.NODE_ENV === 'production') {
    // Sirve archivos estáticos desde la carpeta 'client/build' en producción
    app.use(express.static(path.join(__dirname, 'client/build')));

    // Cualquier ruta que no sea una API es manejada por React
    app.get('*', (req, res) => {
        res.sendFile(path.join(__dirname, 'client', 'build', 'index.html'));
    });
} else {
    // En desarrollo, sirve archivos estáticos desde la carpeta 'public'
    app.use(express.static(path.join(__dirname, 'public')));

    // Ruta para servir la página principal (index.html) si estás usando un HTML inicial
    app.get('/', (req, res) => {
        res.sendFile(path.join(__dirname, 'public', 'html', '1index.html'));
    });

    // Ruta para servir cualquier archivo HTML en la carpeta 'html'
    app.get('/:page', (req, res) => {
        const page = req.params.page;
        const filePath = path.join(__dirname, 'public', 'html', `${page}.html`);
        res.sendFile(filePath, err => {
            if (err) {
                res.status(404).send('Página no encontrada');
            }
        });
    });

    // Ruta para manejar solicitudes con '.html' en la URL
    app.get('/:page.html', (req, res) => {
        const page = req.params.page;
        const filePath = path.join(__dirname, 'public', 'html', `${page}.html`);
        res.sendFile(filePath, err => {
            if (err) {
                res.status(404).send('Página no encontrada');
            }
        });
    });
}

// Iniciar el servidor
app.listen(port, () => {
    console.log(`Servidor corriendo en http://localhost:${port}`);
});
