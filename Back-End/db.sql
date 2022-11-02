-- Table: characteristic_reviews

-- DROP TABLE IF EXISTS characteristic_reviews;

CREATE TABLE IF NOT EXISTS characteristic_reviews
(
    id integer NOT NULL,
    characteristic_id integer,
    review_id integer,
    value integer,
    CONSTRAINT characteristic_reviews_pkey PRIMARY KEY (id)
);

TABLESPACE pg_default;

ALTER TABLE IF EXISTS characteristic_reviews
    OWNER to brianstern;

-- Table: characteristics

-- DROP TABLE IF EXISTS characteristics;

CREATE TABLE IF NOT EXISTS characteristics
(
    id integer NOT NULL,
    product_id integer,
    name text COLLATE pg_catalog."default",
    CONSTRAINT characteristics_pkey PRIMARY KEY (id)
);

TABLESPACE pg_default;

ALTER TABLE IF EXISTS characteristics
    OWNER to brianstern;



    -- Table: photos

-- DROP TABLE IF EXISTS photos;

CREATE TABLE IF NOT EXISTS photos
(
    id integer NOT NULL,
    styleid integer,
    url text COLLATE pg_catalog."default",
    thumbnail_url text COLLATE pg_catalog."default",
    CONSTRAINT photos_pkey PRIMARY KEY (id)
);

TABLESPACE pg_default;

ALTER TABLE IF EXISTS photos
    OWNER to brianstern;


    -- Table: reviews

-- DROP TABLE IF EXISTS reviews;

CREATE TABLE IF NOT EXISTS reviews
(
    id integer NOT NULL,
    product_id integer,
    rating integer,
    summary text COLLATE pg_catalog."default",
    body text COLLATE pg_catalog."default",
    recommend boolean,
    reported boolean,
    reviewer_name text COLLATE pg_catalog."default",
    reviewer_email text COLLATE pg_catalog."default",
    response text COLLATE pg_catalog."default",
    helpfulness integer,
    date text COLLATE pg_catalog."default",
    CONSTRAINT reviews_pkey PRIMARY KEY (id)
);

TABLESPACE pg_default;

ALTER TABLE IF EXISTS reviews
    OWNER to brianstern;


COPY characteristic_reviews (id, characteristic_id, review_id, value) FROM '/Users/brianstern/Downloads/characteristic_reviews.csv' DELIMITER ',' CSV HEADER QUOTE '\"' ESCAPE '''';"";

copy public.photos (id, styleid, url, thumbnail_url) FROM '/Users/brianstern/Downloads/photos.csv' DELIMITER ',' CSV HEADER QUOTE '\"' ESCAPE '''';"";

copy public.reviews (id, product_id, rating, date, summary, body, recommend, reported, reviewer_name, reviewer_email, response, helpfulness) FROM '/Users/brianstern/Downloads/reviews.csv' DELIMITER ',' CSV HEADER QUOTE '\"' ESCAPE '''';"";

public.characteristics (id, product_id, name) FROM '/Users/brianstern/hackreactor/SDC/reviewsBrian/Back-End/data/characteristics.csv' DELIMITER ',' CSV HEADER QUOTE '\"' ESCAPE '''';"";