import React, { useState, useEffect, useContext } from "react";
import { useDispatch } from "react-redux";
import { Switch, Route } from "react-router-dom";
import * as sessionActions from "./store/session";
import Navigation from "./components/Navigation";
import Landing from "./views/Landing";
import Spot from "./views/Spot";
import { fetchAllSpots } from "./store/spots";

function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);

  // const store = useContext(store);
  // if (!calledOnce && isLoaded) {
  // const dispatch = useDispatch();
  // dispatch(fetchAllSpots());
  //   setCalledOnce(true);
  // }
  useEffect(() => {
    dispatch(sessionActions.restoreUser()).then(() => setIsLoaded(true));
  }, [dispatch]);

  // console.log(window.store);
  //TODO
  /*
  1) Set up routing here for all views'
  2) load all the data of spots, update store
  */
  return (
    <>
      <Navigation isLoaded={isLoaded} />
      {isLoaded && (
        <Switch>
          <Route exact path="/">
            <Landing />
          </Route>
          <Route exact path="/spots/:spotId">
            <Spot />
          </Route>
        </Switch>
      )}
    </>
  );
}

export default App;
