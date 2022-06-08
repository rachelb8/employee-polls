import { useEffect } from "react";
import { connect } from "react-redux";
import { handleInitialData } from "../actions/shared";
import Dashboard from "./Dashboard";
import LoadingBar from "react-redux-loading-bar";
import PollPage from "./PollPage";
import NewPoll from "./NewPoll";

const App = (props) => {
  useEffect(() => {
    props.dispatch(handleInitialData());
  }, []);
   return (
    <div>
      <LoadingBar />
      {/* {props.loading === true ? null : <Dashboard />} */}
      {/* {props.loading === true ? null : <PollPage match={{ params: { id: "vthrdm985a262al8qx3do" } }} />} */}
      {/* {props.loading === true ? null : <PollPage match={{ params: { id: "loxhs1bqm25b708cmbf3g" } }} />} */}
      {props.loading === true ? null : <NewPoll />}
    </div>
  );
};

const mapStateToProps = ({ authedUser }) => ({
  loading: authedUser === null,
});

export default connect(mapStateToProps)(App);
