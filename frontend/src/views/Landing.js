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
      <section className="hero">
        <h1>Find Your Perfect Getaway</h1>
        <p>Explore unique homes and experiences all over the world.</p>
      </section>
      <section className="search">
        {/* Search form can be added here */}
      </section>
      <div className="results">
        {spots.map((spot, i) => {
          return <SpotPane key={i} spot={spot} />;
        })}
      </div>

    </Suspense>
  );
};
export default Landing;
