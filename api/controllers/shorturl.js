const ShortUrl = require('../models/ShortUrl');
const { nanoid } = require('nanoid');

exports.newShortUrl = (req, res, next) => {
    const url = req.body.original_url;
    // Check whether URL is valid or not
    const isValidUrl =
        /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/.test(
            url
        );

    // Create new URL if the entered URL is valid otherwise send error response
    if (isValidUrl) {
        const domainUrl = req.protocol + '://' + req.get('host');
        const id = nanoid(10);
        const shortenedUrl = `${domainUrl}/api/shorturl/${id}`;

        // Create new shortened URL in the database
        ShortUrl.create({ originalUrl: url, shortenedUrl: shortenedUrl, shortenedId: id });
        res.status(201).json({ original_url: url, id: id, shortenedUrl: shortenedUrl });
    } else {
        res.json({
            error: 'Invalid URL. Please make sure you have entered the URL with the protocol',
        });
    }
};

exports.redirectToShortenedUrl = (req, res, next) => {
    const id = req.params.id;
    ShortUrl.findOne({ shortenedId: id })
        .then(result => {
            // Throws an error if the id is not found on the db
            if (!result) {
                const error = new Error('Shortened URL not found');
                error.code = 404;
                throw error;
            }
            return result;
        })
        .then(result => {
            res.status(302).redirect(result.originalUrl);
        })
        .catch(err => {
            res.status(err.code || 500).json({ error: err.message });
        });
};
