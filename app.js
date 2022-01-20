const express = require('express');
const app = express();
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();

// Routes imports
const shortUrlRoute = require('./api/routes/shorturl.routes');
const indexRoute = require('./api/routes/index.routes');

// DB init
mongoose.connect(process.env.MONGODB_URI, () => {
    console.log('CONNECTED TO MONGODB');
});
mongoose.set('debug', true);

// Middleware
app.use(
    cors({
        origin: true,
        methods: ['GET', 'POST', 'OPTIONS', 'HEAD'],
    })
);
app.use(express.json());
app.use(
    express.urlencoded({
        extended: true,
    })
);

// Routes
app.use('/', indexRoute);

app.use('/api/shorturl', shortUrlRoute);

app.use((req, res, next) => {
    res.status(404).json({ message: 'URL Not Found' });
});

// Server
const server = app.listen(process.env.PORT || 3000, () => {
    const port = server.address().port;
    console.log(`Express is listening on port ${port}`);
});
