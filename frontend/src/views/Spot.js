import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchSingleSpot } from "../store/spots";
import { fetchAllReviewsBySpot } from "../store/reviews";
import PostReviewModal from "../components/PostReviewModal";
import InfoBox from "../components/InfoBoxSpotDetail";
import DeleteReviewPopout from "../components/DeleteReviewPopout";
import "./Spot.css";

const getMonth = (date) => {
  const vari = new Date(date);
  return vari.toLocaleString('default', { month: 'long' });
};

const Spot = () => {
  const { spotId } = useParams();
  const dispatch = useDispatch();

  const [showModal, setShowModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(null);

  const spot = useSelector((state) => state.spots.selectedSpot);
  const reviews = useSelector((state) => state.reviews.reviews) || [];
  const sessionUser = useSelector((state) => state.session.user);

  useEffect(() => {
    dispatch(fetchSingleSpot(spotId));
    dispatch(fetchAllReviewsBySpot(spotId));
  }, [dispatch, spotId]);

  if (!spot) return null;

  const hasReview = reviews?.find((r) => r.User?.id === sessionUser?.id);
  const userOwnsSpot = sessionUser?.id === spot.ownerId;
  const reviewText = spot.numReviews === 1 ? "review" : "reviews";
  const rating = spot.avgStarRating
    ? `${spot.avgStarRating?.toFixed(2)} · ${spot.numReviews} ${reviewText}`
    : "New";

  return (
    <div className="spot-details-container">
      <h2 className="spot-details-name">{spot.name}</h2>
      <div className="spot-details-location">
        {spot.city}, {spot.state}, {spot.country}
      </div>
      {spot.SpotImages && (
        <div className="spot-details-images">
          <img
            className="main-preview"
            src={spot.SpotImages[0]?.url}
            alt="Main Preview"
          />
          <div className="right-side">
            {spot.SpotImages.slice(1, 5).map((image, index) => (
              <img key={index} src={image.url} alt={`Image ${index}`} />
            ))}
          </div>
        </div>
      )}
      <div className="spot-details-host">
        <div className="host-description">
          {spot.Owner && (
            <h2 className="host-name">
              Hosted by {spot.Owner.firstName} {spot.Owner.lastName}
            </h2>
          )}
          <p className="spot-description">{spot.description}</p>
        </div>
        <div className="spot-details-info-box">
          <InfoBox />
        </div>
      </div>
      <hr className="divider" />
      <div className="spot-details-reviews">
        <p className="spot-details-rating">
          <i className="fas fa-star"></i> {rating}
        </p>
        {sessionUser && !userOwnsSpot && !hasReview && (
          <button
            className="post-review-button"
            onClick={() => setShowModal(true)}
          >
            {reviews.length > 0 ? "Post your review" : "Be the first to post a review!"}
          </button>
        )}
        {reviews.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)).map((review, index) => (
          <div className="review-item" key={index}>
            <div className="name">{review.User.firstName}</div>
            <div className="date">{getMonth(review.createdAt) + " " + review.createdAt.split("T")[0]}</div>
            <div className="review">{review.review}</div>
            {sessionUser?.id === review.User.id && (
              <button
                className="delete-review-button"
                onClick={() => setShowDeleteModal(review)}
              >
                Delete
              </button>
            )}
          </div>
        ))}
      </div>
      {showDeleteModal && (
        <DeleteReviewPopout
          spotId={spot.id}
          review={showDeleteModal}
          setShowDeleteModal={setShowDeleteModal}
        />
      )}
      {showModal && <PostReviewModal showModal={setShowModal} />}
    </div>
  );
};

export default Spot;
