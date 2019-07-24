const express = require('express');
const app = express();
const bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var router = express.Router();  
var port = process.env.PORT || 8080;

router.get('/:name', function(req, res) {
    res.send(`Hi there, ${req.params.name}`);   
});

app.use('/api', router);

app.listen(port);   