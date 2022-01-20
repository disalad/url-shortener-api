const router = require('express').Router();
const ShortUrlController = require('../controllers/shorturl');

router.get('/:id', (req, res) => {
    res.status(503).json({ message: "This route hasn't finished yet" });
});

router.post('/', ShortUrlController.newShortUrl);

module.exports = router;
