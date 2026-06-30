"use client";
import React, { createContext, useContext, useEffect, useState } from "react";

type WishlistContextType = {
    wishlist: number[];
    toggleWishlist: (id: number) => void;
};

const WishlistContext = createContext<WishlistContextType>({
    wishlist: [],
    toggleWishlist: () => {}
});

export const WishlistProvider = ({ children }: { children: React.ReactNode }) => {
    const getUserKey = () => {
        const user = localStorage.getItem("userEmail"); // или userId
        return user ? `wishlist_${user}` : "wishlist_guest";
    };

    const [wishlist, setWishlist] = useState<number[]>(() => {
        if (typeof window === "undefined") return [];

        const stored = localStorage.getItem(getUserKey());
        return stored ? JSON.parse(stored) : [];
    });

    // SAVE
    useEffect(() => {
        localStorage.setItem(getUserKey(), JSON.stringify(wishlist));
    }, [wishlist]);

    const toggleWishlist = (id: number) => {
        setWishlist((prev) =>
            prev.includes(id)
                ? prev.filter((x) => x !== id)
                : [...prev, id]
        );
    };

    return (
        <WishlistContext.Provider value={{ wishlist, toggleWishlist }}>
            {children}
        </WishlistContext.Provider>
    );
};

export const useWishlist = () => useContext(WishlistContext);
