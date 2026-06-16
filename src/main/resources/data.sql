-- 1. Чистење на старите податоци (по правилен редослед поради Foreign Keys)
DELETE FROM listing_amenities;
DELETE FROM listing_images;
DELETE FROM bookings;
DELETE FROM reviews;
DELETE FROM listings;
DELETE FROM cities;
DELETE FROM users;

-- 2. Внесуваме Град (City) со ID = 1 според твоите точни полиња
-- (name, country, description, image_url)
INSERT INTO cities (id, name, country, description, image_url)
VALUES (1, 'Ohrid', 'North Macedonia', 'The pearl of the Balkans', 'https://images.pexels.com/photos/2031706/pexels-photo-2031706.jpeg');

-- 3. Внесуваме системски корисник (User) со ID = 1 според твоите точни полиња
-- Вклучена е и задолжителната 'is_active' колона!
INSERT INTO users (id, first_name, last_name, email, password, phone_number, profile_picture, role, is_active)
VALUES (1, 'John', 'Doe', 'host@airbnb.com', 'password123', '+38970123456', 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg', 'HOST', true);

-- 4. Внесување на сите 30 огласи поврзани со city_id = 1 и host_id = 1
INSERT INTO listings (id, title, description, price_per_night, max_guests, category, city_id, host_id, is_available, bedrooms, bathrooms) VALUES
                                                                                                                                              (1, 'Old Town Ohrid Heritage', 'Authentic villa in the heart of Old Town. Near St. John Kaneo church.', 110.00, 4, 'VILLA', 1, 1, true, 2, 1),
                                                                                                                                              (2, 'Kopaonik Ski Lodge', 'Right next to the ski lifts. Includes sauna.', 95.00, 6, 'CABIN', 1, 1, true, 3, 2),
                                                                                                                                              (3, 'Dubrovnik Walls Apartment', 'Live inside the Game of Thrones filming locations.', 180.00, 4, 'APARTMENT', 1, 1, true, 1, 1),
                                                                                                                                              (4, 'Skopje City Center Penthouse', 'Modern apartment with a view of the Stone Bridge.', 65.00, 5, 'LOFT', 1, 1, true, 2, 1),
                                                                                                                                              (5, 'Budva Sea View Villa', 'Modern villa overlooking Mogren beach.', 140.00, 5, 'VILLA', 1, 1, true, 3, 2),
                                                                                                                                              (6, 'Zlatibor Ethno House', 'Traditional style with mountain views.', 60.00, 6, 'HOUSE', 1, 1, true, 2, 1),
                                                                                                                                              (7, 'Bled Lake Treehouse', 'Unique stay in the Slovenian Alps.', 210.00, 5, 'CABIN', 1, 1, true, 1, 1),
                                                                                                                                              (8, 'Ksamil Turquoise Paradise', 'The Maldives of Europe.', 80.00, 5, 'VILLA', 1, 1, true, 2, 1),
                                                                                                                                              (9, 'Sarajevo Baščaršija Loft', 'Heart of the historical center.', 55.00, 4, 'LOFT', 1, 1, true, 1, 1),
                                                                                                                                              (10, 'Split Luxury Mansion', 'Huge mansion for large groups.', 250.00, 6, 'HOUSE', 1, 1, true, 4, 3),
                                                                                                                                              (11, 'Mavrovo Lake Chalet', 'Ski-in ski-out mountain cabin.', 120.00, 6, 'CABIN', 1, 1, true, 3, 2),
                                                                                                                                              (12, 'Belgrade Waterfront', 'Luxury riverside living.', 105.00, 5, 'APARTMENT', 1, 1, true, 2, 1),
                                                                                                                                              (13, 'Berovo Pine Villa', 'Best air quality in the Balkans.', 50.00, 6, 'VILLA', 1, 1, true, 3, 1),
                                                                                                                                              (14, 'Novi Sad Danube Studio', 'Minutes away from the Fortress.', 45.00, 6, 'STUDIO', 1, 1, true, 1, 1),
                                                                                                                                              (15, 'Santorini Cliff House', 'Iconic blue domes and sunset views.', 350.00, 4, 'HOUSE', 1, 1, true, 2, 2),
                                                                                                                                              (16, 'Halkidiki Sun Resort', 'Family friendly beachfront villa.', 130.00, 7, 'VILLA', 1, 1, true, 3, 2),
                                                                                                                                              (17, 'Mykonos White Suite', 'Premium nightlife destination.', 280.00, 4, 'STUDIO', 1, 1, true, 1, 1),
                                                                                                                                              (18, 'Thassos Olive Garden', 'Nature and sea in one place.', 90.00, 5, 'COTTAGE', 1, 1, true, 2, 1),
                                                                                                                                              (19, 'Hvar Yacht Club', 'Sunniest island in the Adriatic.', 210.00, 5, 'APARTMENT', 1, 1, true, 2, 2),
                                                                                                                                              (20, 'Kotor Stone Heritage', 'Breathtaking views of the Bay.', 115.00, 5, 'GUESTHOUSE', 1, 1, true, 2, 1),
                                                                                                                                              (21, 'Durmitor Forest Lodge', 'Wild beauty at its best.', 75.00, 5, 'CABIN', 1, 1, true, 2, 1),
                                                                                                                                              (22, 'Saranda Sea Terrace', 'Affordable luxury by the Ionian sea.', 60.00, 4, 'APARTMENT', 1, 1, true, 1, 1),
                                                                                                                                              (23, 'Bansko Alpine Penthouse', 'Best ski value in Europe.', 70.00, 4, 'LOFT', 1, 1, true, 2, 1),
                                                                                                                                              (24, 'Sunny Beach Studio', 'Summer party capital.', 85.00, 4, 'STUDIO', 1, 1, true, 1, 1),
                                                                                                                                              (25, 'Mostar Bridge View', 'Historic stay with a view.', 65.00, 4, 'APARTMENT', 1, 1, true, 1, 1),
                                                                                                                                              (26, 'Thessaloniki City Center', 'Walk to the White Tower.', 80.00, 6, 'APARTMENT', 1, 1, true, 2, 1),
                                                                                                                                              (27, 'Tirana Skyline Flat', 'Modern living in the capital.', 55.00, 6, 'APARTMENT', 1, 1, true, 2, 1),
                                                                                                                                              (28, 'Rovinj Romantic Villa', 'Istrian charm and blue sea.', 160.00, 7, 'VILLA', 1, 1, true, 3, 2),
                                                                                                                                              (29, 'Tara National Park Cabin', 'Hidden gem in the Serbian mountains.', 70.00, 4, 'CABIN', 1, 1, true, 2, 1),
                                                                                                                                              (30, 'Lefkada Blue Villa', 'Famous for the best beaches in Greece.', 145.00, 4, 'VILLA', 1, 1, true, 2, 2);

-- 5. Пополнување на сликите во 'listing_images'
INSERT INTO listing_images (listing_id, image_url) VALUES
                                                       (1, 'https://images.pexels.com/photos/2031706/pexels-photo-2031706.jpeg?auto=compress&cs=tinysrgb&w=800'),
                                                       (2, 'https://images.pexels.com/photos/1438832/pexels-photo-1438832.jpeg?auto=compress&cs=tinysrgb&w=800'),
                                                       (3, 'https://images.pexels.com/photos/1036857/pexels-photo-1036857.jpeg?auto=compress&cs=tinysrgb&w=800'),
                                                       (4, 'https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg?auto=compress&cs=tinysrgb&w=800'),
                                                       (5, 'https://images.pexels.com/photos/594077/pexels-photo-594077.jpeg?auto=compress&cs=tinysrgb&w=800'),
                                                       (6, 'https://images.pexels.com/photos/2893177/pexels-photo-2893177.jpeg?auto=compress&cs=tinysrgb&w=800'),
                                                       (7, 'https://images.pexels.com/photos/147411/italy-mountains-dawn-daybreak-147411.jpeg?auto=compress&cs=tinysrgb&w=800'),
                                                       (8, 'https://images.pexels.com/photos/338504/pexels-photo-338504.jpeg?auto=compress&cs=tinysrgb&w=800'),
                                                       (9, 'https://images.pexels.com/photos/584399/pexels-photo-584399.jpeg?auto=compress&cs=tinysrgb&w=800'),
                                                       (10, 'https://images.pexels.com/photos/258154/pexels-photo-258154.jpeg?auto=compress&cs=tinysrgb&w=800'),
                                                       (11, 'https://images.pexels.com/photos/753626/pexels-photo-753626.jpeg?auto=compress&cs=tinysrgb&w=800'),
                                                       (12, 'https://images.pexels.com/photos/276724/pexels-photo-276724.jpeg?auto=compress&cs=tinysrgb&w=800'),
                                                       (13, 'https://images.pexels.com/photos/2290753/pexels-photo-2290753.jpeg?auto=compress&cs=tinysrgb&w=800'),
                                                       (14, 'https://images.pexels.com/photos/271624/pexels-photo-271624.jpeg?auto=compress&cs=tinysrgb&w=800'),
                                                       (15, 'https://images.pexels.com/photos/1010657/pexels-photo-1010657.jpeg?auto=compress&cs=tinysrgb&w=800'),
                                                       (16, 'https://images.pexels.com/photos/1174732/pexels-photo-1174732.jpeg?auto=compress&cs=tinysrgb&w=800'),
                                                       (17, 'https://images.pexels.com/photos/1285625/pexels-photo-1285625.jpeg?auto=compress&cs=tinysrgb&w=800'),
                                                       (18, 'https://images.pexels.com/photos/1001965/pexels-photo-1001965.jpeg?auto=compress&cs=tinysrgb&w=800'),
                                                       (19, 'https://images.pexels.com/photos/189296/pexels-photo-189296.jpeg?auto=compress&cs=tinysrgb&w=800'),
                                                       (20, 'https://images.pexels.com/photos/2090645/pexels-photo-2090645.jpeg?auto=compress&cs=tinysrgb&w=800'),
                                                       (21, 'https://images.pexels.com/photos/106399/pexels-photo-106399.jpeg?auto=compress&cs=tinysrgb&w=800'),
                                                       (22, 'https://images.pexels.com/photos/1457842/pexels-photo-1457842.jpeg?auto=compress&cs=tinysrgb&w=800'),
                                                       (23, 'https://images.pexels.com/photos/3551230/pexels-photo-3551230.jpeg?auto=compress&cs=tinysrgb&w=800'),
                                                       (24, 'https://images.pexels.com/photos/2507007/pexels-photo-2507007.jpeg?auto=compress&cs=tinysrgb&w=800'),
                                                       (25, 'https://images.pexels.com/photos/4508644/pexels-photo-4508644.jpeg?auto=compress&cs=tinysrgb&w=800'),
                                                       (26, 'https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg?auto=compress&cs=tinysrgb&w=800'),
                                                       (27, 'https://images.pexels.com/photos/276724/pexels-photo-276724.jpeg?auto=compress&cs=tinysrgb&w=800'),
                                                       (28, 'https://images.pexels.com/photos/594077/pexels-photo-594077.jpeg?auto=compress&cs=tinysrgb&w=800'),
                                                       (29, 'https://images.pexels.com/photos/753626/pexels-photo-753626.jpeg?auto=compress&cs=tinysrgb&w=800'),
                                                       (30, 'https://images.pexels.com/photos/189296/pexels-photo-189296.jpeg?auto=compress&cs=tinysrgb&w=800');

-- 6. Пополнување на погодностите во 'listing_amenities'
INSERT INTO listing_amenities (listing_id, amenity) VALUES
                                                        (1, 'Fast Wi-Fi'), (1, 'Air conditioning'), (1, 'Free parking'),
                                                        (2, 'Ski-in access'), (2, 'Private sauna'), (2, 'Fireplace'),
                                                        (3, 'Infinity pool'), (3, 'Beach access'), (3, 'Fast Wi-Fi'),
                                                        (4, 'Fast Wi-Fi'), (4, 'Air conditioning'), (4, 'Free parking'),
                                                        (5, 'Infinity pool'), (5, 'Beach access'), (5, 'Fast Wi-Fi');