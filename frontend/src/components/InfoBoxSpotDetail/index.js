import React, {useState} from "react";
import { useSelector } from "react-redux";
import './InfoBoxSpotDetail.css';
import { useHistory } from "react-router-dom";
import DatePicker from 'react-datepicker';
export default function InfoBox(){
    const sessionUser = useSelector((state) => state.session.user);
    const spot = useSelector((state) => state.spots.selectedSpot);
    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(new Date());
    let reviews;
    let history = useHistory();
    if(spot.numReviews===1){
        reviews = "review"
    }
    else{
        reviews = "reviews";
    }
   let rating = spot.avgStarRating?`${spot.avgStarRating?.toFixed(2)} · ${spot.numReviews} ${reviews}`:"New";
        return(
            <div className="box">
                <div className="datesSection">
                <div className="startDate">
                    <p>
                        Start Date
                    </p>
            <DatePicker selected={startDate} onChange={(startDate) => setStartDate(startDate)} />
            </div>
            <div className="endDate">
            <p>
                        End Date
                    </p>
            <DatePicker selected={endDate} onChange={(endDate) => setEndDate(endDate)} />
            </div>
            </div>
                <div className="myFlex">
                <p>${spot.price} night</p>
                <p><i className="fas fa-star"></i> {rating}</p>
                </div>
                {sessionUser&&<button onClick={() => history.push(`${spot.id}/bookings`)} className = "reserveButton">Reserve</button>}
                {!sessionUser&&<button onClick={() => alert("Must be logged in to reserve a stay!")} className = "reserveButton">Reserve</button>}
            </div>
        )
}
