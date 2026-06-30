DELETE FROM listing_amenities;
DELETE FROM listing_images;
DELETE FROM bookings;
DELETE FROM reviews;
DELETE FROM listings;
DELETE FROM cities;
DELETE FROM users;

INSERT INTO cities (id, name, country, description, image_url) VALUES
    (1, 'Ohrid', 'North Macedonia', 'Lakeside old town known for churches, clear water, and mountain views.', 'https://images.pexels.com/photos/2031706/pexels-photo-2031706.jpeg'),
    (2, 'Skopje', 'North Macedonia', 'Capital city with Ottoman bazaars, riverside squares, and quick mountain access.', 'https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg'),
    (3, 'Mavrovo', 'North Macedonia', 'National park village for lake weekends, hiking, and winter stays.', 'https://images.pexels.com/photos/753626/pexels-photo-753626.jpeg'),
    (4, 'Belgrade', 'Serbia', 'Danube and Sava river city with nightlife, historic neighborhoods, and modern apartments.', 'https://images.pexels.com/photos/276724/pexels-photo-276724.jpeg'),
    (5, 'Kopaonik', 'Serbia', 'Mountain resort destination with ski slopes, forest trails, and chalet stays.', 'https://images.pexels.com/photos/1438832/pexels-photo-1438832.jpeg'),
    (6, 'Dubrovnik', 'Croatia', 'Adriatic walled city with stone streets, sea views, and historic apartments.', 'https://images.pexels.com/photos/1036857/pexels-photo-1036857.jpeg'),
    (7, 'Split', 'Croatia', 'Coastal city built around Diocletian palace with beaches and ferry links.', 'https://images.pexels.com/photos/258154/pexels-photo-258154.jpeg'),
    (8, 'Budva', 'Montenegro', 'Montenegrin beach town with an old town, coves, and sea-view villas.', 'https://images.pexels.com/photos/594077/pexels-photo-594077.jpeg'),
    (9, 'Kotor', 'Montenegro', 'Bay town surrounded by mountains, stone houses, and waterfront promenades.', 'https://images.pexels.com/photos/2090645/pexels-photo-2090645.jpeg'),
    (10, 'Sarajevo', 'Bosnia and Herzegovina', 'Historic city with Ottoman streets, mountain views, and cafe culture.', 'https://images.pexels.com/photos/584399/pexels-photo-584399.jpeg'),
    (11, 'Mostar', 'Bosnia and Herzegovina', 'Neretva river city centered on the old bridge and stone old town.', 'https://images.pexels.com/photos/4508644/pexels-photo-4508644.jpeg'),
    (12, 'Ksamil', 'Albania', 'Ionian beach village known for turquoise water and island views.', 'https://images.pexels.com/photos/338504/pexels-photo-338504.jpeg'),
    (13, 'Tirana', 'Albania', 'Colorful capital with cafes, museums, and quick access to Dajti mountain.', 'https://images.pexels.com/photos/276724/pexels-photo-276724.jpeg'),
    (14, 'Bansko', 'Bulgaria', 'Mountain town with ski access, old stone streets, and alpine apartments.', 'https://images.pexels.com/photos/3551230/pexels-photo-3551230.jpeg'),
    (15, 'Thessaloniki', 'Greece', 'Northern Greek city with waterfront walks, food markets, and Roman history.', 'https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg'),
    (16, 'Lefkada', 'Greece', 'Ionian island destination with blue beaches, cliffs, and villa stays.', 'https://images.pexels.com/photos/189296/pexels-photo-189296.jpeg');

