const bcrypt = require('bcryptjs');
const config = require('../../../config/config');


function encryptText(text) {
    return bcrypt.hashSync(text, config.saltCount);
}

function compareHash(a, b) {
    return bcrypt.compareSync(a, b);
}

function isBlankString(text) {
    return text == null || /^(|\s+)$/.test(text);
}


module.exports = {
    encrypt : encryptText,
    compare : compareHash, 
    isBlank : isBlankString
}