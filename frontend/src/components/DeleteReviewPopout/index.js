import React from "react";
import { useHistory } from "react-router-dom";
import { deleteSingleReview } from "../../store/reviews";
import { useDispatch, useSelector } from "react-redux";
import './DeleteReviewPopout.css';

export default function DeleteReviewPopout(props) {
    let history = useHistory();
    let dispatch = useDispatch();
  return (
    <div className="deleteReviewModal">
      <h2>Confirm Delete</h2>
      <p>Are you sure you want to remove this review?</p>
      <button className="yesButton" onClick={async () => {
              await dispatch(deleteSingleReview(props.review.id));
              history.push("/");
            }}>Yes (Delete review)</button>
      <button className="noButton" onClick={()=>{ props.setShowDeleteModal(false)}}>No (Keep review)</button>
    </div>
  );
}
