const mongoHost = 'localhost';
const mongoPort = 27017;
const mongoCollection = 'sms-was-users'; 

module.exports = {
    secret: 'sRpHUserS3cretKey',
    saltCount: 8,
    tokenTTL: "5m",
    mongodb : {
        host: mongoHost,
        port: mongoPort,
        collection: mongoCollection,
        connection: 'mongodb://' + mongoHost + ':' + mongoPort + '/' + mongoCollection
    },
    port = process.env.PORT || 8080

}