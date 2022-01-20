const router = require('express').Router();

router.get('/', (req, res) => {
    const fullUrl = req.protocol + '://' + req.get('host') + req.originalUrl;
    res.status(200).json({
        'api endpoints': [`${fullUrl}api/shorturl`],
    });
});

module.exports = router;
