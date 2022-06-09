import { useEffect, Fragment } from "react";
import { connect } from "react-redux";
import { handleInitialData } from "../actions/shared";
import { Routes, Route } from "react-router-dom";
import LoadingBar from "react-redux-loading-bar";
import Nav from "./Nav";
import Dashboard from "./Dashboard";
import PollPage from "./PollPage";
import NewPoll from "./NewPoll";
import LoginPage from "./LoginPage";
import Leaderboard from "./Leaderboard";

const App = (props) => {
  useEffect(() => {
    props.dispatch(handleInitialData());
  }, []);
   return (
     <Fragment>
      <LoadingBar />
      <Nav />
      <div className="container">
        {props.loading === true ? null : (
          <Routes>
            <Route path="/login" element={<LoginPage/>}/>
            <Route path="/" exact element={<Dashboard />} />
            <Route path="/questions/:id" element={<PollPage />} />
            <Route path="/add" element={<NewPoll />} />
            <Route path="/leaderboard" element={<Leaderboard />} />
          </Routes>
        )}
      </div>
  </Fragment>
  );
};

const mapStateToProps = ({ polls }) => ({
  loading: polls === null,
});

export default connect(mapStateToProps)(App);
