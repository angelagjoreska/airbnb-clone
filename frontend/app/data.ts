export interface Review {
    id: number;
    user: string;
    rating: number;
    comment: string;
    date: string;
}

export interface Listing {
    id: number;
    title: string;
    location: string;
    price: number;
    rating: number;
    category: string;
    image: string;
    description: string;
    reviews: Review[];
    amenities: Amenity[];

    maxGuests?: number;
    availableFrom?: string;
    availableTo?: string;
}

export interface Amenity {
    id: string;
    name: string;
    icon: string;
}

export const listings: Listing[] = [
    {
        id: 1, title: "Old Town Ohrid Heritage", location: "Ohrid, North Macedonia", price: 110, rating: 4.9, category: "Beachfront",
        image: "https://images.pexels.com/photos/2031706/pexels-photo-2031706.jpeg?auto=compress&cs=tinysrgb&w=800",
        description: "Authentic villa in the heart of Old Town. Near St. John Kaneo church.",
        reviews: [{ id: 1, user: "Stefan", rating: 5, comment: "Pogledot e neverojaten!", date: "2024-03-15" }],
        amenities: [
            { id: "wifi", name: "Fast Wi-Fi", icon: "📶" },
            { id: "ac", name: "Air conditioning", icon: "❄️" },
            { id: "parking", name: "Free parking", icon: "🚗" },
            { id: "pool", name: "Private pool", icon: "🏊" }
        ],
        maxGuests: 4,
        availableFrom: "2026-06-01",
        availableTo: "2026-09-30"
    },
    {
        id: 2, title: "Kopaonik Ski Lodge", location: "Kopaonik, Serbia", price: 95, rating: 4.7, category: "Cabins",
        image: "https://images.pexels.com/photos/1438832/pexels-photo-1438832.jpeg?auto=compress&cs=tinysrgb&w=800",
        description: "Right next to the ski lifts. Includes sauna.",
        reviews: [],
        amenities: [
            { id: "ski", name: "Ski-in access", icon: "🎿" },
            { id: "sauna", name: "Private sauna", icon: "🔥" },
            { id: "fireplace", name: "Fireplace", icon: "🪵" }
        ],
        maxGuests: 6,
        availableFrom: "2026-05-01",
        availableTo: "2026-10-01"
    },
    {
        id: 3, title: "Dubrovnik Walls Apartment", location: "Dubrovnik, Croatia", price: 180, rating: 4.9, category: "Beachfront",
        image: "https://images.pexels.com/photos/1036857/pexels-photo-1036857.jpeg?auto=compress&cs=tinysrgb&w=800",
        description: "Live inside the Game of Thrones filming locations.",
        reviews: [],
        amenities: [
            { id: "pool", name: "Infinity pool", icon: "🏊" },
            { id: "beach", name: "Beach access", icon: "🏖️" },
            { id: "wifi", name: "Fast Wi-Fi", icon: "📶" }
        ],
        maxGuests: 4,
        availableFrom: "2026-06-01",
        availableTo: "2026-09-01"
    },
    {
        id: 4, title: "Skopje City Center Penthouse", location: "Skopje, North Macedonia", price: 65, rating: 4.8, category: "Modern",
        image: "https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg?auto=compress&cs=tinysrgb&w=800",
        description: "Modern apartment with a view of the Stone Bridge.",
        reviews: [],
        amenities: [
            { id: "wifi", name: "Fast Wi-Fi", icon: "📶" },
            { id: "ac", name: "Air conditioning", icon: "❄️" },
            { id: "parking", name: "Free parking", icon: "🚗" },
        ],

        maxGuests: 5,
        availableFrom: "2026-05-15",
        availableTo: "2026-09-30"
    },
    {
        id: 5, title: "Budva Sea View Villa", location: "Budva, Montenegro", price: 140, rating: 4.7, category: "Pools",
        image: "https://images.pexels.com/photos/594077/pexels-photo-594077.jpeg?auto=compress&cs=tinysrgb&w=800",
        description: "Modern villa overlooking Mogren beach.",
        reviews: [],   amenities: [
            { id: "pool", name: "Infinity pool", icon: "🏊" },
            { id: "beach", name: "Beach access", icon: "🏖️" },
            { id: "wifi", name: "Fast Wi-Fi", icon: "📶" }
        ],

        maxGuests: 5,
        availableFrom: "2026-05-15",
        availableTo: "2026-09-30"
    },
    {
        id: 6, title: "Zlatibor Ethno House", location: "Zlatibor, Serbia", price: 60, rating: 4.6, category: "Cabins",
        image: "https://images.pexels.com/photos/2893177/pexels-photo-2893177.jpeg?auto=compress&cs=tinysrgb&w=800",
        description: "Traditional style with mountain views.",
        reviews: [],  amenities: [
            { id: "pool", name: "Infinity pool", icon: "🏊" },
            { id: "beach", name: "Beach access", icon: "🏖️" },
            { id: "wifi", name: "Fast Wi-Fi", icon: "📶" }
        ],
        maxGuests: 6,
        availableFrom: "2026-01-01",
        availableTo: "2026-12-31"
    },
    {
        id: 7, title: "Bled Lake Treehouse", location: "Bled, Slovenia", price: 210, rating: 5.0, category: "Cabins",
        image: "https://images.pexels.com/photos/147411/italy-mountains-dawn-daybreak-147411.jpeg?auto=compress&cs=tinysrgb&w=800",
        description: "Unique stay in the Slovenian Alps.",
        reviews: [],  amenities: [
            { id: "lakeview", name: "Lake view", icon: "🌊" },
            { id: "wifi", name: "Fast Wi-Fi", icon: "📶" },
            { id: "balcony", name: "Private balcony", icon: "🏡" },
            { id: "heating", name: "Heating", icon: "🔥" }
        ],
        maxGuests: 5,
        availableFrom: "2026-05-15",
        availableTo: "2026-09-30"
    },
    {
        id: 8, title: "Ksamil Turquoise Paradise", location: "Ksamil, Albania", price: 80, rating: 4.9, category: "Beachfront",
        image: "https://images.pexels.com/photos/338504/pexels-photo-338504.jpeg?auto=compress&cs=tinysrgb&w=800",
        description: "The Maldives of Europe.",
        reviews: [], amenities: [
            { id: "beach", name: "Famous Beaches", icon: "🏖️" },
            { id: "sea", name: "Blue Sea View", icon: "🌊" },
            { id: "villa", name: "Luxury Villa", icon: "🏡" },
            { id: "wifi", name: "Fast Wi-Fi", icon: "📶" }
        ],
        maxGuests: 5,
        availableFrom: "2026-05-15",
        availableTo: "2026-09-30"
    },
    {
        id: 9, title: "Sarajevo Baščaršija Loft", location: "Sarajevo, Bosnia", price: 55, rating: 4.9, category: "Modern",
        image: "https://images.pexels.com/photos/584399/pexels-photo-584399.jpeg?auto=compress&cs=tinysrgb&w=800",
        description: "Heart of the historical center.",
        reviews: [],  amenities: [
            { id: "beach", name: "Beach access", icon: "🏖️" },
            { id: "wifi", name: "Fast Wi-Fi", icon: "📶" },
            { id: "ac", name: "Air conditioning", icon: "❄️" },
            { id: "sea_view", name: "Sea view", icon: "🌊" }
        ],

        maxGuests: 4,
        availableFrom: "2026-06-01",
        availableTo: "2026-09-01"
    },
    {
        id: 10, title: "Split Luxury Mansion", location: "Split, Croatia", price: 250, rating: 4.9, category: "Pools",
        image: "https://images.pexels.com/photos/258154/pexels-photo-258154.jpeg?auto=compress&cs=tinysrgb&w=800",
        description: "Huge mansion for large groups.",
        reviews: [],  amenities: [
            { id: "pool", name: "Private pool", icon: "🏊" },
            { id: "city_center", name: "City center location", icon: "📍" },
            { id: "wifi", name: "Fast Wi-Fi", icon: "📶" },
            { id: "ac", name: "Air conditioning", icon: "❄️" }
        ],
        maxGuests: 6,
        availableFrom: "2026-06-01",
        availableTo: "2026-08-29"
    },
    {
        id: 11, title: "Mavrovo Lake Chalet", location: "Mavrovo, North Macedonia", price: 120, rating: 4.7, category: "Cabins",
        image: "https://images.pexels.com/photos/753626/pexels-photo-753626.jpeg?auto=compress&cs=tinysrgb&w=800",
        description: "Ski-in ski-out mountain cabin.",
        reviews: [],  amenities: [
            { id: "ski", name: "Ski access nearby", icon: "🎿" },
            { id: "fireplace", name: "Fireplace", icon: "🪵" },
            { id: "parking", name: "Free parking", icon: "🚗" },
            { id: "wifi", name: "Fast Wi-Fi", icon: "📶" }
        ],
        maxGuests: 6,
        availableFrom: "2026-01-01",
        availableTo: "2026-12-31"
    },
    {
        id: 12, title: "Belgrade Waterfront", location: "Belgrade, Serbia", price: 105, rating: 4.8, category: "Modern",
        image: "https://images.pexels.com/photos/276724/pexels-photo-276724.jpeg?auto=compress&cs=tinysrgb&w=800",
        description: "Luxury riverside living.",
        reviews: [],  amenities: [
            { id: "river_view", name: "River view", icon: "🌊" },
            { id: "wifi", name: "Fast Wi-Fi", icon: "📶" },
            { id: "gym", name: "Gym access", icon: "🏋️" },
            { id: "ac", name: "Air conditioning", icon: "❄️" }
        ],
        maxGuests: 5,
        availableFrom: "2026-01-01",
        availableTo: "2026-12-31"
    },
    {
        id: 13, title: "Berovo Pine Villa", location: "Berovo, North Macedonia", price: 50, rating: 4.9, category: "Cabins",
        image: "https://images.pexels.com/photos/2290753/pexels-photo-2290753.jpeg?auto=compress&cs=tinysrgb&w=800",
        description: "Best air quality in the Balkans.",
        reviews: [],  amenities: [
            { id: "forest_view", name: "Forest view", icon: "🌲" },
            { id: "fireplace", name: "Fireplace", icon: "🪵" },
            { id: "wifi", name: "Fast Wi-Fi", icon: "📶" },
            { id: "parking", name: "Free parking", icon: "🚗" }
        ],
        maxGuests: 6,
        availableFrom: "2026-01-01",
        availableTo: "2026-12-31"
    },
    {
        id: 14, title: "Novi Sad Danube Studio", location: "Novi Sad, Serbia", price: 45, rating: 4.8, category: "Modern",
        image: "https://images.pexels.com/photos/271624/pexels-photo-271624.jpeg?auto=compress&cs=tinysrgb&w=800",
        description: "Minutes away from the Fortress.",
        reviews: [],  amenities: [
            { id: "danube_view", name: "Danube view", icon: "🌊" },
            { id: "wifi", name: "Fast Wi-Fi", icon: "📶" },
            { id: "city_center", name: "City center location", icon: "📍" },
            { id: "ac", name: "Air conditioning", icon: "❄️" }
        ],
        maxGuests: 6,
        availableFrom: "2026-06-01",
        availableTo: "2026-08-29"
    },
    {
        id: 15, title: "Santorini Cliff House", location: "Oia, Greece", price: 350, rating: 5.0, category: "Islands",
        image: "https://images.pexels.com/photos/1010657/pexels-photo-1010657.jpeg?auto=compress&cs=tinysrgb&w=800",
        description: "Iconic blue domes and sunset views.",
        reviews: [],  amenities: [
            { id: "caldera_view", name: "Caldera view", icon: "🌅" },
            { id: "infinity_pool", name: "Infinity pool", icon: "🏊" },
            { id: "wifi", name: "Fast Wi-Fi", icon: "📶" },
            { id: "terrace", name: "Private terrace", icon: "🏡" }
        ],
        maxGuests: 4,
        availableFrom: "2026-06-01",
        availableTo: "2026-09-29"
    },
    {
        id: 16, title: "Halkidiki Sun Resort", location: "Pefkohori, Greece", price: 130, rating: 4.7, category: "Beachfront",
        image: "https://images.pexels.com/photos/1174732/pexels-photo-1174732.jpeg?auto=compress&cs=tinysrgb&w=800",
        description: "Family friendly beachfront villa.",
        reviews: [],  amenities: [
            { id: "beach_access", name: "Beach access", icon: "🏖️" },
            { id: "family_friendly", name: "Family friendly", icon: "👨‍👩‍👧‍👦" },
            { id: "wifi", name: "Fast Wi-Fi", icon: "📶" },
            { id: "parking", name: "Free parking", icon: "🚗" }
        ],
        maxGuests: 7,
        availableFrom: "2026-07-01",
        availableTo: "2026-10-31"
    },
    {
        id: 17, title: "Mykonos White Suite", location: "Mykonos, Greece", price: 280, rating: 4.9, category: "Islands",
        image: "https://images.pexels.com/photos/1285625/pexels-photo-1285625.jpeg?auto=compress&cs=tinysrgb&w=800",
        description: "Premium nightlife destination.",
        reviews: [],  amenities: [
            { id: "sea_view", name: "Sea view", icon: "🌊" },
            { id: "luxury", name: "Luxury suite", icon: "✨" },
            { id: "wifi", name: "Fast Wi-Fi", icon: "📶" },
            { id: "ac", name: "Air conditioning", icon: "❄️" }
        ],
        maxGuests: 4,
        availableFrom: "2026-06-01",
        availableTo: "2026-10-31"
    },

    {
        id: 18, title: "Thassos Olive Garden", location: "Thassos, Greece", price: 90, rating: 4.8, category: "Islands",
        image: "https://images.pexels.com/photos/1001965/pexels-photo-1001965.jpeg?auto=compress&cs=tinysrgb&w=800",
        description: "Nature and sea in one place.",
        reviews: [], amenities: [
            { id: "olive_garden", name: "Olive garden", icon: "🫒" },
            { id: "nature", name: "Nature stay", icon: "🌿" },
            { id: "wifi", name: "Fast Wi-Fi", icon: "📶" },
            { id: "parking", name: "Free parking", icon: "🚗" }
        ],
        maxGuests: 5,
        availableFrom: "2026-06-01",
        availableTo: "2026-08-01"
    },
    {
        id: 19, title: "Hvar Yacht Club", location: "Hvar, Croatia", price: 210, rating: 4.8, category: "Islands",
        image: "https://images.pexels.com/photos/189296/pexels-photo-189296.jpeg?auto=compress&cs=tinysrgb&w=800",
        description: "Sunniest island in the Adriatic.",
        reviews: [],  amenities: [
            { id: "marina_view", name: "Marina view", icon: "⛵" },
            { id: "yacht_access", name: "Yacht access", icon: "🛥️" },
            { id: "wifi", name: "Fast Wi-Fi", icon: "📶" },
            { id: "nightlife", name: "Nightlife nearby", icon: "🌙" }
        ],
        maxGuests: 5,
        availableFrom: "2026-06-01",
        availableTo: "2026-08-01"
    },
    {
        id: 20, title: "Kotor Stone Heritage", location: "Kotor, Montenegro", price: 115, rating: 4.9, category: "Beachfront",
        image: "https://images.pexels.com/photos/2090645/pexels-photo-2090645.jpeg?auto=compress&cs=tinysrgb&w=800",
        description: "Breathtaking views of the Bay.",
        reviews: [],  amenities: [
            { id: "bay_view", name: "Bay view", icon: "🌊" },
            { id: "historic", name: "Historic building", icon: "🏛️" },
            { id: "wifi", name: "Fast Wi-Fi", icon: "📶" },
            { id: "old_town", name: "Old town access", icon: "🚶" }
        ],
        maxGuests: 5,
        availableFrom: "2026-06-01",
        availableTo: "2026-08-01"
    },
    {
        id: 21, title: "Durmitor Forest Lodge", location: "Zabljak, Montenegro", price: 75, rating: 4.8, category: "Cabins",
        image: "https://images.pexels.com/photos/106399/pexels-photo-106399.jpeg?auto=compress&cs=tinysrgb&w=800",
        description: "Wild beauty at its best.",
        reviews: [],  amenities: [
            { id: "mountain_view", name: "Mountain view", icon: "🏔️" },
            { id: "fireplace", name: "Fireplace", icon: "🪵" },
            { id: "hiking", name: "Hiking trails", icon: "🥾" },
            { id: "wifi", name: "Fast Wi-Fi", icon: "📶" }
        ],
        maxGuests: 5,
        availableFrom: "2026-05-01",
        availableTo: "2026-05-04"
    },
    {
        id: 22, title: "Saranda Sea Terrace", location: "Saranda, Albania", price: 60, rating: 4.6, category: "Modern",
        image: "https://images.pexels.com/photos/1457842/pexels-photo-1457842.jpeg?auto=compress&cs=tinysrgb&w=800",
        description: "Affordable luxury by the Ionian sea.",
        reviews: [],  amenities: [
            { id: "sea_view", name: "Sea view", icon: "🌊" },
            { id: "budget_friendly", name: "Budget friendly", icon: "💰" },
            { id: "wifi", name: "Fast Wi-Fi", icon: "📶" },
            { id: "balcony", name: "Private balcony", icon: "🏡" }
        ],
        maxGuests: 4,
        availableFrom: "2026-08-01",
        availableTo: "2026-09-01"
    },
    {
        id: 23, title: "Bansko Alpine Penthouse", location: "Bansko, Bulgaria", price: 70, rating: 4.7, category: "Cabins",
        image: "https://images.pexels.com/photos/3551230/pexels-photo-3551230.jpeg?auto=compress&cs=tinysrgb&w=800",
        description: "Best ski value in Europe.",
        reviews: [],  amenities: [
            { id: "ski_in", name: "Ski-in access", icon: "🎿" },
            { id: "mountain_view", name: "Mountain view", icon: "🏔️" },
            { id: "fireplace", name: "Fireplace", icon: "🪵" },
            { id: "wifi", name: "Fast Wi-Fi", icon: "📶" }
        ],
        maxGuests: 4,
        availableFrom: "2026-11-01",
        availableTo: "2026-12-01"
    },
    {
        id: 24, title: "Sunny Beach Studio", location: "Sunny Beach, Bulgaria", price: 85, rating: 4.5, category: "Beachfront",
        image: "https://images.pexels.com/photos/2507007/pexels-photo-2507007.jpeg?auto=compress&cs=tinysrgb&w=800",
        description: "Summer party capital.",
        reviews: [],  amenities: [
            { id: "party_area", name: "Party area", icon: "🎉" },
            { id: "beach_access", name: "Beach access", icon: "🏖️" },
            { id: "wifi", name: "Fast Wi-Fi", icon: "📶" },
            { id: "nightlife", name: "Nightlife nearby", icon: "🌙" }
        ],
        maxGuests: 4,
        availableFrom: "2026-06-01",
        availableTo: "2026-07-01"
    },
    {
        id: 25, title: "Mostar Bridge View", location: "Mostar, Bosnia", price: 65, rating: 4.9, category: "Modern",
        image: "https://images.pexels.com/photos/4508644/pexels-photo-4508644.jpeg?auto=compress&cs=tinysrgb&w=800",
        description: "Historic stay with a view.",
        reviews: [], amenities: [
            { id: "view", name: "Bridge View", icon: "🌉" },
            { id: "oldtown", name: "Historic Old Town", icon: "🏛️" },
            { id: "wifi", name: "Fast Wi-Fi", icon: "📶" },
            { id: "parking", name: "Free parking", icon: "🚗" }
        ],
        maxGuests: 4,
        availableFrom: "2026-01-01",
        availableTo: "2026-12-31"
    },
    {
        id: 26, title: "Thessaloniki City Center", location: "Thessaloniki, Greece", price: 80, rating: 4.6, category: "Modern",
        image: "https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg?auto=compress&cs=tinysrgb&w=800",
        description: "Walk to the White Tower.",
        reviews: [],  amenities: [
            { id: "city", name: "City Center Location", icon: "🏙️" },
            { id: "walk", name: "Walk to attractions", icon: "🚶" },
            { id: "wifi", name: "Fast Wi-Fi", icon: "📶" },
            { id: "ac", name: "Air conditioning", icon: "❄️" }
        ],
        maxGuests: 6,
        availableFrom: "2026-08-01",
        availableTo: "2026-09-01"
    },
    {
        id: 27, title: "Tirana Skyline Flat", location: "Tirana, Albania", price: 55, rating: 4.7, category: "Modern",
        image: "https://images.pexels.com/photos/276724/pexels-photo-276724.jpeg?auto=compress&cs=tinysrgb&w=800",
        description: "Modern living in the capital.",
        reviews: [],  amenities: [
            { id: "modern", name: "Modern Apartment", icon: "🏢" },
            { id: "cityview", name: "City Skyline View", icon: "🌆" },
            { id: "wifi", name: "Fast Wi-Fi", icon: "📶" },
            { id: "parking", name: "Free parking", icon: "🚗" }
        ],
        maxGuests: 6,
        availableFrom: "2026-07-15",
        availableTo: "2026-09-01"
    },
    {
        id: 28, title: "Rovinj Romantic Villa", location: "Rovinj, Croatia", price: 160, rating: 4.9, category: "Islands",
        image: "https://images.pexels.com/photos/594077/pexels-photo-594077.jpeg?auto=compress&cs=tinysrgb&w=800",
        description: "Istrian charm and blue sea.",
        reviews: [],  amenities: [
            { id: "sea", name: "Sea View", icon: "🌊" },
            { id: "romantic", name: "Romantic Villa", icon: "💙" },
            { id: "wifi", name: "Fast Wi-Fi", icon: "📶" },
            { id: "oldtown", name: "Old Town Access", icon: "🏛️" }
        ],
        maxGuests: 7,
        availableFrom: "2026-08-01",
        availableTo: "2026-09-01"
    },
    {
        id: 29, title: "Tara National Park Cabin", location: "Tara, Serbia", price: 70, rating: 4.9, category: "Cabins",
        image: "https://images.pexels.com/photos/753626/pexels-photo-753626.jpeg?auto=compress&cs=tinysrgb&w=800",
        description: "Hidden gem in the Serbian mountains.",
        reviews: [],  amenities: [
            { id: "forest", name: "Forest Cabin", icon: "🌲" },
            { id: "nature", name: "National Park View", icon: "🏞️" },
            { id: "fireplace", name: "Fireplace", icon: "🔥" },
            { id: "wifi", name: "Fast Wi-Fi", icon: "📶" }
        ],
        maxGuests: 4,
        availableFrom: "2026-09-01",
        availableTo: "2026-12-01"
    },
    {
        id: 30, title: "Lefkada Blue Villa", location: "Lefkada, Greece", price: 145, rating: 4.8, category: "Islands",
        image: "https://images.pexels.com/photos/189296/pexels-photo-189296.jpeg?auto=compress&cs=tinysrgb&w=800",
        description: "Famous for the best beaches in Greece.",
        reviews: [],  amenities: [
            { id: "beach", name: "Famous Beaches", icon: "🏖️" },
            { id: "sea", name: "Blue Sea View", icon: "🌊" },
            { id: "villa", name: "Luxury Villa", icon: "🏡" },
            { id: "wifi", name: "Fast Wi-Fi", icon: "📶" }
        ],
        maxGuests: 4,
        availableFrom: "2026-06-01",
        availableTo: "2026-09-13"
    }
];

export interface Reservation {
    listingId: number;
    startDate: string;
    endDate: string;
}

export const reservations: Reservation[] = [];