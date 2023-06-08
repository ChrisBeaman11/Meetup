import React from "react";
import { useDispatch, useSelector } from "react-redux";
import SpotPane from "../components/SpotPane";
import { fetchAllSpots } from "../store/spots";
import Loading from "../components/Loading";
import { Suspense, useState, useContext } from "react";
import './Landing.css';
//TODO we want to show a gird of spots
//call backend to load all spots data
//

const Landing = () => {
  const [calledOnce, setCalledOnce] = useState(false);
  const dispatch = useDispatch();

  if (!calledOnce) {
    dispatch(fetchAllSpots());
    setCalledOnce(true);
  }

  const spots = useSelector((state) => Object.values(state?.spots?.allSpots || [])) || [];


  console.log("look at me ", spots);
  return (
    <Suspense fallback={<Loading />}>
      <div class="GridContainer">
        {spots.map((spot) => {
          return <SpotPane spot={spot} />;
        })}
      </div>
    </Suspense>
  );
};
export default Landing;
