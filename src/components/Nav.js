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
            <div className="d-flex justify-content-start">
              <div className="p-2">
                <MDBNavbarBrand>Employee Polls</MDBNavbarBrand>
              </div>
              <div className="p-2 m-2">
                <Link to="/">Home</Link>
              </div>
              <div className="p-2 m-2">
                <Link to="/leaderboard">Leaderboard</Link>
              </div>
              <div className="p-2 m-2 flex-fill">
                <Link to="/add">New</Link>
              </div>
            </div>

            <div className="px-2 d-flex align-items-center justify-content-center">
              <img
                alt="avatar"
                className="avatar"
                src={user.avatarURL ? `${user.avatarURL}` : defaultAvatar}
              />
              <span>{user.id}</span>
              <MDBBtn className="m-2" onClick={handleClick}>
                Logout
              </MDBBtn>
            </div>
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
