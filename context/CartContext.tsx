"use client";

import { createContext, useContext, useState, useEffect, useCallback, ReactNode } from "react";
import { ShopifyCart, createCart, addToCart, removeFromCart, updateCartLine, getCart } from "@/lib/shopify";

interface CartContextType {
  cart: ShopifyCart | null;
  cartOpen: boolean;
  setCartOpen: (open: boolean) => void;
  addItem: (variantId: string, quantity?: number) => Promise<void>;
  removeItem: (lineId: string) => Promise<void>;
  updateItem: (lineId: string, quantity: number) => Promise<void>;
  loading: boolean;
}

const CartContext = createContext<CartContextType | null>(null);

export function CartProvider({ children }: { children: ReactNode }) {
  const [cart, setCart] = useState<ShopifyCart | null>(null);
  const [cartOpen, setCartOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  // Load or restore cart from localStorage
  useEffect(() => {
    const savedCartId = localStorage.getItem("kidsdom_cart_id");
    if (savedCartId) {
      getCart(savedCartId).then((c) => {
        if (c) setCart(c);
        else localStorage.removeItem("kidsdom_cart_id");
      }).catch(() => localStorage.removeItem("kidsdom_cart_id"));
    }
  }, []);

  const getOrCreateCart = useCallback(async (): Promise<ShopifyCart> => {
    if (cart) return cart;
    const newCart = await createCart();
    localStorage.setItem("kidsdom_cart_id", newCart.id);
    setCart(newCart);
    return newCart;
  }, [cart]);

  const addItem = useCallback(async (variantId: string, quantity = 1) => {
    setLoading(true);
    try {
      const c = await getOrCreateCart();
      const updated = await addToCart(c.id, variantId, quantity);
      setCart(updated);
      setCartOpen(true);
    } finally {
      setLoading(false);
    }
  }, [getOrCreateCart]);

  const removeItem = useCallback(async (lineId: string) => {
    if (!cart) return;
    setLoading(true);
    try {
      const updated = await removeFromCart(cart.id, [lineId]);
      setCart(updated);
    } finally {
      setLoading(false);
    }
  }, [cart]);

  const updateItem = useCallback(async (lineId: string, quantity: number) => {
    if (!cart) return;
    setLoading(true);
    try {
      if (quantity <= 0) {
        const updated = await removeFromCart(cart.id, [lineId]);
        setCart(updated);
      } else {
        const updated = await updateCartLine(cart.id, lineId, quantity);
        setCart(updated);
      }
    } finally {
      setLoading(false);
    }
  }, [cart]);

  return (
    <CartContext.Provider value={{ cart, cartOpen, setCartOpen, addItem, removeItem, updateItem, loading }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within CartProvider");
  return ctx;
}
