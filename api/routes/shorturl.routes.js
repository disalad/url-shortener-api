const router = require('express').Router();
const ShortUrlController = require('../controllers/shorturl');

router.post('/', ShortUrlController.newShortUrl);

router.get('/:id', ShortUrlController.redirectToShortenedUrl);

module.exports = router;
