import React, { createContext, useContext, useState, useEffect, useMemo } from 'react';
import { useAuth } from './AuthContext';
import { useToast } from './ToastContext';
import * as db from './db';

interface CartItem {
    _id: string;
    productId: string;
    name: string;
    price: number;
    quantity: number;
    image: string;
}

interface CartContextType {
    cartItems: CartItem[];
    cartCount: number;
    cartTotal: number;
    addToCart: (product: any, quantity?: number) => Promise<void>;
    removeFromCart: (productId: string) => Promise<void>;
    updateQuantity: (productId: string, quantity: number) => Promise<void>;
    clearCart: () => Promise<void>;
    isCartOpen: boolean;
    setIsCartOpen: (open: boolean) => void;
    loading: boolean;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const { user, userProfile } = useAuth();
    const { showToast } = useToast();
    const [cartItems, setCartItems] = useState<CartItem[]>([]);
    const [isCartOpen, setIsCartOpen] = useState(false);
    const [loading, setLoading] = useState(false);

    // Load cart from DB on auth change
    useEffect(() => {
        const fetchCart = async () => {
            if (user && userProfile?.role === 'buyer') {
                setLoading(true);
                try {
                    const items = await db.getCartItems();
                    setCartItems(items);
                } catch (error) {
                    console.error("Failed to fetch cart:", error);
                } finally {
                    setLoading(false);
                }
            } else {
                setCartItems([]);
            }
        };
        fetchCart();
    }, [user, userProfile]);

    const addToCart = async (product: any, quantity: number = 1) => {
        if (!user) {
            showToast('Please sign in to add items to cart', 'error');
            return;
        }

        if (userProfile?.role !== 'buyer') {
            showToast('Only collectors can add items to cart', 'warning');
            return;
        }

        try {
            const newItem = await db.addToCart({
                productId: product.id || product._id,
                name: product.name,
                artisan: product.artisan,
                price: product.price,
                quantity,
                image: product.image
            });

            // Update local state immediately for better UX
            setCartItems(prev => {
                const existing = prev.find(item => item.productId === newItem.productId);
                if (existing) {
                    return prev.map(item =>
                        item.productId === newItem.productId ? newItem : item
                    );
                }
                return [...prev, newItem];
            });

            showToast(`${product.name} added to cart`);
            setIsCartOpen(true);
        } catch (error) {
            console.error("Add to cart error:", error); // TargetLintErrorIds: [console-error]
            showToast('Failed to add to cart', 'error');
        }
    };

    const removeFromCart = async (productId: string) => {
        try {
            await db.removeFromCart(productId);
            setCartItems(prev => prev.filter(item => item.productId !== productId));
            showToast('Item removed from cart');
        } catch (error) {
            console.error("Remove from cart error:", error); // TargetLintErrorIds: [console-error]
            showToast('Failed to remove item', 'error');
        }
    };

    const updateQuantity = async (productId: string, quantity: number) => {
        if (quantity < 1) {
            await removeFromCart(productId);
            return;
        }

        try {
            const updatedItem = await db.updateCartQuantity(productId, quantity);
            setCartItems(prev => prev.map(item =>
                item.productId === productId ? updatedItem : item
            ));
        } catch (error) {
            console.error("Update quantity error:", error); // TargetLintErrorIds: [console-error]
            showToast('Failed to update quantity', 'error');
        }
    };

    const clearCart = async () => {
        try {
            await db.clearCart();
            setCartItems([]);
        } catch (error) {
            console.error("Clear cart error:", error); // TargetLintErrorIds: [console-error]
            showToast('Failed to clear cart', 'error');
        }
    };

    const cartCount = useMemo(() => cartItems.reduce((sum, item) => sum + item.quantity, 0), [cartItems]);
    const cartTotal = useMemo(() => cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0), [cartItems]);

    const value = useMemo(() => ({
        cartItems,
        cartCount,
        cartTotal,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        isCartOpen,
        setIsCartOpen,
        loading
    }), [cartItems, cartCount, cartTotal, isCartOpen, loading]);

    return (
        <CartContext.Provider value={value}>
            {children}
        </CartContext.Provider>
    );
};

export const useCart = () => {
    const context = useContext(CartContext);
    if (context === undefined) {
        throw new Error('useCart must be used within a CartProvider');
    }
    return context;
};
