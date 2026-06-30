"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { Booking, cancelBooking, fetchBookingById } from "../../data";
import { useToast } from "../../components/ToastProvider";

export default function TripDetailsPage() {
    const params = useParams();
    const router = useRouter();
    const toast = useToast();
    const bookingId = Number(params.id);

    const [booking, setBooking] = useState<Booking | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [isCancelling, setIsCancelling] = useState(false);

    useEffect(() => {
        const token = localStorage.getItem("token");

        if (!token) {
            toast.info("Log in to view this trip.");
            router.push(`/login?redirect=/trips/${bookingId}`);
            return;
        }

        let isMounted = true;

        fetchBookingById(bookingId, token)
            .then((data) => {
                if (isMounted) setBooking(data);
            })
            .catch((requestError) => {
                if (isMounted) {
                    setError(requestError instanceof Error ? requestError.message : "Could not load this trip.");
                }
            })
            .finally(() => {
                if (isMounted) setLoading(false);
            });

        return () => {
            isMounted = false;
        };
    }, [bookingId, router, toast]);

    const handleCancel = async () => {
        const token = localStorage.getItem("token");

        if (!token || !booking) return;

        setIsCancelling(true);

        try {
            const updated = await cancelBooking(booking.id, token);
            setBooking(updated);
            toast.success("Booking cancelled.");
        } catch (requestError) {
            toast.error(requestError instanceof Error ? requestError.message : "Could not cancel booking.");
        } finally {
            setIsCancelling(false);
        }
    };

    return (
        <main style={page}>
            <section style={panel}>
                <button onClick={() => router.push("/trips")} style={backBtn}>Back to trips</button>

                {loading ? (
                    <p style={mutedText}>Loading trip...</p>
                ) : error ? (
                    <p style={errorText}>{error}</p>
                ) : booking ? (
                    <>
                        <div style={headerRow}>
                            <div>
                                <h1 style={{marginBottom: 8}}>{booking.listingTitle || `Listing #${booking.listingId}`}</h1>
                                <p style={mutedText}>Booking Reference: #{booking.id}</p>
                            </div>
                            <span style={statusBadge(booking.status)}>{booking.status}</span>
                        </div>

                        <div style={detailsGrid}>
                            <div style={detailItem}>
                                <span style={label}>Check-in</span>
                                <strong>{new Date(booking.checkInDate).toLocaleDateString()}</strong>
                            </div>
                            <div style={detailItem}>
                                <span style={label}>Check-out</span>
                                <strong>{new Date(booking.checkOutDate).toLocaleDateString()}</strong>
                            </div>
                            <div style={detailItem}>
                                <span style={label}>Guests</span>
                                <strong>{booking.numberOfGuests}</strong>
                            </div>
                            <div style={detailItem}>
                                <span style={label}>Total</span>
                                <strong>${Number(booking.totalPrice).toFixed(2)}</strong>
                            </div>
                        </div>

                        {booking.status !== "CANCELLED" && (
                            <button
                                onClick={handleCancel}
                                disabled={isCancelling}
                                style={{...dangerBtn, opacity: isCancelling ? 0.7 : 1}}
                            >
                                {isCancelling ? "Cancelling..." : "Cancel booking"}
                            </button>
                        )}
                    </>
                ) : (
                    <p style={mutedText}>Trip not found.</p>
                )}
            </section>
        </main>
    );
}

const page: React.CSSProperties = {
    minHeight: "100vh",
    background: "#000",
    color: "white",
    padding: "40px 20px",
    display: "flex",
    justifyContent: "center"
};

const panel: React.CSSProperties = {
    width: "100%",
    maxWidth: "760px",
    background: "#111",
    border: "1px solid #333",
    borderRadius: 12,
    padding: 24,
    height: "fit-content"
};

const headerRow: React.CSSProperties = {
    display: "flex",
    justifyContent: "space-between",
    gap: 16,
    alignItems: "flex-start",
    marginTop: 24,
    marginBottom: 24
};

const detailsGrid: React.CSSProperties = {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
    gap: 12,
    marginBottom: 24
};

const detailItem: React.CSSProperties = {
    background: "#1a1a1a",
    border: "1px solid #333",
    borderRadius: 8,
    padding: 14
};

const label: React.CSSProperties = {
    display: "block",
    color: "#aaa",
    fontSize: 12,
    marginBottom: 8,
    textTransform: "uppercase"
};

const statusBadge = (status: string): React.CSSProperties => ({
    background: status === "CANCELLED" ? "rgba(239, 68, 68, 0.2)" : status === "CONFIRMED" ? "rgba(34, 197, 94, 0.2)" : "rgba(245, 158, 11, 0.2)",
    color: status === "CANCELLED" ? "#ef4444" : status === "CONFIRMED" ? "#22c55e" : "#f59e0b",
    padding: "6px 12px",
    borderRadius: 20,
    fontSize: 12,
    fontWeight: 700
});

const backBtn: React.CSSProperties = {
    padding: "8px 14px",
    background: "#222",
    border: "1px solid #444",
    color: "white",
    borderRadius: 8,
    cursor: "pointer"
};

const dangerBtn: React.CSSProperties = {
    width: "100%",
    padding: 12,
    background: "rgba(239, 68, 68, 0.15)",
    border: "1px solid #ef4444",
    color: "#ffb4b4",
    borderRadius: 8,
    cursor: "pointer",
    fontWeight: 700
};

const mutedText: React.CSSProperties = {
    color: "#aaa"
};

const errorText: React.CSSProperties = {
    color: "#ff8a8a"
};
