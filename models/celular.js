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
