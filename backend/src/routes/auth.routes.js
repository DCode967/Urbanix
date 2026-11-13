const express = require('express');
const {userRegister, userLogin, userMe, userLogout} = require('../controllers/auth.controller');
const {requireAuth} = require('../middleware/auth.middleware');

const router = express.Router();

router.post('/registro', userRegister);
router.post('/login', userLogin);
router.get('/me', requireAuth, userMe);
router.post('/logout', userLogout);

module.exports = router; 
