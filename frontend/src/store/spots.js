export const LOAD_ALL_SPOTS = "spots/LOAD_ALL_SPOTS"
export const RECEIVE_SPOT = "reports/RECEIVE_SPOT";

export const loadAllSpots = (spots) => ({
  type: LOAD_ALL_SPOTS,
  spots,
});
export const receiveReport = (report) => ({
  type: RECEIVE_SPOT,
  report,
});

export const fetchAllSpots = () => async (dispatch) => {
  try {
    const response = await fetch("/api/spots");
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
    const response = await fetch(`/api/spots/${id}`);
    if (!response.ok) {
      throw new Error("Failed to fetch single spot");
    }
    const spot = await response.json();
    dispatch(receiveReport(spot));
  } catch (err) {
    console.error("Failed to fetch the spot:", err);
  }
};
export const deleteSingleSpot = (id) => async (dispatch) => {
  try {
    const response = await fetch(`/api/spots/${id}`, { method: "DELETE" });
    if (response.ok) {
      const spot = await response.json();
      dispatch(removeReport(id));
    }
  } catch (err) {
    console.log("Failed to fetch the spot:", err);
  }
};

const spotsReducer = (state = {}, action) => {
  switch (action.type) {
    case LOAD_ALL_SPOTS:
      let allSpots = {};
      action.spots.spots.map((spot) => {
        let id = spot[id];
        allSpots[id] = spot;
      });
      let spots = { allSpots };
      return { ...state, spots};
    default:
      return state;
  }
};

export default spotsReducer;
