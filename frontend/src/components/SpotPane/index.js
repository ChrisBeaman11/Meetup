import React, { useState} from "react";
import "./SpotPane.css";
import { useHistory } from "react-router-dom";
import DeleteSpotPopout from "../DeleteSpotPopout";

export default function SpotPane(props) {
  let [showDeleteModal, setShowDeleteModal] = useState(false);
  let history = useHistory();
  let spot = props.spot;
  if(!spot) return null;
  let id = spot.id;
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
            src={spot.previewImage}
            alt="photo unavailable"
          />
          <div className="firstLinePane">
            <div className="location">
              <p>{spot.city},</p>
              <p>{spot.state}</p>
            </div>
            <p>
              <i className="fas fa-star"></i> {spot.avgRating?spot.avgRating.toFixed(2) : "New"}
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
