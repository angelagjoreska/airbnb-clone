-- =============================================
-- AIRBNB CLONE - COMPLETE TEST DATA
-- =============================================

-- =============================================
-- USERS (passwords are BCrypt of 'password123')
-- =============================================
INSERT INTO users (first_name, last_name, email, password, phone_number, role, is_active, created_at, updated_at) VALUES
('Admin', 'Admin', 'admin@airbnb.com', '$2a$10$N9qo8uLOickgx2ZMRZoMyeIjZAgcfl7p92ldGxad68LJZdL17lhWy', '+38971000000', 'ADMIN', true, NOW(), NOW()),
-- HOSTS
('Marko', 'Markovski', 'marko@host.com', '$2a$10$N9qo8uLOickgx2ZMRZoMyeIjZAgcfl7p92ldGxad68LJZdL17lhWy', '+38971111111', 'HOST', true, NOW(), NOW()),
('Ana', 'Anastasova', 'ana@host.com', '$2a$10$N9qo8uLOickgx2ZMRZoMyeIjZAgcfl7p92ldGxad68LJZdL17lhWy', '+38972222222', 'HOST', true, NOW(), NOW()),
('Stefan', 'Stefanovski', 'stefan@host.com', '$2a$10$N9qo8uLOickgx2ZMRZoMyeIjZAgcfl7p92ldGxad68LJZdL17lhWy', '+38973333333', 'HOST', true, NOW(), NOW()),
('Elena', 'Elenovska', 'elena@host.com', '$2a$10$N9qo8uLOickgx2ZMRZoMyeIjZAgcfl7p92ldGxad68LJZdL17lhWy', '+38974444444', 'HOST', true, NOW(), NOW()),
('Nikola', 'Nikolovski', 'nikola@host.com', '$2a$10$N9qo8uLOickgx2ZMRZoMyeIjZAgcfl7p92ldGxad68LJZdL17lhWy', '+38975555555', 'HOST', true, NOW(), NOW()),
('Maria', 'Martinez', 'maria@host.com', '$2a$10$N9qo8uLOickgx2ZMRZoMyeIjZAgcfl7p92ldGxad68LJZdL17lhWy', '+34611111111', 'HOST', true, NOW(), NOW()),
('Pierre', 'Dupont', 'pierre@host.com', '$2a$10$N9qo8uLOickgx2ZMRZoMyeIjZAgcfl7p92ldGxad68LJZdL17lhWy', '+33611111111', 'HOST', true, NOW(), NOW()),
('Luca', 'Rossi', 'luca@host.com', '$2a$10$N9qo8uLOickgx2ZMRZoMyeIjZAgcfl7p92ldGxad68LJZdL17lhWy', '+39311111111', 'HOST', true, NOW(), NOW()),
('Sophie', 'Mueller', 'sophie@host.com', '$2a$10$N9qo8uLOickgx2ZMRZoMyeIjZAgcfl7p92ldGxad68LJZdL17lhWy', '+49611111111', 'HOST', true, NOW(), NOW()),
-- GUESTS
('Petar', 'Petrov', 'petar@guest.com', '$2a$10$N9qo8uLOickgx2ZMRZoMyeIjZAgcfl7p92ldGxad68LJZdL17lhWy', '+38976666666', 'GUEST', true, NOW(), NOW()),
('Jana', 'Janeva', 'jana@guest.com', '$2a$10$N9qo8uLOickgx2ZMRZoMyeIjZAgcfl7p92ldGxad68LJZdL17lhWy', '+38977777777', 'GUEST', true, NOW(), NOW()),
('David', 'Smith', 'david@guest.com', '$2a$10$N9qo8uLOickgx2ZMRZoMyeIjZAgcfl7p92ldGxad68LJZdL17lhWy', '+44711111111', 'GUEST', true, NOW(), NOW()),
('Emma', 'Johnson', 'emma@guest.com', '$2a$10$N9qo8uLOickgx2ZMRZoMyeIjZAgcfl7p92ldGxad68LJZdL17lhWy', '+44722222222', 'GUEST', true, NOW(), NOW()),
('Lucas', 'Brown', 'lucas@guest.com', '$2a$10$N9qo8uLOickgx2ZMRZoMyeIjZAgcfl7p92ldGxad68LJZdL17lhWy', '+44733333333', 'GUEST', true, NOW(), NOW());

