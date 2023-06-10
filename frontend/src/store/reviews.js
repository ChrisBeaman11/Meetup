import { csrfFetch } from "./csrf";

export const LOAD_ALL_REVIEWS_BY_SPOT = "reviews/LOAD_ALL_REVIEWS_BY_SPOT";
export const POST_NEW_REVIEW = "reviews/POST_NEW_REVIEW";

export const loadAllReviews = (reviews) => ({
  type: LOAD_ALL_REVIEWS_BY_SPOT,
  reviews,
});

export const postNewReview = (reviews) => ({
  type: LOAD_ALL_REVIEWS_BY_SPOT,
  reviews,
});

export const fetchAllReviewsBySpot = (spotId) => async (dispatch) => {
  try {
    const response = await csrfFetch(`/api/spots/${spotId}/reviews`);
    if (!response.ok) {
      throw new Error("Failed to fetch reviews");
    }
    const reviews = await response.json();
    dispatch(loadAllReviews(reviews));
  } catch (err) {
    console.log("Failed to fetch reviews:", err);
  }
};

export const createNewReview = (spotId, review, stars) => async (dispatch) => {
  try {
    const response = await csrfFetch(`/api/spots/${spotId}/reviews`, {
      method: "POST",
      body: JSON.stringify(review),
    });
    if (!response.ok) {
      throw new Error("Failed to fetch reviews");
    }
    const reviews = await response.json();
    dispatch(postNewReview(review));
  } catch (err) {
    console.log("Failed to fetch reviews:", err);
  }
};

const reviewsReducer = (state = { reviews: [] }, action) => {
  switch (action.type) {
    case LOAD_ALL_REVIEWS_BY_SPOT:
      return { ...state, reviews: action.reviews.Reviews };
    case POST_NEW_REVIEW:
      console.log(action)
      return { ...state, reviews: action.reviews.Reviews };
    default:
      return state;
  }
};

export default reviewsReducer;
