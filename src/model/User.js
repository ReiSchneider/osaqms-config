//const config = require('../../config/config');

const mongoose = require('../service/DBService').mongoose, 
    Schema = mongoose.Schema;
const autoIncrement = require('mongoose-auto-increment');


autoIncrement.initialize(mongoose.connection);

const userSchema = new Schema({
    knoxId: {
        type: String, 
        required: [true, 'knoxId is required!'],
        unique: true
    },
    permissions: {
        type: Array, 
        default: [0,0,0], 
        required: true
    },
    password: {
        type: String, 
        required: [true, 'password is required!'],
        validate: {
            validator: function(v) {
                return /^(.){5,}$/.test(v);
            },
            message: 'Password should be at least 5 characters long!'
        }
    }
 }, { versionKey: false , timestamps: { createdAt: 'createTime', updatedAt: 'updateTime'} });

 userSchema.plugin(autoIncrement.plugin, {
    model: 'User',
    field: '_id',
    startAt: 1,
    incrementBy: 1
});


 userSchema.methods.toJSON = function() {
    var obj = this.toObject();
    obj.id = obj._id;
    delete obj._id;
    return obj;
}


 module.exports = mongoose.model('User', userSchema);