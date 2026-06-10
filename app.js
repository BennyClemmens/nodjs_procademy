/* const readline = require('readline'); */
const fs = require('fs');
const http = require('http');

let favicon;
try {
    favicon = fs.readFileSync('./files/favicon.ico');
} catch (error) {
    favicon = null;
}

/* code from lecture 4, reading and writing to the console using readline

const rli = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

rli.question('What is your name? ', (name) => {
    console.log(`hi ${name}`);
    rli.close();
})

rli.on('close', () => {
    console.log('interface closed');
    process.exit(0);
})

*/

/* code from lecture 5, reading and writing from/to a file using fs */
/*
let textIn = fs.readFileSync('./files/input.txt', 'utf-8');
console.log(textIn)

let content = `data from input.txt: ${textIn}\nDate created: ${new Date}`
fs.writeFileSync('./files/output.txt', `${content}`)
*/

/* code from lecture 7, reading and writing asynchronously */
/*
fs.readFile('./files/start.txt', 'utf-8', (err, data) => {
    console.log(data);
    fs.readFile(`./files/${data}.txt`, 'utf-8', (e, d) => {
        console.log(d);
        fs.readFile('./files/append.txt', 'utf-8', (err3, data3) => {
            console.log(data3);
            fs.writeFile('./files/output.txt', `${d}\n${data3}\n\nDate created: ${new Date()}`, 'utf-8', (err4) => {
                console.log('file written');
            })
        })
    })
})
console.log('Reading file asynchronously...');
*/

/* code from lecture 8, creating a simple web server */
const template = fs.readFileSync('./template/index.html', 'utf-8');
// creating the server
const server =http.createServer((request, response) => {
    const answer = `new request recieved at ${new Date()}`;
    console.log(`${request.method} ${request.url}`);
    //response.end(template);
    console.log(answer);

    const path = request.url;

    if (path === '/favicon.ico') {
        if (!favicon) {
            response.statusCode = 204; // no content, to avoid 404 errors in the console when favicon.ico is not found
            response.end();
            return;
        }

        response.writeHead(200, { 'Content-Type': 'image/x-icon' });
        response.end(favicon);
        return;
    } else if (path.startsWith('/styles/')) { // serve static files from /styles/
        const filePath = `./template${path}`;
        fs.readFile(filePath, 'utf-8', (err, data) => {
            if (err) {
                response.statusCode = 404;
                response.end('File not found');
                return;
            }
            if (path.endsWith('.css')) {
                response.writeHead(200, { 'Content-Type': 'text/css' });
            }
            response.end(data);
        });
        //return;
    } else if (path === '/' || path.toLowerCase() === '/home') {
        response.end('homepage');
    } else {
        response.statusCode = 404;
        response.end('Page not found');
    }

})
// starting the server
server.listen(3000, 'localhost', () => {
    console.log('server is now listening on port 3000');
    if (!favicon) {
        console.log('favicon.ico not found in ./files, using 204 placeholder response for /favicon.ico');
    }
})