import { initializeApp } from 'firebase/app'
import {
  collection, getFirestore, addDoc, onSnapshot, query, where, orderBy, doc
} from 'firebase/firestore'
import './main.scss'


const firebaseConfig = {
  apiKey: "AIzaSyDLkrpnxA4csgewSD58dxBCwQLqXOKrfa8",
  authDomain: "darkquiz-5191e.firebaseapp.com",
  projectId: "darkquiz-5191e",
  storageBucket: "darkquiz-5191e.appspot.com",
  messagingSenderId: "886246945015",
  appId: "1:886246945015:web:ccec7aacce9b608212a3f2"
};

initializeApp(firebaseConfig);

const db = getFirestore();
const colRef = collection(db, 'usernames');

//queries
const q = query(colRef, orderBy('score', 'desc'))
const addUsernameForm = document.querySelector('.add');

const questions = [
  {
    subheading: "Question 1",
    heading: "Do you consider this as a deceptive pattern?",
    scenario: "Scenario: You found a really good recipe for french toast, you are casually following it, when suddenly this window pops out.",
    picture: "images/Question1@2x.png",
    answers: [
      { text: "Deceptive pattern", correct: true },
      { text: "Not a deceptive pattern", correct: false },
    ], 
    
    paragpraph: "The past example was a deceptive pattern",
    redesign: "images/Question1Redesign@2x.png",
    explanation: "This is deceptive pattern type “Toying with emotions”, where the author includes any use of language, style, color,or other similar elements to evoke an emotion in order to persuade the user into a particular action.",
    nextButton: "Next Question",
  },
  {
    subheading: "Question 2",
    heading: "Do you consider this as a deceptive pattern?",
    scenario: "Scenario: You want to buy a new limited edition of poster and the web informs you about the number of items left.  ",
    picture: "images/Question2@2x.png",
    answers: [
      { text: "Deceptive pattern", correct: false },
      { text: "Not a deceptive pattern", correct: true },
    ],

    paragpraph: "The past example was a not a deceptive pattern. Informing the user about the real number of items that is left, is actually good for the user.",
    redesign:" ",
    explanation: " ",
    nextButton: "Next Question",
  },
  {
    subheading: "Question 3",
    heading: "Do you consider this as a deceptive pattern?",
    scenario: "Scenario: You opened the Figma software to work at your project, when Figma just released another update. ",
    picture: "images/Question3@2x.png",
    answers: [
      { text: "Deceptive pattern", correct: true },
      { text: "Not a deceptive pattern", correct: false },
    ],
    
    paragpraph: "The past example was a deceptive pattern",
    redesign: "images/Question3Redesign@2x.png",
    explanation: "While Figma's team likely wants to ensure everyone experiences the benefits of their latest updates, requiring an update can disrupt your current or future workflow and they use 'Forced Action' deceptive pattern for that",
    nextButton: "Next Question",
  },
  {
    subheading: "Question 4",
    heading: "Do you consider this as a deceptive pattern?",
    scenario: "Scenario: You are shopping for a new parfume and the company automatically includes eco wrapping and insurance of your package because they mean well. ",
    picture: "images/Question4@2x.png",
    answers: [
      { text: "Deceptive pattern", correct: true },
      { text: "Not a deceptive pattern", correct: false },
    ],

    subheading: "Question 4",
    paragpraph: "The past example was a deceptive pattern",
    redesign: "images/Question4Redesign@2x.png",
    explanation: "The e-shop's automatic addition of eco wrapping or insurance to your cart exemplifies either 'Presumed Consent' or 'Sneak into Basket' deceptive patterns, unfairly capitalizing on your potential eco-friendliness. ",
    nextButton: "Next Question",
  },
  {
    subheading: "Question 5",
    heading: "Do you consider this as a deceptive pattern?",
    scenario: "Scenario: You open a new website and a cookie banner pops out with no other option than to accept the cookies. You can still browse through the website, but the banner stays at the bottom.",
    picture: "images/Question5@2x.png",
    answers: [
      { text: "Deceptive pattern", correct: true },
      { text: "Not a deceptive pattern", correct: false },
    ],

    paragpraph: "The past example was a deceptive pattern",
    redesign: "images/Question5Redesign@2x.png",
    explanation: " The lack of a reject button in a cookie consent banner is a 'Forced Action' deceptive pattern, limiting user choice and hindering informed consent.",
    nextButton: "Next Question",
  },
  {
    subheading: "Question 6",
    heading: "Do you consider this as a deceptive pattern?",
    scenario: "Scenario: You're about to perhaps accidentally delete an item from your online shopping cart. A pop-up appears asking 'Are you sure you want to delete this item?'.",
    picture: "images/Question6@2x.png",
    answers: [
      { text: "Deceptive pattern", correct: false },
      { text: "Not a deceptive pattern", correct: true },
    ],

    paragpraph: "The past example was not a deceptive pattern. This pop-up prevents accidental actions and offers a clear 'Leave' button to undo the deletion. It helps users confirm their intentions without creating undue pressure.",
    explanation: " ",
    redesign: " ", 
    nextButton: "Next Question",
  },

  {
    subheading: "Question 7",
    heading: "Do you consider this as a deceptive pattern?",
    scenario: "Scenario: You want to cancel your account on an e-shop since you no longer use it.",
    picture: "images/Question7@2x.png",
    answers: [
      { text: "Deceptive pattern", correct: true },
      { text: "Not a deceptive pattern", correct: false },
    ],

    paragpraph: "The past example was a deceptive pattern",
    redesign: "images/Question7Redesign@2x.png",
    explanation: "The company is making it significantly harder to cancel the users account and this pattern is called 'Roach Motel'. Usually, once the user calls them, they try to also pressure them to keep the account.",
    nextButton: "Next Question",
  },
  {
    subheading: "Question 8",
    heading: "Do you consider this as a deceptive pattern?",
    scenario: "Scenario: Imagine you're using a new fitness app. Every time you open the app, a pop-up appears prompting you to connect your social media accounts to share your workout achievements.",
    picture: "images/Question8@2x.png",
    answers: [
      { text: "Deceptive pattern", correct: true },
      { text: "Not a deceptive pattern", correct: false },
    ],

    paragpraph: "The past example was a deceptive pattern",
    redesign: "images/Question8Redesign@2x.png",
    explanation: "This is a nagging dark pattern. It uses repeated prompts to persistently nudge you towards an action (social media connection) that you might not necessarily want to take ",
    nextButton: "Next Question",
  },
  {
    subheading: "Question 9",
    heading: "Do you consider this as a deceptive pattern?",
    scenario: "Scenario: You are playing a game and to buy extra features, you have to purchase their currency. The 'gems' never exprire but it is not possible to transfer them back to your bank account.",
    picture: "images/Question9@2x.png",
    answers: [
      { text: "Deceptive pattern", correct: true },
      { text: "Not a deceptive pattern", correct: false },
    ],

    paragpraph: "The past example was a deceptive pattern",
    redesign: "images/Question9Redesign@2x.png",
    explanation: " The in-app gem purchase is an 'Intermediate currency' deceptive pattern, designed to disconnect you from the real cost and potentially lead to overspending.",
    nextButton: "Next Question",
  },
  {
    subheading: "Question 10",
    heading: "Do you consider this as a deceptive pattern?",
    scenario: "Scenario: You were browsing for a new book on Amazon and the next time you opened the page, you saw a section titled 'Related to items you viewed' filled with tempting accessories for your ereader.",
    picture: "images/Question10@2x.png",
    answers: [
      { text: "Deceptive pattern", correct: false },
      { text: "Not a deceptive pattern", correct: true },
    ],

    paragpraph: "The past example was not a deceptive pattern. While 'Releated to items you viewed' suggests personalization, it doesn't pressure the purchase or obscure the actual cost, making it a helpful suggestion rather than a deceptive pattern.",
    redesign: "", 
    explanation: " ",
    nextButton: "Finish",
  },
];


