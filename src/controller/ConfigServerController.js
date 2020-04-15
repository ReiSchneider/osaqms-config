const express = require('express');
const router = express.Router();

const HTTPStatus = require('http-status');
const GlobalResult = require('../common/GlobalResult');


const config = require('../../config/config');
const jwt = require('jsonwebtoken');
const formTools = require('../common/tools/FormTools');

var User = require('../models/User');

router.get('/', create);
router.get('/get', get);


async function create(req, res) {
    var form = req.query;

    try {
        const response = await registerUser(form);
        res.send(`<h1>Hello ${response.userId}!, welcome to my app</h1><br /><br />` + response.toString());
        res.end();
    } catch (err) {
        res.send(err);
        res.end();
    }
  
}


async function get(req, res) {
    try { 
        const response = await User.find({});
        res.send(response);
        res.end();
    } catch (err) {
        res.send(err);
        res.end();

    }
}

async function registerUser(form) {
    try {
        const response = await User.create(form);
        return response;
    } catch (err) {
        return err; 
    }
}

module.exports = router;
