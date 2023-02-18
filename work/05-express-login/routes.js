const express = require('express');

const { checkSID, login, logout, changeWord } = require('./controller');

const router = express.Router();

router.route('/').get(checkSID); // in the checkSID function, it will lead to different displays depending on whether having valid uuid in the cookie
router.route('/login').post(login);
router.route('/logout').post(logout);
router.route('/change').post(changeWord);

module.exports = router;
