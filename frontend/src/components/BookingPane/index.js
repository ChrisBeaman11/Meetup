import React from "react";
import './BookingPane.css';
import SpotBookingDetails from "../SpotBookingDetails";
import { fetchSingleSpot } from "../../store/spots";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
const BookingPane = (props) =>{
    let dispatch = useDispatch();
    let booking = props.booking;
    let spotId = booking.spotId;
    console.log("THIS IS MY SPOT ID", spotId);
    useEffect(() => {
        dispatch(fetchSingleSpot(spotId));
      }, [dispatch, spotId]);
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
        </div>
    )
}

export default BookingPane;
