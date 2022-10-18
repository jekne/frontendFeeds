import axios from "axios";
import stream from "getstream";
import { apiUrl } from "../Config/constants.js";

const API_KEY = "gzes58qjwyyt";
const APP_ID = "1202347";
// const API_SECRET =
//   "wwx4b7ys5n87xfuqgyqn57uc5y7p5qjqzquxn9j9aw7bu3dbxnvua5xk98z5nnx8";

export async function getTokenAndConnectUser(userId, setConnectUser) {
  try {
    const response = await axios.get(`${apiUrl}/token?userId=${userId}`);
    const token = response.data.token;
    // console.log(" Token from getTokenANdConnectUser", token);

    const connectUser = stream.connect(API_KEY, token, APP_ID);
    // console.log("what is connectUser from get token?", connectUser);
    setConnectUser(connectUser);
  } catch (error) {
    // setError(error.message);
  }
}

// ConnectUserWithToken().then((r) => console.log(r));
