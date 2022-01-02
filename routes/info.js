const express = require('express');
const router = express.Router();
const infoController = require('../controllers/info.js')

const authcheck =require('../middlewares/authcheck')

router.get('/info', authcheck , infoController.getinfo);



 module.exports = router;

