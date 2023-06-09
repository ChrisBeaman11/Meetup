import { csrfFetch } from "./csrf";

export const LOAD_ALL_SPOTS = "spots/LOAD_ALL_SPOTS";
export const RECEIVE_SPOT = "spots/RECEIVE_SPOT";
export const RECEIVE_NEW_SPOT = "spots/RECEIVE_NEW_SPOT";
export const REMOVE_SPOT = "spots/REMOVE_REPORT";
export const UPDATE_SPOT = "spots/UPDATE_SPOT";

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
export const createSingleSpot = (spot) => async (dispatch) => {
  try {
    const response = await csrfFetch(`/api/spots`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(spot),
    });
    if (response.ok) {
      const createdSpot = await response.json();
      dispatch(receiveNewSpot(createdSpot));
    }
  } catch (err) {
    console.log("Failed to create the report:", err);
  }
};

export const updateSingleSpot = (spot) => async (dispatch) => {
  try {
    const response = await csrfFetch(`/api/spots/${spot.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
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

const spotsReducer = (state = { allSpots: {}, selectedSpot: {} }, action) => {
  switch (action.type) {
    case LOAD_ALL_SPOTS:
      let allSpots = {};
      action.spots.Spots.map((spot) => {
        let id = spot["id"];
        allSpots[id] = spot;
      });
      return { ...state, allSpots };
    case RECEIVE_SPOT:
      return { ...state, selectedSpot: action.spot };
    case RECEIVE_NEW_SPOT:
      let as = state.allSpots;
      as[action.spot.id] = action.spot;
      return { ...state, allSpots: as, selectedSpot: action.spot };
    case UPDATE_SPOT:
      let all = state.allSpots;
      all[action.spot.id] = action.spot;
      return { ...state, allSpots: all };
    default:
      return state;
  }
};

export default spotsReducer;
