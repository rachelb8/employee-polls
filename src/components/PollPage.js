import { connect } from "react-redux";
import UnansweredPoll from "./UnansweredPoll";
import AnsweredPoll from "./AnsweredPoll";
import defaultAvatar from "../icons/defaultAvatar.png";

const PollPage = ({ id, pollAnswered, author }) => {
  return (
    <div className="text-center m-4">
      <h2>Poll by {author.name} </h2>
      <img
        src={author.avatarURL ? author.avatarURL : defaultAvatar}
        className="img-fluid rounded shadow-2-strong"
        alt="poll author avatar"
      />
      <h3 className="m-2">Would You Rather?</h3>
      {pollAnswered ? <AnsweredPoll id={id} /> : <UnansweredPoll id={id} />}
    </div>
  );
};

const mapStateToProps = ({ authedUser, polls, users }, props) => {
  // const { id } = props.router.params;
  const { id } = props.match.params;
  const pollAnswered = users[authedUser].answers[id] ? true : false;
  const poll = polls[id];

  return {
    id,
    pollAnswered,
    author: poll ? users[poll.author] : null,
  };
};

export default connect(mapStateToProps)(PollPage);
