import React, { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchSingleSpot } from "../store/spots";
import CreateSpotButton from "../components/SpotForm/CreateSpotButton";
import { fetchAllReviewsBySpot } from "../store/reviews";
import PostReviewModal from "../components/PostReviewModal";
import "./Spot.css";
export default function Spot(props) {
  let { spotId } = useParams();
  const dispatch = useDispatch();

  let [showModal, setShowModal] = useState(false);

  // let [showLeaveReview, setShowLeaveReview] = useState(false)

  const spot = useSelector((state) => state.spots.selectedSpot);
  const reviews = useSelector((state) => state.reviews.reviews);
  const sessionUser = useSelector((state) => state.session.user);

  useEffect(() => {
    dispatch(fetchSingleSpot(spotId));
    dispatch(fetchAllReviewsBySpot(spotId));
  }, [dispatch, spotId]);

  if (!spot) return null;

  return (
    <>
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
        <div className="ReviewContainer">
          <p>
            {spot.avgRating} with {spot.numReviews} reviews
          </p>
          {reviews.filter((review) => {
            return review.User.id === sessionUser.id;
          }).length === 0 ? (
            <button
              onClick={() => {
                setShowModal(true);
              }}
              className="postReviewButton"
            >
              Post your review
            </button>
          ) : null}
          {reviews.map((review, key) => {
            return (
              <div className="reviewItem" key={key}>
                <div className="name">{review.User.firstName}</div>
                <div className="date">{review.createdAt}</div>
                <div className="review">{review.review}</div>
              </div>
            );
          })}
        </div>
      </div>
      {showModal ? <PostReviewModal showModal={setShowModal} /> : null}
    </>
  );
}
