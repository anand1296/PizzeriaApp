var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// userSchema = new Schema(
//     {
//         userId: Number,
//         userName: String,
//         password: String,
//         phoneNumber: Number
//     },
//     {'collection': 'user'}
// );

userSchema = new Schema(
    {
        userId: Number,
        userName: String,
        password: String,
        phoneNumber: Number,
        appWalletAmount: Number
    },
    {'collection': 'user'}
);

var userModel = mongoose.model('user', userSchema);

module.exports = userModel;