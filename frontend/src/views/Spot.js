import React, { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchSingleSpot } from "../store/spots";

export default function Spot(props) {
  let { spotId } = useParams();
  const dispatch = useDispatch();

  //ALL YOUR DATA IS HERE
  const spot = useSelector((state) => state?.spot?.selectedSpot);

  useEffect(() => {
    dispatch(fetchSingleSpot(spotId));
  }, [dispatch, spotId]);

  return <div class="paneContainer">I WORK I MADE IT HERE</div>;
}
