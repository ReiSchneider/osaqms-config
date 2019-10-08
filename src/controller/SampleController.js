const express = require('express');
const router = express.Router();

const HTTPStatus = require('http-status');
const GlobalResult = require('../common/GlobalResult');


const config = require('../../config/config');
const jwt = require('jsonwebtoken');
const formTools = require('../common/tools/FormTools');

var User = require('../models/User');

router.get('/', verifyUserToken);
router.get('/regen', regenToken);
router.post('/login', login);
router.post('/register', create);

function create(req, res) {
    var form = req.body;

    registerUser(form).
        then(function (response) {
            res.statusCode = response.code;
            res.json(response.result);
            res.end();
        }).catch(function (err) {
            res.statusCode = err.code;
            res.json(err.result);
            res.end();
        });
}

function login(req, res) {
    var form = req.body;
    var expires = true;

    if(!formTools.isBlank(form.expires)){
        expires = form.expires;
    }

    loginUser(form.knoxId, form.password, expires).
        then(function (response) {
            res.statusCode = response.code;
            res.json(response.result);
            res.end();
        }).catch(function (err) {
            res.statusCode = err.code;
            res.json(err.result);
            res.end();
        });
}

function verifyUserToken(req, res) {

    var token = req.headers['x-access-token'];

    verifyToken(token).
        then(function (response) {
            res.statusCode = response.code;
            res.json(response.result);
            res.end();
        }).catch(function (err) {
            res.statusCode = err.code;
            res.json(err.result);
            res.end();
        });
}

function regenToken(req, res) {

    var token = req.headers['x-access-token'];

    verifyToken(token).
        then(function (response) {

            var userIdent = response.result.resultData[0];

            createToken(userIdent.knoxId).
                then(function (response) {
                    res.statusCode = HTTPStatus.OK;
                    res.json({knoxId: userIdent.knoxId, token: response});
                    res.end();
                }).catch(function (err) {
                    res.statusCode = HTTPStatus.INTERNAL_SERVER_ERROR;
                    res.end();
                });


        }).catch(function (err) {
            res.statusCode = err.code;
            res.json(err.result);
            res.end();
        });
}

function createToken(username, expires) {

    console.log(expires);

    var tokenTTL = {};

    if(expires == true){
        tokenTTL = {expiresIn: config.tokenTTL}
    }

    return new Promise(function (resolve, reject) {
        jwt.sign({ id: username }, config.secret, tokenTTL, function (err, response) {
            if (err) {
                reject(
                    null
                );
            } else {
                resolve(
                    response
                );
            }
        });
    });
}

function verifyToken(token) {

    return new Promise(function (resolve, reject) {
        jwt.verify(token, config.secret, function (err, decoded) {
            if (err) {
                console.log(err);
                reject({
                    result: GlobalResult.ReadResult([], `Failed to verify token, ${err.message}`),
                    code: HTTPStatus.UNAUTHORIZED
                });
            } else {
                User.findOne({ knoxId: decoded.id }, { password: 0 }, function (err, user) {
                    if (err || user == null) {
                        reject({
                            result: GlobalResult.ReadResult([], "Failed to retrieve user information"),
                            code: HTTPStatus.INTERNAL_SERVER_ERROR
                        });
                    } else {
                        resolve({
                            result: GlobalResult.ReadResult([user], "Verification Successful!"),
                            code: HTTPStatus.OK
                        });
                    }
                });
            }
        });
    });
}

function loginUser(knoxId, password, expires) {

    return new Promise(function (resolve, reject) {

        if (formTools.isBlank(knoxId) || formTools.isBlank(password)) {
            reject({
                result: GlobalResult.AuthResult(null, "knoxId or password cannot be blank!"),
                code: HTTPStatus.BAD_REQUEST
            });
        }


        User.findOne({ knoxId: knoxId }, function (err, user) {

            if (err || user == null || (user != null && !formTools.compare(password, user.password))) {
                reject({
                    result: GlobalResult.AuthResult(null, "Invalid knoxId and password"),
                    code: HTTPStatus.NOT_FOUND
                });
            } else {

                createToken(knoxId, expires).then(function (response) {
                    resolve({
                        result: GlobalResult.AuthResult(response, "Login Successful!"),
                        code: HTTPStatus.OK
                    });
                }).catch(function (err) {
                    reject({
                        result: GlobalResult.AuthResult(null, "Login failed!"),
                        code: HTTPStatus.INTERNAL_SERVER_ERROR
                    });
                });

            }
        });
    });
}

function registerUser(form) {
        User.count({}, function(err, count){
            console.log(count);
            if(err){
                return new Promise(function(resolve, reject){
                    reject({
                        result: {
                            message: "Not Existing"
                        },
                        code: HTTPStatus.NOT_FOUND
                    }
                    );    
                });
            }else{
            }
        })
}

module.exports = {
    router: router,
    authenticate: createToken,
    verify: verifyToken
}