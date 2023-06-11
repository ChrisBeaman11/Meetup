import { csrfFetch } from "./csrf";

export const LOAD_ALL_REVIEWS_BY_SPOT = "reviews/LOAD_ALL_REVIEWS_BY_SPOT";
export const POST_NEW_REVIEW = "reviews/POST_NEW_REVIEW";
export const REMOVE_REVIEW = "reviews/REMOVE_REVIEW";

export const loadAllReviews = (reviews) => ({
  type: LOAD_ALL_REVIEWS_BY_SPOT,
  reviews,
});

export const postNewReview = (reviews) => ({
  type: POST_NEW_REVIEW,
  reviews,
});
export const removeReview = (reviewId) => ({
  type: REMOVE_REVIEW,
  reviewId,
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

export const createNewReview = (spotId, review, stars, firstName, userId) => async (dispatch) => {
  try {
    const response = await csrfFetch(`/api/spots/${spotId}/reviews`, {
      method: "POST",
      body: JSON.stringify({ review, stars }),
    });
    if (!response.ok) {
      throw new Error("Failed on createNewReview");
    }
    const reviews = await response.json();
    console.log("DEEZE REVIEWS", reviews);
    dispatch(postNewReview({firstName, createdAt: reviews.createdAt, review: reviews.review, userId}));
  } catch (err) {
    console.log("Failed on createNewReview:", err);
  }
};
export const deleteSingleReview = (id) => async (dispatch) => {
  try {
    const response = await csrfFetch(`/api/reviews/${id}`, { method: "DELETE" });
    if (response.ok) {
      const review = await response.json();
      dispatch(removeReview(id));
    }
  } catch (err) {
    console.log("Failed to fetch the review:", err);
  }
};

const reviewsReducer = (state = { reviews: [] }, action) => {
  switch (action.type) {
    case LOAD_ALL_REVIEWS_BY_SPOT:
      return { ...state, reviews: action.reviews.Reviews };
    case POST_NEW_REVIEW:
      return { ...state, reviews: [...state.reviews, action.reviews] };
    default:
      return state;
  }
};

export default reviewsReducer;
