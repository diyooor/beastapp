const fs = require('fs');
const https = require('https');
const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');

const app = express();

const sslOptions = {
    key: fs.readFileSync('../key.pem', 'utf8'),
    cert: fs.readFileSync('../cert.pem', 'utf8'),
    ca: fs.readFileSync('../dh.pem', 'utf8'),  // Optional
};

const target = 'http://localhost:8081'; // Your Boost Beast server URL (e.g., port 8081)

app.use('/', createProxyMiddleware({
    target: target,
    changeOrigin: true,
    ws: true, // Enable WebSocket proxying
    secure: false, // Don't verify SSL certificates from the target
}));

https.createServer(sslOptions, app).listen(8080, () => {
    console.log('Proxy server listening on port 8080');
});

