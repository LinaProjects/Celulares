const mongoose = require('mongoose');
require('dotenv').config(); // Carga las variables de entorno

const connectDB = async () => {
    try {
        console.log("Mongo URI:", process.env.MONGO_URI); // Imprime la URI para depuración

        await mongoose.connect(process.env.MONGO_URI, {
            useUnifiedTopology: true, // Mantén esta opción para habilitar el nuevo motor de topología
        });

        console.log("MongoDB Connected");
    } catch (error) {
        console.error("Error connecting to MongoDB:", error);
        process.exit(1); // Salir del proceso con un error
    }
};

module.exports = connectDB;
