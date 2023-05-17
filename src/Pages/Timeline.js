import { useState } from "react";
import { useEffect } from "react";
import Activities from "../Components/Activities.js";
import { apiUrl } from "../Config/constants.js";
import axios from "axios";

export default function Timeline({ connectUser }) {
  const client = connectUser;
  const userID = client.userId;
  const token = connectUser.userToken;

  const user = client.feed("timeline", userID);
  // console.log("the user from timeline", user);

  const users = [
    "Johann",
    "Stephen",
    "Luis",
    "Guilherme",
    "Eve",
    "Cody",
    "Elaine",
    "Ryan",
    "Daniel",
    // "luis",
    "Anders",
  ];
  const [timeline, setTimeline] = useState("");
  const [follows, setFollows] = useState([]);
  const [toFollow, setTofollows] = useState([]);
  // console.log(" my follows", follows);
  // console.log(" my  set follows", setFollows);

  useEffect(() => {
    async function getFeed() {
      const feed = await user.get({
        reactions: { counts: true, own: true, recent: true },
        ranking: "likeRanking",
      });
      // console.log("RANKINGGGGG", feed.ranking);

      setTimeline(feed.results);

      // console.log("set timeline inside useefecct", feed.results);

      const following = await user.following();
      // console.log("following", following);

      const response = following.results;
      // console.log("response inside useefect", response);

      const getFollows = response.map((id) => {
        const newArray = Object.values(id)[1];
        // console.log("new array", newArray);

        const arraySplited = newArray.split(":");
        // console.log("Array splited", arraySplited);
        return arraySplited[1];
      });

      const getNewOldFollowers = [userID, ...getFollows];
      // console.log("getNewOldFollowers", getNewOldFollowers);

      const toFollow = users.filter((user) => {
        return getNewOldFollowers.every((id) => {
          return id !== user;
        });
      });
      setFollows(getFollows);
      setTofollows(toFollow);
    }

    getFeed();
  }, []);

  const setFollow = async (userFollowed) => {
    await user.follow("user", userFollowed);
    setFollows([userFollowed, ...follows]);
    const newFollowers = toFollow.filter((id) => {
      return id !== userFollowed;
    });
    console.log(" new followers", newFollowers);
    setTofollows(newFollowers);
  };

  const setUnfollow = async (userUnfollow) => {
    await user.unfollow("user", userUnfollow);
    setFollows([userUnfollow, ...follows]);
    const unfollowers = follows.filter((id) => {
      return userUnfollow !== id;
    });
    setFollows(unfollowers);
  };

  console.log("the timeline ", timeline);

  const [notification, setNotification] = useState(false);
  const [show, setShow] = useState(false);
  useEffect(() => {
    async function Notify() {
      if (client) {
        // const user = client.feed("user", userId, token);
        const notification = client.feed("notification", userID, token);
        // const notificationFeed = await notification.get();
        // console.log("notification FROM APPJS", notificationFeed);
        const notificationFeed = await notification.get({ mark_seen: false });
        console.log("notification", notificationFeed?.results[0]?.activities);
        setNotification(notificationFeed?.results[0]?.activities);
      }
    }
    Notify();
  }, [client]);

  function sendNotifiction() {
    setShow(!show);
  }

  return (
    <div>
      <h4 className="conected"> CONNECTED AS: {connectUser.userId}</h4>
      <h1>THE TIMELINE PAGE</h1>

      <div style={{ textAlign: "center" }}>
        {client && <button onClick={sendNotifiction}>NOTIFICATION</button>}
      </div>
      {show && (
        <div className="spaceNotificationBox">
          {notification && (
            <div>
              {notification?.map((noti, index) => {
                return (
                  <span key={index}>
                    <p className="notificationBox">
                      <strong>{noti.actor.id} </strong>likes your post{" "}
                      <strong> {noti.object.message}</strong>
                    </p>
                  </span>
                );
              })}
            </div>
          )}
        </div>
      )}
      <div>
        <span>
          <h3>UNFOLLOW:</h3>
          {follows?.map((userToUnFollow, index) => {
            return (
              <div className="spamUnfollow" key={index}>
                <span>
                  <h4>{userToUnFollow}</h4>
                  <button
                    style={{ color: "red", justifyContent: "center" }}
                    onClick={(e) => {
                      setUnfollow(userToUnFollow);
                    }}
                  >
                    UNFOLLOW
                  </button>
                </span>
              </div>
            );
          })}
        </span>
      </div>
      <span>
        <h3>FOLLOW:</h3>
        {toFollow?.map((userToFollow, index) => {
          return (
            <div className="spamUnfollow" key={index}>
              <span>
                <h4>{userToFollow}</h4>
                <button
                  onClick={(e) => {
                    setFollow(userToFollow);
                  }}
                >
                  FOLLOW
                </button>
              </span>
            </div>
          );
        })}
      </span>
      <div>
        <div className="divGlobalActivities">
          {timeline &&
            timeline.map((activity, index) => {
              const time = new Date(activity.time).toDateString();
              return (
                <Activities
                  props={connectUser}
                  key={index}
                  actor={activity?.actor?.id}
                  picture={activity.picture}
                  time={time}
                  id={activity.id}
                  message={activity.message}
                  likes={activity.reaction_counts.like}
                  client={client}
                  userID={userID}
                  time2={activity.time}
                  foreignID={activity.foreign_id}
                  disLikes={activity?.reaction_counts.disLike}
                ></Activities>
              );
            })}
        </div>
        <Activities props={connectUser} />
      </div>
    </div>
  );
}
