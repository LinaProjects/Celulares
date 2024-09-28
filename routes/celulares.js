const express = require('express');
const router = express.Router();
const Celular = require('../models/celular');

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
