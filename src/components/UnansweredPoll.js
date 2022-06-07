import { connect } from "react-redux";
import { handleAddAnswer } from "../actions/polls";
import {
  MDBCard,
  MDBCardBody,
  MDBCardTitle,
  MDBRow,
  MDBCol,
  MDBBtn,
} from "mdb-react-ui-kit";

const UnansweredPoll = ({ id, dispatch, poll, author }) => {
  const handleClick = (e) => {
    e.preventDefault();

    dispatch(handleAddAnswer(id, e.target.id));


    // if (!id) {
    //     navigate("/");
    //   }
  };

  return (
    <div>
      <h2>Poll by {author.name} </h2>
      <img
        src={author.avatarURL}
        className="img-fluid rounded shadow-2-strong"
        alt="poll author avatar"
      />
      <h3>Would You Rather?</h3>
      <MDBRow className="row-cols-1 row-cols-md-2 g-4">
        <MDBCol>
          <MDBCard>
            <MDBCardBody>
              <MDBCardTitle>{poll.optionOne.text}</MDBCardTitle>
              <MDBBtn id="optionOne" onClick={handleClick}>Select</MDBBtn>
            </MDBCardBody>
          </MDBCard>
        </MDBCol>
        <MDBCol>
          <MDBCard>
            <MDBCardBody>
              <MDBCardTitle>{poll.optionTwo.text}</MDBCardTitle>
              <MDBBtn id="optionTwo" onClick={handleClick} >Select</MDBBtn>
            </MDBCardBody>
          </MDBCard>
        </MDBCol>
      </MDBRow>
    </div>
  );
};

function mapStateToProps({ polls, users }, { id }) {
  const poll = polls[id];

  return {
    poll,
    author: poll ? users[poll.author] : null,
  };
}

export default connect(mapStateToProps)(UnansweredPoll);
