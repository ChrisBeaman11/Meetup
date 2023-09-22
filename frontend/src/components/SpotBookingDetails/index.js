import React from "react";
import "./SpotBookingDetails.css";
import { useSelector } from "react-redux";
const SpotBookingDetails = ({ days, spotId }) => {
  const spots = useSelector((state) => Object.values(state.spots.allSpots));
  let spot = spots.filter((spot) => spot.id === spotId);
  if (!spot.length) return null;
  spot = spot[0];
  return (
    <div className="detailsPane">
      <div className="topCont">
        <div className="displayImage">
          <img src={spot.previewImage} alt="" />
        </div>
        <div className="rightSideDisplay">
          <h2>{spot.name}</h2>
          <p>
            {spot.city}, {spot.state}
          </p>
        </div>
      </div>
      <div className="topHr">
        <hr />
      </div>
      <div className="priceDetails">
        <h3>Price Details</h3>
        <div className="nightAndPrice">
          <p>
            ${spot.price} x {days} nights
          </p>
          <p>${spot.price * days}</p>
        </div>
        <hr />
        <div className="taxAddition">
          <p>Taxes</p>
          <p>${(spot.price * days * 0.06).toFixed(2)}</p>
        </div>
        <hr />
        <div className="totalPrice">
          <p>Total(USD)</p>
          <p>${(spot.price * days * 0.06 + spot.price * days).toFixed(2)}</p>
        </div>
      </div>
    </div>
  );
};

export default SpotBookingDetails;
