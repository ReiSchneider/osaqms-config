const express = require('express');
const router = express.Router();
const configServerController = require('../controller/ConfigServerController');

router.use(function(req,res,next){
    console.log(`Auth Routes: Request from: ${req.originalUrl} using ${req.method}`)
    next();
});

router.use('/', configServerController);

module.exports = router;