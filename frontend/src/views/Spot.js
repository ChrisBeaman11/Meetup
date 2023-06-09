import React, { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchSingleSpot } from "../store/spots";
import CreateSpotButton from "../components/SpotForm/CreateSpotButton";

export default function Spot(props) {
  let { spotId } = useParams();
  const dispatch = useDispatch();

  //ALL YOUR DATA IS HERE
  const spot = useSelector((state) => state.spots.selectedSpot);

  useEffect(() => {
    dispatch(fetchSingleSpot(spotId));
  }, [dispatch, spotId]);
  if (!spot) return null;
  return (
    <div className="paneContainer">
      <h2>{spot.name}</h2>
      <h3>{`${spot.city}, ${spot.state}, ${spot.country}`}</h3>
      <img
        src="https://l.icdbcdn.com/oh/60907f50-c4d6-4044-9422-b536a7fdabfa.jpg?w=2080"
        alt="PHOTO UNAVAILABLE"
      />
      {spot.Owner && (
        <h2>{`Hosted by ${spot.Owner.firstName} ${spot.Owner.lastName}`}</h2>
      )}
      <p>{spot.description}</p>
      <hr />
      <p>
        {spot.avgRating} with {spot.numReviews} reviews
      </p>
    </div>
  );
}
