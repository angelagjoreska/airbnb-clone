export interface Listing {
    id: number;
    title: string;
    location: string;
    price: number;
    rating: number;
    category: string;
    image: string;
    description: string;
    amenities: string[];
    maxGuests: number;
    bedrooms?: number;
    bathrooms?: number;
    hostName?: string;
    hostId?: number;
    cityId?: number;
    cityName?: string;
    cityCountry?: string;
    isAvailable?: boolean;
    images: string[];
}

interface BackendListing {
    id: number;
    title: string;
    description: string;
    pricePerNight: number | string;
    maxGuests: number;
    category: string;
    cityId?: number;
    cityName?: string;
    cityCountry?: string;
    hostId?: number;
    hostName?: string;
    imageUrls?: string[];
    averageRating?: number;
    totalReviews?: number;
    isAvailable?: boolean;
    bedrooms?: number;
    bathrooms?: number;
    amenities?: string[];
}

export interface ListingPayload {
    title: string;
    description: string;
    pricePerNight: number;
    maxGuests: number;
    category: string;
    cityId: number;
    imageUrls: string[];
    bedrooms?: number;
    bathrooms?: number;
    amenities: string[];
}

export interface Reservation {
    listingId: number;
    startDate: string;
    endDate: string;
}

export interface Booking {
    id: number;
    listingId: number;
    listingTitle?: string;
    guestId?: number;
    guestName?: string;
    checkInDate: string;
    checkOutDate: string;
    numberOfGuests: number;
    totalPrice: number;
    status: string;
}

interface CreateBookingRequest {
    listingId: number;
    checkInDate: string;
    checkOutDate: string;
    numberOfGuests: number;
}

export interface Review {
    id: number;
    listingId: number;
    listingTitle?: string;
    guestId?: number;
    guestName?: string;
    rating: number;
    comment?: string;
}

export interface ReviewPayload {
    listingId: number;
    rating: number;
    comment: string;
}

export interface User {
    id: number;
    firstName: string;
    lastName: string;
    email: string;
    phoneNumber?: string;
    profilePicture?: string;
    role: string;
}

interface AuthResponse {
    token: string;
    email: string;
    role: string;
}

interface LoginRequest {
    email: string;
    password: string;
}

interface RegisterRequest {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    phoneNumber: string;
}

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:8080";
const FALLBACK_IMAGE = "/window.svg";

function mapListing(listing: BackendListing): Listing {
    const city = listing.cityName ?? "Unknown city";
    const country = listing.cityCountry ? `, ${listing.cityCountry}` : "";
    const images = listing.imageUrls?.filter(Boolean) ?? [];

    return {
        id: listing.id,
        title: listing.title,
        location: `${city}${country}`,
        price: Number(listing.pricePerNight),
        rating: listing.averageRating ?? 0,
        category: listing.category,
        image: images[0] ?? FALLBACK_IMAGE,
        description: listing.description,
        amenities: listing.amenities ?? [],
        maxGuests: listing.maxGuests,
        bedrooms: listing.bedrooms,
        bathrooms: listing.bathrooms,
        hostId: listing.hostId,
        hostName: listing.hostName,
        cityId: listing.cityId,
        cityName: listing.cityName,
        cityCountry: listing.cityCountry,
        isAvailable: listing.isAvailable,
        images
    };
}

async function parseError(response: Response): Promise<string> {
    const data = await response.json().catch(() => null);

    if (data?.message) return data.message;

    return `Backend request failed: ${response.status}`;
}

async function fetchJson<T>(path: string, init?: RequestInit): Promise<T> {
    const response = await fetch(`${API_BASE_URL}${path}`, init);

    if (!response.ok) {
        throw new Error(await parseError(response));
    }

    if (response.status === 204) {
        return undefined as T;
    }

    return response.json();
}

export async function fetchListings(): Promise<Listing[]> {
    const listings = await fetchJson<BackendListing[]>("/api/listings");
    return listings.map(mapListing);
}

export interface ListingSearchParams {
    cityId?: number;
    location?: string;
    category?: string;
    minPrice?: number;
    maxPrice?: number;
    guests?: number;
    checkIn?: string;
    checkOut?: string;
}

function toQueryString(params: ListingSearchParams) {
    const searchParams = new URLSearchParams();

    Object.entries(params).forEach(([key, value]) => {
        if (value !== undefined && value !== "") {
            searchParams.set(key, String(value));
        }
    });

    const query = searchParams.toString();
    return query ? `?${query}` : "";
}

