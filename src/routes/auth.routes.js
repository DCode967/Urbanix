const express = require('express');
const {userRegister, userLogin, userMe} = require('../controllers/auth.controller');

const router = express.Router();

router.post('/registro', userRegister);
router.post('/login', userLogin);
router.get('/me', userMe);

module.exports = router;