import { connect } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { resetAuthedUser } from "../actions/authedUser";
import defaultAvatar from "../icons/defaultAvatar.png";
import {
  MDBContainer,
  MDBNavbar,
  MDBNavbarBrand,
  MDBBtn,
} from "mdb-react-ui-kit";

const Nav = ({ dispatch, authedUser, users }) => {
  let navigate = useNavigate();
  let user = null;
  if (authedUser && users) {
    user = users[authedUser];
  }

  const handleClick = (e) => {
    e.preventDefault();

    dispatch(resetAuthedUser());
    navigate("/");
  };

  return (
    <div>
      {user && (
        <MDBNavbar expand="lg" light bgColor="light">
          <MDBContainer fluid>
            <MDBNavbarBrand>Employee Polls</MDBNavbarBrand>
            <div>
              <Link to="/">Home</Link>
            </div>
            <div>
              <Link to="/leaderboard">Leaderboard</Link>
            </div>
            <div>
              <Link to="/add">New</Link>
            </div>

            <div style={{ width: "16rem" }}>
              <img
                alt="avatar"
                className="avatar"
                src={user.avatarURL ? `${user.avatarURL}` : defaultAvatar}
              />
              <span>{user.id}</span>
            </div>
            <MDBBtn style={{ width: "8rem" }} onClick={handleClick}>Logout</MDBBtn>
          </MDBContainer>
        </MDBNavbar>
      )}
    </div>
  );
};

function mapStateToProps({ authedUser, users }) {
  return {
    authedUser,
    users,
  };
}

export default connect(mapStateToProps)(Nav);
