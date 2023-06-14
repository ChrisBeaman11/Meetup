import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import SpotPane from "../components/SpotPane";
import { fetchAllSpots } from "../store/spots";
import Loading from "../components/Loading";
import { Suspense } from "react";
import "./Landing.css";

const Landing = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchAllSpots());
  }, [dispatch]);

  const spots = useSelector((state) => Object.values(state.spots.allSpots));

  return (
    <Suspense fallback={<Loading />}>
      <div className="GridContainer">
        {spots.map((spot, i) => {
          return <SpotPane key={i} spot={spot} />;
        })}
      </div>
    </Suspense>
  );
};
export default Landing;
