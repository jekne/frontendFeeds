import { useState, useEffect } from "react";
import { getTokenAndConnectUser } from "../Utils/getTokenAndConnectUser.js";
import stream, { connect } from "getstream";
import { getActivities } from "../Utils/retrivingActivities.js";
import { Button, Form, FormLabel, InputGroup } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const API_KEY = "gzes58qjwyyt";
const APP_ID = "1202347";

export default function FeedsPage({ connectUser, props }) {
  const userId = connectUser.userId;

  console.log(" my user id", userId);
  const token = connectUser.userToken;

  const client = stream.connect(API_KEY, token, APP_ID);

  const user = client.feed("user", userId, token);
  // console.log("user Tryng notification", user.actor);
  const [timeLine, setTimeline] = useState("");

  const [post, setPost] = useState("");
  const [url, setURL] = useState("");

  useEffect(() => {
    async function getFeed() {
      const feed = await user.get({
        limit: 10,
        reactions: { counts: true, own: true, recent: true },
        ranking: "likeRanking",
      });
      console.log("user", feed.results);
      setTimeline(feed.results);
    }

    getFeed();
  }, []);

  const submit = async (e) => {
    e.preventDefault();
    setPost("");
    console.log("THE URL", url);
    const time = new Date();
    const foreignID = Math.random();
    const newActor = "SU:".concat(userId);
    const newPost = await user.addActivity({
      actor: newActor,
      verb: "posted",
      object: "action:1",
      foreign_id: foreignID,
      picture: url,
      message: post,
      time: time,
      to: [`global:all`],
      // location: "user:johann",
    });
    console.log(newPost);
    setTimeline([newPost, ...timeLine]);
  };

  async function getUrl(event) {
    const files = event.target.files;
    const response = await client.images.upload(files[0]);
    console.log(response);
    setURL(response.file);
  }

  const toDelete = async (id) => {
    console.log("id from delete", id);
    const request = await user.removeActivity(id);
    console.log("THE REQUEST to delete", request.removed);

    if (request) {
      const newList = timeLine.filter((activity) => {
        return activity.id !== id;
      });
      setTimeline(newList);
    }
  };

  return (
    <div>
      <h4 className="conected"> CONNECTED AS: {connectUser.userId}</h4>
      <h1 style={{ textAlign: "center" }}>MY FEEDS PAGE</h1>
      {/* <h3>ACTIVITIES:</h3> */}
      <div className="divGlobalActivities">
        {!timeLine
          ? "Loading..."
          : timeLine?.map((activity, index) => {
              const time = new Date(activity.time).toDateString();
              return (
                <div className="activitiesFeedPage" key={index}>
                  <h4>ACTOR: {activity.actor.id}</h4>
                  <img className="letters" src={activity.picture} />
                  <h4>MESSAGE: {activity.message}</h4>
                  <h4>OBJECT: {activity.object}</h4>
                  <h4>TIME: {time}</h4>
                  <Button
                    onClick={(e) => {
                      toDelete(activity.id);
                    }}
                  >
                    DELETE
                  </Button>
                </div>
              );
            })}
      </div>
      <div>
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
    </div>
  );
}

// {
/* <Link to={`/details/${x.id}`}>
  <button>Read More</button>
// </Link>; */
// }

// import Post from "../components/Post/Post";
// import { connect } from "getstream";
// import { useState } from "react";
// import { stream } from "getstream";

// const client = stream.connect(
//   "swx3p43t6u96",
//   "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiMTAzOSJ9.0ZrkSSLYI3U0xZfHSR0iibmYCj6uF1YrtaiDk8HQXqg",
//   "1201597",
//   { timeout: 10000, browser: false }
// );
// console.log("this is the client", client);
// const timeline = client.feed("Timeline");
// console.log("this is the timeline", timeline);
// function FeedStream() {
//   const [posts, setResults] = useState([]);

//   timeline
//     .get({ limit: 20, offset: 0 })
//     .then(function (response) {
//       const awaitPosts = response.results;
//       setResults(awaitPosts);
//     })
//     .catch(function (reason) {
//       console.log(reason.error);
//     });

//   return posts.length === 0 ? (
//     <div className="p-4">Caricamento...</div>
//   ) : (
//     <>
//       {posts.map((post) => (
//         <Post post={post} key={post.id} />
//       ))}
//     </>
//   );
// }
// FeedStream().then((r) => console.log(r));
// export default FeedStream;
