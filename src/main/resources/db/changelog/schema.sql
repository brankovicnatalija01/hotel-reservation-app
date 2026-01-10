 -- 1. Roles
CREATE TABLE IF NOT EXISTS roles (
    id SERIAL PRIMARY KEY,
    name VARCHAR(50) NOT NULL UNIQUE
);

-- 2. Users
CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY,
    first_name VARCHAR(255) NOT NULL,
    last_name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    phone VARCHAR(50),
    role_id INTEGER NOT NULL REFERENCES roles(id)
);

-- 3. Properties (Hoteli)
CREATE TABLE IF NOT EXISTS properties (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    address VARCHAR(255),
    city VARCHAR(100),
    country VARCHAR(100),
    description TEXT
);

-- 4. Room Types
CREATE TABLE IF NOT EXISTS room_types (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL UNIQUE,
    capacity INTEGER NOT NULL,
    description TEXT
);

-- 5. Rooms
CREATE TABLE IF NOT EXISTS rooms (
    id SERIAL PRIMARY KEY,
    room_number VARCHAR(50) NOT NULL,
    price_per_night DECIMAL(10, 2) NOT NULL,
    description TEXT,
    property_id INTEGER REFERENCES properties(id),
    room_type_id INTEGER REFERENCES room_types(id)
);

-- 6. Amenities
CREATE TABLE IF NOT EXISTS amenities (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL UNIQUE
);

-- 7. Room_Amenity (Join table)
CREATE TABLE IF NOT EXISTS room_amenities (
    room_id INTEGER REFERENCES rooms(id),
    amenity_id INTEGER REFERENCES amenities(id),
    PRIMARY KEY (room_id, amenity_id)
);

-- 8. Reservations
CREATE TABLE IF NOT EXISTS reservations (
    id SERIAL PRIMARY KEY,
    check_in_date DATE NOT NULL,
    check_out_date DATE NOT NULL,
    status VARCHAR(50) DEFAULT 'PENDING',
    total_price DECIMAL(10, 2),
    user_id INTEGER REFERENCES users(id),
    room_id INTEGER REFERENCES rooms(id)
);

-- 9. Reviews
 CREATE TABLE IF NOT EXISTS reviews (
                                        id SERIAL PRIMARY KEY,
                                        rating INTEGER NOT NULL CHECK (rating >= 1 AND rating <= 10),
                                        comment TEXT,
                                        reservation_id INTEGER UNIQUE REFERENCES reservations(id) ON DELETE CASCADE
 );

-- 10. Room images
 CREATE TABLE room_images (
                              id BIGSERIAL PRIMARY KEY,
                              url VARCHAR(500) NOT NULL,
                              room_id BIGINT NOT NULL,
                              CONSTRAINT fk_room_image FOREIGN KEY (room_id) REFERENCES rooms(id) ON DELETE CASCADE
 );