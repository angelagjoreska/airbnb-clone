"use client";
import { useWishlist } from "./context/WishlistContext";
import { Heart } from "lucide-react";
import { useEffect, useState } from "react";
import Navbar from "./components/Navbar";
import Categories from "./components/Categories";
import Link from "next/link";
import { Listing, searchListings } from "./data";

export default function Home() {
    const [listings, setListings] = useState<Listing[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState("");
    const [selectedCategory, setSelectedCategory] = useState("All");

    const [searchCountry, setSearchCountry] = useState("");
    const [searchGuests, setSearchGuests] = useState(0);
    const [searchStartDate, setSearchStartDate] = useState<Date | null>(null);
    const [searchEndDate, setSearchEndDate] = useState<Date | null>(null);

    const { wishlist, toggleWishlist } = useWishlist();

    const formatLocalDate = (date: Date) => {
        const offset = date.getTimezoneOffset();
        const localDate = new Date(date.getTime() - offset * 60 * 1000);
        return localDate.toISOString().split("T")[0];
    };

    useEffect(() => {
        let isMounted = true;

        searchListings({
            location: searchCountry.trim() || undefined,
            category: selectedCategory === "All" ? undefined : selectedCategory,
            guests: searchGuests || undefined,
            checkIn: searchStartDate ? formatLocalDate(searchStartDate) : undefined,
            checkOut: searchEndDate ? formatLocalDate(searchEndDate) : undefined
        })
            .then((data) => {
                if (isMounted) {
                    setListings(data);
                    setError("");
                }
            })
            .catch(() => {
                if (isMounted) setError("Could not load listings from the backend.");
            })
            .finally(() => {
                if (isMounted) setIsLoading(false);
            });

        return () => {
            isMounted = false;
        };
    }, [selectedCategory, searchGuests, searchCountry, searchStartDate, searchEndDate]);

    const filteredListings = listings.filter((l) => {
        const matchesSearch =
            !searchCountry ||
            l.location.toLowerCase().includes(searchCountry.toLowerCase()) ||
            l.title.toLowerCase().includes(searchCountry.toLowerCase());

        return matchesSearch;
    });

    return (
        <main style={{ backgroundColor: "#000", minHeight: "100vh", color: "white" }}>
            <Navbar
                onSearch={(country, guests, startDate, endDate) => {
                    setSearchCountry(country);
                    setSearchGuests(guests);
                    setSearchStartDate(startDate);
                    setSearchEndDate(endDate);
                }}
            />

            <Categories selectedCategory={selectedCategory} setSelectedCategory={setSelectedCategory} />

            <div style={{ padding: "32px 40px" }}>
                <h1 style={{ fontSize: "24px", fontWeight: 600, marginBottom: "24px" }}>
                    {searchCountry
                        ? `Results for "${searchCountry}"`
                        : "Places near you"}
                </h1>

                {isLoading ? (
                    <div style={{ textAlign: "center", marginTop: "50px", color: "#a0a0a0" }}>
                        Loading listings...
                    </div>
                ) : error ? (
                    <div style={{ textAlign: "center", marginTop: "50px", color: "#ff385c" }}>
                        {error}
                    </div>
                ) : filteredListings.length > 0 ? (
                    <div style={{
                        display: "grid",
                        gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
                        gap: "24px",
                    }}>
                        {filteredListings.map((listing) => (
                            <div key={listing.id} style={{ position: "relative" }}>
                                {/* Срце икона позиционирана апсолутно врз картичката */}
                                <div
                                    onClick={(e) => {
                                        e.preventDefault();
                                        e.stopPropagation();
                                        toggleWishlist(listing.id);
                                    }}
                                    style={{
                                        position: "absolute",
                                        top: "12px",
                                        right: "12px",
                                        zIndex: 10,
                                        cursor: "pointer",
                                        transition: "transform 0.2s ease",
                                    }}
                                    onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.2)")}
                                    onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
                                >
                                    <Heart
                                        size={24}
                                        color={wishlist.includes(listing.id) ? "#ff385c" : "white"}
                                        fill={wishlist.includes(listing.id) ? "#ff385c" : "rgba(0,0,0,0.3)"}
                                    />
                                </div>

                                <Link href={`/listings/${listing.id}`} style={{ textDecoration: "none", color: "inherit" }}>
                                    <div className="card" style={{ cursor: "pointer" }}>
                                        <div style={{ width: "100%", height: "280px", borderRadius: "12px", overflow: "hidden", marginBottom: "12px" }}>
                                            <img src={listing.image} alt={listing.title} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                                        </div>
                                        <div style={{ display: "flex", justifyContent: "space-between", fontWeight: "bold" }}>
                                            <span>{listing.title}</span>
                                            <span>★ {listing.rating}</span>
                                        </div>
                                        <div style={{ color: "#a0a0a0", fontSize: "14px" }}>{listing.location}</div>
                                        <div style={{ marginTop: "6px" }}><strong>${listing.price}</strong> / night</div>
                                    </div>
                                </Link>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div style={{ textAlign: "center", marginTop: "50px", color: "#a0a0a0" }}>
                        No listings found for your search.
                    </div>
                )}
            </div>
        </main>
    );
}
