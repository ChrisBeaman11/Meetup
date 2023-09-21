import { csrfFetch } from "./csrf";

export const LOAD_ALL_SPOTS = "spots/LOAD_ALL_SPOTS";
export const RECEIVE_SPOT = "spots/RECEIVE_SPOT";
export const RECEIVE_NEW_SPOT = "spots/RECEIVE_NEW_SPOT";
export const UPDATE_SPOT = "spots/UPDATE_SPOT";
export const REMOVE_SPOT = "spots/REMOVE_SPOT";
export const LOAD_ALL_REVIEWS_BY_SPOT = "reviews/LOAD_ALL_REVIEWS_BY_SPOT";
export const UPDATE_REVIEW = "spots/UPDATE_REVIEW";
export const UPDATE_REVIEW_POST = "spots/UPDATE_REVIEW_POST";

export const updateReview = (avgRating) =>({
  type: UPDATE_REVIEW,
  avgRating
})
export const updateReviewPost = (avgRating) =>({
  type: UPDATE_REVIEW_POST,
  avgRating
})
export const loadAllReviews = (reviews) => ({
  type: LOAD_ALL_REVIEWS_BY_SPOT,
  reviews,
});

export const updateSpot = (spot) => ({
  type: UPDATE_SPOT,
  spot,
});

export const loadAllSpots = (spots) => ({
  type: LOAD_ALL_SPOTS,
  spots,
});
export const receiveSpot = (spot) => ({
  type: RECEIVE_SPOT,
  spot,
});
export const receiveNewSpot = (spot) => ({
  type: RECEIVE_NEW_SPOT,
  spot,
});

export const removeSpot = (spotId) => ({
  type: REMOVE_SPOT,
  spotId,
});
export const fetchAllSpots = () => async (dispatch) => {
  try {
    const response = await csrfFetch("/api/spots");
    if (!response.ok) {
      throw new Error("Failed to fetch spots");
    }
    const spots = await response.json();
    dispatch(loadAllSpots(spots));
  } catch (err) {
    console.log("Failed to fetch spots:", err);
  }
};

export const fetchSingleSpot = (id) => async (dispatch) => {
  try {
    const response = await csrfFetch(`/api/spots/${id}`);
    if (!response.ok) {
      throw new Error("Failed to fetch single spot");
    }
    const spot = await response.json();
    dispatch(receiveSpot(spot));
  } catch (err) {
    console.error("Failed to fetch the spot:", err);
  }
};
export const deleteSingleSpot = (id) => async (dispatch) => {
  try {
    const response = await csrfFetch(`/api/spots/${id}`, { method: "DELETE" });
    if (response.ok) {
      const spot = await response.json();
      dispatch(removeSpot(id));

    }
  } catch (err) {
    console.log("Failed to fetch the spot:", err);
  }
};
export const createSingleSpot = (spot, images) => async (dispatch) => {
  try {
    const response = await csrfFetch(`/api/spots`, {
      method: "POST",
      body: JSON.stringify(spot),
    });

    if (response.ok) {
      const createdSpot = await response.json();
      createdSpot.SpotImages = [];
      for(let image of images){
        await csrfFetch(`/api/spots/${createdSpot.id}/images`, {method: "POST", body: JSON.stringify({url: image})})
        createdSpot.SpotImages.push({url: image});
      }

      dispatch(receiveNewSpot(createdSpot));
      return createdSpot.id;
    }
  } catch (err) {
    console.log("Failed to create the report:", err);
  }
};

export const updateSingleSpot = (spot) => async (dispatch) => {
  try {
    const response = await csrfFetch(`/api/spots/${spot.id}`, {
      method: "PUT",
      body: JSON.stringify(spot),
    });
    if (response.ok) {
      const updated = await response.json();
      dispatch(receiveNewSpot(updated));
    }
  } catch (err) {
    console.log("Failed to create the report:", err);
  }
};



const spotsReducer = (
  state = { allSpots: {}, selectedSpot: {} },
  action
) => {
  switch (action.type) {
    case LOAD_ALL_SPOTS:
      let allSpots = {};
      action.spots.Spots.map((spot) => {
        let id = spot.id;
        allSpots[id] = spot;
      });
      return { ...state, allSpots };
    case LOAD_ALL_REVIEWS_BY_SPOT:
      return { ...state, 'reviews': action.Reviews};
    case RECEIVE_SPOT:
      return { ...state, selectedSpot: action.spot };
    case RECEIVE_NEW_SPOT:
      let as = state.allSpots;
      as[action.spot.id] = action.spot;
      return { allSpots: as, selectedSpot: action.spot };
    case UPDATE_SPOT:
      let all = state.allSpots;
      all[action.spot.id] = action.spot;
      return { ...state, allSpots: all };
    case REMOVE_SPOT:
      return {...state, allSpots: {...state.allSpots, [action.spotId]: null}};
      case UPDATE_REVIEW:
      return {allSpots: state.allSpots, selectedSpot: {...state.selectedSpot, numReviews: state.selectedSpot.numReviews-1, avgStarRating: action.avgRating}}
      case UPDATE_REVIEW_POST:
      return {allSpots: state.allSpots, selectedSpot: {...state.selectedSpot, numReviews: state.selectedSpot.numReviews+1, avgStarRating: action.avgRating}}
    default:
      return state;
  }
};

export default spotsReducer;
