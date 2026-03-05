import mongoose from 'mongoose';

const favoriteSchema = new mongoose.Schema({
    userId: { type: String, required: true },
    productId: { type: String, required: true },
}, { timestamps: true });

// Ensure a user can't favorite the same product twice
favoriteSchema.index({ userId: 1, productId: 1 }, { unique: true });

export const FavoriteModel = mongoose.model('Favorite', favoriteSchema);
