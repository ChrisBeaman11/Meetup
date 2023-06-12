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

const getMonth = (date) => {
  let vari = new Date(date);
  return vari.toLocaleString('default', {month: 'long'});
}




export default function Spot(props) {
  let { spotId } = useParams();
  const dispatch = useDispatch();

  let [showModal, setShowModal] = useState(false);
  let [showDeleteModal, setShowDeleteModal] = useState(null);
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
  const hasReview = reviews?.find((r) => r.User?.id===sessionUser?.id)
  const userOwnsSpot = sessionUser?.id === spot.ownerId;
  let reviewText;
    if(spot.numReviews===1){
        reviewText = "review"
    }
    else{
        reviewText = "reviews";
    }
  let rating = spot.avgStarRating?`${spot.avgStarRating?.toFixed(2)} · ${spot.numReviews} ${reviewText}`:"New";
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
          <p className="ratingPTag">
            <i class="fas fa-star"></i> {rating}
          </p>

           { sessionUser && !userOwnsSpot && !hasReview&& <button
              onClick={() => {
                setShowModal(true);
              }}
              className="postReviewButton"
            >
             {reviews.length > 0 ? `Post your review`: 'Be the first to post a review!'}
            </button>}

          {reviews.sort((a, b) => {
          let dateA = new Date(a.createdAt);
          let dateB = new Date(b.createdAt);
          return dateB - dateA;
        }).map((review, i) => {
            const isUsersReview = sessionUser?.id === review.User.id;
            return (
              <div className="reviewItem" key={i}>
                {review &&<>
                <div className="name">{review.User.firstName}</div>
                <div className="date">{getMonth(review.createdAt) + ' ' + review.createdAt.split('T').join('').split('-')[0]}</div>
                <div className="review">{review.review}</div>
                {isUsersReview&&<button className="deleteReviewButton"onClick={() => {

                setShowDeleteModal(review);
              }}>Delete</button>}
                </>}
              </div>
            );
          })}
        </div>
      </div>
      {showDeleteModal ? (
        <DeleteReviewPopout spotId={spot.id}review={showDeleteModal} setShowDeleteModal={setShowDeleteModal} />
      ) : null}
      {showModal ? <PostReviewModal showModal={setShowModal} /> : null}
    </>
  );
}
