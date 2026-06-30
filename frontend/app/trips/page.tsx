"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Booking, cancelBooking, fetchMyBookings } from "../data";
import { useToast } from "../components/ToastProvider";

export default function MyTripsPage() {
    const [bookings, setBookings] = useState<Booking[]>([]);
    const [loading, setLoading] = useState(true);
    const router = useRouter();
    const toast = useToast();

    useEffect(() => {
        const jwtToken = localStorage.getItem("token");
        let isMounted = true;

        if (!jwtToken) {
            toast.info("Log in to view your trips.");
            router.push("/login?redirect=/trips");
            return () => {
                isMounted = false;
            };
        }

        fetchMyBookings(jwtToken)
            .then((data) => {
                if (isMounted) setBookings(data);
            })
            .catch((error) => {
                console.error("Error fetching bookings:", error);
                toast.error("Could not load your trips.");
            })
            .finally(() => {
                if (isMounted) setLoading(false);
            });

        return () => {
            isMounted = false;
        };
    }, [router, toast]);

    const handleCancel = async (bookingId: number) => {
        const jwtToken = localStorage.getItem("token");

        if (!jwtToken) {
            toast.info("Log in to cancel this booking.");
            router.push("/login?redirect=/trips");
            return;
        }

        try {
            const updated = await cancelBooking(bookingId, jwtToken);
            setBookings((current) =>
                current.map((booking) => (booking.id === bookingId ? updated : booking))
            );
            toast.success("Booking cancelled.");
        } catch (error) {
            toast.error(error instanceof Error ? error.message : "Could not cancel booking.");
        }
    };

    return (
        <div style={container}>
            <div style={contentBox}>
                <div style={{ display: "flex", justifyContent: "between", alignItems: "center", marginBottom: 30 }}>
                    <h1>Trips</h1>
                    <button onClick={() => router.push("/")} style={backBtn}>Back to Home</button>
                </div>

                {loading ? (
                    <p style={{ color: "#aaa" }}>Loading your trips...</p>
                ) : bookings.length === 0 ? (
                    <div style={noTripsBox}>
                        <h3 style={{ marginBottom: 10 }}>No trips booked... yet!</h3>
                        <p style={{ color: "#aaa", marginBottom: 20 }}>Time to dust off your bags and start planning your next adventure.</p>
                        <button onClick={() => router.push("/")} style={exploreBtn}>Start searching</button>
                    </div>
                ) : (
                    <div style={grid}>
                        {bookings.map((booking) => (
                            <div key={booking.id} style={tripCard}>
                                <div style={statusBadge(booking.status)}>{booking.status}</div>
                                <h3 style={{marginTop: 10, marginBottom: 5}}>
                                    {booking.listingTitle || `Listing #${booking.listingId}`}
                                </h3>
                                <p style={dateText}>
                                    {booking.checkInDate ? new Date(booking.checkInDate).toLocaleDateString() : ""} - {booking.checkOutDate ? new Date(booking.checkOutDate).toLocaleDateString() : ""}
                                </p>
                                <hr style={divider}/>
                                <div style={cardFooter}>
                                    <span>Receipt Total:</span>
                                    <span style={priceText}>${booking.totalPrice.toFixed(2)}</span>
                                </div>
                                <div style={{fontSize: 11, color: "#555", marginTop: 10}}>
                                    Booking Reference: #{booking.id}
                                </div>
                                <div style={actions}>
                                    <button onClick={() => router.push(`/trips/${booking.id}`)} style={secondaryBtn}>
                                        Details
                                    </button>
                                    {booking.status !== "CANCELLED" && (
                                        <button onClick={() => handleCancel(booking.id)} style={dangerBtn}>
                                            Cancel
                                        </button>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}

// Стилизација за Trips страницата во ист стил како Checkout
const container: React.CSSProperties = {
    minHeight: "100vh",
    background: "#000",
    color: "white",
    padding: "40px 20px",
    display: "flex",
    justifyContent: "center"
};

const contentBox: React.CSSProperties = {
    width: "100%",
    maxWidth: "800px"
};

const grid: React.CSSProperties = {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(350px, 1fr))",
    gap: "20px"
};

const tripCard: React.CSSProperties = {
    background: "#111",
    border: "1px solid #333",
    borderRadius: "16px",
    padding: "20px",
    position: "relative"
};

const statusBadge = (status: string): React.CSSProperties => ({
    display: "inline-block",
    background: status === "CANCELLED" ? "rgba(239, 68, 68, 0.2)" : status === "CONFIRMED" ? "rgba(34, 197, 94, 0.2)" : "rgba(245, 158, 11, 0.2)",
    color: status === "CANCELLED" ? "#ef4444" : status === "CONFIRMED" ? "#22c55e" : "#f59e0b",
    padding: "4px 10px",
    borderRadius: "20px",
    fontSize: "12px",
    fontWeight: "bold"
});

const dateText: React.CSSProperties = {
    color: "#aaa",
    fontSize: "14px"
};

const divider: React.CSSProperties = {
    border: "0",
    borderTop: "1px solid #222",
    margin: "15px 0"
};

const cardFooter: React.CSSProperties = {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    fontWeight: "bold"
};

const priceText: React.CSSProperties = {
    color: "#ff385c",
    fontSize: "18px"
};

const noTripsBox: React.CSSProperties = {
    textAlign: "center",
    padding: "60px 20px",
    background: "#111",
    borderRadius: "16px",
    border: "1px solid #333"
};

const backBtn: React.CSSProperties = {
    padding: "8px 16px",
    background: "#222",
    border: "1px solid #444",
    color: "white",
    borderRadius: "8px",
    cursor: "pointer"
};

const exploreBtn: React.CSSProperties = {
    padding: "12px 24px",
    background: "#ff385c",
    color: "white",
    border: "none",
    borderRadius: "10px",
    cursor: "pointer",
    fontWeight: "bold"
};

const actions: React.CSSProperties = {
    display: "flex",
    gap: 10,
    marginTop: 16
};

const secondaryBtn: React.CSSProperties = {
    flex: 1,
    padding: "10px",
    background: "#222",
    border: "1px solid #444",
    color: "white",
    borderRadius: "8px",
    cursor: "pointer"
};

const dangerBtn: React.CSSProperties = {
    flex: 1,
    padding: "10px",
    background: "rgba(239, 68, 68, 0.15)",
    border: "1px solid #ef4444",
    color: "#ffb4b4",
    borderRadius: "8px",
    cursor: "pointer"
};
