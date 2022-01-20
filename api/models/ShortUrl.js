const mongoose = require('mongoose');

const ShortUrlSchema = mongoose.Schema({
    originalUrl: {
        type: String,
        required: true,
        match: /[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)?/gi,
    },
    shortenedUrl: {
        type: String,
        required: true,
    },
});
module.exports = mongoose.model('ShortUrl', ShortUrlSchema);
