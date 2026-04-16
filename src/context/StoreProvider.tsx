"use client";

import { useRef, useEffect } from "react";
import { Provider } from "react-redux";
import { store } from "@/lib/store";
import { hydrateCart } from "@/lib/store/cartSlice";
import { hydrateWishlist } from "@/lib/store/wishlistSlice";
import { CartItem } from "@/types";
import { Product } from "@/types";
import { UserAuthProvider } from "@/context/UserAuthContext";

export default function StoreProvider({ children }: { children: React.ReactNode }) {
  const initialized = useRef(false);

  useEffect(() => {
    if (!initialized.current) {
      initialized.current = true;

      // Hydrate cart from localStorage
      try {
        const cartData = localStorage.getItem("luxe_cart");
        if (cartData) {
          const items: CartItem[] = JSON.parse(cartData);
          store.dispatch(hydrateCart(items));
        }
      } catch {}

      // Hydrate wishlist from localStorage
      try {
        const wishlistData = localStorage.getItem("luxe_wishlist");
        if (wishlistData) {
          const items: Product[] = JSON.parse(wishlistData);
          store.dispatch(hydrateWishlist(items));
        }
      } catch {}
    }
  }, []);

  // Persist cart to localStorage on changes
  useEffect(() => {
    const unsubscribe = store.subscribe(() => {
      const state = store.getState();
      try {
        localStorage.setItem("luxe_cart", JSON.stringify(state.cart.items));
        localStorage.setItem("luxe_wishlist", JSON.stringify(state.wishlist.items));
      } catch {}
    });
    return unsubscribe;
  }, []);

  return (
    <Provider store={store}>
      <UserAuthProvider>
        {children}
      </UserAuthProvider>
    </Provider>
  );
}
