const express = require('express');
const { getRandom, getRandomImage } = require('../controllers/pokeneaController');

const router = express.Router();

router.get('/random', getRandom);
router.get('/random/image', getRandomImage);

module.exports = router;


