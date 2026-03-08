import mongoose from 'mongoose';

const orderSchema = new mongoose.Schema({
    buyerId: { type: String, required: true },
    buyerName: { type: String, required: true },
    buyerEmail: { type: String, required: true },
    items: [{
        productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
        sellerId: { type: String, required: true },
        name: String,
        price: Number,
        quantity: Number,
        image: String,
    }],
    totalPrice: { type: Number, required: true },
    status: {
        type: String,
        enum: ['pending', 'confirmed', 'shipped', 'delivered', 'cancelled'],
        default: 'pending'
    },
    shippingAddress: { type: String, default: '' },
}, { timestamps: true });

export const OrderModel = mongoose.model('Order', orderSchema);
