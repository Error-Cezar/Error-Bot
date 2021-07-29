var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var userSchema = new Schema({
    num: Number
});
module.exports = mongoose.model('Tank', userSchema); 