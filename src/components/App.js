import { useEffect, Fragment } from "react";
import { connect } from "react-redux";
import { handleInitialData } from "../actions/shared";
import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import LoadingBar from "react-redux-loading-bar";
import Nav from "./Nav";
import Dashboard from "./Dashboard";
import PollPage from "./PollPage";
import NewPoll from "./NewPoll";
import LoginPage from "./LoginPage";
import Leaderboard from "./Leaderboard";

function RequireAuth({ children, authedUser }) {
  const location = useLocation();

  return authedUser ? (
    children
  ) : (
    <Navigate to="/login" replace state={{ path: location.pathname }} />
  );
}

const App = (props) => {
  useEffect(() => {
    props.dispatch(handleInitialData());
    // eslint-disable-next-line
  }, []);
  return (
    <Fragment>
      <LoadingBar />
      <Nav />
      <div className="container">
        {props.loading === true ? null : (
          <Routes>
            <Route path="/login" element={<LoginPage />} />
            <Route
              path="/"
              exact
              element={
                <RequireAuth authedUser={props.authedUser}>
                  <Dashboard />
                </RequireAuth>
              }
            />
            <Route
              path="/questions/:id"
              element={
                <RequireAuth authedUser={props.authedUser}>
                  <PollPage />
                </RequireAuth>
              }
            />
            <Route
              path="/add"
              element={
                <RequireAuth authedUser={props.authedUser}>
                  <NewPoll />
                </RequireAuth>
              }
            />
            <Route
              path="/leaderboard"
              element={
                <RequireAuth authedUser={props.authedUser}>
                  <Leaderboard />
                </RequireAuth>
              }
            />
          </Routes>
        )}
      </div>
    </Fragment>
  );
};

const mapStateToProps = ({ polls, authedUser }) => {
  return {
    authedUser,
    loading: polls === null,
  };
};

export default connect(mapStateToProps)(App);
