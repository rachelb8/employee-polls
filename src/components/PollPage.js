import { connect } from "react-redux";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import UnansweredPoll from "./UnansweredPoll";
import AnsweredPoll from "./AnsweredPoll";
import defaultAvatar from "../icons/defaultAvatar.png";
import AskLoginPage from "./AskLoginPage";

const withRouter = (Component) => {
  const ComponentWithRouterProp = (props) => {
    let location = useLocation();
    let navigate = useNavigate();
    let params = useParams();
    return <Component {...props} router={{ location, navigate, params }} />;
  };

  return ComponentWithRouterProp;
};

const PollPage = ({ id, authedUser, pollAnswered, author }) => {
  if(!authedUser){
    return(
      <AskLoginPage />
    );
  }
  return (
    <div className="text-center m-4">
      {(!id || !author) ? (
        <h1>404: Not Found</h1>
      ) : (
        <div>
          <h2>Poll by {author.name} </h2>
          <img
            src={author.avatarURL ? author.avatarURL : defaultAvatar}
            className="img-fluid rounded shadow-2-strong"
            alt="poll author avatar"
          />
          <h3 className="m-2">Would You Rather?</h3>
          {pollAnswered ? <AnsweredPoll id={id} /> : <UnansweredPoll id={id} />}
        </div>
      )}
    </div>
  );
};

const mapStateToProps = ({ authedUser, polls, users }, props) => {
  const { id } = props.router.params;
  const poll = polls[id];

  let pollAnswered = null
  if(authedUser && users){
    pollAnswered = users[authedUser].answers[id] ? true : false;
  }

  return {
    authedUser,
    id,
    pollAnswered,
    author: poll ? users[poll.author] : null,
  };
};

export default withRouter(connect(mapStateToProps)(PollPage));
