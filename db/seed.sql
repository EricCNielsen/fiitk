-- user table

CREATE TABLE users(
    user_id SERIAL PRIMARY KEY,
    username VARCHAR(20),
    email VARCHAR,
    password VARCHAR,
    admin BOOLEAN
)

-- product list table

CREATE TABLE products(
    prod_id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(user_id),
    category VARCHAR,
    name VARCHAR,
    description TEXT,
    image_url TEXT
)

-- email list table

CREATE TABLE email_list(
    email_id SERIAL PRIMARY KEY,
    email VARCHAR,
    subscribed BOOLEAN
)
-- session creator

CREATE TABLE "session" (
 "sid" varchar NOT NULL COLLATE "default",
   "sess" json NOT NULL,
   "expire" timestamp(6) NOT NULL
)
WITH (OIDS=FALSE);
ALTER TABLE "session" ADD CONSTRAINT "session_pkey" PRIMARY KEY ("sid") NOT DEFERRABLE INITIALLY IMMEDIATE;

-- create new product

INSERT INTO products (category, sub_category, image_url, product_name, product_desc)
VALUES
(${category}, ${sub_category}, ${image_url}, ${product_name}, ${product_desc})

-- create new user

INSERT INTO users (username, email, password, admin)
VALUES
(${username}, ${email}, ${password}, ${admin})