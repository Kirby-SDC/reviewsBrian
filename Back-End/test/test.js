import http from 'k6/http';
import { sleep, check, group } from 'k6';

// export const options = {
//   vus: 5, // Virtual Users
//   duration: '10s'
// };

var route = 'http://127.0.0.1:3000/reviews'

const allReviews = `${route}?product_id=${Math.floor(Math.random() * 1000000)}`;
const product = `${route}/${Math.floor(Math.random() * 1000000) + 1}`;
const reviews = `${route}/meta?product_id=${Math.floor(Math.random() * 1000000) + 1}`;
const addReview = `${route}/`;

const data = JSON.stringify({
  product_id: 37311,
  rating: 4,
  summary: "testing to ",
  body: "get the data to see what it looks like when posted",
  recommend: false,
  name: "asdfads",
  email: "adsf@233.email.com",
  photos: [
    "http://res.cloudinary.com/dmmzqckuu/image/upload/v1667518986/kp5uoks5msecojvql9v1.jpg"
  ],
  characteristics: { "125031": 50, "125032": 55, "125033": 60, "125034": 70 }
})

const params = {
  headers: {
    'Content-Type': 'application/json',
  },
};

export default function test() {
  group('getAllReviews', () => {
    const allReviewsResponse = http.get(allReviews);
    check(allReviewsResponse, {
      'transaction time < 10ms': (r) => r.timings.duration < 10,
      'transaction time < 50ms': (r) => r.timings.duration < 50,
      'transaction time < 200ms': (r) => r.timings.duration < 200,
      'transaction time < 500ms': (r) => r.timings.duration < 500,
      'transaction time < 1000ms': (r) => r.timings.duration < 1000,
      'transaction time < 2000ms': (r) => r.timings.duration < 2000,
      'transaction time < 5000ms': (r) => r.timings.duration < 5000,
      'transaction time < 10s': (r) => r.timings.duration < 10000,
      'transaction time < 20s': (r) => r.timings.duration < 20000,
    });
  });
  group('getMeta', () => {
    const getMetaResponse = http.get(reviews);
    check(getMetaResponse, {
      'transaction time < 10ms': (r) => r.timings.duration < 10,
      'transaction time < 50ms': (r) => r.timings.duration < 50,
      'transaction time < 200ms': (r) => r.timings.duration < 200,
      'transaction time < 500ms': (r) => r.timings.duration < 500,
      'transaction time < 1000ms': (r) => r.timings.duration < 1000,
      'transaction time < 2000ms': (r) => r.timings.duration < 2000,
      'transaction time < 5000ms': (r) => r.timings.duration < 5000,
      'transaction time < 10s': (r) => r.timings.duration < 10000,
      'transaction time < 20s': (r) => r.timings.duration < 20000,
    });
  });
  group('postReview', () => {
    const postReviewResponse = http.post(addReview, data, params);
    check(postReviewResponse, {
      'transaction time < 10ms': (r) => r.timings.duration < 10,
      'transaction time < 50ms': (r) => r.timings.duration < 50,
      'transaction time < 200ms': (r) => r.timings.duration < 200,
      'transaction time < 500ms': (r) => r.timings.duration < 500,
      'transaction time < 1000ms': (r) => r.timings.duration < 1000,
      'transaction time < 2000ms': (r) => r.timings.duration < 2000,
      'transaction time < 5000ms': (r) => r.timings.duration < 5000,
      'transaction time < 10s': (r) => r.timings.duration < 10000,
      'transaction time < 20s': (r) => r.timings.duration < 20000,
    });
  });
  group('helpfulness', () => {
    const helpfulResponse = http.put(`${route}/${Math.floor(Math.random() * 1000000) + 1}/helpful`);
    check(helpfulResponse, {
      'transaction time < 10ms': (r) => r.timings.duration < 10,
      'transaction time < 50ms': (r) => r.timings.duration < 50,
      'transaction time < 200ms': (r) => r.timings.duration < 200,
      'transaction time < 500ms': (r) => r.timings.duration < 500,
      'transaction time < 1000ms': (r) => r.timings.duration < 1000,
      'transaction time < 2000ms': (r) => r.timings.duration < 2000,
      'transaction time < 5000ms': (r) => r.timings.duration < 5000,
      'transaction time < 10s': (r) => r.timings.duration < 10000,
      'transaction time < 20s': (r) => r.timings.duration < 20000,
    });
  });
}