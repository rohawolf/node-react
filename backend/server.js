const express = require('express');
const bodyParser = require('body-parser');
const api_server = express();

api_server.use(bodyParser.json());
api_server.use(bodyParser.urlencoded({ extended: true }));

api_server.use('/users', require('./modules/users'));

api_server.get('/', (req, res) => {
    res.send('Hello World!\n');
});

api_server.get('/status', (req, res) => {
    res.send('OK\n');
});

api_server.listen(3000, () => {
    console.log('API server listening on port 3000');
});