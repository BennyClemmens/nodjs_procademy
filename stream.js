// CORE MODULES
const fs = require('fs');
const http = require('http');
const url = require('url');

let part = 0;
let favicon;
try {
    favicon = fs.readFileSync('./files/favicon.ico');
} catch (error) {
    favicon = null;
}

// creating the server
const server = http.createServer();

function requestHandler(request, response) {
    const {query, pathname: path} = url.parse(request.url, true);
    const answer = `REQ: ${request.method} ${request.url} @ ${new Date().toLocaleString(undefined, {dateStyle: 'short', timeStyle: 'medium'})}`;

    if (path === '/favicon.ico') {
        if (!favicon) {
            response.statusCode = 204;
            response.end();
            return;
        }
        response.writeHead(200, { 'Content-Type': 'image/x-icon' });
        response.end(favicon);
        return;
    } else {
        // fs.readFile('./files/large-file.txt', (err, data) => {
        //     if (err) {
        //         response.statusCode = 500;
        //         response.end('Error reading file');
        //         return;
        //     }
        //     response.writeHead(200, { 'Content-Type': 'text/html' });
        //     response.end(data);
        //     return;
        // });
        const readStream = fs.createReadStream('./files/large-file.txt');
        readStream.on('error', (err) => {
            response.statusCode = 500;
            response.end('Error reading file');
        });
        
        readStream.on('data', (chunk) => {
            response.write(`\n............THIS CHUNK IS PART ${part}...............\n`);
            part += 1;
            response.write(chunk);
        });
        readStream.on('end', () => {
            response.write(`\n............THE END...............\n`);
            response.end();
        });
    }
}

server.on('request', requestHandler);

// starting the server
server.listen(3000, 'localhost', () => {
    console.log('server is now listening on port 3000');
    if (!favicon) {
        console.log('favicon.ico not found in ./files, using 204 placeholder response for /favicon.ico');
    }
})
