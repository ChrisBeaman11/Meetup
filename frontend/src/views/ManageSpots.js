import { useState, useEffect } from "react";
import SpotPane from "../components/SpotPane";
import { useSelector } from "react-redux";
import { Suspense } from "react";
import Loading from "../components/Loading";

export default function ManageSpots() {
  const allSpots = useSelector((state) => Object.values(state.spots.allSpots));
  const sessionUser = useSelector((state) => state.session.user);
  const userSpots = allSpots.filter((spot) => {
    return spot.ownerId === sessionUser.id;
  });

  return (
    <Suspense fallback={<Loading />}>
      <div className="GridContainer">
        {userSpots.map((spot) => {
          return <SpotPane key={spot.id} spot={spot} footer={true} />;
        })}
      </div>
    </Suspense>
  );
}
