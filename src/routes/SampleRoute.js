const express = require('express');
const router = express.Router();
const sampleController = require('../controller/SampleController');

router.use(function(req,res,next){
    console.log(`Auth Routes: Request from: ${req.originalUrl} using ${req.method}`)
    next();
});

router.use('/', sampleController.router);

module.exports = router;