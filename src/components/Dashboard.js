import { connect } from "react-redux";
import React, { useState } from "react";
import PollContainer from "./PollContainer";
import {
  MDBCard,
  MDBCardHeader,
  MDBTabs,
  MDBTabsItem,
  MDBTabsLink,
  MDBTabsContent,
  MDBTabsPane,
} from "mdb-react-ui-kit";
import AskLoginPage from "./AskLoginPage";

const Dashboard = ({ authedUser, unansweredPollIds, answeredPollIds }) => {
  const [tabActive, setTabActive] = useState("tabNewPolls");

  const handleTabClick = (value) => {
    if (value === tabActive) {
      return;
    }

    setTabActive(value);
  };

  return (
    <div>
      {!authedUser ? (
        <AskLoginPage />
      ) : (
        <div>
          <MDBCard className="text-center">
            <MDBCardHeader>
              <MDBTabs pills className="card-header-tabs">
                <MDBTabsItem>
                  <MDBTabsLink
                    onClick={() => handleTabClick("tabNewPolls")}
                    active={tabActive === "tabNewPolls"}
                  >
                    New Polls
                  </MDBTabsLink>
                </MDBTabsItem>
                <MDBTabsItem>
                  <MDBTabsLink
                    onClick={() => handleTabClick("tabCompletedPolls")}
                    active={tabActive === "tabCompletedPolls"}
                  >
                    Completed Polls
                  </MDBTabsLink>
                </MDBTabsItem>
              </MDBTabs>

              <MDBTabsContent>
                <MDBTabsPane show={tabActive === "tabNewPolls"}>
                  <PollContainer pollIds={unansweredPollIds} />
                </MDBTabsPane>
                <MDBTabsPane show={tabActive === "tabCompletedPolls"}>
                  <PollContainer pollIds={answeredPollIds} />
                </MDBTabsPane>
              </MDBTabsContent>
            </MDBCardHeader>
          </MDBCard>
        </div>
      )}
    </div>
  );
};

const mapStateToProps = ({ authedUser, polls, users }) => {
  let unansweredPollIds = null;
  let answeredPollIds = null;

  if (authedUser && polls && users) {
    unansweredPollIds = Object.keys(polls)
      .filter((id) => !users[authedUser].answers[id])
      .sort((a, b) => polls[b].timestamp - polls[a].timestamp);

    answeredPollIds = Object.keys(polls)
      .filter((id) => users[authedUser].answers[id])
      .sort((a, b) => polls[b].timestamp - polls[a].timestamp);
  }

  return {
    authedUser,
    unansweredPollIds,
    answeredPollIds,
  };
};

export default connect(mapStateToProps)(Dashboard);
