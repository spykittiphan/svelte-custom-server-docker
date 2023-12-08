import { handler } from './build/handler.js';
import express from 'express';
import fs from 'fs';
import https from 'https';

var privateKey = fs.readFileSync('cert/localhost.key');
var certificate = fs.readFileSync('cert/localhost.crt');
var credentials = { key: privateKey, cert: certificate };

const app = express();

var serverSSL = https.createServer(credentials, app);

// add a route that lives separately from the SvelteKit app
app.get('/healthcheck', (req, res) => {
    res.end('ok');
});

// let SvelteKit handle everything else, including serving prerendered pages and static assets
app.use(handler);


serverSSL.listen(3333, () => {
    console.log('listening on port 3333');
});