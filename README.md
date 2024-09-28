
# Cambios Realizados en el Proyecto

1. **Modelo de Celular**:
   Se creó un modelo de Mongoose para los celulares en el archivo `models/Celular.js`.

   ```javascript
   const mongoose = require('mongoose');

   const CelularSchema = new mongoose.Schema({
       nombre: { type: String, required: true },
       marca: { type: String, required: true },
       price: { type: Number, required: true },
       storage: { type: String, required: true },
       camera: { type: String, required: true },
       connectivity: { type: String, required: true },
       ram: { type: String, required: true },
       screen_type: { type: String, required: true },
       warranty: { type: String, required: true }
   });

   module.exports = mongoose.model('Celular', CelularSchema);
   ```

2. **Rutas para Celulares**:
   Se creó un archivo `routes/celulares.js` que maneja las rutas para obtener y agregar celulares.

   ```javascript
   const express = require('express');
   const router = express.Router();
   const Celular = require('../models/Celular');

   // Ruta para obtener todos los celulares
   router.get('/', async (req, res) => {
       try {
           const celulares = await Celular.find();
           res.json(celulares);
       } catch (err) {
           res.status(500).json({ message: err.message });
       }
   });

   // Ruta para crear un nuevo celular
   router.post('/', async (req, res) => {
       const celular = new Celular(req.body);
       try {
           const savedCelular = await celular.save();
           res.status(201).json(savedCelular);
       } catch (err) {
           res.status(400).json({ message: err.message });
       }
   });

   module.exports = router;
   ```

3. **Archivo Principal del Servidor**:
   Se actualizó `server.js` para incluir la nueva ruta de celulares.

   ```javascript
   // Agregar la ruta para celulares
   app.use("/api/celulares", require("./routes/celulares.js"));
   ```

4. **Configuración del Archivo `.env`**:
   Asegúrate de tener una variable de entorno para la conexión a MongoDB.

   ```plaintext
   MONGO_URI=tu_cadena_de_conexion_a_mongodb
   ```

## Instrucciones para Iniciar el Proyecto

1. **Instala las Dependencias**:
   Si no lo has hecho, instala las dependencias necesarias en tu proyecto:

   ```bash
   npm install express mongoose cors dotenv
   ```

2. **Ejecuta el Servidor**:
   Inicia tu servidor usando:

   ```bash
   node server.js
   ```

3. **Prueba la API**:
   Puedes probar tu API usando herramientas como Postman para enviar solicitudes a `http://localhost:3000/api/celulares` para obtener la lista de celulares o para agregar nuevos celulares.
