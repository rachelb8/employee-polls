import { useState } from "react";
import { connect } from "react-redux";
import { setAuthedUser } from "../actions/authedUser";
import { useNavigate } from "react-router-dom";
import {
  MDBInput,
  MDBBtn,
  MDBModal,
  MDBModalDialog,
  MDBModalContent,
  MDBModalHeader,
  MDBModalTitle,
  MDBModalBody,
  MDBModalFooter,
} from "mdb-react-ui-kit";
import loginImage from "../icons/loginImage.png";

const LoginPage = ({ dispatch, users }) => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [modal, setModal] = useState(false);

  const toggleShow = () => setModal(!modal);

  const handleChange = (e) => {
    const text = e.target.value;
    const option = e.target.id;

    option === "username" ? setUsername(text) : setPassword(text);
  };

  const handleClick = (e) => {
    e.preventDefault();

    const user = users[username];
    if (user && user.password === password) {
      dispatch(setAuthedUser(username));
      navigate("/");
    } else {
      toggleShow();
    }
  };

  return (
    <div className="text-center m-4 d-flex align-items-center justify-content-center">
      <div style={{ width: "48rem" }}>
        <h1>Employee Polls</h1>
        <img src={loginImage} className="image" alt="login" />
        <h4>Username</h4>
        <MDBInput
          data-testid="username-input"
          wrapperClass="mb-4"
          id="username"
          label="Username"
          type="text"
          onChange={handleChange}
        />
        <h4>Password</h4>
        <MDBInput
          data-testid="password-input"
          wrapperClass="mb-4"
          id="password"
          label="Password"
          type="password"
          onChange={handleChange}
        />
        <MDBBtn
          data-testid="login-button"
          onClick={handleClick}
          disabled={username === "" || password === ""}
        >
          Login
        </MDBBtn>
      </div>

      <MDBModal data-testid="error-modal" tabIndex="-1" show={modal} setShow={setModal}>
        <MDBModalDialog centered>
          <MDBModalContent>
            <MDBModalHeader>
              <MDBModalTitle>Login Failed</MDBModalTitle>
              <MDBBtn
                className="btn-close"
                color="none"
                onClick={toggleShow}
              ></MDBBtn>
            </MDBModalHeader>
            <MDBModalBody>
              <p>Please try logging in again.</p>
            </MDBModalBody>
            <MDBModalFooter>
              <MDBBtn onClick={toggleShow}>Close</MDBBtn>
            </MDBModalFooter>
          </MDBModalContent>
        </MDBModalDialog>
      </MDBModal>
    </div>
  );
};

function mapStateToProps({ users }) {
  return {
    users,
  };
}

export default connect(mapStateToProps)(LoginPage);
