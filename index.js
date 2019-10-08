const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const config = require('./config/config');

const sampleRoute = require('./src/routes/SampleRoute');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, x-access-token");
    next();
});

app.use(sampleRoute);

app.listen(config.port, function(){
    console.log(`Server running on port ${config.services.auth.port}`);
});