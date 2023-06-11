import React, { useState, useEffect, useContext } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./SpotPane.css";
import { useHistory } from "react-router-dom";
import { deleteSingleSpot } from "../../store/spots";
import DeleteSpotPopout from "../DeleteSpotPopout";

export default function SpotPane(props) {
  let history = useHistory();
  let spot = props.spot;
  let id = spot.id;
  let dispatch = useDispatch();
  let [showDeleteModal, setShowDeleteModal] = useState(false);

  const goToEditForm = () => {
    return history.push(`/spots/${spot.id}/edit`);
  };

  return (
    <>
      <div>
        <div
          className="paneContainer"
          onClick={() => {
            history.push(`/spots/${id}`);
          }}
          title={spot.name}
        >
          <img
            className="paneImage"
            src={`https://media.istockphoto.com/id/1150545984/photo/upscale-modern-mansion-with-pool.jpg?s=612x612&w=0&k=20&c=JT7qSGgmlGfiNiqJE2jw6rYwRcYCj9KBs7i2Rmyyypo=`}
            alt="photo unavailable"
          />
          <div className="firstLinePane">
            <div className="location">
              <p>{spot.city},</p>
              <p>{spot.state}</p>
            </div>
            <p>
              <i class="fas fa-star"></i> {spot.avgRating ?? "New"}
            </p>
          </div>
          <p className="price">
            {`$${spot.price}`} <span className="spanPrice">night</span>{" "}
          </p>
        </div>
        {props.footer ? (
          <div style={{ display: "flex" }}>
            <button
              onClick={() => {
                console.log("here");
                history.push(`/spots/${spot.id}/edit`);
              }}
            >
              Edit
            </button>
            <button
              onClick={() => {
                setShowDeleteModal(true);
              }}
            >
              Delete
            </button>
          </div>
        ) : null}
      </div>
      {showDeleteModal ? (
        <DeleteSpotPopout spot={spot} setShowDeleteModal={setShowDeleteModal} />
      ) : null}
    </>
  );
}
