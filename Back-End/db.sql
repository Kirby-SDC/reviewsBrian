    -- Table: reviews

-- DROP TABLE IF EXISTS reviews;
DROP TABLE IF EXISTS reviews CASCADE;
DROP TABLE IF EXISTS characteristic_reviews CASCADE;
DROP TABLE IF EXISTS characteristics CASCADE;
DROP TABLE IF EXISTS photos CASCADE;

CREATE TABLE IF NOT EXISTS reviews
(
    review_id serial,
    product_id integer,
    rating integer,
    summary text COLLATE pg_catalog."default",
    body text COLLATE pg_catalog."default",
    recommend boolean,
    reported boolean,
    reviewer_name text COLLATE pg_catalog."default",
    reviewer_email text COLLATE pg_catalog."default",
    response text COLLATE pg_catalog."default",
    helpfulness integer DEFAULT 0,
    date bigserial,
    CONSTRAINT reviews_pkey PRIMARY KEY (review_id)
);



ALTER TABLE IF EXISTS reviews
    OWNER to brianstern;

-- Table: characteristics

-- DROP TABLE IF EXISTS characteristics;

CREATE TABLE IF NOT EXISTS characteristics
(
    id serial NOT NULL,
    product_id integer,
    name text COLLATE pg_catalog."default",
    CONSTRAINT characteristics_pkey PRIMARY KEY (id)
);


ALTER TABLE IF EXISTS characteristics
    OWNER to brianstern;
-- Table: characteristic_reviews

-- DROP TABLE IF EXISTS characteristic_reviews;

CREATE TABLE IF NOT EXISTS characteristic_reviews
(
    id serial NOT NULL,
    characteristic_id integer,
    review_id integer,
    value integer,
    CONSTRAINT characteristic_reviews_pkey PRIMARY KEY (id)
);

ALTER TABLE IF EXISTS characteristic_reviews
    OWNER to brianstern;




    -- Table: photos

-- DROP TABLE IF EXISTS photos;

CREATE TABLE IF NOT EXISTS photos
(
    id serial,
    review_id integer,
    url text COLLATE pg_catalog."default",
    CONSTRAINT photos_pkey PRIMARY KEY (id)
);


ALTER TABLE IF EXISTS photos
    OWNER to brianstern;




COPY characteristic_reviews (id, characteristic_id, review_id, value) FROM '/Users/brianstern/hackreactor/SDC/reviewsBrian/Back-End/data/characteristic_reviews.csv' DELIMITER ',' CSV HEADER;

COPY photos (id, review_id, url) FROM '/Users/brianstern/hackreactor/SDC/reviewsBrian/Back-End/data/reviews_photos.csv' DELIMITER ',' CSV HEADER;

COPY reviews (review_id, product_id, rating, date, summary, body, recommend, reported, reviewer_name, reviewer_email, response, helpfulness) FROM '/Users/brianstern/hackreactor/SDC/reviewsBrian/Back-End/data/reviews.csv' DELIMITER ',' CSV HEADER;

COPY characteristics (id, product_id, name) FROM '/Users/brianstern/hackreactor/SDC/reviewsBrian/Back-End/data/characteristics.csv' DELIMITER ',' CSV HEADER;

ALTER TABLE characteristic_reviews ADD FOREIGN KEY (characteristic_id) REFERENCES characteristics (id);
ALTER TABLE characteristic_reviews ADD FOREIGN KEY (review_id) REFERENCES reviews (review_id);
ALTER TABLE photos ADD FOREIGN KEY (review_id) REFERENCES reviews (review_id);

CREATE INDEX idx_reviews_product_id ON reviews USING HASH (product_id);
CREATE INDEX idx_photos_photos_id ON photos USING HASH (review_id);
CREATE INDEX idx_characterstic_reviews_id ON characteristic_reviews USING HASH (characteristic_id);
CREATE INDEX idx_characteristic_id ON characteristics USING HASH (id);

SELECT setval('reviews_review_id_seq', COALESCE((SELECT MAX(review_id)+1 FROM reviews), 1), false);
SELECT setval('characteristics_id_seq', COALESCE((SELECT MAX(id)+1 FROM characteristics), 1), false);
SELECT setval('photos_id_seq', COALESCE((SELECT MAX(id)+1 FROM photos), 1), false);
SELECT setval('characteristic_reviews_id_seq', COALESCE((SELECT MAX(id)+1 FROM characteristic_reviews), 1), false);