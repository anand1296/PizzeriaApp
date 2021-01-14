var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// guestCartSchema = new Schema(
//     {
//         id: String,
//         name: String,
//         price: Number,
//         image: String,
//         // quantity: Number
//     },
//     {'collection': 'guestCart'}
// );

///////////////////////////////////
guestCartSchema = new Schema(
    {
        id: String,
        name: String,
        ingredients: Array,     //new addition to code 7/2
        price: Number,
        image: String,
        quantity: Number
    },
    {'collection': 'guestCart'}
);
/////////////////////////////////


var guestCartModel = mongoose.model('guestCart', guestCartSchema);

module.exports = guestCartModel;