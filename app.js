const express = require('express');
const cors = require('cors');
const compression = require('compression');
const path = require('path');
const querystring = require('querystring');
const requests = require('request');
const BadRequestError = require('http-errors').BadRequestError;
const config = require('./config/config');

const app = express();

// wrapper function propagetes err to error handling
const wrap = fn => (...args) => fn(...args).catch(args[2]);

// zip all requests
app.use(compression());
// open cors in development mode
if (config.cors) app.use(cors());
app.use('/node_modules', express.static(__dirname + '/node_modules/'));
app.use(express.static(path.join(__dirname, 'dist')));

// error handling
app.use((err, req, res, next) => {
    if (err) {
        return res.status(500).json(err);
    }
})

// serve angular index.html
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/dist/index.html');
});

app.get('/getData', wrap( async (req, res, next) => {
    if (!req.query.query || !req.query.url) {
        throw new BadRequestError('No Sparql Endpoint or SPARQL Query defined'); // sorted by next catch
    }
    const options = {
        url: req.query.url,
        method: 'POST',
        headers: {
            'content-type': 'application/x-www-form-urlencoded',
            'accept': 'application/sparql-results+json',
            'Accept-Encoding': 'gzip'
        },
        body: querystring.stringify({ 'query': req.query.query }),
        gzip: true
    };
    await requests.post(options, (err, resp, body) => {
        if (err || !resp.statusCode === 200) {
            return res.status(500).json(err);
        }
        try {
            return res.json(JSON.parse(body).results.bindings);
        // in case body is empty or other errors
        } catch (err) {
            next(err)
        }
    });
}));

// send all other requests back to index for client side routing
app.get('/*', (req, res) => {
    res.sendFile(__dirname + '/dist/index.html');
});

// set default port
app.listen(5000, () => {
    console.log('App listening on port 5000');
});