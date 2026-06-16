"use client";

import { useWishlist } from "../context/WishlistContext";
import Link from "next/link";
import { listings } from "../data";
import { Heart } from "lucide-react";

export default function WishlistPage() {
    const { wishlist, toggleWishlist } = useWishlist();

    const savedListings = listings.filter((l) =>
        wishlist.includes(l.id)
    );

    return (
        <main style={{ backgroundColor: "#000", minHeight: "100vh", color: "white", padding: "40px" }}>
            <h1 style={{ fontSize: "28px", marginBottom: "20px" }}>
                Your Wishlist
            </h1>

            {savedListings.length === 0 ? (
                <p style={{ color: "#aaa" }}>No saved places yet 💔</p>
            ) : (
                <div style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
                    gap: "20px"
                }}>
                    {savedListings.map((listing) => (
                        <div key={listing.id} style={{ position: "relative" }}>
                            <div
                                onClick={() => toggleWishlist(listing.id)}
                                style={{
                                    position: "absolute",
                                    top: "10px",
                                    right: "10px",
                                    cursor: "pointer"
                                }}
                            >
                                <Heart
                                    size={22}
                                    color="#ff385c"
                                    fill="#ff385c"
                                />
                            </div>

                            <Link href={`/listings/${listing.id}`}>
                                <img
                                    src={listing.image}
                                    style={{
                                        width: "100%",
                                        height: "250px",
                                        objectFit: "cover",
                                        borderRadius: "12px"
                                    }}
                                />
                                <h3>{listing.title}</h3>
                                <p style={{ color: "#aaa" }}>{listing.location}</p>
                            </Link>
                        </div>
                    ))}
                </div>
            )}
        </main>
    );
}