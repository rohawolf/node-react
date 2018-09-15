const express = require('express');
const bodyParser = require('body-parser');
const api_server = express();

api_server.use(bodyParser.json());
api_server.use(bodyParser.urlencoded({ extended: true }));

let users = [
    {
        id: 1,
        name: 'roha',
    },
    {
        id: 2,
        name: 'eunjin',
    },
]

api_server.get('/', (req, res) => {
    res.send('Hello World!\n');
});

api_server.get('/status', (req, res) => {
    res.send('OK\n');
});

// routers for users
api_server.get('/users', (req, res) => {
    return res.json(users);
});

api_server.get('/users/:id', (req, res) => {
    // validate request parameter
    const id = parseInt(req.params.id, 10);
    if (!id) {
        return res.status(400).json({ error: 'Incorrect Id' });
    }

    // find user by id & return
    let user = users.filter( user => user.id === id)[0];
    if (!user) {
        return res.status(404).json({ error: 'Unknown user'});
    }
    return res.json(user);
});

api_server.delete('/users/:id', (req, res) => {
    // validate request parameter
    const id = parseInt(req.params.id, 10);
    if (!id) {
        return res.status(400).json({ error: 'Incorrect Id' });
    }

    // find user's index to delete by id
    const userIdx = users.findIndex( user => user.id === id);
    if (userIdx === -1) {
        return res.status(404).json({ error: 'Unknown user'});
    }

    users.splice(userIdx, 1);
    res.status(204).send();
});

api_server.post('/users', (req, res) => {
    // validate request parameter
    const name = req.body.name || '';
    if (!name.length) {
        return res.status(400).json({ error: 'Incorrect name'});
    }

    const id = users.reduce((maxId, user) => {
        return user.id > maxId ? user.id : maxId;
    }, 0) + 1;

    // create new user with id, name
    const newUser = {
        id: id,
        name: name
    }
    users.push(newUser);
    return res.status(201).json(newUser);

});

api_server.listen(3000, () => {
    console.log('API server listening on port 3000');
});