export const LOAD_ALL_SPOTS = "spots/LOAD_ALL_SPOTS"
export const loadAllSpots = (spots) => ({
  type: LOAD_ALL_SPOTS,
  spots,
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
