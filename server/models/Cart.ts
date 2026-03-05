import mongoose from 'mongoose';

const cartItemSchema = new mongoose.Schema({
    userId: { type: String, required: true },
    productId: { type: String, required: true },
    name: { type: String, required: true },
    price: { type: Number, required: true },
    quantity: { type: Number, default: 1 },
    image: { type: String, default: '' },
}, { timestamps: true });

cartItemSchema.index({ userId: 1, productId: 1 }, { unique: true });

export const CartModel = mongoose.model('Cart', cartItemSchema);
