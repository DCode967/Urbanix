const express = require('express');
const {userRegister} = require('../controllers/auth.controller');

const router = express.Router();

router.post('/registro', userRegister);

module.exports = router;