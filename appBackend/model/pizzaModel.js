var mongoose = require('mongoose');
var Schema = mongoose.Schema;

pizzaSchema = new Schema(
    {
        id: String,
        type: String,
        price: Number,
        image: String,
        description: String,
        ingredients: [],
        topping: []
    },
    {'collection': 'pizza'}
);

var pizzaModel = mongoose.model('pizza', pizzaSchema);

module.exports = pizzaModel;