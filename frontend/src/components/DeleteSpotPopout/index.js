import React from "react";
import { useHistory } from "react-router-dom";
import { deleteSingleSpot } from "../../store/spots";
import { useDispatch, useSelector } from "react-redux";

export default function DeleteSpotPopout(props) {
    let history = useHistory();
    let dispatch = useDispatch();
  return (
    <div>
      <h2>Confirm Delete</h2>
      <p>Are you sure you want to remove this spot from the listings?</p>
      <button className="yesButton" onClick={async () => {
              await dispatch(deleteSingleSpot(props.spot.id));
              history.push("/");
            }}>Yes (Delete Spot)</button>
      <button className="noButton" onClick={()=>{ props.setShowDeleteModal(false)}}>No (Keep Spot)</button>
    </div>
  );
}
