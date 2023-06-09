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

      <img onClick = {() => history.push('/')}className = "logo" src="https://banner2.cleanpng.com/20180907/il/kisspng-logo-airbnb-jpeg-brand-vector-graphics-madaz-money-learn-to-day-trade-stocks-penny-stoc-5b92a0f47ddf87.1656733615363361165156.jpg" alt="LOGO NOT WORKING" />
    <div className="SubNav">
      <CreateSpotButton/>
      <button className = "menu"
        onClick={() => {
          setIsClicked(!isClicked);
        }}
      />
      {isClicked && (
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
          {isLoaded && (
            <li>
              <ProfileButton user={sessionUser} />
            </li>
          )}
        </ul>
      )}
      </div>
    </div>
  );
}

export default Navigation;
