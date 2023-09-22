import React, { useEffect } from "react";
import "./YourBookings.css";
import { useDispatch, useSelector } from "react-redux";
import BookingPane from "../components/BookingPane";
import { fetchAllBookings } from "../store/bookings";

const YourBookings = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchAllBookings());
  }, [dispatch]);

  const bookings = useSelector((state) =>
    Object.values(state.bookings.allBookings)
  );
  
  if (bookings.length === 0 || !bookings) return null;
  return (
    <div className="currentBookingsPage">
      <div className="bookHead">
        <h2>Your current bookings</h2>
      </div>
      <div className="resultsBooking">
        {bookings[0].map((booking) => {
          return <BookingPane spotId = {booking.spotId} key={booking.id} booking={booking} />;
        })}
      </div>
    </div>
  );
};

export default YourBookings;
