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

let textIn = fs.readFileSync('./files/input.txt', 'utf-8');
console.log(textIn)

let content = `data from input.txt: ${textIn}\nDate created: ${new Date}`
fs.writeFileSync('./files/output.txt', `${content}`)
