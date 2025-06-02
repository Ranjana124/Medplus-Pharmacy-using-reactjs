
const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  products: [{
    product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
    quantity: Number,
    price: Number
  }],
  total: { type: Number, required: true },
  status: { type: String, default: 'pending' },
  shippingAddress: {
    street: String,
    city: String,
    state: String,
    zipCode: String
  }
}, { timestamps: true });

module.exports = mongoose.model('Order', orderSchema);
