import PropTypes from "prop-types";
import { connect } from "react-redux";
import {
  MDBCard,
  MDBCardBody,
  MDBCardTitle,
  MDBRow,
  MDBCol,
  MDBCardText,
  MDBProgress,
  MDBProgressBar,
} from "mdb-react-ui-kit";

const AnsweredPoll = ({ authedUser, poll }) => {
  const optionOneVotes = poll.optionOne.votes;
  const optionTwoVotes = poll.optionTwo.votes;

  const totalVotes = optionOneVotes.length + optionTwoVotes.length;

  const optionOneVotePercentage = Math.round(
    (optionOneVotes.length / totalVotes) * 100
  );
  const optionTwoVotePercentage = Math.round(
    (optionTwoVotes.length / totalVotes) * 100
  );

  const userSelectedOptionOne = optionOneVotes.includes(authedUser);
  const userSelectedOptionTwo = optionTwoVotes.includes(authedUser);

  return (
    <div>
      <MDBRow className="row-cols-1 row-cols-md-2 g-4">
        <MDBCol>
          <MDBCard
            background={userSelectedOptionOne ? "dark" : "light"}
            className={userSelectedOptionOne ? "text-white" : null}
          >
            <MDBCardBody>
              <MDBCardTitle>{poll.optionOne.text}</MDBCardTitle>
              <MDBCardText>
                {userSelectedOptionOne ? "You selected this option. " : null}
                Selected by {optionOneVotes.length} out of {totalVotes}{" "}
                employees
              </MDBCardText>
              <MDBProgress height="32">
                <MDBProgressBar
                  width={optionOneVotePercentage}
                  valuemin={0}
                  valuemax={100}
                >
                  {optionOneVotePercentage}%
                </MDBProgressBar>
              </MDBProgress>
            </MDBCardBody>
          </MDBCard>
        </MDBCol>
        <MDBCol>
          <MDBCard
            background={userSelectedOptionTwo ? "dark" : "light"}
            className={userSelectedOptionTwo ? "text-white" : null}
          >
            <MDBCardBody>
              <MDBCardTitle>{poll.optionTwo.text}</MDBCardTitle>
              <MDBCardText>
                {userSelectedOptionTwo ? "You selected this option. " : null}
                Selected by {optionTwoVotes.length} out of {totalVotes}{" "}
                employees
              </MDBCardText>
              <MDBProgress height="32">
                <MDBProgressBar
                  width={optionTwoVotePercentage}
                  valuemin={0}
                  valuemax={100}
                >
                  {optionTwoVotePercentage}%
                </MDBProgressBar>
              </MDBProgress>
            </MDBCardBody>
          </MDBCard>
        </MDBCol>
      </MDBRow>
    </div>
  );
};

function mapStateToProps({ authedUser, polls }, { id }) {
  const poll = polls[id];

  return {
    authedUser,
    poll,
  };
}

AnsweredPoll.propTypes = {
  authedUser: PropTypes.string,
  poll: PropTypes.object.isRequired,
}

export default connect(mapStateToProps)(AnsweredPoll);
