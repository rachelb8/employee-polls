import {
  _getUsers,
  _getQuestions,
  _saveQuestion,
  _saveQuestionAnswer,
} from "./_DATA.js";

export function getInitialData() {
  return Promise.all([_getUsers(), _getQuestions()]).then(([users, polls]) => ({
    users,
    polls,
  }));
}

export function savePoll(poll) {
  return _saveQuestion(poll);
}

export function savePollAnswer(answer) {
  return _saveQuestionAnswer(answer);
}
