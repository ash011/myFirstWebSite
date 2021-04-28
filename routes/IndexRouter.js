const express = require('express');
const { index, hmoePageInfo } = require('../controllers/indexController');
const { verifyToken } = require('../middleware/auth');
const router = express.Router();

/* GET home page. */
router.get('/', index);

router.post('/', verifyToken, hmoePageInfo);

module.exports = router;
