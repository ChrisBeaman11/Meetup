import React from "react";
import { useSelector } from "react-redux";
import './InfoBoxSpotDetail.css';
export default function InfoBox(){
    const spot = useSelector((state) => state.spots.selectedSpot);
    //TODO put doticon on 2nd ptag
        return(
            <div className="box">
                <div className="myFlex">
                <p>${spot.price} night</p>
                <p><i class="fas fa-star"></i> {spot.avgStarRating} * {spot.numReviews} reviews</p>
                </div>
                <button onClick={() => alert("Feature coming soon")} className = "reserveButton">Reserve</button>
            </div>
        )
}
