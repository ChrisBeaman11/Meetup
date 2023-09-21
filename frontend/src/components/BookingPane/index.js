import React from "react";
import './BookingPane.css';
import { useState } from "react";
import SpotBookingDetails from "../SpotBookingDetails";
import DeleteBookingPopout from "../DeleteBookingPopout";
const BookingPane = (props) =>{
    let booking = props.booking;
    let [showDeleteModal, setShowDeleteModal] = useState(false);
  if(!booking) return null;
    return(
        <div className="yourBookingPane">
            <div className="dates">
                <div className="start">
                    <h2>Start Date</h2>
            <p>{booking.startDate}</p>
            </div>
                <div className="end">
                    <h2>End Date</h2>
                    <p>{booking.endDate}</p>
                </div>
            </div>
            <SpotBookingDetails></SpotBookingDetails>
            <div className="buttCont"><button onClick={() => {
                setShowDeleteModal(true);
              }}className="deleteBooking">Delete Booking</button>
            </div>
            {showDeleteModal ? (
        <DeleteBookingPopout booking={booking} setShowDeleteModal={setShowDeleteModal} />
      ) : null}</div>
    )
}

export default BookingPane;
