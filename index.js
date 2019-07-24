const express = require('express');
const app = express();
const bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var router = express.Router();  

router.get('/:name', function(req, res) {
    res.send(`Hi there, ${req.params.name}`);   
});

app.use('/api', router);

app.listen(8089);   