-- =============================================
-- CITIES
-- =============================================
INSERT INTO cities (name, country, description, image_url, created_at, updated_at) VALUES
('Skopje', 'Macedonia', 'The vibrant capital of North Macedonia, a city of contrasts blending Ottoman, Byzantine and modern architecture.', 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64', NOW(), NOW()),
('Ohrid', 'Macedonia', 'A stunning lakeside city, one of the oldest human settlements in Europe and a UNESCO World Heritage Site.', 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b', NOW(), NOW()),
('Bitola', 'Macedonia', 'The city of consuls, known for its elegant architecture, lively cafe scene and ancient ruins of Heraclea.', 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64', NOW(), NOW()),
('Paris', 'France', 'The City of Light, home to iconic landmarks, world-class cuisine, art and fashion.', 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34', NOW(), NOW()),
('Nice', 'France', 'A glamorous city on the French Riviera with stunning beaches, colorful markets and Mediterranean charm.', 'https://images.unsplash.com/photo-1565963422799-9b5d62a0d4a2', NOW(), NOW()),
('Barcelona', 'Spain', 'A vibrant city famous for Gaudi architecture, beautiful beaches, amazing food and nightlife.', 'https://images.unsplash.com/photo-1583422409516-2895a77efded', NOW(), NOW()),
('Madrid', 'Spain', 'Spain''s capital and largest city, known for its rich repositories of European art and passionate nightlife.', 'https://images.unsplash.com/photo-1539037116277-4db20889f2d4', NOW(), NOW()),
('Rome', 'Italy', 'The Eternal City, a living museum with ancient ruins, Renaissance palaces and world-famous cuisine.', 'https://images.unsplash.com/photo-1552832230-c0197dd311b5', NOW(), NOW()),
('Amsterdam', 'Netherlands', 'A city of canals, bicycles, tulips, and world-class museums with a uniquely liberal culture.', 'https://images.unsplash.com/photo-1534351590666-13e3e96b5017', NOW(), NOW()),
('Prague', 'Czech Republic', 'The City of a Hundred Spires, with a fairytale old town, stunning castle and vibrant nightlife.', 'https://images.unsplash.com/photo-1541849546-216549ae216d', NOW(), NOW()),
('Dubrovnik', 'Croatia', 'The Pearl of the Adriatic, a walled medieval city on the stunning Dalmatian coast.', 'https://images.unsplash.com/photo-1555990538-c3c4a5b07bdb', NOW(), NOW()),
('Santorini', 'Greece', 'A breathtaking volcanic island with iconic white-washed buildings, blue domes and spectacular sunsets.', 'https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff', NOW(), NOW());

-- =============================================
-- LISTINGS
-- =============================================
INSERT INTO listings (title, description, price_per_night, max_guests, category, city_id, host_id, is_available, bedrooms, bathrooms, created_at, updated_at) VALUES

-- Skopje listings (city_id=1)
('Modern Apartment in Skopje Center', 'Stylish and fully equipped apartment in the heart of Skopje. Walking distance to the Old Bazaar, Stone Bridge and all major attractions. Features modern decor, fast WiFi and a fully equipped kitchen. Perfect for business travelers and tourists alike.', 45.00, 4, 'APARTMENT', 1, 2, true, 2, 1, NOW(), NOW()),
('Cozy Studio near Old Bazaar', 'Charming studio apartment just steps away from the famous Old Bazaar. Experience authentic Macedonian culture right at your doorstep. The studio features a comfortable bed, kitchenette and a private bathroom. Ideal for solo travelers or couples.', 30.00, 2, 'STUDIO', 1, 3, true, 1, 1, NOW(), NOW()),
('Luxury Penthouse with City View', 'Breathtaking penthouse on the 12th floor with panoramic views of Skopje and Vodno Mountain. Features a large terrace, jacuzzi, premium appliances and designer furniture. The ultimate luxury experience in the Macedonian capital.', 150.00, 6, 'APARTMENT', 1, 4, true, 3, 2, NOW(), NOW()),
('Charming Old Town Loft', 'Unique loft apartment in a renovated historic building in the old part of Skopje. Exposed brick walls, high ceilings and original wooden floors create an unforgettable atmosphere. Minutes from the best restaurants and cafes.', 55.00, 3, 'LOFT', 1, 2, true, 1, 1, NOW(), NOW()),
('Family House with Garden', 'Spacious family house with a beautiful garden in a quiet residential area of Skopje. Perfect for families or groups. Features a fully equipped kitchen, BBQ area, and private parking. 20 minutes from the city center by car.', 80.00, 8, 'HOUSE', 1, 5, true, 4, 2, NOW(), NOW()),

-- Ohrid listings (city_id=2)
('Lakefront Villa in Ohrid', 'Stunning villa directly on the shores of Lake Ohrid. Wake up to breathtaking lake views, enjoy morning swims from the private dock and explore the UNESCO-listed old town just minutes away. An absolutely magical experience.', 200.00, 8, 'VILLA', 2, 3, true, 4, 3, NOW(), NOW()),
('Traditional Stone House', 'Beautifully restored traditional Macedonian stone house in the heart of Ohrid''s old town. Original architecture blended with modern comforts. Rooftop terrace with spectacular lake and mountain views. A truly authentic experience.', 90.00, 5, 'HOUSE', 2, 4, true, 3, 2, NOW(), NOW()),
('Cozy Lakeside Cottage', 'Romantic cottage just 50 meters from Lake Ohrid. Perfect for couples seeking a peaceful getaway. Features a private garden, outdoor dining area and stunning lake views. Fall asleep to the sound of gentle waves.', 65.00, 2, 'COTTAGE', 2, 6, true, 1, 1, NOW(), NOW()),
('Modern Apartment with Lake View', 'Contemporary apartment with floor-to-ceiling windows offering unobstructed views of Lake Ohrid. Newly renovated with premium finishes, smart home features and a gourmet kitchen. Walking distance to beaches and restaurants.', 75.00, 4, 'APARTMENT', 2, 5, true, 2, 1, NOW(), NOW()),

-- Bitola listings (city_id=3)
('Historic Townhouse in Bitola', 'Elegant townhouse in the historic center of Bitola, just steps from the famous Sirok Sokak pedestrian street. Period furnishings, original hardwood floors and modern amenities create the perfect blend of old and new.', 60.00, 6, 'TOWNHOUSE', 3, 2, true, 3, 2, NOW(), NOW()),

-- Paris listings (city_id=4)
('Romantic Studio near Eiffel Tower', 'Dreamy studio apartment just a 10-minute walk from the Eiffel Tower. French Haussmann-style building with original parquet floors, charming decor and a juliet balcony. The most romantic stay in Paris.', 120.00, 2, 'STUDIO', 4, 7, true, 1, 1, NOW(), NOW()),
('Spacious Apartment in Le Marais', 'Beautiful apartment in the trendy Le Marais district, surrounded by boutiques, galleries and the best restaurants in Paris. High ceilings, exposed beams and modern kitchen make this the perfect Parisian home.', 180.00, 4, 'APARTMENT', 4, 8, true, 2, 1, NOW(), NOW()),
('Luxury Loft in Saint-Germain', 'Gorgeous duplex loft in the prestigious Saint-Germain-des-Prés neighborhood. Designer furniture, private terrace with Seine views and concierge service. The ultimate Parisian luxury experience.', 350.00, 4, 'LOFT', 4, 7, true, 2, 2, NOW(), NOW()),

-- Barcelona listings (city_id=6)
('Modern Apartment near Sagrada Familia', 'Bright and modern apartment just 5 minutes walk from Gaudi''s masterpiece. Fully equipped with everything you need, including AC, fast WiFi and a washing machine. Perfect base for exploring Barcelona.', 95.00, 4, 'APARTMENT', 6, 9, true, 2, 1, NOW(), NOW()),
('Beachfront Studio in Barceloneta', 'Wake up to the sound of waves in this stunning studio right on Barceloneta Beach. Ground floor access to the beach, private terrace and all modern amenities. The best location in Barcelona for beach lovers.', 110.00, 2, 'STUDIO', 6, 7, true, 1, 1, NOW(), NOW()),
('Gothic Quarter Loft', 'Unique loft apartment in the heart of Barcelona''s atmospheric Gothic Quarter. Medieval streets, cathedral views and the best tapas bars right outside your door. An unforgettable Barcelona experience.', 130.00, 3, 'LOFT', 6, 8, true, 1, 1, NOW(), NOW()),

-- Rome listings (city_id=8)
('Colosseum View Apartment', 'Incredible apartment with direct views of the Colosseum from the living room and bedroom. Imagine waking up every morning to one of the world''s most iconic landmarks. Luxuriously furnished with all amenities.', 220.00, 4, 'APARTMENT', 8, 9, true, 2, 1, NOW(), NOW()),
('Trastevere Charming House', 'Delightful house in the bohemian Trastevere neighborhood, Rome''s most charming district. Cobblestone streets, ivy-covered buildings and amazing restaurants surrounding you. A true Roman experience.', 140.00, 5, 'HOUSE', 8, 10, true, 2, 2, NOW(), NOW()),

-- Amsterdam listings (city_id=9)
('Canal House in Amsterdam Center', 'Authentic Dutch canal house in the UNESCO-listed canal ring. Original 17th-century features including steep stairs, wooden beams and canal views from every window. A truly unique Amsterdam experience.', 160.00, 4, 'HOUSE', 9, 10, true, 2, 1, NOW(), NOW()),
('Modern Apartment in Jordaan', 'Stylish apartment in the charming Jordaan neighborhood, Amsterdam''s most sought-after area. Surrounded by independent boutiques, galleries, brown cafes and the famous Anne Frank House.', 135.00, 3, 'APARTMENT', 9, 7, true, 1, 1, NOW(), NOW()),

-- Santorini listings (city_id=12)
('Iconic Oia Sunset Villa', 'Experience the world-famous Santorini sunset from this spectacular villa in Oia. Private infinity pool overlooking the caldera, traditional cave architecture and breathtaking views. The most romantic destination on earth.', 500.00, 4, 'VILLA', 12, 9, true, 2, 2, NOW(), NOW()),
('Caldera View Cave House', 'Traditional Cycladic cave house carved into the volcanic rock with unobstructed caldera views. Private terrace, outdoor jacuzzi and butler service included. An absolutely magical Santorini experience.', 380.00, 2, 'COTTAGE', 12, 10, true, 1, 1, NOW(), NOW()),

-- Dubrovnik listings (city_id=11)
('Old Town Sea View Apartment', 'Stunning apartment inside Dubrovnik''s famous medieval walls with spectacular Adriatic Sea views. Walk the city walls right from your doorstep, explore medieval streets and enjoy the most beautiful old town in Europe.', 175.00, 4, 'APARTMENT', 11, 8, true, 2, 1, NOW(), NOW()),

-- Prague listings (city_id=10)
('Old Town Square Apartment', 'Magical apartment overlooking Prague''s famous Old Town Square and the Astronomical Clock. Watch the hourly clock show from your window and explore the fairy-tale city right outside your door.', 110.00, 4, 'APARTMENT', 10, 9, true, 2, 1, NOW(), NOW()),
('Prague Castle View Loft', 'Dramatic loft apartment with floor-to-ceiling windows framing Prague Castle. Situated in the romantic Mala Strana neighborhood, surrounded by baroque palaces and hidden gardens.', 145.00, 3, 'LOFT', 10, 10, true, 1, 1, NOW(), NOW());

-- =============================================
-- LISTING IMAGES
-- =============================================
INSERT INTO listing_images (listing_id, image_url) VALUES
(1, 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267'),
(1, 'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688'),
(1, 'https://images.unsplash.com/photo-1484154218962-a197022b5858'),
(2, 'https://images.unsplash.com/photo-1554995207-c18c203602cb'),
(2, 'https://images.unsplash.com/photo-1493809842364-78817add7ffb'),
(3, 'https://images.unsplash.com/photo-1613977257363-707ba9348227'),
(3, 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c'),
(3, 'https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea'),
(4, 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7'),
(4, 'https://images.unsplash.com/photo-1574362848149-11496d93a7c7'),
(5, 'https://images.unsplash.com/photo-1564013799919-ab600027ffc6'),
(5, 'https://images.unsplash.com/photo-1570129477492-45c003edd2be'),
(6, 'https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9'),
(6, 'https://images.unsplash.com/photo-1613490493576-7fde63acd811'),
(6, 'https://images.unsplash.com/photo-1602343168117-bb8ffe3e2e9f'),
(7, 'https://images.unsplash.com/photo-1568605114967-8130f3a36994'),
(7, 'https://images.unsplash.com/photo-1572120360610-d971b9d7767c'),
(8, 'https://images.unsplash.com/photo-1510798831971-661eb04b3739'),
(8, 'https://images.unsplash.com/photo-1449158743715-0a90ebb6d2d8'),
(9, 'https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af'),
(10, 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c'),
(11, 'https://images.unsplash.com/photo-1522771930-78848d9293e8'),
(12, 'https://images.unsplash.com/photo-1560448204-603b3fc33ddc'),
(13, 'https://images.unsplash.com/photo-1615529328331-f8917597711f'),
(14, 'https://images.unsplash.com/photo-1501183638710-841dd1904471'),
(15, 'https://images.unsplash.com/photo-1536376072261-38c75010e6c9'),
(16, 'https://images.unsplash.com/photo-1499793983690-e29da59ef1c2'),
(17, 'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4'),
(18, 'https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde'),
(19, 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750'),
(20, 'https://images.unsplash.com/photo-1493246507139-91e8fad9978e'),
(21, 'https://images.unsplash.com/photo-1602343168117-bb8ffe3e2e9f'),
(22, 'https://images.unsplash.com/photo-1571770095004-6b61b1cf308a'),
(23, 'https://images.unsplash.com/photo-1555990538-c3c4a5b07bdb'),
(24, 'https://images.unsplash.com/photo-1541849546-216549ae216d'),
(25, 'https://images.unsplash.com/photo-1519302959554-a75be0afc082');

-- =============================================
-- LISTING AMENITIES
-- =============================================
INSERT INTO listing_amenities (listing_id, amenity) VALUES
(1, 'WiFi'), (1, 'Air Conditioning'), (1, 'Kitchen'), (1, 'Washing Machine'), (1, 'TV'), (1, 'Parking'),
(2, 'WiFi'), (2, 'Kitchen'), (2, 'Air Conditioning'), (2, 'TV'),
(3, 'WiFi'), (3, 'Air Conditioning'), (3, 'Kitchen'), (3, 'Jacuzzi'), (3, 'Terrace'), (3, 'Parking'), (3, 'TV'), (3, 'Gym'),
(4, 'WiFi'), (4, 'Kitchen'), (4, 'Air Conditioning'), (4, 'TV'), (4, 'Washing Machine'),
(5, 'WiFi'), (5, 'Kitchen'), (5, 'Garden'), (5, 'BBQ'), (5, 'Parking'), (5, 'TV'), (5, 'Washing Machine'), (5, 'Air Conditioning'),
(6, 'WiFi'), (6, 'Private Pool'), (6, 'Lake Access'), (6, 'Kitchen'), (6, 'BBQ'), (6, 'Parking'), (6, 'TV'), (6, 'Air Conditioning'), (6, 'Boat Dock'),
(7, 'WiFi'), (7, 'Kitchen'), (7, 'Terrace'), (7, 'Air Conditioning'), (7, 'TV'),
(8, 'WiFi'), (8, 'Garden'), (8, 'Kitchen'), (8, 'BBQ'), (8, 'TV'),
(9, 'WiFi'), (9, 'Air Conditioning'), (9, 'Kitchen'), (9, 'TV'), (9, 'Washing Machine'),
(10, 'WiFi'), (10, 'Kitchen'), (10, 'Air Conditioning'), (10, 'TV'), (10, 'Washing Machine'), (10, 'Parking'),
(11, 'WiFi'), (11, 'Kitchen'), (11, 'Air Conditioning'), (11, 'TV'), (11, 'Elevator'),
(12, 'WiFi'), (12, 'Kitchen'), (12, 'Air Conditioning'), (12, 'TV'), (12, 'Washing Machine'), (12, 'Elevator'),
(13, 'WiFi'), (13, 'Kitchen'), (13, 'Air Conditioning'), (13, 'Terrace'), (13, 'TV'), (13, 'Concierge'), (13, 'Elevator'),
(14, 'WiFi'), (14, 'Air Conditioning'), (14, 'Kitchen'), (14, 'TV'), (14, 'Elevator'),
(15, 'WiFi'), (15, 'Air Conditioning'), (15, 'Kitchen'), (15, 'Beach Access'), (15, 'TV'),
(16, 'WiFi'), (16, 'Air Conditioning'), (16, 'Kitchen'), (16, 'TV'), (16, 'Rooftop Terrace'),
(17, 'WiFi'), (17, 'Air Conditioning'), (17, 'Kitchen'), (17, 'TV'), (17, 'Elevator'),
(18, 'WiFi'), (18, 'Kitchen'), (18, 'Garden'), (18, 'TV'), (18, 'Washing Machine'),
(19, 'WiFi'), (19, 'Kitchen'), (19, 'TV'), (19, 'Washing Machine'), (19, 'Canal View'),
(20, 'WiFi'), (20, 'Kitchen'), (20, 'Air Conditioning'), (20, 'TV'), (20, 'Washing Machine'),
(21, 'WiFi'), (21, 'Private Infinity Pool'), (21, 'Caldera View'), (21, 'Kitchen'), (21, 'Concierge'), (21, 'TV'), (21, 'Air Conditioning'),
(22, 'WiFi'), (22, 'Private Jacuzzi'), (22, 'Caldera View'), (22, 'Kitchen'), (22, 'Butler Service'), (22, 'Air Conditioning'),
(23, 'WiFi'), (23, 'Air Conditioning'), (23, 'Kitchen'), (23, 'Sea View'), (23, 'TV'),
(24, 'WiFi'), (24, 'Air Conditioning'), (24, 'Kitchen'), (24, 'TV'), (24, 'City View'), (24, 'Elevator'),
(25, 'WiFi'), (25, 'Kitchen'), (25, 'TV'), (25, 'Castle View'), (25, 'Air Conditioning');

-- =============================================
-- BOOKINGS
-- =============================================
INSERT INTO bookings (listing_id, guest_id, check_in_date, check_out_date, number_of_guests, total_price, status, created_at, updated_at) VALUES
(1, 11, '2026-04-01', '2026-04-05', 2, 180.00, 'CONFIRMED', NOW(), NOW()),
(2, 12, '2026-04-10', '2026-04-14', 1, 120.00, 'CONFIRMED', NOW(), NOW()),
(6, 13, '2026-05-01', '2026-05-07', 4, 1400.00, 'CONFIRMED', NOW(), NOW()),
(11, 14, '2026-04-15', '2026-04-20', 2, 600.00, 'CONFIRMED', NOW(), NOW()),
(14, 15, '2026-05-10', '2026-05-15', 3, 475.00, 'CONFIRMED', NOW(), NOW()),
(17, 11, '2026-06-01', '2026-06-07', 2, 770.00, 'PENDING', NOW(), NOW()),
(21, 12, '2026-07-01', '2026-07-07', 2, 3500.00, 'CONFIRMED', NOW(), NOW()),
(3, 13, '2026-04-20', '2026-04-25', 4, 750.00, 'PENDING', NOW(), NOW()),
(7, 14, '2026-05-15', '2026-05-20', 3, 450.00, 'CONFIRMED', NOW(), NOW()),
(19, 15, '2026-06-10', '2026-06-15', 2, 800.00, 'CONFIRMED', NOW(), NOW()),
(22, 11, '2026-08-01', '2026-08-05', 2, 1520.00, 'PENDING', NOW(), NOW()),
(12, 12, '2026-04-05', '2026-04-10', 3, 900.00, 'CONFIRMED', NOW(), NOW()),
(9, 13, '2026-05-20', '2026-05-25', 2, 375.00, 'CANCELLED', NOW(), NOW()),
(23, 14, '2026-07-10', '2026-07-17', 3, 1225.00, 'CONFIRMED', NOW(), NOW()),
(16, 15, '2026-06-20', '2026-06-25', 2, 650.00, 'PENDING', NOW(), NOW());

-- =============================================
-- REVIEWS
-- =============================================
INSERT INTO reviews (rating, comment, listing_id, guest_id, created_at, updated_at) VALUES
(5, 'Absolutely perfect stay! The apartment was exactly as described, spotlessly clean and in an amazing location. Marko was a fantastic host, very responsive and helpful. Will definitely come back!', 1, 11, NOW(), NOW()),
(4, 'Great studio, perfect location near the Old Bazaar. Ana was very welcoming and provided excellent local tips. The only minor issue was the noise from the street at night, but overall a wonderful experience.', 2, 12, NOW(), NOW()),
(5, 'The lakefront villa exceeded all our expectations. Waking up to the view of Lake Ohrid every morning was absolutely magical. The private dock was perfect for swimming. Highly recommend!', 6, 13, NOW(), NOW()),
(5, 'Staying at the Romantic Studio near the Eiffel Tower was a dream come true. The apartment was beautifully decorated, the location is unbeatable and Maria was incredibly helpful. Paris is even more beautiful from here!', 11, 14, NOW(), NOW()),
(4, 'Great apartment near Sagrada Familia. Clean, modern and well-equipped. Luca was a great host. We loved exploring Barcelona from this perfect base. Would definitely stay again!', 14, 15, NOW(), NOW()),
(5, 'The penthouse was absolutely stunning! The views of Skopje from the terrace are breathtaking. Every luxury was provided. Stefan was an exceptional host. This is the best accommodation in Skopje by far!', 3, 11, NOW(), NOW()),
(5, 'The traditional stone house in Ohrid was a highlight of our entire trip. The rooftop terrace view is simply unforgettable. Elena was a wonderful host who made us feel completely at home.', 7, 12, NOW(), NOW()),
(4, 'Lovely loft in Saint-Germain. The location is perfect, surrounded by amazing cafes and boutiques. Pierre was very helpful with restaurant recommendations. The Seine view from the terrace is gorgeous.', 13, 13, NOW(), NOW()),
(5, 'The Canal House in Amsterdam was a dream! Authentic Dutch architecture with all modern comforts. Sophie was an amazing host. Exploring Amsterdam from this perfect location was unforgettable.', 19, 14, NOW(), NOW()),
(5, 'The Oia Sunset Villa in Santorini is the most spectacular place I have ever stayed. The infinity pool overlooking the caldera, the famous Oia sunset - pure magic. Worth every penny and more!', 21, 15, NOW(), NOW()),
(4, 'Beautiful apartment in the Gothic Quarter. Very atmospheric location with great restaurants nearby. The loft layout was unique and comfortable. Barcelona from this location is simply wonderful.', 16, 11, NOW(), NOW()),
(5, 'The Colosseum View Apartment in Rome was incredible. Waking up to see the Colosseum right outside the window is surreal. Perfectly located for exploring all of Rome on foot. Exceptional stay!', 17, 12, NOW(), NOW()),
(4, 'Charming house in Trastevere. The neighborhood is the most beautiful in Rome. The host was very friendly and the house had everything we needed. The garden was a lovely bonus.', 18, 13, NOW(), NOW()),
(5, 'The Old Town Sea View Apartment in Dubrovnik is breathtaking. Living inside the ancient city walls with sea views is an experience unlike any other. Absolutely magical stay!', 23, 14, NOW(), NOW()),
(5, 'The Old Town Square Apartment in Prague is simply incredible. Watching the Astronomical Clock from the living room window every hour was magical. Perfect location, beautiful apartment, wonderful host.', 24, 15, NOW(), NOW());
