import { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import { Form } from "react-bootstrap";
import { Col } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "react-bootstrap";
// import { StreamChat } from "stream-chat";
import { getTokenAndConnectUser } from "../Utils/getTokenAndConnectUser.js";

// const API_KEY = "gzes58qjwyyt";
const PORT = process.env.REACT_APP_PORT;
// const client = StreamChat.getInstance(API_KEY);

export default function Login({ setConnectUser, connectUser }) {
  const [userId, setUserId] = useState("");
  const [error, setError] = useState(null);
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  const submitForm = (event) => {
    event.preventDefault();

    getTokenAndConnectUser(userId, setConnectUser, setError);
    setOpen(true);
  };

  useEffect(() => {
    if (open) {
      navigate("/myfeeds");

      console.log("I am Here!");
    }
  }, [connectUser]);

  return (
    <div className="outoftheBoxLogin">
      <div className="backgroundPicture">
        <img
          className="logoStream"
          src="https://user-images.githubusercontent.com/24237865/138428440-b92e5fb7-89f8-41aa-96b1-71a5486c5849.png"
          alt="stream"
        ></img>

        <Container className="ContainerLogin">
          <Form as={Col} md={{ span: 6, offset: 3 }} className="mt-5">
            <Form.Group controlId="formBasicEmail">
              <Form.Label className="name">
                <strong>
                  <h1>USER NAME</h1>
                </strong>{" "}
              </Form.Label>
              <Form.Control
                style={{ width: "200px", height: "25px" }}
                value={userId}
                onChange={(event) => setUserId(event.target.value)}
                type="email"
                placeholder="Enter user name"
                required
              />
            </Form.Group>
            <Form.Group
              className="mt-5"
              style={{ marginTop: "10px", marginBottom: "10px" }}
            >
              <Button
                style={{ textAlign: "center" }}
                variant="primary"
                type="submit"
                onClick={submitForm}
              >
                LOGIN
              </Button>
            </Form.Group>
            <Link to="/" style={{ textAlign: "center" }}>
              Click to refresh
            </Link>
          </Form>
        </Container>
      </div>
    </div>
  );
}
