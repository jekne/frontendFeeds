import stream from "getstream";

const API_KEY = "gzes58qjwyyt";
const APP_ID = "1202347";
const API_SECRET =
  "wwx4b7ys5n87xfuqgyqn57uc5y7p5qjqzquxn9j9aw7bu3dbxnvua5xk98z5nnx8";
// const client = StreamChat.getInstance(API_KEY);
const client = stream.connect(
  API_KEY,
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiam9oYW5uIn0.joYUFoJTbGsKKL9kdiPoreKivHHT1VEzv1OWIpo2nfo"
);

// export const retrivingActivities = async()

export const getActivities = async (userId, token) => {
  try {
    const chris = client.feed("user", userId, token);
    console.log("User Id from retriving activities", userId);
    const getAct = await chris
      .get({
        limit: 5,
        offset: 0,
        reactions: { counts: true, own: true, recent: true },
        ranking: "likeRanking",
      })
      .then()
      .catch();
    // console.log("what is GETACT", getAct);
    // return getAct;
  } catch (error) {
    console.log("error", error);
  }
};
getActivities("johann").then((r) => console.log(r));
