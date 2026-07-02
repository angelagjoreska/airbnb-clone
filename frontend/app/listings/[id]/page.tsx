"use client";
import Navbar from "../../components/Navbar";
import { useParams, useRouter } from "next/navigation";
import {
    Booking,
    createReview,
    deleteReview,
    fetchBookingsByListing,
    fetchListingById,
    fetchReviewsByListing,
    Listing,
    Review
} from "../../data";
import { FormEvent, useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useToast } from "../../components/ToastProvider";

export default function ListingDetail() {
    const params = useParams();
    const router = useRouter();
    const toast = useToast();
    const listingId = Number(params.id);
    const [listing, setListing] = useState<Listing | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState("");
    const [bookings, setBookings] = useState<Booking[]>([]);
    const [reviews, setReviews] = useState<Review[]>([]);
    const [reviewRating, setReviewRating] = useState(5);
    const [reviewComment, setReviewComment] = useState("");
    const [isSubmittingReview, setIsSubmittingReview] = useState(false);
    const [showAmenities, setShowAmenities] = useState(false);
    const [dates, setDates] = useState<[Date | null, Date | null]>([null, null]);
    const [guestCount, setGuestCount] = useState(1);
    const [startDate, endDate] = dates;
    const [selectedImage, setSelectedImage] = useState(0);
    const nextImage = () => {
        if (!listing) return;

        setSelectedImage((prev) =>
            prev === listing.images.length - 1 ? 0 : prev + 1
        );
    };

    const previousImage = () => {
        if (!listing) return;

        setSelectedImage((prev) =>
            prev === 0 ? listing.images.length - 1 : prev - 1
        );
    };

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

        fetchBookingsByListing(listingId)
            .then((listingBookings) => {
                if (isMounted) setBookings(listingBookings);
            })
            .catch((bookingError) => {
                console.error("Failed to fetch listing bookings:", bookingError);
                toast.error("Could not load booked dates for this listing.");
            });

        fetchReviewsByListing(listingId)
            .then((listingReviews) => {
                if (isMounted) setReviews(listingReviews);
            })
            .catch((reviewError) => {
                console.error("Failed to fetch listing reviews:", reviewError);
                toast.error("Could not load reviews for this listing.");
            });

        return () => {
            isMounted = false;
        };
    }, [listingId, toast]);

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
        if (!listing) return;

        if (!startDate || !endDate) {
            toast.info("Please select dates first.");
            return;
        }

        if (guestCount < 1 || guestCount > listing.maxGuests) {
            toast.info(`Choose between 1 and ${listing.maxGuests} guests.`);
            return;
        }

        const isTaken = bookings.some((booking) => {
            if (booking.status === "CANCELLED") return false;

            const existingStart = new Date(`${booking.checkInDate}T00:00:00`);
            const existingEnd = new Date(`${booking.checkOutDate}T00:00:00`);

            return startDate < existingEnd && endDate > existingStart;
        });

        if (isTaken) {
            toast.error("These dates are already booked.");
            return;
        }

        router.push(
            `/checkout/${listing.id}?start=${encodeURIComponent(startDate.toISOString())}&end=${encodeURIComponent(endDate.toISOString())}&guests=${guestCount}`
        );
    };

    const handleSubmitReview = async (event: FormEvent) => {
        event.preventDefault();

        const token = localStorage.getItem("token");

        if (!token) {
            toast.info("Log in to review this listing.");
            router.push(`/login?redirect=/listings/${listingId}`);
            return;
        }

        setIsSubmittingReview(true);

        try {
            const created = await createReview(
                {
                    listingId,
                    rating: reviewRating,
                    comment: reviewComment
                },
                token
            );

            setReviews((current) => [created, ...current]);
            setReviewRating(5);
            setReviewComment("");
            toast.success("Review posted.");
        } catch (error) {
            toast.error(error instanceof Error ? error.message : "Could not post review.");
        } finally {
            setIsSubmittingReview(false);
        }
    };

    const handleDeleteReview = async (reviewId: number) => {
        const token = localStorage.getItem("token");

        if (!token) {
            toast.info("Log in to delete your review.");
            router.push(`/login?redirect=/listings/${listingId}`);
            return;
        }

        try {
            await deleteReview(reviewId, token);
            setReviews((current) => current.filter((review) => review.id !== reviewId));
            toast.success("Review deleted.");
        } catch (error) {
            toast.error(error instanceof Error ? error.message : "Could not delete review.");
        }
    };


    if (isLoading) {
        return (
            <div style={{ backgroundColor: "#000", minHeight: "100vh", color: "white", padding: "40px" }}>
                <Navbar onSearch={() => {}} />
                <h1>Loading listing...</h1>
            </div>
        );
    }

    if (!listing || error) {
        return (

            <div style={{ backgroundColor: "#000", minHeight: "100vh", color: "white", padding: "40px" }}>
                <Navbar onSearch={() => {}} />
                <h1>{error || "Listing not found."}</h1>
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
                {/*<div*/}
                {/*    style={{*/}
                {/*        display: "flex",*/}
                {/*        gap: "10px",*/}
                {/*        overflowX: "auto",*/}
                {/*        marginBottom: "30px"*/}
                {/*    }}*/}
                {/*>*/}
                {/*    {(listing.images?.length ? listing.images : [listing.image]).map((img, index) => (*/}
                {/*        <img*/}
                {/*            key={index}*/}
                {/*            src={img}*/}
                {/*            onClick={() => setSelectedImage(index)}*/}
                {/*            style={{*/}
                {/*                width: "120px",*/}
                {/*                height: "90px",*/}
                {/*                objectFit: "cover",*/}
                {/*                borderRadius: "10px",*/}
                {/*                cursor: "pointer",*/}
                {/*                transition: "all .25s ease",*/}
                {/*                transform:*/}
                {/*                    selectedImage === index ? "scale(1.08)" : "scale(1)",*/}
                {/*                border:*/}
                {/*                    selectedImage === index*/}
                {/*                        ? "3px solid #ff385c"*/}
                {/*                        : "2px solid transparent"*/}
                {/*            }}*/}
                {/*        />*/}
                {/*    ))}*/}
                {/*</div>*/}
                {/*<div style={{ width: "100%", height: "500px", overflow: "hidden", borderRadius: "16px", marginBottom: "32px" }}>*/}
                {/*    <img*/}
                {/*        src={listing.image}*/}
                {/*        alt={listing.title}*/}
                {/*        style={{ width: "100%", height: "100%", objectFit: "cover" }}*/}
                {/*    />*/}
                {/*</div>*/}


                <div
                    style={{
                        position: "relative",
                        width: "100%",
                        height: "500px",
                        overflow: "hidden",
                        borderRadius: "16px",
                        marginBottom: "20px"
                    }}
                >
                    <img
                        src={listing.images?.[selectedImage] || listing.image}
                        alt={listing.title}
                        style={{
                            width: "100%",
                            height: "100%",
                            objectFit: "cover"
                        }}
                    />


                {listing.images.length > 1 && (
                    <button
                        onClick={previousImage}
                        style={{
                            position: "absolute",
                            left: "20px",
                            top: "50%",
                            transform: "translateY(-50%)",
                            width: "45px",
                            height: "45px",
                            borderRadius: "50%",
                            border: "none",
                            background: "rgba(0,0,0,0.6)",
                            color: "white",
                            cursor: "pointer",
                            fontSize: "22px"
                        }}
                    >
                        ❮
                    </button>
                )}


                    {listing.images.length > 1 && (
                        <button
                            onClick={nextImage}
                            style={{
                                position: "absolute",
                                right: "20px",
                                top: "50%",
                                transform: "translateY(-50%)",
                                width: "45px",
                                height: "45px",
                                borderRadius: "50%",
                                border: "none",
                                background: "rgba(0,0,0,0.6)",
                                color: "white",
                                cursor: "pointer",
                                fontSize: "22px"
                            }}
                        >
                            ❯
                        </button>
                    )}
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
                                            key={item}
                                            style={{
                                                padding: "10px",
                                                borderRadius: "8px",
                                                backgroundColor: "#1a1a1a"
                                            }}
                                        >
                                            {item}
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>

                        <section style={{marginTop: "32px", borderTop: "1px solid #333", paddingTop: "32px"}}>
                            <h2 style={{fontSize: "22px", marginBottom: "16px"}}>
                                Reviews {reviews.length > 0 ? `(${reviews.length})` : ""}
                            </h2>

                            <form onSubmit={handleSubmitReview} style={{marginBottom: "24px"}}>
                                <div style={{display: "flex", gap: "12px", alignItems: "center", marginBottom: "12px"}}>
                                    <label htmlFor="rating" style={{color: "#ccc", fontSize: "14px"}}>Rating</label>
                                    <select
                                        id="rating"
                                        value={reviewRating}
                                        onChange={(event) => setReviewRating(Number(event.target.value))}
                                        style={{
                                            background: "#111",
                                            color: "white",
                                            border: "1px solid #444",
                                            borderRadius: "8px",
                                            padding: "8px"
                                        }}
                                    >
                                        {[5, 4, 3, 2, 1].map((rating) => (
                                            <option key={rating} value={rating}>{rating}</option>
                                        ))}
                                    </select>
                                </div>
                                <textarea
                                    value={reviewComment}
                                    onChange={(event) => setReviewComment(event.target.value)}
                                    placeholder="Share what stood out about this stay"
                                    maxLength={1000}
                                    style={{
                                        width: "100%",
                                        minHeight: "90px",
                                        boxSizing: "border-box",
                                        background: "#111",
                                        color: "white",
                                        border: "1px solid #444",
                                        borderRadius: "10px",
                                        padding: "12px",
                                        resize: "vertical"
                                    }}
                                />
                                <button
                                    type="submit"
                                    disabled={isSubmittingReview || reviewComment.trim().length === 0}
                                    style={{
                                        marginTop: "12px",
                                        backgroundColor: isSubmittingReview ? "#555" : "#ff385c",
                                        color: "white",
                                        border: "none",
                                        padding: "10px 16px",
                                        borderRadius: "10px",
                                        cursor: isSubmittingReview ? "default" : "pointer",
                                        fontWeight: "bold"
                                    }}
                                >
                                    {isSubmittingReview ? "Posting..." : "Post review"}
                                </button>
                            </form>

                            {reviews.length === 0 ? (
                                <p style={{color: "#a0a0a0"}}>No reviews yet.</p>
                            ) : (
                                <div style={{display: "grid", gap: "12px"}}>
                                    {reviews.map((review) => (
                                        <article
                                            key={review.id}
                                            style={{
                                                background: "#111",
                                                border: "1px solid #333",
                                                borderRadius: "10px",
                                                padding: "14px"
                                            }}
                                        >
                                            <div style={{display: "flex", justifyContent: "space-between", gap: "12px"}}>
                                                <strong>{review.guestName || "Guest"}</strong>
                                                <span style={{color: "#ffcc66"}}>★ {review.rating}</span>
                                            </div>
                                            {review.comment && (
                                                <p style={{color: "#ccc", lineHeight: 1.6, marginBottom: 0}}>{review.comment}</p>
                                            )}
                                            <button
                                                onClick={() => handleDeleteReview(review.id)}
                                                style={{
                                                    marginTop: "10px",
                                                    background: "transparent",
                                                    border: "none",
                                                    color: "#ff8a8a",
                                                    cursor: "pointer",
                                                    padding: 0
                                                }}
                                            >
                                                Delete
                                            </button>
                                        </article>
                                    ))}
                                </div>
                            )}
                        </section>
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
                            <div style={{padding: "5px", borderBottom: "1px solid #444"}}>
                                <label style={{fontSize: "10px", fontWeight: "bold", display: "block", color: "white"}}>
                                    CHECK-IN / CHECK-OUT
                                </label>

                                <div
                                    style={{
                                        background: "#111",
                                        padding: "15px",
                                        borderRadius: "12px",
                                        // border: "1px solid #333"
                                    }}
                                >
                                    <DatePicker
                                        selectsRange
                                        startDate={startDate}
                                        endDate={endDate}
                                        onChange={(update: [Date | null, Date | null]) => setDates(update)}
                                        minDate={new Date()}
                                        inline
                                        calendarClassName="dark-datepicker"
                                        excludeDateIntervals={bookings
                                            .filter((booking) => booking.status !== "CANCELLED")
                                            .map((booking) => ({
                                                start: new Date(`${booking.checkInDate}T00:00:00`),
                                                end: new Date(`${booking.checkOutDate}T00:00:00`)
                                            }))
                                        }
                                    />
                                </div>
                            </div>
                            <div style={{padding: "12px"}}>
                                <label style={{fontSize: "10px", fontWeight: "bold", display: "block", color: "white", marginBottom: "8px"}}>
                                    GUESTS
                                </label>
                                <div style={{display: "flex", justifyContent: "space-between", alignItems: "center"}}>
                                    <span style={{color: "#a0a0a0", fontSize: "14px"}}>
                                        Max {listing.maxGuests}
                                    </span>
                                    <div style={{display: "flex", alignItems: "center", gap: "10px"}}>
                                        <button
                                            onClick={() => setGuestCount((current) => Math.max(1, current - 1))}
                                            style={guestButton}
                                        >
                                            -
                                        </button>
                                        <strong>{guestCount}</strong>
                                        <button
                                            onClick={() => setGuestCount((current) => Math.min(listing.maxGuests, current + 1))}
                                            style={guestButton}
                                        >
                                            +
                                        </button>
                                    </div>
                                </div>
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

const guestButton: React.CSSProperties = {
    width: "30px",
    height: "30px",
    borderRadius: "50%",
    border: "1px solid #555",
    background: "#111",
    color: "white",
    cursor: "pointer"
};