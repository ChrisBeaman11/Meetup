import React, { useState, useEffect, useContext } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./SpotPane.css";
import { useHistory } from "react-router-dom";

export default function SpotPane(props) {
  let history = useHistory();

  let spot = props.spot;
  let id = spot.id;
  return (
    <div class="paneContainer">
      <img
        onClick={() => {
          history.push(`/spots/${id}`);
        }}
        src={`https://l.icdbcdn.com/oh/60907f50-c4d6-4044-9422-b536a7fdabfa.jpg?w=2080`}
        alt="photo unavailable"
      />
      <div class="firstLinePane">
        <p>{`${spot.city}, ${spot.state}`}</p>
        <p>{spot.avgRating}</p>
      </div>
      <p class="price">{`$${spot.price} night`}</p>
    </div>
  );
}
