"use client";
import Navbar from "../../components/Navbar";
import { useParams, useRouter } from "next/navigation";
import { listings } from "../../data";
import { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { reservations } from "../../data";

export default function ListingDetail() {
    const params = useParams();
    const router = useRouter();
    const [showAmenities, setShowAmenities] = useState(false);
    const [dates, setDates] = useState<[Date | null, Date | null]>([null, null]);
    const [startDate, endDate] = dates;

    // Го наоѓаме точниот апартман според ID од линкот
    const listing = listings.find((item) => item.id === Number(params.id));
    if (!listing) return null;

    // Логика за пресметка на ноќевања
    const nights =
        startDate && endDate
            ? Math.ceil(
                (endDate.getTime() - startDate.getTime()) /
                (1000 * 60 * 60 * 24)
            )
            : 0;
    const serviceFee = 20;
    const totalPrice = listing ? (listing.price * nights) + serviceFee : 0;

    const handleReserve = () => {
        if (!startDate || !endDate) {
            alert("Please select dates first");
            return;
        }

        const isTaken = reservations.some((r) => {
            if (r.listingId !== listing.id) return false;

            const existingStart = new Date(r.startDate);
            const existingEnd = new Date(r.endDate);

            return startDate <= existingEnd && endDate >= existingStart;
        });

        if (isTaken) {
            alert("These dates are already booked!");
            return;
        }

        reservations.push({
            listingId: listing.id,
            startDate: startDate.toISOString(),
            endDate: endDate.toISOString()
        });

        alert("Reservation successful!");

        router.push(
            `/checkout/${listing.id}?start=${startDate.toISOString()}&end=${endDate.toISOString()}`
        );
    };


    if (!listing) {
        return (
            <div style={{ backgroundColor: "#000", minHeight: "100vh", color: "white", padding: "40px" }}>
                <Navbar onSearch={() => {}} />
                <h1>Listing not found.</h1>
            </div>
        );
    }

    return (
        <main style={{ backgroundColor: "#000", minHeight: "100vh", color: "white" }}>
            <Navbar onSearch={() => {}} />

            <div style={{ maxWidth: "1100px", margin: "32px auto", padding: "0 24px" }}>
                {/* Наслов и локација */}
                <h1 style={{ fontSize: "28px", fontWeight: 600, marginBottom: "8px" }}>{listing.title}</h1>
                <div style={{ marginBottom: "24px", textDecoration: "underline", fontSize: "14px", fontWeight: 500 }}>
                    {listing.location}
                </div>

                {/* Голема слика */}
                <div style={{ width: "100%", height: "500px", overflow: "hidden", borderRadius: "16px", marginBottom: "32px" }}>
                    <img
                        src={listing.image}
                        alt={listing.title}
                        style={{ width: "100%", height: "100%", objectFit: "cover" }}
                    />
                </div>

                <div style={{ display: "grid", gridTemplateColumns: "1.5fr 1fr", gap: "60px" }}>
                    {/* Лева страна: Опис */}
                    <div>
                        <h2 style={{
                            fontSize: "22px",
                            borderBottom: "1px solid #333",
                            paddingBottom: "24px",
                            marginBottom: "24px"
                        }}>
                            Entire home hosted by a professional
                        </h2>
                        <p style={{lineHeight: "1.8", color: "#a0a0a0", fontSize: "18px"}}>
                            {listing.description}
                        </p>
                        <div style={{marginTop: "32px", borderTop: "1px solid #333", paddingTop: "32px"}}>

                            {/* BUTTON */}
                            <button
                                onClick={() => setShowAmenities(!showAmenities)}
                                style={{
                                    backgroundColor: "#ff385c",
                                    color: "white",
                                    border: "none",
                                    padding: "10px 16px",
                                    borderRadius: "10px",
                                    cursor: "pointer",
                                    fontWeight: "bold",
                                    display: "flex",
                                    alignItems: "center",
                                    gap: "8px"
                                }}
                            >
                                Facilities
                                <span
                                    style={{
                                        display: "inline-block",
                                        transform: showAmenities ? "rotate(180deg)" : "rotate(0deg)",
                                        transition: "0.2s"
                                    }}
                                >
        ▼
    </span>
                            </button>

                            {/* DROPDOWN */}
                            {showAmenities && (
                                <div
                                    style={{
                                        backgroundColor: "#111",
                                        border: "1px solid #333",
                                        borderRadius: "12px",
                                        padding: "16px",
                                        display: "grid",
                                        gridTemplateColumns: "1fr 1fr",
                                        gap: "12px"
                                    }}
                                >
                                    {listing.amenities?.map((item) => (
                                        <div
                                            key={item.id}
                                            style={{
                                                padding: "10px",
                                                borderRadius: "8px",
                                                backgroundColor: "#1a1a1a"
                                            }}
                                        >
                                            {item.icon} {item.name}
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Десна страна: Картичка за резервација */}
                    <div style={{
                        border: "1px solid #333",
                        borderRadius: "12px",
                        padding: "24px",
                        backgroundColor: "#111",
                        boxShadow: "0 10px 30px rgba(0,0,0,0.5)",
                        height: "fit-content",
                        position: "sticky",
                        top: "100px"
                    }}>
                        <div style={{fontSize: "22px", marginBottom: "24px"}}>
                            <strong>${listing.price}</strong> <span
                            style={{fontSize: "16px", color: "#a0a0a0"}}>/ night</span>
                        </div>

                        <div style={{
                            border: "1px solid #444",
                            borderRadius: "8px",
                            marginBottom: "24px",
                            overflow: "hidden"
                        }}>
                            <div style={{padding: "12px", borderBottom: "1px solid #444"}}>
                                <label style={{fontSize: "10px", fontWeight: "bold", display: "block", color: "white"}}>
                                    CHECK-IN / CHECK-OUT
                                </label>

                                <DatePicker
                                    selectsRange
                                    startDate={startDate}
                                    endDate={endDate}
                                    onChange={(update: [Date | null, Date | null]) => setDates(update)}
                                    minDate={new Date()}
                                    placeholderText="Select dates"
                                    inline
                                    excludeDateIntervals={reservations
                                        .filter(r => r.listingId === listing.id)
                                        .map(r => ({
                                            start: new Date(r.startDate),
                                            end: new Date(r.endDate)
                                        }))
                                    }
                                />
                            </div>
                            <div style={{padding: "12px"}}>
                                <label style={{fontSize: "10px", fontWeight: "bold", display: "block", color: "white"}}>NUMBER
                                    OF NIGHTS</label>

                            </div>
                        </div>

                        <button
                            onClick={handleReserve}
                            style={{
                                width: "100%",
                                backgroundColor: "#ff385c",
                                color: "white",
                                border: "none",
                                padding: "14px",
                                borderRadius: "8px",
                                fontSize: "16px",
                                fontWeight: 600,
                                cursor: "pointer",
                                marginBottom: "24px",
                                transition: "opacity 0.2s"
                            }}
                        >
                            Reserve
                        </button>

                        <div style={{color: "#a0a0a0", fontSize: "14px"}}>
                            <div style={{display: "flex", justifyContent: "space-between", marginBottom: "12px"}}>
                                <span style={{textDecoration: "underline"}}>${listing.price} x {nights} nights</span>
                                <span>${listing.price * nights}</span>
                            </div>
                            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "12px" }}>
                                <span style={{ textDecoration: "underline" }}>Airbnb service fee</span>
                                <span>${serviceFee}</span>
                            </div>
                            <hr style={{ border: "0.5px solid #333", margin: "24px 0" }} />
                            <div style={{ display: "flex", justifyContent: "space-between", fontSize: "18px", color: "white", fontWeight: 600 }}>
                                <span>Total before taxes</span>
                                <span>${totalPrice}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
}