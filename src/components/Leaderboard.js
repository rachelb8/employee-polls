import { connect } from "react-redux";
import defaultAvatar from "../icons/defaultAvatar.png";
import {
  MDBTable,
  MDBTableHead,
  MDBTableBody,
  MDBCol,
  MDBRow,
} from "mdb-react-ui-kit";
import AskLoginPage from "./AskLoginPage";

const Leaderboard = ({ authedUser, users }) => {
  let usersInfo = Object.values(users);
  usersInfo.map(
    (user) =>
      (user.score = user.questions.length + Object.keys(user.answers).length)
  );
  const sortedUsers = usersInfo.sort((a, b) => b.score - a.score);

  if (!authedUser) {
    return <AskLoginPage />;
  }

  return (
    <div className="m-4 d-flex align-items-center justify-content-center">
      <MDBTable style={{ width: "56rem" }}>
        <MDBTableHead light>
          <tr>
            <th scope="col">Users</th>
            <th scope="col">Answered</th>
            <th scope="col">Created</th>
            <th scope="col">Score</th>
          </tr>
        </MDBTableHead>
        <MDBTableBody>
          {sortedUsers.map((user) => {
            return (
              <tr key={user.id}>
                <td>
                  <MDBRow>
                    {/* TODO: Try to fix alignment of avatar and user name */}
                    <MDBCol style={{ width: "0rem" }}>
                      <img
                        alt="avatar"
                        className="avatar"
                        src={
                          user.avatarURL ? `${user.avatarURL}` : defaultAvatar
                        }
                      />
                    </MDBCol>
                    <MDBCol>
                      <span>{user.name}</span>
                      <br></br>
                      <span className="text-muted">{user.id}</span>
                    </MDBCol>
                  </MDBRow>
                </td>
                <td>{Object.keys(user.answers).length}</td>
                <td>{user.questions.length}</td>
                <td>{user.score}</td>
              </tr>
            );
          })}
        </MDBTableBody>
      </MDBTable>
    </div>
  );
};

function mapStateToProps({ authedUser, users }) {
  return {
    authedUser,
    users,
  };
}

export default connect(mapStateToProps)(Leaderboard);
