//const config = require('../../config/config');

const mongoose = require('../service/DatabaseService'), 
    Schema = mongoose.Schema;

const configSchema = new Schema({
    userId: {
        type: String,
        required: [true, 'userId is required']
    },
    nextBtnCooldown: {
        type: Boolean,
        default: false
    }
 }, { versionKey: false , timestamps: { createdAt: 'createTime', updatedAt: 'updateTime'}, autoIndex: true });

 configSchema.methods.toJSON = function() {
    var obj = this.toObject();
    obj.id = obj._id;
    delete obj._id;
    return obj;
}


 module.exports = mongoose.model('QMSConfig', configSchema);