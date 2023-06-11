import React, { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchSingleSpot } from "../store/spots";
import CreateSpotButton from "../components/SpotForm/CreateSpotButton";
import { fetchAllReviewsBySpot } from "../store/reviews";
import PostReviewModal from "../components/PostReviewModal";
import "./Spot.css";
import InfoBox from "../components/InfoBoxSpotDetail";
export default function Spot(props) {
  let { spotId } = useParams();
  const dispatch = useDispatch();

  let [showModal, setShowModal] = useState(false);

  // let [showLeaveReview, setShowLeaveReview] = useState(false)

  const spot = useSelector((state) => state.spots.selectedSpot);
  const reviews = useSelector((state) => state.reviews.reviews) || [];
  const sessionUser = useSelector((state) => state.session.user);

  // useEffect(() => {
  //   dispatch(fetchAllReviewsBySpot(spotId));
  // }, [reviews]);

  useEffect(() => {
    dispatch(fetchSingleSpot(spotId));
    dispatch(fetchAllReviewsBySpot(spotId));
  }, [spotId]);

  if (!spot) return null;

  return (
    <>
      <div className="paneContainer">
        <h2 className="spotName">{spot.name}</h2>
        <div className="locationDiv">
          <h3>{spot.city},</h3>
          <h3>{spot.state},</h3>
          <h3>{spot.country}</h3>
        </div>
        <img
          src="https://media.istockphoto.com/id/1150545984/photo/upscale-modern-mansion-with-pool.jpg?s=612x612&w=0&k=20&c=JT7qSGgmlGfiNiqJE2jw6rYwRcYCj9KBs7i2Rmyyypo="
          alt="PHOTO UNAVAILABLE"
        />
        <div className="ownerInfoBoxDiv">
          <div className="ownerDescriptionDiv">
            {spot.Owner && (
              <h2>{`Hosted by ${spot.Owner.firstName} ${spot.Owner.lastName}`}</h2>
            )}
            <p>{spot.description}</p>
          </div>
          <div className="infoBox">
            <InfoBox />
          </div>
        </div>
        <hr />
        <div className="ReviewContainer">
          <p>
            <i class="fas fa-star"></i> {spot.avgStarRating} * {spot.numReviews}{" "}
            reviews
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
          {reviews.map((review) => {
            return (
              <div className="reviewItem" key={review.id}>
                <div className="name">{review.User.firstName}</div>
                <div className="date">{review.createdAt.split("T")[0]}</div>
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
