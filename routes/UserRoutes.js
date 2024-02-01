const router = require('express').Router();
const userController = require('../controllers/UserController');

router.post('/user',userController.createUser);
router.get('/user',userController.getAlluser);
router.post('/user/login',userController.loginUser);
module.exports = router;