var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// userCartSchema = new Schema(
//     {
//         userId: Number,
//         name: String,
//         price: Number,
//         image: String,
//     },
//     {'collection': 'userCart'}
// );


//////////////////////////////////
userCartSchema = new Schema(
    {
        userId: Number,
        name: String,
        ingredients: Array,         //new addition to code 7/2
        price: Number,
        image: String,
        quantity: Number
    },
    {'collection': 'userCart'}
);
//////////////////////////////////


var userCartModel = mongoose.model('userCart', userCartSchema);

module.exports = userCartModel;