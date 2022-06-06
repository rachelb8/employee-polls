import { connect } from "react-redux";
import UnansweredPoll from "./UnansweredPoll";
import AnsweredPoll from "./AnsweredPoll";

const PollPage = ({ id, pollAnswered }) => {
  return (
    <div className="text-center">
      {pollAnswered ? <AnsweredPoll id={id} /> : <UnansweredPoll id={id} />}
    </div>
  );
};

const mapStateToProps = ({ authedUser, users }, props) => {
  // const { id } = props.router.params;
  // const { pollId } = 'xj352vofupe1dqz9emx13r';
  const { id } = props.match.params;
  const pollAnswered = users[authedUser].answers[id] ? true : false;

  return {
    id,
    pollAnswered,
  };
};

export default connect(mapStateToProps)(PollPage);
