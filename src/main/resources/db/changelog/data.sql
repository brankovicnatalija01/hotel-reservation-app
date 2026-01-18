---
-- 1. ROLES
---
INSERT INTO roles (name) VALUES ('ROLE_USER'), ('ROLE_ADMIN') ON CONFLICT (name) DO NOTHING;

---
-- 2. ROOM TYPES
---
INSERT INTO room_types (name, capacity, description)
VALUES ('Standard Room', 2, 'Cozy room with rustic wood decor'),
       ('Deluxe Double Room', 2, 'Spacious room with private jacuzzi'),
       ('Grand Mountain Suite', 4, 'Large luxury suite with mountain views')
ON CONFLICT (name) DO NOTHING;

---
-- 3. AMENITIES - Added 9 items for better distribution
---
INSERT INTO amenities (name)
VALUES ('WiFi'), ('TV'), ('Mini Bar'), ('AC'), ('Jacuzzi'), ('Safe Box'), ('Hairdryer'), ('Balcony'), ('Room Service')
ON CONFLICT (name) DO NOTHING;

---
-- 4. PROPERTIES
---
INSERT INTO properties (name, address, city, country, description)
SELECT 'Pine Mountain Lodge', '742 Silver Pine Ridge', 'Timberline Peaks', 'Switzerland', 'An upscale mountain retreat offering cozy accommodations, stunning panoramic views, and direct access to outdoor adventures.'
WHERE NOT EXISTS (SELECT 1 FROM properties WHERE name = 'Pine Mountain Lodge');

---
-- 5. USERS - BCrypt encrypted passwords
-- Admin password: admin
-- Pera password: pera123
---
INSERT INTO users (first_name, last_name, email, password, role_id)
SELECT 'admin', 'aser', 'admin@hotel.com', '$2a$12$8.Un7G989Rl1h7Y66S37uerqPMdfW6m9WzjZpbc89vJnO.p9.S75e', 2
WHERE NOT EXISTS (SELECT 1 FROM users WHERE email = 'admin@hotel.com');

INSERT INTO users (first_name, last_name, email, password, role_id)
SELECT 'Pera', 'Peric', 'pera@mail.com', '$2a$12$K6S93mOaF7uL60UjJ9oWp.YpX.X7H7N9YJ.uA5G9f8qR4R2O6E0V6', 1
WHERE NOT EXISTS (SELECT 1 FROM users WHERE email = 'pera@mail.com');

---
-- 6. ROOMS
---
INSERT INTO rooms (room_number, price_per_night, description, property_id, room_type_id)
VALUES
    ('101', 150.00, 'A charming mountain retreat featuring handcrafted wooden furniture and forest views.', 1, 1),
    ('102', 280.00, 'Premium double room with a cozy fireplace, private jacuzzi, and a balcony.', 1, 2),
    ('201', 450.00, 'Our signature grand suite with panoramic windows and bespoke decor.', 1, 3)
ON CONFLICT DO NOTHING;

---
-- 7. ROOM IMAGES
---
INSERT INTO room_images (room_id, url)
VALUES
    (1, 'https://res.cloudinary.com/dmzksxrlb/image/upload/v1767703071/standard_room_1_t89yqb.png'),
    (1, 'https://res.cloudinary.com/dmzksxrlb/image/upload/v1767703069/standard_room_2_z1xcls.png'),
    (2, 'https://res.cloudinary.com/dmzksxrlb/image/upload/v1767703262/double_1_roaqia.png'),
    (2, 'https://res.cloudinary.com/dmzksxrlb/image/upload/v1767703260/double_3_okg23o.png'),
    (3, 'https://res.cloudinary.com/dmzksxrlb/image/upload/v1767703317/suite_1_aq02v9.png'),
    (3, 'https://res.cloudinary.com/dmzksxrlb/image/upload/v1767703317/suite_3_wlf7yd.png')
ON CONFLICT DO NOTHING;

---
-- 8. ROOM AMENITIES ASSIGNMENT
---
-- Room 101 (Standard): WiFi, TV, AC, Hairdryer, Balcony, Room Service
INSERT INTO room_amenities (room_id, amenity_id) VALUES (1, 1), (1, 2), (1, 4), (1, 7), (1, 8), (1, 9) ON CONFLICT DO NOTHING;

-- Room 102 (Deluxe): WiFi, TV, AC, Jacuzzi, Hairdryer, Balcony, Room Service
INSERT INTO room_amenities (room_id, amenity_id) VALUES (2, 1), (2, 2), (2, 4), (2, 5), (2, 7), (2, 8),  (1, 9)  ON CONFLICT DO NOTHING;

-- Room 201 (Suite): All amenities except Jacuzzi
INSERT INTO room_amenities (room_id, amenity_id) VALUES (3, 1), (3, 2), (3, 3), (3, 4),  (3, 6), (3, 7), (3, 8), (3, 9) ON CONFLICT DO NOTHING;

---
-- 9. RESERVATIONS
---
-- Admin Reservations
INSERT INTO reservations (check_in_date, check_out_date, status, total_price, user_id, room_id)
SELECT '2026-02-10', '2026-02-15', 'CONFIRMED', 1400.00, (SELECT id FROM users WHERE email = 'admin@hotel.com'), 2
WHERE NOT EXISTS (SELECT 1 FROM reservations WHERE user_id = (SELECT id FROM users WHERE email = 'admin@hotel.com') AND check_in_date = '2026-02-10');

INSERT INTO reservations (check_in_date, check_out_date, status, total_price, user_id, room_id)
SELECT '2026-03-20', '2026-03-22', 'CONFIRMED', 300.00, (SELECT id FROM users WHERE email = 'admin@hotel.com'), 1
WHERE NOT EXISTS (SELECT 1 FROM reservations WHERE user_id = (SELECT id FROM users WHERE email = 'admin@hotel.com') AND check_in_date = '2026-03-20');

-- Pera Peric Reservations
INSERT INTO reservations (check_in_date, check_out_date, status, total_price, user_id, room_id)
SELECT '2026-04-05', '2026-04-10', 'CONFIRMED', 2250.00, (SELECT id FROM users WHERE email = 'pera.peric@mail.com'), 3
WHERE NOT EXISTS (SELECT 1 FROM reservations WHERE user_id = (SELECT id FROM users WHERE email = 'pera.peric@mail.com') AND check_in_date = '2026-04-05');

INSERT INTO reservations (check_in_date, check_out_date, status, total_price, user_id, room_id)
SELECT '2026-06-15', '2026-06-18', 'PENDING', 840.00, (SELECT id FROM users WHERE email = 'pera.peric@mail.com'), 2
WHERE NOT EXISTS (SELECT 1 FROM reservations WHERE user_id = (SELECT id FROM users WHERE email = 'pera.peric@mail.com') AND check_in_date = '2026-06-15');
