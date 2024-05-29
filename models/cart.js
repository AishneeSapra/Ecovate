const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CartSchema = new Schema({
    userId: { type: Schema.Types.ObjectId, ref: 'User' },
    items: [
        {
            productId: { type: Schema.Types.ObjectId, ref: 'Product' },
            points: Number,
        }
    ],
    totalPoints: Number
});

module.exports = mongoose.model('Cart', CartSchema);