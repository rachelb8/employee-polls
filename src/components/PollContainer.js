import PropTypes from "prop-types";
import Poll from "./Poll";
import { MDBRow } from "mdb-react-ui-kit";

const PollContainer = ({ pollIds }) => {
  return (
    <div className="text-center">
      <MDBRow className="row-cols-1 row-cols-md-3 g-4">
        {pollIds.map((id) => (
          <Poll key={id} id={id} />
        ))}
      </MDBRow>
    </div>
  );
};

PollContainer.propTypes = {
  pollIds: PropTypes.array.isRequired,
}

export default PollContainer;