let currentQuestion = 0;
let score = 0;
let isAnswerSubmitted = false;

const questionContainerElement = document.getElementById("questionContainer");
const subheadingQuestionElement = document.getElementById("subheadingQuestion");
const headingElement = document.getElementById("heading");
const scenarioElement = document.getElementById("scenario");
const pictureElement = document.getElementById("questionPicture");
const button1Element = document.getElementById("button1");
const button2Element = document.getElementById("button2");
const congratsHeadingElement = document.getElementById("congratsHeading");
const scoreHeadingElement = document.getElementById("scoreHeading");
const leaderboardContainerElement = document.getElementById("leaderboardContainer")
const leaderboardTableBody = document.getElementById("leaderboard-data");

const explanationContainerElement = document.getElementById("explanationContainer");
const explanationSubheadingElement = document.getElementById("subheadingExplanation");
const answerHeadingElement = document.getElementById("answerHeading");
const answerParagraphElement = document.getElementById("answerParagraph");
const answerPictureElement = document.getElementById("answerPicture");
const redesignPictureElement = document.getElementById("redesignPicture");
const redesignLabelELement = document.getElementById("redesignLabel");
const deceptivePatterLabelElement = document.getElementById("headingImage");
const explanationParagraphElement = document.getElementById("explanationParagraph")
const nextButtonExplanationElement = document.getElementById("nextQuestionExplanationButton");
const explanationCalloutElement = document.getElementById("explanationCallout")

const darkPatternPageButtonElement = document.querySelector(".dpNextpage");
const tryAgainButtonElement = document.getElementById("tryAgainButton");
const footer = document.getElementsByTagName('footer');

function showQuestion() {
  explanationContainerElement.style.display = "none";
  leaderboardContainerElement.style.display = "none";

  questionContainerElement.style.display = "flex";

  button1Element.removeEventListener("click", handleButtonClick);
  button2Element.removeEventListener("click", handleButtonClick);

  if (currentQuestion >= questions.length) {
    gameOver();
    return;
  }

  const question = questions[currentQuestion];
  subheadingQuestionElement.textContent = question.subheading;
  headingElement.textContent = question.heading;
  scenarioElement.textContent = question.scenario;
  pictureElement.src = question.picture;

  button1Element.textContent = question.answers[0].text;
  button2Element.textContent = question.answers[1].text;

  button1Element.addEventListener("click", (event) => handleButtonClick(event, question));
  button2Element.addEventListener("click", (event) => handleButtonClick(event, question));

  isAnswerSubmitted = false; // Reset answer submitted flag
}


