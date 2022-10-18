import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

export default function NavBar({ connectUser }) {
  const navigate = useNavigate();

  const routeChange = () => {
    navigate("/myfeeds");
    console.log("Button was cliked");
  };

  const routeChangeGlobal = () => {
    navigate("/global");
    console.log("Button was cliked on Global");
  };
  // const change4 = () => {
  //   setNotification(!notification);

  //   console.log("Button was cliked on STAR");
  // };
  return (
    <div className="navbar">
      {" "}
      <div>
        <Link to="/timeline">
          <button className="buttonNav">
            <div>TIME LINE</div>
          </button>
        </Link>
        <Link to="/myfeeds">
          <button className="buttonNav" onClick={routeChange}>
            <div>MY FEED</div>
          </button>
        </Link>
        <Link to="/global">
          <button className="buttonNav" onClick={routeChangeGlobal}>
            <div>GLOBAL</div>
          </button>
        </Link>
      </div>
    </div>
  );
}
