"use client";

import { useParams, useSearchParams, useRouter } from "next/navigation";
import { createBooking, fetchListingById, Listing } from "../../data";
import { Suspense, useEffect, useState } from "react";
import { useToast } from "../../components/ToastProvider";

export default function CheckoutPage() {
    return (
        <Suspense fallback={<div style={page}>Loading checkout...</div>}>
            <CheckoutContent />
        </Suspense>
    );
}

function CheckoutContent() {
    const params = useParams();
    const searchParams = useSearchParams();
    const router = useRouter();
    const toast = useToast();
    const listingId = Number(params.id);

    const [listing, setListing] = useState<Listing | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState("");
    const [bookingError, setBookingError] = useState("");

    const startParam = searchParams.get("start");
    const endParam = searchParams.get("end");
    const guestsParam = searchParams.get("guests");
    const guests = Math.max(1, Number(guestsParam) || 1);

    const start = startParam ? new Date(startParam) : null;
    const end = endParam ? new Date(endParam) : null;
    const hasValidDates =
        start instanceof Date &&
        end instanceof Date &&
        !Number.isNaN(start.getTime()) &&
        !Number.isNaN(end.getTime()) &&
        end > start;

    const nights =
        start && end
            ? Math.max(
                1,
                Math.ceil((end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24))
            )
            : 0;

    const total = listing ? listing.price * nights + 20 : 0;

    const [step, setStep] = useState(1);
    const [paymentOption, setPaymentOption] = useState<"full" | "split">("full");
    const [card, setCard] = useState("");
    const [isPaying, setIsPaying] = useState(false);

    useEffect(() => {
        let isMounted = true;

        fetchListingById(listingId)
            .then((data) => {
                if (isMounted) setListing(data);
            })
            .catch(() => {
                if (isMounted) setError("Listing not found.");
            })
            .finally(() => {
                if (isMounted) setIsLoading(false);
            });

        return () => {
            isMounted = false;
        };
    }, [listingId]);

    if (isLoading) return <div style={page}>Loading checkout...</div>;
    if (!listing || error) return <div style={page}>{error || "Not found"}</div>;

    const handleConfirm = async () => {
        if (!hasValidDates) {
            setBookingError("Choose valid check-in and check-out dates.");
            return;
        }

        if (guests < 1 || guests > listing.maxGuests) {
            setBookingError(`Choose between 1 and ${listing.maxGuests} guests.`);
            return;
        }

        if (card.replace(/\s/g, "").length < 8) {
            setBookingError("Enter a card number before confirming.");
            return;
        }

        setIsPaying(true);
        setBookingError("");

        const formatLocalDate = (date: Date) => {
            const offset = date.getTimezoneOffset();
            const localDate = new Date(date.getTime() - offset * 60 * 1000);
            return localDate.toISOString().split("T")[0];
        };

        const jwtToken = localStorage.getItem("token");

        if (!jwtToken) {
            setIsPaying(false);
            const redirectPath = `/checkout/${listing.id}?start=${encodeURIComponent(startParam ?? "")}&end=${encodeURIComponent(endParam ?? "")}&guests=${guests}`;
            toast.info("Log in to finish your reservation.");
            router.push(`/login?redirect=${encodeURIComponent(redirectPath)}`);
            return;
        }

        try {
            await createBooking(
                {
                    listingId: listing.id,
                    checkInDate: formatLocalDate(start as Date),
                    checkOutDate: formatLocalDate(end as Date),
                    numberOfGuests: guests
                },
                jwtToken
            );

            toast.success("Reservation created.");
            router.push("/trips");
        } catch (error) {
            const message =
                error instanceof Error
                    ? error.message
                    : "Could not create the booking.";
            setBookingError(message);
            toast.error(message);
            setIsPaying(false);
        }
    };

    return (
        <div style={page}>
            <div style={cardBox}>
                <h1 style={{ marginBottom: 20 }}>Confirm and pay</h1>

                {/* STEP 1 */}
                {step === 1 && (
                    <div>
                        <h2 style={h2}>1. Choose when to pay</h2>
                        <div
                            onClick={() => setPaymentOption("full")}
                            style={{
                                ...option,
                                border: paymentOption === "full" ? "1px solid #ff385c" : "1px solid #333"
                            }}
                        >
                            Pay ${total.toFixed(2)} now
                        </div>

                        <div
                            onClick={() => setPaymentOption("split")}
                            style={{
                                ...option,
                                border: paymentOption === "split" ? "1px solid #ff385c" : "1px solid #333"
                            }}
                        >
                            Pay part now, part later
                            <div style={{ fontSize: 12, color: "#aaa", marginTop: 5 }}>
                                ${(total * 0.5).toFixed(2)} now, ${(total * 0.5).toFixed(2)} later
                            </div>
                        </div>

                        <button onClick={() => setStep(2)} style={btn}>
                            Next
                        </button>
                    </div>
                )}

                {/* STEP 2 */}
                {step === 2 && (
                    <div>
                        <h2 style={h2}>2. Add payment method</h2>
                        <input
                            placeholder="Card number"
                            value={card}
                            onChange={(e) => setCard(e.target.value)}
                            style={input}
                        />
                        <div style={{ display: "flex", gap: 10 }}>
                            <button onClick={() => setStep(1)} style={btnSecondary}>
                                Back
                            </button>
                            <button
                                onClick={() => setStep(3)}
                                style={btn}
                                disabled={card.length < 8}
                            >
                                Next
                            </button>
                        </div>
                    </div>
                )}

                {/* STEP 3 */}
                {step === 3 && (
                    <div>
                        <h2 style={h2}>3. Review</h2>
                        <div style={{ lineHeight: 1.8, color: "#ccc" }}>
                            <p><strong>Property:</strong> {listing.title}</p>
                            <p><strong>Duration:</strong> {nights} nights</p>
                            <p><strong>Guests:</strong> {guests}</p>
                            <p><strong>Total:</strong> ${total.toFixed(2)}</p>
                            <p><strong>Payment:</strong> {paymentOption === "full" ? "Pay now" : "Split payment"}</p>
                        </div>
                        {bookingError && <p style={errorText}>{bookingError}</p>}
                        {!hasValidDates && <p style={errorText}>Choose valid check-in and check-out dates.</p>}
                        {guests > listing.maxGuests && <p style={errorText}>This listing allows up to {listing.maxGuests} guests.</p>}

                        <button
                            onClick={handleConfirm}
                            style={{...btn, background: isPaying ? "#888" : "#ff385c"}}
                            disabled={isPaying}
                        >
                            {isPaying ? "Processing payment..." : "Confirm and pay"}
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
}

const page: React.CSSProperties = { minHeight: "100vh", background: "#000", display: "flex", justifyContent: "center", alignItems: "center", color: "white" };
const cardBox: React.CSSProperties = { width: "420px", background: "#111", padding: "30px", borderRadius: "16px", border: "1px solid #333", boxShadow: "0 10px 40px rgba(0,0,0,0.6)" };
const option: React.CSSProperties = { padding: 15, marginBottom: 12, borderRadius: 10, cursor: "pointer", background: "#1a1a1a", transition: "0.2s" };
const h2: React.CSSProperties = { marginBottom: 15 };
const btn: React.CSSProperties = { marginTop: 20, padding: 12, width: "100%", background: "#ff385c", color: "white", border: "none", borderRadius: 10, cursor: "pointer", fontWeight: "bold" };
const btnSecondary: React.CSSProperties = { marginTop: 20, padding: 12, flex: 1, background: "#333", color: "white", border: "none", borderRadius: 10, cursor: "pointer" };
const input: React.CSSProperties = { padding: 12, width: "100%", marginTop: 10, borderRadius: 10, border: "1px solid #444", background: "#000", color: "white" };
const errorText: React.CSSProperties = { color: "#ff8a8a", marginTop: 16 };
