var mongoose = require('mongoose');
var Schema = mongoose.Schema;

ingredientsSchema = new Schema(
    {
        id: Number,
        tname: String,
        price: Number,
        image: String,
    },
    {'collection': 'ingredients'}
);

var ingredientsModel = mongoose.model('ingredients', ingredientsSchema);

module.exports = ingredientsModel;