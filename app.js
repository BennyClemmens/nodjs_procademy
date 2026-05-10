const readline = require('readline');

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