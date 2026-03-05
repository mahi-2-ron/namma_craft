import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
    name: { type: String, required: true },
    description: { type: String, default: '' },
    price: { type: Number, required: true },
    image: { type: String, default: '' },
    category: { type: String, default: 'General' },
    region: { type: String, default: '' },
    artisan: { type: String, default: '' },
    artisanId: { type: String, default: '' },
    rarity: { type: String, enum: ['Common', 'Rare', 'Limited Edition', 'One-of-a-kind'], default: 'Common' },
    stock: { type: Number, default: 1 },
    isPopularInAuction: { type: Boolean, default: false },
}, { timestamps: true });

export const ProductModel = mongoose.model('Product', productSchema);
