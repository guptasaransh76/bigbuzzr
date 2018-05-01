import axios from "axios";

var instance = undefined;

const getInstance = () => {
  if (instance === undefined) {
    instance = axios.create({
      'baseURL' : 'http://localhost:8080/api',
      headers: { 'Content-Type': 'application/json' },
      'origin': '*',
      'methods': 'GET,HEAD,PUT,PATCH,POST,DELETE',
      'preflightContinue': false,
      'xsrfCookieName': 'Buzzer-Session',
      'withCredentials': true
    });
  }

  return instance;
};

const login = (data) => {
  return getInstance().post("/auth/login", data);
};

const isAuthenticated = () => {
  return getInstance().get("/auth/isAuthenticated");
};

const startBank = (data) => {
  return getInstance().post("/banks", data);
}

const addQuestion = (data, bankId) => {
  return getInstance().post("/banks/" + bankId + "/questions", data);
}

const getAllBanks = () => {
  return getInstance().get("/banks");
}

const popListWithBank = () => {
  return getInstance().get("/banks");
}

const popListWithQuestion = (bankId) => {
  return getInstance().get("/banks/" + bankId + "/questions");
}

const inViewQuestions = (bankId) => {
  return getInstance().get("/banks/" + bankId + "/questions");
}

const updateQuestion = (data, bankId, quesId) => {
  return getInstance().patch("/banks/" + bankId + "/question/" + quesId, data);
}

const generateGameTag = () => {
  return getInstance().post("/quiz");
}

const joinQuiz = (data) => {
  return getInstance().post("/game/player", data);
}

const  getAllQuiz = () => {
  return getInstance().get("/quiz");
}

const  startGame = () => {
  return getInstance().get("/game");
}

const  quitCurrentQuiz = () => {
  return getInstance().post("/game/endGame");
}

const nextQuestion = (data) => {
  return getInstance().post("/game/nextQuestion", data);
}

const logout = (data) => {
  return getInstance().post("/auth/logout", data);
}

module.exports.login = login;
module.exports.isAuthenticated = isAuthenticated;
module.exports.startBank = startBank;
module.exports.logout = logout;
module.exports.addQuestion = addQuestion;
module.exports.getAllBanks = getAllBanks;
module.exports.popListWithBank = popListWithBank;
module.exports.popListWithQuestion = popListWithQuestion;
module.exports.inViewQuestions = inViewQuestions;
module.exports.updateQuestion = updateQuestion;
module.exports.generateGameTag = generateGameTag;
module.exports.joinQuiz = joinQuiz;
module.exports.nextQuestion = nextQuestion;
module.exports.getAllQuiz = getAllQuiz;
module.exports.quitCurrentQuiz = quitCurrentQuiz;
module.exports.startGame = startGame;
