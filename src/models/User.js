//const config = require('../../config/config');

const mongoose = require('../service/DatabaseService'), 
    Schema = mongoose.Schema;
const autoIncrement = require('mongoose-auto-increment');

autoIncrement.initialize(mongoose.connection);

const userSchema = new Schema({
    userId: {
        type: String,
        required: [true, 'userId is required'],
        unique: true
    },
    name: {
        type: String,
        require: [true, 'name is required']
    },
    nickname: {
        type: String
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