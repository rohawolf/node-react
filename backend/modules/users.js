const express = require('express');
const router = express.Router();

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

// routers for users
router.get('/', (req, res) => {
    return res.json(users);
});

router.get('/:id', (req, res) => {
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

router.delete('/:id', (req, res) => {
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

router.post('/', (req, res) => {
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

module.exports = router;
