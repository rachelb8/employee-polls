import {connect} from 'react-redux';
import { MDBCard, MDBCardImage, MDBCardBody, MDBCardTitle, MDBCardFooter, MDBBtn, MDBCol } from 'mdb-react-ui-kit';
import {formatDate} from '../utils/helpers';

const Poll = ({ poll, author }) => {
        const defaultAvatar = "../icons/defaultAvatar.png"; // TODO: fix
        const avatarImage = author.avatarURL ?  author.avatarURL : defaultAvatar;

        return (
                <MDBCol>
                    <MDBCard className='h-100'>
                      <MDBCardImage
                        src={avatarImage}
                        alt={`Avatar of ${author.name}`}
                        position='top'
                      />
                        <MDBCardBody className="text-center">
                          <MDBCardTitle>
                            {author.name} submitted a poll
                          </MDBCardTitle>
                            {/* <Link to={`/questions/${id}`}> TODO: link to poll page */} 
                                <MDBBtn>Show</MDBBtn>
                            {/* </Link> */}
                        </MDBCardBody>
                        <MDBCardFooter>
                            <small className="text-muted">{formatDate(poll.timestamp)}</small>
                        </MDBCardFooter>
                    </MDBCard>
                </MDBCol>
        );
    };

function mapStateToProps({polls, users}, {id}) {
    const poll = polls[id];

    return {
        poll: poll,
        author: poll ? users[poll.author] : null
    };
}

export default connect(mapStateToProps)(Poll);