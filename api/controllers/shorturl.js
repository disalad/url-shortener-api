const ShortUrl = require('../models/ShortUrl');
const { nanoid } = require('nanoid');

exports.newShortUrl = (req, res, next) => {
    const url = req.body.original_url;
    // Check whether URL is valid or not
    const isValidUrl =
        /[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)?/gi.test(
            url
        );

    // Create new URL if the entered URL is valid otherwise send error response
    if (isValidUrl) {
        const domainUrl = req.protocol + '://' + req.get('host');
        const id = nanoid(10);
        const shortenedUrl = `${domainUrl}/shorturl/${id}`;

        // Create new shortened URL in the database
        ShortUrl.create({ originalUrl: url, shortenedUrl: shortenedUrl });
        res.status(201).json({ original_url: url, id: id, shortenedUrl: shortenedUrl });
    } else {
        res.json({ error: 'Invalid URL' });
    }
};

exports.redirectToShortenedUrl = (req, res, next) => {};
