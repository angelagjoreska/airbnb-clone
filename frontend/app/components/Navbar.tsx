"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useWishlist } from "../context/WishlistContext";
import { Search, User, Menu, Heart } from "lucide-react";
import { useRouter } from "next/navigation";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

interface NavbarProps {
    onSearch: (
        country: string,
        guests: number,
        startDate: Date | null,
        endDate: Date | null
    ) => void;
}

export default function Navbar({ onSearch }: NavbarProps) {
    const { wishlist } = useWishlist();
    const router = useRouter();

    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    const [openField, setOpenField] = useState<null | "where" | "when" | "who">(null);

    const [destination, setDestination] = useState("");
    const [dates, setDates] = useState<[Date | null, Date | null]>([null, null]);
    const [startDate, endDate] = dates;
    const [city, setCity] = useState("");

    const [adults, setAdults] = useState(0);
    const [children, setChildren] = useState(0);
    const [infants, setInfants] = useState(0);
    const [pets, setPets] = useState(0);


    const handleLogout = () => {
        localStorage.clear(); // брише token, email, role

        setIsLoggedIn(false); // менува UI веднаш
        setIsMenuOpen(false);  // затвора menu

        router.push("/"); // враќа на home
    };



  

    // SEARCH FILTER (IMPORTANT)
    const handleSelectCountry = (country: string) => {
        setDestination(country);
        setOpenField(null);

    };

    const handleSearch = () => {
        onSearch(
            `${city}, ${destination}`, // Skopje, Macedonia
            adults + children,
            startDate,
            endDate
        );

        setOpenField(null);
    };

    const countries = [
        "North Macedonia",
        "Albania",
        "Greece",
        "Serbia",
        "Croatia",
        "Bosnia",
        "Montenegro",
        "Bulgaria",
        "Slovenia"
    ];

    useEffect(() => {
        const checkAuth = () => {
            setIsLoggedIn(!!localStorage.getItem("token"));
        };

        checkAuth();

        window.addEventListener("storage", checkAuth);
        window.addEventListener("focus", checkAuth);

        return () => {
            window.removeEventListener("storage", checkAuth);
            window.removeEventListener("focus", checkAuth);
        };
    }, []);

    const menuItemStyle: React.CSSProperties = {
        display: "block",
        padding: "12px 20px",
        textDecoration: "none",
        color: "#fff",
        fontSize: "14px",
        transition: "background 0.2s",
        cursor: "pointer"
    };




    return (
        <nav style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            padding: "16px 40px",
            borderBottom: "1px solid #222",
            backgroundColor: "#000",
            position: "sticky",
            top: 0,
            zIndex: 1000
        }}>
            <Link href="/" style={{ textDecoration: "none" }}>
                <div style={{ color: "#ff385c", fontSize: "24px", fontWeight: "bold" }}>
                    airbnb
                </div>
            </Link>

            {/* SEARCH BAR */}
            <div style={{ position: "relative" }}>
                <div style={{
                    display: "flex",
                    alignItems: "center",
                    border: "1px solid #444",
                    borderRadius: "999px",
                    backgroundColor: "#1a1a1a",
                    padding: "6px",
                    width: "520px",
                    justifyContent: "space-between"
                }}>
                    <div onClick={() => setOpenField(openField === "where" ? null : "where")}
                         style={{padding: "8px 14px", color: "white"}}>
                        {destination || "Country"}
                    </div>
                    <input
                        placeholder="City"
                        value={city}
                        onChange={(e) => setCity(e.target.value)}
                        style={{
                            background: "transparent",
                            border: "none",
                            color: "white",
                            outline: "none",
                            padding: "8px"
                        }}
                    />

                    <div onClick={() => setOpenField(openField === "when" ? null : "when")}
                         style={{padding: "8px 14px", color: "white", borderLeft: "1px solid #333", cursor: "pointer"}}>
                        {startDate && endDate ? "Selected dates" : "When"}
                    </div>

                    <div onClick={() => setOpenField(openField === "who" ? null : "who")}
                         style={{padding: "8px 14px", color: "white", borderLeft: "1px solid #333", cursor: "pointer"}}>
                        {adults + children + infants + pets > 0
                            ? `${adults + children + infants + pets} guests`
                            : "Who"}
                    </div>

                    <div
                        onClick={handleSearch}
                        style={{
                            backgroundColor: "#ff385c",
                            borderRadius: "50%",
                            padding: "8px",
                            cursor: "pointer"
                        }}
                    >
                        <Search size={16}/>
                    </div>
                </div>

                {/* WHERE DROPDOWN */}
                {openField === "where" && (
                    <div style={{
                        position: "absolute",
                        top: "60px",
                        background: "#111",
                        padding: "12px",
                        borderRadius: "12px",
                        width: "220px"
                    }}>
                        {countries.map(c => (
                            <div
                                key={c}
                                onClick={() => handleSelectCountry(c)}
                                style={{
                                    padding: "10px",
                                    cursor: "pointer",
                                    color: "white"
                                }}
                            >
                                📍 {c}
                            </div>
                        ))}
                    </div>
                )}

                {/* WHEN CALENDAR */}
                {openField === "when" && (
                    <div
                        style={{
                            position: "absolute",
                            top: "60px",
                            left: "0",
                            backgroundColor: "#111",
                            padding: "12px",
                            borderRadius: "12px",
                            zIndex: 2000
                        }}
                    >
                        <DatePicker
                            selectsRange
                            startDate={startDate}
                            endDate={endDate}
                            onChange={(update: [Date | null, Date | null]) => setDates(update)}
                            inline
                        />
                    </div>
                )}

                {/* WHO */}
                {openField === "who" && (
                    <div style={{
                        position: "absolute",
                        top: "60px",
                        right: "0",
                        background: "#111",
                        padding: "16px",
                        borderRadius: "12px",
                        width: "220px"
                    }}>
                        {[
                            { label: "Adults", value: adults, set: setAdults },
                            { label: "Children", value: children, set: setChildren },
                            { label: "Infants", value: infants, set: setInfants },
                            { label: "Pets", value: pets, set: setPets }
                        ].map(g => (
                            <div key={g.label} style={{ display: "flex", justifyContent: "space-between", marginBottom: "10px", color: "white" }}>
                                <span>{g.label}</span>
                                <div style={{ display: "flex", gap: "10px" }}>
                                    <button onClick={() => g.set(Math.max(0, g.value - 1))}>-</button>
                                    <span>{g.value}</span>
                                    <button onClick={() => g.set(g.value + 1)}>+</button>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>

            {/* RIGHT SIDE (UNCHANGED) */}
            <div style={{display: "flex", gap: "20px", alignItems: "center", position: "relative"}}>
                <span style={{
                    fontSize: "14px",
                    fontWeight: 500,
                    cursor: "pointer",
                    color: "white"
                }}>Airbnb your home</span>

                <Link href="/wishlist" style={{textDecoration: "none", color: "white", position: "relative"}}>
                    <Heart size={20}/>
                    {wishlist.length > 0 && (
                        <span style={{
                            position: "absolute",
                            top: "-8px",
                            right: "-10px",
                            backgroundColor: "#ff385c",
                            borderRadius: "50%",
                            padding: "2px 6px",
                            fontSize: "10px"
                        }}>
                            {wishlist.length}
                        </span>
                    )}
                </Link>

                {isLoggedIn && (
                    <button
                        onClick={() => router.push("/trips")}
                        style={{
                            padding: "6px 12px",
                            borderRadius: "20px",
                            border: "1px solid #444",
                            backgroundColor: "#1a1a1a",
                            color: "white",
                            cursor: "pointer",
                            fontSize: "14px"
                        }}
                    >
                        My Trips
                    </button>
                )}

                <div
                    onClick={() => setIsMenuOpen(!isMenuOpen)}
                    style={{
                        border: "1px solid #444",
                        borderRadius: "30px",
                        padding: "5px 5px 5px 12px",
                        display: "flex",
                        alignItems: "center",
                        gap: "12px",
                        backgroundColor: "#1a1a1a",
                        cursor: "pointer"
                    }}
                >
                    <Menu size={16} color="white"/>
                    <div style={{backgroundColor: "#717171", borderRadius: "50%", padding: "6px", color: "white"}}><User
                        size={20}/></div>
                </div>

                {isMenuOpen && (
                    <div style={{
                        position: "absolute",
                        top: "55px",
                        right: "0",
                        backgroundColor: "#222",
                        border: "1px solid #444",
                        borderRadius: "12px",
                        width: "220px",
                        boxShadow: "0 8px 16px rgba(0,0,0,0.5)",
                        zIndex: 1001,
                        padding: "8px 0"
                    }}>

                        {isLoggedIn ? (
                            <div onClick={handleLogout} style={menuItemStyle}>
                                Log out
                            </div>
                        ) : (
                            <>
                                <Link href="/register" onClick={() => setIsMenuOpen(false)} style={menuItemStyle}>
                                    <strong>Sign up</strong>
                                </Link>

                                <Link href="/login" onClick={() => setIsMenuOpen(false)} style={menuItemStyle}>
                                    Log in
                                </Link>
                            </>
                        )}

                        <div style={{height: "1px", backgroundColor: "#444", margin: "8px 0"}}/>

                        <Link href="/airbnb-your-home" onClick={() => setIsMenuOpen(false)} style={menuItemStyle}>
                            Airbnb your home
                        </Link>

                        <Link href="/help-center" onClick={() => setIsMenuOpen(false)} style={menuItemStyle}>
                            Help Center
                        </Link>
                    </div>
                )}
            </div>
        </nav>
    );
}