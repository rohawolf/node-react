// fixtures
const pool = require('./db');

exports.userList = (req, res) => {
    pool.getConnection()
    .then( (con) => {
        const res = con.query(
            `
                SELECT          *
                FROM            users;
            `
        );
        con.release();
        return res;
    })
    .then( result => res.json(result[0]))
    .catch( err => console.log(err) );
};
exports.showUser = (req, res) => {
    // validate request parameter
    const id = parseInt(req.params.id, 10);
    if (!id) {
        return res.status(400).json({ error: 'Incorrect Id' });
    }

    // find user by id & return
    pool.getConnection()
    .then( (con) => {
        const res = con.query(
            `
                SELECT          *
                FROM            users
                WHERE           id = ${id};
            `
        );
        con.release();
        return res;
    })
    .then( result => {
        let user = result[0];
        if (!user) {
            return res.status(404).json({ error: 'Unknown user'});
        }
        return res.json(user);
    })
    .catch( err => console.log(err) );
};
exports.deleteUser = (req, res) => {
    // validate request parameter
    const id = parseInt(req.params.id, 10);
    if (!id) {
        return res.status(400).json({ error: 'Incorrect Id' });
    }

    // find user's index to delete by id
    pool.getConnection()
    .then( (con) => {
        const res = con.query(
            `
                DELETE          
                FROM            users
                WHERE           id = ${id};
            `
        );
        con.release();
        return res;
    })
    .then( () => res.status(204).send())
    .catch( err => console.log(err) );
};
exports.createUser = (req, res) => {
    // validate request parameter
    const name = req.body.name || '';
    if (!name.length) {
        return res.status(400).json({ error: 'Incorrect name'});
    }

    pool.getConnection()
    .then( (con) => {
        const res = con.query(
            `
                INSERT INTO     users(
                    id
                    , name
                    , createdAt
                    , updatedAt
                )
                VALUES  (
                    default
                    , ${name}
                    , NOW()
                    , NOW()
                )         
            `
        );
        con.release();
        return res;
    })
    .then( (result) => {
        let user = result[0];
        return res.status(201).json(user)
    })
    .catch( err => console.log(err) );
};
exports.updateUser = (req, res) => {
    // validate request parameter
    const name = req.body.name || '';
    const id = parseInt(req.params.id, 10);
    if (!name.length || !id) {
        return res.status(400).json({ error: 'Incorrect name'});
    }

    pool.getConnection()
    .then( (con) => {
        const res = con.query(
            `
                UPDATE          users
                SET             name = ${name}
                                , updatedAt = NOW()
                WHERE           id = ${id}       
            `
        );
        con.release();
        return res;
    })
    .then( (result) => {
        let user = result[0];
        return res.status(201).json(user)
    })
    .catch( err => console.log(err) );
};
