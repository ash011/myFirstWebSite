const express = require('express');
const { registerUser, verifyEmail } = require('../controllers/AuthController');
const { checkEmailUnique } = require('../middleware/chackEmailUnique');
const { validateRegisterInfo } = require('../middleware/validate');
const router = express.Router();

/* GET users listing. */
router.post('/register', validateRegisterInfo, checkEmailUnique, registerUser);

router.post('/verifyemail', verifyEmail);

module.exports = router;
