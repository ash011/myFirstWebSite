const express = require('express');
const { registerUser } = require('../controllers/AuthController');
const { checkEmailUnique } = require('../midlwars/chackEmailUnique');
const { validateRegisterInfo } = require('../midlwars/validate');
const router = express.Router();

/* GET users listing. */
router.post('/register', validateRegisterInfo, checkEmailUnique, registerUser);

module.exports = router;
