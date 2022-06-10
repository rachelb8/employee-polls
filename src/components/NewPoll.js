import { useState } from "react";
import { connect } from "react-redux";
import { handleAddPoll } from "../actions/polls";
import { useNavigate } from "react-router-dom";
import { MDBInput, MDBBtn } from "mdb-react-ui-kit";
import AskLoginPage from "./AskLoginPage";

const NewPoll = ({ dispatch, authedUser }) => {
  const navigate = useNavigate();
  const [optionOne, setOptionOne] = useState("");
  const [optionTwo, setOptionTwo] = useState("");

  const handleChange = (e) => {
    const text = e.target.value;
    const option = e.target.id;

    option === "optionOne" ? setOptionOne(text) : setOptionTwo(text);
  };

  const handleClick = (e) => {
    e.preventDefault();

    dispatch(handleAddPoll(optionOne, optionTwo));
    navigate("/");
  };

  if (!authedUser) {
    return <AskLoginPage />;
  }

  return (
    <div className="text-center m-4 d-flex align-items-center justify-content-center">
      <div style={{ width: "48rem" }}>
        <h1>Would You Rather?</h1>
        <h3 className="text-muted">Create Your Own Poll</h3>
        <h4>First Option</h4>
        <MDBInput
          wrapperClass="mb-4"
          id="optionOne"
          label="Option One"
          type="text"
          onChange={handleChange}
        />
        <h4>Second Option</h4>
        <MDBInput
          wrapperClass="mb-4"
          id="optionTwo"
          label="Option Two"
          type="text"
          onChange={handleChange}
        />
        <MDBBtn
          onClick={handleClick}
          disabled={optionOne === "" || optionTwo === ""}
        >
          Submit
        </MDBBtn>
      </div>
    </div>
  );
};

function mapStateToProps({ authedUser }) {
  return {
    authedUser,
  };
}

export default connect(mapStateToProps)(NewPoll);
