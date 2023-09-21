import { csrfFetch } from "./csrf";


export const LOAD_ALL_BOOKINGS = "bookings/LOAD_ALL_BOOKINGS";
export const RECEIVE_BOOKING = "bookings/RECEIVE_BOOKING";
export const REMOVE_BOOKING = "bookings/REMOVE_BOOKING";
export const CREATE_BOOKING = "bookings/CREATE_BOOKING";

export const loadAllBookings = (bookings) => ({
  type: LOAD_ALL_BOOKINGS,
  bookings,
});

export const receiveBooking = (booking) => ({
  type: RECEIVE_BOOKING,
  booking,
});

export const removeBooking = (bookingId) => ({
  type: REMOVE_BOOKING,
  bookingId,
});

export const createBooking = (booking) => ({
  type: CREATE_BOOKING,
  booking,
});

export const fetchAllBookings = () => async (dispatch) => {
  try {
    const response = await csrfFetch("/api/bookings/current");
    if (!response.ok) {
      throw new Error("Failed to fetch bookings");
    }
    const bookings = await response.json();
    dispatch(loadAllBookings(bookings));
  } catch (err) {
    console.log("Failed to fetch bookings:", err);
  }
};

export const fetchSingleBooking = (spotId) => async (dispatch) => {
  try {
    const response = await csrfFetch(`/api/spots/${spotId}/bookings`);
    if (!response.ok) {
      throw new Error("Failed to fetch single booking");
    }
    const booking = await response.json();
    dispatch(receiveBooking(booking));
  } catch (err) {
    console.error("Failed to fetch the booking:", err);
  }
};

export const deleteSingleBooking = (bookingId) => async (dispatch) => {
  try {
    const response = await csrfFetch(`/api/bookings/${bookingId}`, {
      method: "DELETE",
    });
    if (response.ok) {
      dispatch(removeBooking(bookingId));
    }
  } catch (err) {
    console.log("Failed to delete the booking:", err);
  }
};

export const createSingleBooking = (spotId, bookingData) => async (dispatch) => {
  try {
    const response = await csrfFetch(`/api/spots/${spotId}/bookings`, {
      method: "POST",
      body: JSON.stringify(bookingData),
    });

    if (response.ok) {
      const createdBooking = await response.json();
      dispatch(createBooking(createdBooking));
      return createdBooking.id;
    }
  } catch (err) {
    console.log("Failed to create the booking:", err);
  }
};
const initialState = {
  allBookings: {},
  selectedBooking: {},
};

const bookingsReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOAD_ALL_BOOKINGS:
      return { ...state, allBookings: action.bookings };
    case RECEIVE_BOOKING:
      return { ...state, selectedBooking: action.booking };
    case REMOVE_BOOKING:
      return {
        ...state,
        allBookings: { ...state.allBookings, [action.bookingId]: null },
      };
    case CREATE_BOOKING:
      return {
        ...state,
        allBookings: {
          ...state.allBookings,
          [action.booking.id]: action.booking,
        },
      };
    default:
      return state;
  }
};

export default bookingsReducer;
