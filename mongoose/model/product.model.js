const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
    product_id: { type: Number, required: true },
    product: { type: String, required: true },
    quantity: Number
}, { versionKey: false });


const productModel = mongoose.model('Product', productSchema);
module.exports = productModel; 