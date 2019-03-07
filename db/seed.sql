CREATE TABLE users(
    user_id SERIAL PRIMARY KEY,
    username VARCHAR(20),
    email VARCHAR,
    password VARCHAR,
    admin BOOLEAN
)

CREATE TABLE products(
    prod_id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(user_id),
    category VARCHAR,
    name VARCHAR,
    description TEXT,
    image_url TEXT
)

CREATE TABLE email_list(
    email_id SERIAL PRIMARY KEY,
    email VARCHAR,
    subscribed BOOLEAN
)
