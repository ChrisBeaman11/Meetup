import React from "react";
import { useSelector } from "react-redux";
import './InfoBoxSpotDetail.css';
import { useHistory } from "react-router-dom";
export default function InfoBox(){
    const spot = useSelector((state) => state.spots.selectedSpot);
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
                <div className="myFlex">
                <p>${spot.price} night</p>
                <p><i className="fas fa-star"></i> {rating}</p>
                </div>
                <button onClick={() => history.push(`${spot.id}/bookings`)} className = "reserveButton">Reserve</button>
            </div>
        )
}
