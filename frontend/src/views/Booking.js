import React from "react";
import "react-datepicker/dist/react-datepicker.css";
import SpotBookingDetails from "../components/SpotBookingDetails";
import "./Booking.css";
import { useHistory, useParams } from "react-router-dom";
import { createSingleBooking } from "../store/bookings";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
const Booking = () => {
  let dispatch = useDispatch();
  let history = useHistory();
  let { startDate } = useParams();
  let { endDate } = useParams();
  const sessionUser = useSelector((state) => state.session.user);
  const spot = useSelector((state) => state.spots.selectedSpot);
  startDate = startDate.substring(10);
  endDate = endDate.substring(8);
  const findDays = (date1, date2) => {
    let s = new Date(date1);
    let e = new Date(date2);
    return (e.getTime() - s.getTime()) / (1000 * 3600 * 24);
  };
  const handleSubmit = async (e) => {
    const bookingData = {
      startDate,
      endDate,
      userId: sessionUser?.id,
      spotId: spot.id,
    };
    dispatch(createSingleBooking(spot.id, bookingData)).then((id) =>
      history.push(`/spots/${spot.id}`)
    );
  };
  return (
    <div className="bookingPageCont">
      <h1 className="headingBook">Confirm your stay</h1>
      <div className="detailsCont">
        <div className="dateStuff">
          <h3>Your trip</h3>
          <div className="stayTime">
            <h3>Dates</h3>
            <div className="dateSec">
              <h3>Start Date</h3>
              <p>{startDate}</p>
            </div>
            <div className="dateSec">
              <h3>End Date</h3>
              <p>{endDate}</p>
            </div>
          </div>
        </div>
        <SpotBookingDetails
          spotId={spot.id}
          days={findDays(startDate, endDate)}
        ></SpotBookingDetails>
      </div>
      <div className="submitSection">
        <button onClick={handleSubmit}>Confirm Your Stay</button>
      </div>
    </div>
  );
};

export default Booking;
