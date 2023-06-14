import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import ProfileButton from "./ProfileButton";
import "./Navigation.css";
import CreateSpotButton from "../SpotForm/CreateSpotButton";
import { useHistory } from "react-router-dom";
import { useLocation } from "react-router-dom";

function Navigation({ isLoaded }) {
  let {pathname} = useLocation();
  const [changeStyle, setChangeStyle] = useState(!isNaN(pathname[pathname.length-1]));
  let history = useHistory();
  const sessionUser = useSelector((state) => state.session.user);
  useEffect(()=>{
    if(!isNaN(pathname[pathname.length-1])){
      setChangeStyle(true)
    }
    else{
      setChangeStyle(false)
    }

  }, [pathname])
  return (
    <div className={changeStyle? 'squishedNavCont': 'NavContainer'}>

      <h1 onClick = {() => history.push('/')}className = "logo">airbnb</h1>
    <div className="SubNav">
      {sessionUser && <CreateSpotButton/>}
      {

          isLoaded && (

              <ProfileButton user={sessionUser} />


          )
      }
      </div>
    </div>
  );
}

export default Navigation;
