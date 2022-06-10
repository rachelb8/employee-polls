import { useNavigate } from "react-router-dom";
import { MDBBtn } from "mdb-react-ui-kit";
import loginImage from "../icons/loginImage.png";

const AskLoginPage = () => {
  const navigate = useNavigate();

  const handleClick = (e) => {
    e.preventDefault();

    navigate("/login");
  };

  return (
    <div className="text-center m-4 d-flex align-items-center justify-content-center">
      <div style={{ width: "48rem" }}>
        <h1>Employee Polls</h1>
        <img src={loginImage} className="image" alt="login" />
        <h2>Please login to view your polls.</h2>
        <MDBBtn onClick={handleClick}>Let's login!</MDBBtn>
      </div>
    </div>
  );
};

export default AskLoginPage;
