const readline = require('readline');
const fs = require('fs');

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
