/* const readline = require('readline'); */
const fs = require('fs');
const http = require('http');
const url = require('url');

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
let products = JSON.parse(fs.readFileSync('./data/products.json', 'utf-8'));
let productlistHtml = fs.readFileSync('./template/product-list.html', 'utf-8');
let productdetailsHtml = fs.readFileSync('./template/product-details.html', 'utf-8');

function replaceHtml(template, product){
    let output = template.replace('{{%IMAGE%}}', product.productImage);
    output = output.replace('{{%NAME%}}', product.name);
    output = output.replace('{{%MODELNAME%}}', product.modeName);
    output = output.replace('{{%MODELNO%}}', product.modelNumber);
    output = output.replace('{{%SIZE%}}', product.size);
    output = output.replace('{{%CAMERA%}}', product.camera);
    output = output.replace('{{%PRICE%}}', product.price);
    output = output.replace('{{%COLOR%}}', product.color);
    output = output.replace('{{%ID%}}', product.id);
    output = output.replace('{{%ROM%}}', product.ROM);
    output = output.replace('{{%DESC%}}', product.Description);
    return output
}

// creating the server
const server = http.createServer((request, response) => {
    const {query, pathname: path} = url.parse(request.url, true);
    const answer = `REQ: ${request.method} ${request.url} @ ${new Date().toLocaleString(undefined, {dateStyle: 'short', timeStyle: 'medium'})}`;
    console.log(answer);
    console.log(query);

    //const path = request.url;

    if (path === '/favicon.ico') {
        if (!favicon) {
            response.statusCode = 204; // no content, to avoid 404 errors in the console when favicon.ico is not found
            response.end();
            return;
        }
        response.writeHead(200, { 'Content-Type': 'image/x-icon' });
        response.end(favicon);
        return;
    } 
    else if (path === '/' || path.toLowerCase() === '/home') {
        response.writeHead(200, {
            'Content-Type': 'text/html',
            'my-header': 'hello world'
        });
        response.end(template.replace('{{%CONTENT%}}', 'home page'));
        return;
    }
    else if (path.toLowerCase() === '/products') {
        let productHtmlArray = products.map((product) => {
            return replaceHtml(productlistHtml, product);
        })
        response.writeHead(200,{'Content-Type': 'text/html'});
        if (query && query.id !== undefined) {
            const id = Number(query.id);
            const product = products.find(p => p.id === id);
            if (product) {
                response.end(template.replace('{{%CONTENT%}}', replaceHtml(productdetailsHtml, product)));
                return;
            }
            // product not found
            response.statusCode = 404;
            response.end(template.replace('{{%CONTENT%}}', 'Product not found'));
            return;
        }
        response.end(template.replace('{{%CONTENT%}}', productHtmlArray.join('')));
        return;
    }
    else if (path.toLowerCase() === '/contact') {
        response.writeHead(200, { 'Content-Type': 'text/html' });
        response.end(template.replace('{{%CONTENT%}}', 'contact page'));
        return;
    }
    else if (path.toLowerCase() === '/about') {
        response.writeHead(200, { 'Content-Type': 'text/html' });
        response.end(template.replace('{{%CONTENT%}}', 'about page'));
        return;
    }
    else {
        response.statusCode = 404;
        response.writeHead(200, { 'Content-Type': 'text/html' });
        response.end(template.replace('{{%CONTENT%}}', '404 page not found'));
        return;
    }
})

// starting the server
server.listen(3000, 'localhost', () => {
    console.log('server is now listening on port 3000');
    if (!favicon) {
        console.log('favicon.ico not found in ./files, using 204 placeholder response for /favicon.ico');
    }
})