import Activities from "../Components/Activities.js";
import { useEffect, useState } from "react";
import axios from "axios";
import { Form, FormLabel } from "react-bootstrap";
import { apiUrl } from "../Config/constants.js";

export default function Global({ props, connectUser }) {
  const client = connectUser;
  const userID = client.userId;
  const token = client.userToken;

  const global = client.feed("global", "all", token);
  console.log("global feed ", global);

  const [timeline, setTimeline] = useState("");
  const [post, setPost] = useState("");
  const [url, setURL] = useState("");

  useEffect(() => {
    async function getFeed() {
      const feed = await global.get({
        limit: 10,
        reactions: { counts: true, own: true, recent: true },
        ranking: "likeRanking",
      });
      console.log("global", feed.results);
      setTimeline(feed.results);
    }

    getFeed();
  }, []);

  const submit = async (e) => {
    e.preventDefault();
    setPost("");
    console.log(url);
    const foreignID = Math.random();
    const newActor = "SU:".concat(userID);
    const newPost = await global.addActivity({
      actor: newActor,
      verb: "posted",
      object: "action:1",
      foreign_id: foreignID,
      picture: url,
      message: post,
      likes: 0,
    });
    console.log(newPost);
    setTimeline([newPost, ...timeline]);
  };

  async function getUrl(event) {
    const files = event.target.files;
    const response = await client.images.upload(files[0]);
    // console.log(response);
    setURL(response.file);
  }

  const deleteActivity = async (id) => {
    const request = await global.removeActivity(id);
    console.log("request", request);
    console.log(request.removed);

    // const response = await axios.delete(`${apiUrl}/global/${id}`);
    // console.log(response);

    if (request) {
      const newList = timeline.filter((activity) => {
        return activity.id !== id;
      });
      setTimeline(newList);
    }
  };

  return (
    <div>
      <h4 className="conected"> CONNECTED AS: {connectUser.userId}</h4>
      <h1>GLOBAL FEEDS PAGE</h1>
      <div className="showActivity">
        <Form onSubmit={submit}>
          {url ? <img src={url} alt="image" /> : ""}
          <FormLabel>ADD IMAGES TO YOUR FEED</FormLabel>
          <input type="file" onChange={getUrl}></input>
          <textarea
            onChange={(event) => {
              setPost(event.target.value);
            }}
            value={post}
            type="text"
          />
          <button type="submit">POST</button>
        </Form>
      </div>
      <div className="divGlobalActivities">
        {timeline &&
          timeline?.map((activity, index) => {
            const time = new Date(activity.time).toDateString();
            return (
              <Activities
                key={index}
                actor={activity.actor?.id}
                picture={activity.picture}
                time={time}
                id={activity.id}
                message={activity.message}
                likes={activity.reaction_counts?.like}
                client={client}
                userID={userID}
                // deleteActivity={deleteActivity}
              ></Activities>
            );
          })}
      </div>
    </div>
  );
}
