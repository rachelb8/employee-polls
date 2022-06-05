import { connect } from "react-redux";
import React, { useState } from 'react';
import PollContainer from "./PollContainer";
import { MDBCard, MDBCardHeader, MDBTabs, MDBTabsItem, MDBTabsLink, MDBTabsContent, MDBTabsPane } from 'mdb-react-ui-kit';

const Dashboard = ({ unansweredPollIds, answeredPollIds }) => {
  const [basicActive, setBasicActive] = useState('tab1');

  const handleBasicClick = (value) => {
    if (value === basicActive) {
      return;
    }

    setBasicActive(value);
  };


  return (
    <div>
      <MDBCard className='text-center'>
      <MDBCardHeader>
        <MDBTabs pills className='card-header-tabs'>
          <MDBTabsItem>
            <MDBTabsLink onClick={() => handleBasicClick('tab1')} active={basicActive === 'tab1'}>
              New Polls
            </MDBTabsLink>
          </MDBTabsItem>
          <MDBTabsItem>
            <MDBTabsLink onClick={() => handleBasicClick('tab2')} active={basicActive === 'tab2'}>
              Completed Polls
            </MDBTabsLink>
          </MDBTabsItem>
        </MDBTabs>

        <MDBTabsContent>
        <MDBTabsPane show={basicActive === 'tab1'}><PollContainer pollIds={unansweredPollIds}/></MDBTabsPane>
        <MDBTabsPane show={basicActive === 'tab2'}><PollContainer pollIds={answeredPollIds}/></MDBTabsPane>
      </MDBTabsContent>
      </MDBCardHeader>
    </MDBCard>
    </div>
  );
};

const mapStateToProps = ({ authedUser, polls, users }) => {

    const unansweredPollIds= Object.keys(polls)
          .filter((id) => !users[authedUser].answers[id])
          .sort((a, b) => polls[b].timestamp - polls[a].timestamp);

    const answeredPollIds = Object.keys(polls)
          .filter((id) => users[authedUser].answers[id])
          .sort((a, b) => polls[b].timestamp - polls[a].timestamp);

    return {
        unansweredPollIds,
        answeredPollIds
    };
};

export default connect(mapStateToProps)(Dashboard);
