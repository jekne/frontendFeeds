import "./App.css";
import Login from "./Pages/Login.js";
import { useState } from "react";
import FeedsPage from "./Pages/FeedsPage.js";
import Global from "./Pages/Global.js";
import Timeline from "./Pages/Timeline.js";
import { Routes, Route } from "react-router-dom";
import NavBar from "./Components/NavBar.js";
import Activities from "./Components/Activities.js";
import { useEffect } from "react";

function App(props) {
  const [connectUser, setConnectUser] = useState("");
  const [notification, setNotification] = useState(false);
  const [userId, setId] = useState("");
  const [owner, setOwner] = useState(false);
  const client = connectUser;
  const userID = client.userId;
  const token = connectUser.userToken;
  // console.log("TOEKN", token);
  console.log("the owner", owner);

  // console.log("client from APPJS", client);

  // console.log("userId from APPJS", userID);

  console.log("what is connectUser!!!!!!!!!?", connectUser);

  return (
    <div className="containnerApp">
      <NavBar />

      <Routes>
        <Route
          path="/myfeeds"
          element={<FeedsPage connectUser={connectUser} />}
        />
        <Route
          path="/"
          element={
            <Login setConnectUser={setConnectUser} connectUser={connectUser} />
          }
        />
        <Route
          path="/global"
          element={
            <Global connectUser={connectUser} setConnectUser={setConnectUser} />
          }
        />
        <Route
          path="/timeline"
          element={
            <Timeline
              connectUser={connectUser}
              setConnectUser={setConnectUser}
            />
          }
        />
      </Routes>
    </div>
  );
}

export default App;
