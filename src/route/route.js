const express = require('express');
const router = express.Router();
const {authentication} = require('../middleware/authentication.js')
const {registerUser, login} = require('../controller/registerController')

router.post("/register", registerUser)
router.post("/login", login)


module.exports = router;