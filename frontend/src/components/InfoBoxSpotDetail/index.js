import React from "react";
import { useSelector } from "react-redux";
import './InfoBoxSpotDetail.css';
export default function InfoBox(){
    const spot = useSelector((state) => state.spots.selectedSpot);
   let rating = spot.avgStarRating?`${spot.avgStarRating?.toFixed(2)} · ${spot.numReviews} reviews`:"New";
        return(
            <div className="box">
                <div className="myFlex">
                <p>${spot.price} night</p>
                <p><i class="fas fa-star"></i> {rating}</p>
                </div>
                <button onClick={() => alert("Feature coming soon")} className = "reserveButton">Reserve</button>
            </div>
        )
}
