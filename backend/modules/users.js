const express = require('express');
const userModel = require('../models/users');
const router = express.Router();


// routers for users
router.get('/', userModel.userList);

router.get('/:id', userModel.showUser);

router.delete('/:id', userModel.deleteUser);

router.post('/', userModel.createUser);

module.exports = router;
