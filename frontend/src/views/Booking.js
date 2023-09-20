import React from "react";
import 'react-datepicker/dist/react-datepicker.css'
import SpotBookingDetails from "../components/SpotBookingDetails";
import './Booking.css';
const Booking = () =>{
    return(
        <div className="bookingPageCont">
            <h1 className="headingBook">Confirm your stay</h1>
            <div className="detailsCont">
                <div className="dateStuff">
                    <h3>Your trip</h3>
                    <div className="stayTime">
                        <h3>Dates</h3>
                        <p>September 19 - September 24</p>
                    </div>
                </div>
            <SpotBookingDetails></SpotBookingDetails>
            </div>
            <div className="submitSection">
                <button>Confirm Your Stay</button>
            </div>
        </div>
)

}


export default Booking
