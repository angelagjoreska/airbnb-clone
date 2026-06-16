"use client";

import { useParams, useSearchParams, useRouter } from "next/navigation";
import { listings } from "../../data";
import { useState } from "react";

export default function CheckoutPage() {
    const params = useParams();
    const searchParams = useSearchParams();
    const router = useRouter();

    const listing = listings.find(l => l.id === Number(params.id));

    const startParam = searchParams.get("start");
    const endParam = searchParams.get("end");

    const start = startParam ? new Date(startParam) : null;
    const end = endParam ? new Date(endParam) : null;

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

    if (!listing) return <div style={{ color: "white" }}>Not found</div>;

    const handleConfirm = async () => {
        if (card.length < 8) return;

        setIsPaying(true);

        // Безбедно вадење на локалниот датум (спречува UTC да го врати денот наназад)
        const formatLocalDate = (date: Date | null) => {
            if (!date) return null;
            const offset = date.getTimezoneOffset();
            const localDate = new Date(date.getTime() - (offset * 60 * 1000));
            return localDate.toISOString().split('T')[0];
        };

        const formattedCheckIn = formatLocalDate(start);
        const formattedCheckOut = formatLocalDate(end);

        // ГИ ЗЕМАМЕ ПОДАТОЦИТЕ ОД ТВОЈОТ LOCALSTORAGE
        const jwtToken = localStorage.getItem("token");

        setTimeout(async () => {
            try {
                const response = await fetch("http://localhost:8080/api/bookings", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        // ГО ПРАЌАМЕ JWT ТОКЕНОТ КАКО ШТО БАРА SPRING SECURITY
                        "Authorization": jwtToken ? `Bearer ${jwtToken}` : ""
                    },
                    body: JSON.stringify({
                        listingId: listing.id,
                        checkInDate: formattedCheckIn,
                        checkOutDate: formattedCheckOut,
                        numberOfGuests: 1,
                        totalPrice: total
                    }),
                });

                if (response.ok) {
                    // УСПЕШНО! Одиме на My Trips
                    router.push("/trips");
                } else {
                    const errorData = await response.json().catch(() => null);
                    console.error("Spring Boot Error Details:", errorData);
                    alert("Грешка при креирање на резервацијата. Проверете ја конзолата.");
                    setIsPaying(false);
                }
            } catch (error) {
                console.error("Error connecting to backend:", error);
                alert("Не може да се воспостави врска со серверот.");
                setIsPaying(false);
            }
        }, 1500);
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
                            <p><strong>Total:</strong> ${total.toFixed(2)}</p>
                            <p><strong>Payment:</strong> {paymentOption === "full" ? "Pay now" : "Split payment"}</p>
                        </div>

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