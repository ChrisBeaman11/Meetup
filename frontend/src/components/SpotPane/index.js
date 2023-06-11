import React, { useState, useEffect, useContext } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./SpotPane.css";
import { useHistory } from "react-router-dom";

export default function SpotPane(props) {
  let history = useHistory();

  let spot = props.spot;
  let id = spot.id;
  return (
    <div className="paneContainer"
    onClick={() => {
      history.push(`/spots/${id}`);
    }}
    title={spot.name}
    >
      <img
      className = "paneImage"

        src={`https://l.icdbcdn.com/oh/60907f50-c4d6-4044-9422-b536a7fdabfa.jpg?w=2080`}
        alt="photo unavailable"
      />
      <div className="firstLinePane">
        <div className="location">
        <p>{spot.city},</p>
        <p>{spot.state}</p>
        </div>
        <p><i class="fas fa-star"></i> {spot.avgRating??'New'}</p>
      </div>
      <p className="price">{`$${spot.price}`} <span className="spanPrice">night</span> </p>
      {props.footer ? (
        <div style={{ display: "flex" }}>
          <button
            onClick={() => {
              history.push(`/spots/${spot.id}/edit`);
            }}
          >
            Edit
          </button>
          <button
            onClick={() => {
              history.push("/");
            }}
          >
            Delete
          </button>
        </div>
      ) : null}
    </div>
  );
}