function handleButtonClick(event, question) {
  if (isAnswerSubmitted) return; // Prevent multiple submissions

  isAnswerSubmitted = true;
  const clickedButton = event.target;
  const isCorrect = clickedButton === button1Element ? questions[currentQuestion].answers[0].correct : questions[currentQuestion].answers[1].correct;
  console.log(currentQuestion);

  if (isCorrect) {
    score++;
    showExplanation(true, question);
  } else {
    showExplanation(false, question);
  }
  currentQuestion++;
}


const startButton = document.getElementById("start-button");
const landingPageContainer = document.querySelector(".landingPageContainer");
startButton.addEventListener("click", () => {
  landingPageContainer.style.display = "none";
  showQuestion();
});

function showExplanation(correct) {
  questionContainerElement.style.display = "none"
  const question = questions[currentQuestion];
  explanationContainerElement.style.display = "flex";
  explanationSubheadingElement.textContent = question.subheading;
  if (correct) {
    answerHeadingElement.textContent = "You are right!"
    answerHeadingElement.insertAdjacentHTML('afterbegin', '&nbsp;');
    answerHeadingElement.insertAdjacentHTML('afterbegin', '<i class="fa-regular fa-circle-check"></i>');
    answerHeadingElement.style.color = '#7CD676'
    nextButtonExplanationElement.textContent = question.nextButton;
    nextButtonExplanationElement.addEventListener("click", () => showQuestion())
  }
  else {
    answerHeadingElement.textContent = "Oops that was not correct";
    answerHeadingElement.insertAdjacentHTML('afterbegin', '&nbsp;');
    answerHeadingElement.insertAdjacentHTML('afterbegin', '<i class="fa-regular fa-circle-xmark"></i>');
    answerHeadingElement.style.color = '#D67676'
  }

  nextButtonExplanationElement.textContent = question.nextButton;
  nextButtonExplanationElement.addEventListener("click", () => showQuestion())

  answerParagraphElement.textContent = question.paragpraph;
  answerPictureElement.src = question.picture;
  if(question.redesign.trim()){
    redesignLabelELement.style.display = "block"
    deceptivePatterLabelElement.style.display = "block"
    redesignPictureElement.src = question.redesign;
  }else{
    deceptivePatterLabelElement.style.display = "none";
    redesignLabelELement.style.display = "none"
  }
  if (!question.explanation.trim()) {
    explanationCalloutElement.style.display = "none";
  } else {
    explanationParagraphElement.textContent = question.explanation;
    explanationCalloutElement.style.display = "inline";
  }
}

function gameOver() {
  explanationContainerElement.style.display = "none"
  leaderboardContainerElement.style.display = "flex";
  if (score > 5) {
    congratsHeadingElement.textContent = "Congratulations, you're a deceptive patterns master!"
  }
  else {
    congratsHeadingElement.textContent = "Well that could have been better"
  }
  scoreHeading.textContent = `Your score is ${score} out of 10`;
  questionContainerElement.style.display = "none";

  const addUsernameForm = document.querySelector('.add');
  onSnapshot(colRef, (snapshot) => {
    let scores = [];
    snapshot.docs.forEach((doc) => {
      scores.push({ ...doc.data(), id: doc.id });
    });

    // Sort scores array by score in descending order
    scores.sort((a, b) => b.score - a.score); 

    leaderboardTableBody.innerHTML = ""; // Clear existing data before adding new entries

    scores.forEach((entry) => {
      const tableRow = document.createElement("tr");
      const usernameCell = document.createElement("td");
      const scoreCell = document.createElement("td");

      usernameCell.textContent = entry.username;
      scoreCell.textContent = entry.score;

      tableRow.appendChild(usernameCell);
      tableRow.appendChild(scoreCell);
      leaderboardTableBody.appendChild(tableRow);
    });
  });

  darkPatternPageButtonElement.addEventListener("click", () => {
    score = 0;
    currentQuestion = 0;
    isAnswerSubmitted = false;
    leaderboardContainerElement.style.display = "none";
  });

  tryAgainButtonElement.addEventListener("click", () => {
    score = 0;
    currentQuestion = 0;
    isAnswerSubmitted = false;
    leaderboardContainerElement.style.display = "none";
    landingPageContainer.style.display = "flex";
    footer.style.display = "none";

  });
  footer.style.display = "block";
}



const addUsername = document.querySelector('.add');
addUsername.addEventListener('submit', (e) => {
  e.preventDefault()
  addDoc(colRef, {
    username: addUsername.username.value,
    score: score // Assuming you have a way to get the score value
  })
    .then(() => {
      addUsername.reset();
    })
})