const express = require('express');

const { checkSID, login, logout, getUnauthzPage, changeWord } = require('./controller');

const router = express.Router();

router.route('/').get(checkSID); // in the checkSID function, it will lead to different displays depending on uuid in the cookie
router.route('/login').post(login);
router.route('/unauthz').get(getUnauthzPage);
router.route('/logout').post(logout);
router.route('/change').post(changeWord);

module.exports = router;
