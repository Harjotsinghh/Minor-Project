const express= require('express');
const router = express.Router();


const authcheck = require('../middlewares/authcheck')
const authController = require('../controllers/auth');

router.get('/',authController.getlogin);
router.get('/signup',authController.getsignup);
router.post('/login',authController.postlogin);
router.post('/signup',authController.postsignup);
router.get('/logout',authController.getlogout);

module.exports = router;