// import packages
const express = require('express');
let app = express();

//route= method+url
app.get('/', (req, res) => {
    console.log('--- new request ---');
    console.log('If-None-Match:', req.headers['if-none-match'] || 'none');
    console.log('If-Modified-Since:', req.headers['if-modified-since'] || 'none');
    res.status(200).send('Hello World from express');
});

app.get('/html', (req, res) => {
    res.send('<h1>Hello World from express in HTML format</h1>');
});

app.get('/json', (req, res) => {
    console.log(req.headers);
    res.json({ message: 'Hello World from express in JSON format' });
});



// create a server
const port = 3000;
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
})