INSERT INTO users (id, first_name, last_name, email, password, phone_number, profile_picture, role, is_active) VALUES
    (1, 'Airbnb', 'Host', 'host@airbnb.com', '$2a$10$0TVMtK6ZJUB.Vvpc8vFrAeT0bbHab/PU.lLpzin9v6M3Da3sZRO.G', '+38970123456', 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg', 'HOST', true),
    (2, 'Mila', 'Petrova', 'mila@example.com', '$2a$10$0TVMtK6ZJUB.Vvpc8vFrAeT0bbHab/PU.lLpzin9v6M3Da3sZRO.G', '+38970222333', 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg', 'GUEST', true),
    (3, 'Stefan', 'Ilic', 'stefan@example.com', '$2a$10$0TVMtK6ZJUB.Vvpc8vFrAeT0bbHab/PU.lLpzin9v6M3Da3sZRO.G', '+38164111222', 'https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg', 'GUEST', true),
    (4, 'Elena', 'Kosta', 'elena@example.com', '$2a$10$0TVMtK6ZJUB.Vvpc8vFrAeT0bbHab/PU.lLpzin9v6M3Da3sZRO.G', '+35569222333', 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg', 'GUEST', true);

INSERT INTO listings (id, title, description, price_per_night, max_guests, category, city_id, host_id, is_available, bedrooms, bathrooms) VALUES
    (1, 'Old Town Ohrid Stone House', 'Restored stone house above the lake, walking distance to Kaneo, Plaosnik, and the old bazaar.', 115.00, 4, 'HOUSE', 1, 1, true, 2, 1),
    (2, 'Ohrid Lakefront Studio', 'Compact studio with a balcony facing the lake and easy access to the promenade.', 72.00, 2, 'STUDIO', 1, 1, true, 1, 1),
    (3, 'Skopje Riverside Loft', 'Modern loft near the Vardar river, Macedonia Square, and the Old Bazaar.', 68.00, 3, 'LOFT', 2, 1, true, 1, 1),
    (4, 'Mavrovo Pine Cabin', 'Warm cabin near the lake with a fireplace, forest views, and space for hiking gear.', 125.00, 6, 'CABIN', 3, 1, true, 3, 2),
    (5, 'Belgrade Waterfront Apartment', 'Bright apartment close to Savamala, river walks, restaurants, and public transport.', 105.00, 4, 'APARTMENT', 4, 1, true, 2, 1),
    (6, 'Kopaonik Ski Chalet', 'Slope-ready chalet with sauna, boot storage, and mountain views from the living room.', 155.00, 6, 'CABIN', 5, 1, true, 3, 2),
    (7, 'Dubrovnik Old Walls Apartment', 'Stone apartment inside the old city, close to Stradun, city walls, and swimming spots.', 210.00, 4, 'APARTMENT', 6, 1, true, 2, 1),
    (8, 'Split Palace Studio', 'Studio tucked near Diocletian palace with a quiet courtyard and quick access to the Riva.', 145.00, 2, 'STUDIO', 7, 1, true, 1, 1),
    (9, 'Budva Sea View Villa', 'Villa above Budva with terraces, sea views, and a short drive to Mogren beach.', 240.00, 7, 'VILLA', 8, 1, true, 4, 3),
    (10, 'Kotor Bay Guesthouse', 'Traditional guesthouse with bay views, stone details, and access to the old town trail.', 130.00, 5, 'GUESTHOUSE', 9, 1, true, 2, 2),
    (11, 'Sarajevo Bascarsija Loft', 'Loft near the old bazaar with exposed brick, city views, and cafes around the corner.', 82.00, 3, 'LOFT', 10, 1, true, 1, 1),
    (12, 'Mostar Bridge View Apartment', 'Apartment overlooking the Neretva river and old bridge, with a shaded terrace.', 88.00, 4, 'APARTMENT', 11, 1, true, 2, 1),
    (13, 'Ksamil Turquoise Villa', 'Relaxed villa near the beach with outdoor dining, sea colors, and parking included.', 135.00, 5, 'VILLA', 12, 1, true, 2, 2),
    (14, 'Tirana Skyline Flat', 'Central flat with balcony views, close to Blloku, Skanderbeg Square, and cafes.', 64.00, 4, 'APARTMENT', 13, 1, true, 2, 1),
    (15, 'Bansko Alpine Penthouse', 'Penthouse near the gondola with mountain views, heating, and ski storage.', 96.00, 5, 'LOFT', 14, 1, true, 2, 2),
    (16, 'Thessaloniki Waterfront Apartment', 'Apartment near the White Tower and waterfront, ideal for food and culture weekends.', 112.00, 4, 'APARTMENT', 15, 1, true, 2, 1),
    (17, 'Lefkada Blue Villa', 'Villa with terraces, sea views, and easy drives to Porto Katsiki and Kathisma beach.', 260.00, 6, 'VILLA', 16, 1, true, 3, 3),
    (18, 'Ohrid Family Guesthouse', 'Family-friendly guesthouse in a quiet Ohrid neighborhood with garden seating and parking.', 95.00, 6, 'GUESTHOUSE', 1, 1, true, 3, 2);

INSERT INTO listing_images (listing_id, image_url) VALUES
    (1, 'https://images.pexels.com/photos/2031706/pexels-photo-2031706.jpeg?auto=compress&cs=tinysrgb&w=1200'),
    (2, 'https://images.pexels.com/photos/271624/pexels-photo-271624.jpeg?auto=compress&cs=tinysrgb&w=1200'),
    (3, 'https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg?auto=compress&cs=tinysrgb&w=1200'),
    (4, 'https://images.pexels.com/photos/753626/pexels-photo-753626.jpeg?auto=compress&cs=tinysrgb&w=1200'),
    (5, 'https://images.pexels.com/photos/276724/pexels-photo-276724.jpeg?auto=compress&cs=tinysrgb&w=1200'),
    (6, 'https://images.pexels.com/photos/1438832/pexels-photo-1438832.jpeg?auto=compress&cs=tinysrgb&w=1200'),
    (7, 'https://images.pexels.com/photos/1036857/pexels-photo-1036857.jpeg?auto=compress&cs=tinysrgb&w=1200'),
    (8, 'https://images.pexels.com/photos/271624/pexels-photo-271624.jpeg?auto=compress&cs=tinysrgb&w=1200'),
    (9, 'https://images.pexels.com/photos/594077/pexels-photo-594077.jpeg?auto=compress&cs=tinysrgb&w=1200'),
    (10, 'https://images.pexels.com/photos/2090645/pexels-photo-2090645.jpeg?auto=compress&cs=tinysrgb&w=1200'),
    (11, 'https://images.pexels.com/photos/584399/pexels-photo-584399.jpeg?auto=compress&cs=tinysrgb&w=1200'),
    (12, 'https://images.pexels.com/photos/4508644/pexels-photo-4508644.jpeg?auto=compress&cs=tinysrgb&w=1200'),
    (13, 'https://images.pexels.com/photos/338504/pexels-photo-338504.jpeg?auto=compress&cs=tinysrgb&w=1200'),
    (14, 'https://images.pexels.com/photos/276724/pexels-photo-276724.jpeg?auto=compress&cs=tinysrgb&w=1200'),
    (15, 'https://images.pexels.com/photos/3551230/pexels-photo-3551230.jpeg?auto=compress&cs=tinysrgb&w=1200'),
    (16, 'https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg?auto=compress&cs=tinysrgb&w=1200'),
    (17, 'https://images.pexels.com/photos/189296/pexels-photo-189296.jpeg?auto=compress&cs=tinysrgb&w=1200'),
    (18, 'https://images.pexels.com/photos/106399/pexels-photo-106399.jpeg?auto=compress&cs=tinysrgb&w=1200');

INSERT INTO listing_amenities (listing_id, amenity) VALUES
    (1, 'Lake view'), (1, 'Fast Wi-Fi'), (1, 'Air conditioning'), (1, 'Historic location'),
    (2, 'Balcony'), (2, 'Lake view'), (2, 'Air conditioning'), (2, 'Walkable location'),
    (3, 'Fast Wi-Fi'), (3, 'City center'), (3, 'Dedicated workspace'), (3, 'Air conditioning'),
    (4, 'Fireplace'), (4, 'Mountain view'), (4, 'Free parking'), (4, 'Heating'),
    (5, 'River view'), (5, 'Fast Wi-Fi'), (5, 'Elevator'), (5, 'Air conditioning'),
    (6, 'Private sauna'), (6, 'Ski storage'), (6, 'Fireplace'), (6, 'Mountain view'),
    (7, 'Historic location'), (7, 'Fast Wi-Fi'), (7, 'Air conditioning'), (7, 'Walkable location'),
    (8, 'Courtyard'), (8, 'Fast Wi-Fi'), (8, 'Air conditioning'), (8, 'Old town access'),
    (9, 'Sea view'), (9, 'Private terrace'), (9, 'Free parking'), (9, 'Air conditioning'),
    (10, 'Bay view'), (10, 'Historic location'), (10, 'Fast Wi-Fi'), (10, 'Private balcony'),
    (11, 'City view'), (11, 'Fast Wi-Fi'), (11, 'Dedicated workspace'), (11, 'Walkable location'),
    (12, 'Bridge view'), (12, 'Terrace'), (12, 'Fast Wi-Fi'), (12, 'Air conditioning'),
    (13, 'Beach access'), (13, 'Outdoor dining'), (13, 'Free parking'), (13, 'Air conditioning'),
    (14, 'City view'), (14, 'Balcony'), (14, 'Fast Wi-Fi'), (14, 'Air conditioning'),
    (15, 'Mountain view'), (15, 'Ski storage'), (15, 'Heating'), (15, 'Fast Wi-Fi'),
    (16, 'Waterfront nearby'), (16, 'Fast Wi-Fi'), (16, 'Air conditioning'), (16, 'Elevator'),
    (17, 'Sea view'), (17, 'Private terrace'), (17, 'Beach access'), (17, 'Free parking'),
    (18, 'Garden'), (18, 'Free parking'), (18, 'Family friendly'), (18, 'Fast Wi-Fi');

INSERT INTO bookings (id, listing_id, guest_id, check_in_date, check_out_date, number_of_guests, total_price, status) VALUES
    (1, 1, 2, '2026-07-10', '2026-07-14', 2, 460.00, 'CONFIRMED'),
    (2, 4, 3, '2026-08-02', '2026-08-06', 4, 500.00, 'PENDING'),
    (3, 9, 4, '2026-07-20', '2026-07-25', 5, 1200.00, 'CONFIRMED'),
    (4, 13, 2, '2026-09-05', '2026-09-09', 3, 540.00, 'CANCELLED');

INSERT INTO reviews (id, listing_id, guest_id, rating, comment) VALUES
    (1, 1, 2, 5, 'Beautiful old town location and a clear lake view from the house.'),
    (2, 3, 3, 4, 'Clean loft, easy walk to the center, and reliable Wi-Fi.'),
    (3, 7, 4, 5, 'Excellent location inside Dubrovnik old town and very comfortable.'),
    (4, 10, 2, 5, 'The bay view in Kotor was the highlight of the trip.'),
    (5, 13, 3, 4, 'Great base for Ksamil beaches with useful parking.'),
    (6, 17, 4, 5, 'Spacious villa with a terrace made for sunset dinners.');

SELECT setval('cities_id_seq', (SELECT MAX(id) FROM cities));
SELECT setval('users_id_seq', (SELECT MAX(id) FROM users));
SELECT setval('listings_id_seq', (SELECT MAX(id) FROM listings));
SELECT setval('bookings_id_seq', (SELECT MAX(id) FROM bookings));
SELECT setval('reviews_id_seq', (SELECT MAX(id) FROM reviews));
