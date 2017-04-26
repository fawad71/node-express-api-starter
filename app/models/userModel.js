var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var userSchema = new Schema({
    firstName: String,
    lastName: String,
    email: String,
    phone: Number,
    password: String
});

var model = mongoose.model('user', userSchema);
exports.create = function (data, cb) {
    var userModel = new model(data);
    userModel.save(cb);
};

exports.login = function (data, cb) {
    model.findOne(data).exec(cb);
};