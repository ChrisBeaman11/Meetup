import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Switch, Route } from "react-router-dom";
import * as sessionActions from "./store/session";
import Navigation from "./components/Navigation";
import Landing from "./views/Landing";
import Spot from "./views/Spot";
import CreateSpot from "./views/CreateSpot";
import UpdateSpot from "./views/UpdateSpot";
import ManageSpots from "./views/ManageSpots";
import Footer from "./components/Footer";
import Booking from "./views/Booking";
function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    dispatch(sessionActions.restoreUser()).then(() => setIsLoaded(true));
  }, [dispatch]);
  return (
    <>
      <Navigation isLoaded={isLoaded} />
      {isLoaded && (
        <Switch>
          <Route exact path="/">
            <Landing />
          </Route>
          <Route exact path="/spots/new">
            <CreateSpot />
          </Route>
          <Route exact path="/spots/current">
            <ManageSpots />
          </Route>
          <Route exact path="/spots/:spotId/edit">
            <UpdateSpot />
          </Route>
          <Route exact path="/spots/:spotId/bookings">
            <Booking/>
          </Route>
          <Route exact path="/spots/:spotId">
            <Spot />
          </Route>
        </Switch>
      )}
      <Footer/>
    </>
  );
}

export default App;
