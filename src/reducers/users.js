import {
  RECEIVE_USERS,
  ADD_POLL_TO_USER,
  ADD_ANSWER_TO_USER,
} from "../actions/users";

export default function users(state = {}, action) {
  switch (action.type) {
    case RECEIVE_USERS:
      return {
        ...state,
        ...action.users,
      };
    case ADD_POLL_TO_USER:
      return {
        ...state,
        [action.poll.author]: {
          ...state[action.poll.author],
          questions: state[action.poll.author].questions.concat([
            action.poll.id,
          ]),
        },
      };
    case ADD_ANSWER_TO_USER:
      return {
        ...state,
        [action.authedUser]: {
          ...state[action.authedUser],
          answers: {
            ...state[action.authedUser].answers,
            [action.qid]: action.answer,
          },
        },
      };
    default:
      return state;
  }
}
