import React from "react";
import './BookingPane.css';
import { useState } from "react";
import SpotBookingDetails from "../SpotBookingDetails";
import DeleteBookingPopout from "../DeleteBookingPopout";
const BookingPane = (props) =>{
    let booking = props.booking;
    let spotId = booking.spotId;
          let startDate = new Date(booking.startDate);
          let endDate = new Date(booking.endDate);
          let days = (endDate.getTime()-startDate.getTime())/(1000*3600*24);
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
            <SpotBookingDetails days = {days} spotId = {spotId}></SpotBookingDetails>
            <div className="buttCont"><button onClick={() => {
                setShowDeleteModal(true);
              }}className="deleteBooking">Delete Booking</button>
            </div>
            {showDeleteModal ? (
        <DeleteBookingPopout days = {days} booking={booking} setShowDeleteModal={setShowDeleteModal} />
      ) : null}</div>
    )
}

export default BookingPane;
