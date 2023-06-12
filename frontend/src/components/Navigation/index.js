import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import ProfileButton from "./ProfileButton";
import "./Navigation.css";
import CreateSpotButton from "../SpotForm/CreateSpotButton";
import { useHistory } from "react-router-dom";
import ManageSpots from "../../views/ManageSpots";

function Navigation({ isLoaded }) {
  let history = useHistory();
  const sessionUser = useSelector((state) => state.session.user);

  const [isClicked, setIsClicked] = useState(false);

  return (
    <div className="NavContainer">

      <h1 onClick = {() => history.push('/')}className = "logo">airbnb</h1> <h1/>
    <div className="SubNav">
      {sessionUser && <CreateSpotButton/>}
      {

          isLoaded && (
            <ul>
            <li>
            <NavLink exact to="/">
              Home
            </NavLink>
          </li>
          <li>
            <NavLink exact to="/spots/current">
              Manage Spots
            </NavLink>
          </li>
            <li>
              <ProfileButton user={sessionUser} />
            </li>
            </ul>
          )
      }
      </div>
    </div>
  );
}

export default Navigation;
