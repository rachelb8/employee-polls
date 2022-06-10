import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import defaultAvatar from "../icons/defaultAvatar.png";
import {
  MDBCard,
  MDBCardImage,
  MDBCardBody,
  MDBCardTitle,
  MDBCardFooter,
  MDBBtn,
  MDBCol,
} from "mdb-react-ui-kit";
import { formatDate } from "../utils/helpers";

const Poll = ({ poll, author }) => {
  const avatarImage = author.avatarURL ? author.avatarURL : defaultAvatar;

  return (
    <MDBCol>
      <MDBCard className="h-100">
        <MDBCardImage
          src={avatarImage}
          alt={`Avatar of ${author.name}`}
          position="top"
        />
        <MDBCardBody className="text-center">
          <MDBCardTitle>{author.name} submitted a poll</MDBCardTitle>
          <Link to={`/questions/${poll.id}`}>
            <MDBBtn>Show</MDBBtn>
          </Link>
        </MDBCardBody>
        <MDBCardFooter>
          <small className="text-muted">{formatDate(poll.timestamp)}</small>
        </MDBCardFooter>
      </MDBCard>
    </MDBCol>
  );
};

function mapStateToProps({ polls, users }, { id }) {
  const poll = polls[id];

  return {
    poll: poll,
    author: poll ? users[poll.author] : null,
  };
}

Poll.propTypes = {
  poll: PropTypes.object.isRequired,
  author: PropTypes.object.isRequired,
}

export default connect(mapStateToProps)(Poll);
