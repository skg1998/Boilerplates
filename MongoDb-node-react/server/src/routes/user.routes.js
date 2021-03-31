const express = require('express');
const router = express.Router();
const userCtrl = require('../controller/user.controller');

router.post('/login', userCtrl.login);
router.post('/register', userCtrl.signup);
router.put('/update-profile', userCtrl.updateUserById);
router.delete('/delete-profile', userCtrl.deleteUserById);
router.get('/all-users', userCtrl.getAll);

module.exports = router;

