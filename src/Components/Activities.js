import axios from "axios";
import { apiUrl } from "../Config/constants.js";
import { useState, useEffect } from "react";

export default function Activities(props) {
  const [like, setLikes] = useState(0);
  const [disLike, setDisLike] = useState(0);
  const [owner, setOwner] = useState(true);
  // console.log("OWNER", owner);
  const [timeline, setTimeline] = useState("");
  const client = props.client;
  const userID = props.userID;

  useEffect(() => {
    async function getFeed() {
      const likes = props.likes;
      console.log("likes from activties", likes);
      likes && setLikes(likes);
      const disLikes = props.disLikes;
      //   console.log("DISSSSlikes from activties", disLikes);
      disLikes && setDisLike(disLikes);
    }

    getFeed();
  }, []);

  const target = `notification:${props.actor}`;
  console.log(" target comming from activities", target);

  const increaseLikes = async (id) => {
    const request = await client.reactions.add(
      "like",
      id,
      {},

      {
        targetFeeds: [target],
      }
    );
    console.log("request from increaselike", request);
    request && setLikes(like + 1);
    const response = await axios.post(`${apiUrl}/update`, {
      like,
      id,
    });
  };

  const dislike = async (id) => {
    const request = await client.reactions.add("disLike", id, {});
    console.log(request);
    request && setDisLike(disLike + 1);
  };

  const deleteActiviti = (id) => {
    props.deleteActivity(id);
    console.log(" my idDDDDD ", id);
  };

  return (
    <div className="activities">
      <h2>{props.actor} FEEDS</h2>
      <img className="letters" src={props.picture} alt="image" />
      <h4 className="borderActivities"> MESSAGE: {props.message}</h4>
      <h6 className="borderActivities">TIME: {props.time}</h6>
      <span>
        <button
          onClick={(e) => {
            increaseLikes(props.id);
          }}
        >
          LIKE 👍{like}
        </button>

        <button
          className="buttonActivitySpace"
          onClick={(e) => {
            dislike(props.id);
          }}
        >
          DISLIKE 👎 {disLike}
        </button>
        {!owner && (
          <button
            onClick={(e) => {
              deleteActiviti(props.id);
            }}
          >
            DELETE
          </button>
        )}
      </span>
    </div>
  );
}
