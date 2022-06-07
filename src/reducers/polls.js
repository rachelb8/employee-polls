import { RECEIVE_POLLS, ADD_POLL, ADD_ANSWER } from "../actions/polls";

export default function polls(state = {}, action) {
  switch (action.type) {
    case RECEIVE_POLLS:
      return {
        ...state,
        ...action.polls,
      };

    case ADD_POLL:
      return {
        ...state,
        [action.poll.id]: action.poll,
      };

    case ADD_ANSWER: {
      const { qid, answer, authedUser } = action;

      return {
        ...state,
        [qid]: {
          ...state[qid],
          [answer]: {
            ...state[qid][answer],
            votes: state[qid][answer].votes.concat([authedUser]),
          },
        },
      };
    }

    default:
      return state;
  }
}
