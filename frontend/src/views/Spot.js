import React, { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchSingleSpot } from "../store/spots";
import CreateSpotButton from "../components/SpotForm/CreateSpotButton";
import { fetchAllReviewsBySpot } from "../store/reviews";
import PostReviewModal from "../components/PostReviewModal";
import "./Spot.css";
import InfoBox from "../components/InfoBoxSpotDetail";
import DeleteReviewPopout from "../components/DeleteReviewPopout";
export default function Spot(props) {
  let { spotId } = useParams();
  const dispatch = useDispatch();

  let [showModal, setShowModal] = useState(false);
  let [showDeleteModal, setShowDeleteModal] = useState(false);
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
  console.log("MY SPOT", spot);
  if (!spot) return null;
  const hasReview = reviews?.find((r) => r.User?.id===sessionUser?.id)
  const userOwnsSpot = sessionUser.id === spot.ownerId;
  let rating = spot.avgStarRating?`${spot.avgStarRating?.toFixed(2)} · ${spot.numReviews} reviews`:"New";
  return (
    <>
      <div className="paneContainer">
        <h2 className="spotName">{spot.name}</h2>
        <div className="locationDiv">
          <h3>{spot.city},</h3>
          <h3>{spot.state},</h3>
          <h3>{spot.country}</h3>
        </div>
        {spot.SpotImages && (
          <div className="spotImagesContainer">
            {spot.SpotImages[0] && (
              <img className = "mainPreview"src={spot.SpotImages[0].url} alt="PHOTO UNAVAILABLE" />
            )}
            <div className="rightSide">
            {spot.SpotImages[1] && <img src={spot.SpotImages[1].url} alt="" />}
            {spot.SpotImages[2] && <img src={spot.SpotImages[2].url} alt="" />}
            {spot.SpotImages[3] && <img src={spot.SpotImages[3].url} alt="" />}
            {spot.SpotImages[4] && <img src={spot.SpotImages[4].url} alt="" />}
            </div>
          </div>
        )}
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
            <i class="fas fa-star"></i> {rating}
          </p>

           { !userOwnsSpot && !hasReview&& <button
              onClick={() => {
                setShowModal(true);
              }}
              className="postReviewButton"
            >
              Post your review
            </button>}

          {reviews.map((review, i) => {
            const isUsersReview = sessionUser.id === review.userId;
            return (
              <div className="reviewItem" key={i}>
                {review &&<>
                 <div className="name">{review.firstName}</div>
                <div className="date">{review.createdAt.split("T")[0]}</div>
                <div className="review">{review.review}</div>
                {isUsersReview&&<button onClick={() => {
                setShowDeleteModal(true);
              }}>Delete</button>}
                </>}
              </div>
            );
          })}
        </div>
      </div>
      {showDeleteModal ? (
        <DeleteReviewPopout spot={spot} setShowDeleteModal={setShowDeleteModal} />
      ) : null}
      {showModal ? <PostReviewModal showModal={setShowModal} /> : null}
    </>
  );
}
