CREATE TABLE users(
    user_id SERIAL PRIMARY KEY,
    username VARCHAR(20),
    email VARCHAR,
    password VARCHAR,
    user_image VARCHAR,
    user_bio TEXT
)

CREATE TABLE reviews(
    rev_id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(user_id),
    rev_date DATE,
    rev_text TEXT,
    rating INTEGER,
    post_image1 VARCHAR,
    post_image2 VARCHAR,
    post_image3 VARCHAR
)

CREATE TABLE email_list(
    email_id SERIAL PRIMARY KEY,
    email VARCHAR,
    user_id INTEGER REFERENCES users(user_id)
)
