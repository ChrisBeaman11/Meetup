import { csrfFetch } from "./csrf";

export const LOAD_ALL_SPOTS = "spots/LOAD_ALL_SPOTS";
export const RECEIVE_SPOT = "reports/RECEIVE_SPOT";
export const REMOVE_SPOT = "reports/REMOVE_REPORT";
export const loadAllSpots = (spots) => ({
  type: LOAD_ALL_SPOTS,
  spots,
});
export const receiveSpot = (spot) => ({
  type: RECEIVE_SPOT,
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
    const response = await csrfFetch(`/api/spots}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(spot),
    });
    if(response.ok){
    const createdSpot = await response.json();
    dispatch(receiveSpot(createdSpot));
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
      console.log("this iS ACTION.SPOT:", action.spot);
      return { ...state, selectedSpot: action.spot };

    default:
      return state;
  }
};

export default spotsReducer;