export async function searchListings(params: ListingSearchParams): Promise<Listing[]> {
    const listings = await fetchJson<BackendListing[]>(
        `/api/listings/search${toQueryString(params)}`
    );
    return listings.map(mapListing);
}

export async function fetchListingById(id: number): Promise<Listing> {
    const listing = await fetchJson<BackendListing>(`/api/listings/${id}`);
    return mapListing(listing);
}

export async function fetchListingsByCity(cityId: number): Promise<Listing[]> {
    const listings = await fetchJson<BackendListing[]>(`/api/listings/city/${cityId}`);
    return listings.map(mapListing);
}

export async function fetchListingsByHost(hostId: number): Promise<Listing[]> {
    const listings = await fetchJson<BackendListing[]>(`/api/listings/host/${hostId}`);
    return listings.map(mapListing);
}

export async function fetchListingsByCategory(category: string): Promise<Listing[]> {
    const listings = await fetchJson<BackendListing[]>(`/api/listings/category/${category}`);
    return listings.map(mapListing);
}

export async function createListing(listing: ListingPayload, token: string): Promise<Listing> {
    const created = await fetchJson<BackendListing>("/api/listings", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(listing)
    });
    return mapListing(created);
}

export async function updateListing(
    id: number,
    listing: ListingPayload,
    token: string
): Promise<Listing> {
    const updated = await fetchJson<BackendListing>(`/api/listings/${id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(listing)
    });
    return mapListing(updated);
}

export async function deleteListing(id: number, token: string): Promise<void> {
    await fetchJson<void>(`/api/listings/${id}`, {
        method: "DELETE",
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
}

export async function toggleListingAvailability(id: number, token: string): Promise<Listing> {
    const updated = await fetchJson<BackendListing>(`/api/listings/${id}/availability`, {
        method: "PATCH",
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
    return mapListing(updated);
}

export async function fetchBookingsByListing(listingId: number): Promise<Booking[]> {
    return fetchJson<Booking[]>(`/api/bookings/listings/${listingId}`);
}

export async function fetchBookingById(id: number, token: string): Promise<Booking> {
    return fetchJson<Booking>(`/api/bookings/${id}`, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
}

export async function fetchMyBookings(token: string): Promise<Booking[]> {
    return fetchJson<Booking[]>("/api/bookings/my", {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
}

export async function fetchHostBookings(token: string): Promise<Booking[]> {
    return fetchJson<Booking[]>("/api/bookings/host", {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
}

export async function createBooking(
    booking: CreateBookingRequest,
    token: string
): Promise<Booking> {
    return fetchJson<Booking>("/api/bookings", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(booking)
    });
}

export async function confirmBooking(id: number, token: string): Promise<Booking> {
    return fetchJson<Booking>(`/api/bookings/${id}/confirm`, {
        method: "PATCH",
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
}

export async function cancelBooking(id: number, token: string): Promise<Booking> {
    return fetchJson<Booking>(`/api/bookings/${id}/cancel`, {
        method: "PATCH",
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
}

export async function fetchReviewById(id: number): Promise<Review> {
    return fetchJson<Review>(`/api/reviews/${id}`);
}

export async function fetchReviewsByListing(listingId: number): Promise<Review[]> {
    return fetchJson<Review[]>(`/api/reviews/listing/${listingId}`);
}

export async function fetchMyReviews(token: string): Promise<Review[]> {
    return fetchJson<Review[]>("/api/reviews/my", {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
}

export async function createReview(review: ReviewPayload, token: string): Promise<Review> {
    return fetchJson<Review>("/api/reviews", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(review)
    });
}

export async function deleteReview(id: number, token: string): Promise<void> {
    await fetchJson<void>(`/api/reviews/${id}`, {
        method: "DELETE",
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
}

export async function fetchUsers(token: string): Promise<User[]> {
    return fetchJson<User[]>("/api/users", {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
}

export async function fetchUserById(id: number, token: string): Promise<User> {
    return fetchJson<User>(`/api/users/${id}`, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
}

export async function login(request: LoginRequest): Promise<AuthResponse> {
    return fetchJson<AuthResponse>("/api/auth/login", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(request)
    });
}

export async function register(request: RegisterRequest): Promise<AuthResponse> {
    return fetchJson<AuthResponse>("/api/auth/register", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(request)
    });
}
