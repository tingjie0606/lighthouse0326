const compression = require('compression');
const express = require('express');
const path = require('path');
const app = express();

// Enable Gzip compression
app.use(compression());

// Serve pre-compressed .gz files for JavaScript
app.get('*.js', (req, res, next) => {
    const gzippedFile = req.url + '.gz';
    res.set('Content-Encoding', 'gzip');
    res.set('Content-Type', 'application/javascript');
    res.sendFile(path.join(__dirname, 'settle-html', gzippedFile), (err) => {
        if (err) next();
    });
});

// Serve static files from the "settle-html" directory
app.use(express.static('settle-html'));

// Start the server
app.listen(3000, () => {
    console.log('Server is running on http://localhost:3000');
});