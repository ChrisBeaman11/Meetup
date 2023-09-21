import React from "react";
import { deleteSingleBooking } from "../../store/bookings";
import { useDispatch } from "react-redux";
import './DeleteBookingPopout.css';

export default function DeleteBookingPopout(props) {
    let dispatch = useDispatch();
  return (
    <div className="deleteBookingModal">
      <h2>Confirm Delete</h2>
      <p>Are you sure you want to remove this booking?</p>
      <button className="yesButton" onClick={async () => {
          await dispatch(deleteSingleBooking(props.booking.id));
          props.setShowDeleteModal(false);
            }}>Yes (Delete Booking)</button>
      <button className="noButton" onClick={()=>{ props.setShowDeleteModal(false)}}>No (Keep Booking)</button>
    </div>
  );
}
