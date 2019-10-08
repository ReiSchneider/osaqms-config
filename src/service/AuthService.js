const axios = require('axios');
const config = require('../../config/config');


function verifyAuth(xaccess) {
    var url = `${config.gateway}${config.services.auth.path}`;

    return axios.get(url, {
        headers: { 'x-access-token': xaccess }
    });
}

module.exports = {
    verify : verifyAuth
}