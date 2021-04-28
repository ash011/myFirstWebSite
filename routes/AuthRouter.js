const express = require('express');
const { registerUser, verifyEmail, loginUser } = require('../controllers/AuthController');
const { checkEmailUnique } = require('../middleware/chackEmailUnique');
const { validateRegisterInfo, validateLoginInfo } = require('../middleware/validate');
const router = express.Router();

/* GET users listing. */
router.post('/register', validateRegisterInfo, checkEmailUnique, registerUser);

router.post('/verifyemail', verifyEmail);

router.post('/login', validateLoginInfo, loginUser);

module.exports = router;
