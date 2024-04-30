const express = require('express');
const router = express.Router();
const controllerMusic = require('./../controllers/musics.js');

// Route pour la racine de l'API
router.get('/', (req, res) => {
    res.status(200).json({ message: 'Welcome to the Music API' });
});

// Autres routes de l'API
router.post('/', (req, res) => {
    res.status(200).json({ message: 'Bravo' });
});

router.get('/musics', controllerMusic.find);
router.get('/musics/:id', controllerMusic.findById);
router.get('/musics/random', controllerMusic.random);
router.post('/musics', controllerMusic.create);

module.exports = router;

