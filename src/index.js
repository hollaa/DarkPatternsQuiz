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
    heading: "Do you consider this as a dark pattern?",
    scenario: "Scenario: You found this really good recipe for french toast, you are casually following it, when suddenly this window pops out.",
    picture: "../images/Question1.png",
    answers: [
      {text: "Dark pattern", correct: true},
      {text: "Not a dark pattern", correct: false},
    ]
  },
  {
    subheading: "Question 2",
    heading: "Do you consider this as a dark pattern?",
    scenario: "Scenario: You want to buy a new limited edition of poster and the web informs you about the number of items left.  ",
    picture: "../images/Question2.png",
    answers: [
      {text: "Dark pattern", correct: false},
      {text: "Not a dark pattern", correct: true},
    ]
  },
  {
    subheading: "Question 3",
    heading: "Do you consider this as a dark pattern?",
    scenario: "Scenario: You opened the Figma software to work at your project, when Figma just released another update. ",
    picture: "../images/Question3.png",
    answers: [
      {text: "Dark pattern", correct: true},
      {text: "Not a dark pattern", correct: false},
    ]
  },
  {
    subheading: "Question 4",
    heading: "Do you consider this as a dark pattern?",
    scenario: "Scenario: You are shopping for a new parfume and the company automatically includes eco wrapping and insurance of your package because they mean well. ",
    picture: "../images/Question4.png",
    answers: [
      {text: "Dark pattern", correct: true},
      {text: "Not a dark pattern", correct: false},
    ]
  },
  {
    subheading: "Question 5",
    heading: "Do you consider this as a dark pattern?",
    scenario: "Scenario: You want to turn off the notifications of an app so you don’t get notified at all.  ",
    picture: "../images/Question5.png",
    answers: [
      {text: "Dark pattern", correct: true},
      {text: "Not a dark pattern", correct: false},
    ]
  },
];

const explanations = [
  {
    subheading: "Question 1",
    paragpraph: "The past example was a dark pattern",
    picture: "../images/Question1.png",
    explanation: "This is dark pattern type “Interface Interference”, exactly, “Toying with emotions”, where the author includes any use of language, style, color,or other similar elements to evoke an emotion in order topersuade the user into a particular action. ",
    nextButton: "Next Question",
  },
  {
    subheading: "Question 2",
    paragpraph: "The past example was a not a dark pattern. Informing the user about the real number of items that is left, is actually good for the user.",
    picture: "../images/Question2.png",
    explanation: " ",
    nextButton: "Next Question",
  },
  {
    subheading: "Question 3",
    paragpraph: "The past example was a dark pattern",
    picture: "../images/Question3.png",
    explanation: "While Figma's team likely wants to ensure everyone experiences the benefits of their latest updates, requiring an update can disrupt your current or future workflow and they use 'Forced Action' deceptive pattern for that",
    nextButton: "Next Question",
  },
  {
    subheading: "Question 4",
    paragpraph: "The past example was a dark pattern",
    picture: "../images/Question4.png",
    explanation: "The e-shop's automatic addition of eco wrapping to your cart exemplifies either 'Presumed Consent' or 'Sneak into Basket' dark patterns, unfairly capitalizing on your potential eco-friendliness. ",
    nextButton: "Next Question",
  },
  {
    subheading: "Question 5",
    paragpraph: "The past example was a dark pattern",
    picture: "../images/Question5.png",
    explanation: "bla bla bla",
    nextButton: "Finish",
  },

]

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
const explanationParagraphElement = document.getElementById("explanationParagraph")
const nextButtonExplanationElement = document.getElementById("nextQuestionExplanationButton");
const explanationCalloutElement = document.getElementById("explanationCallout")

function showQuestion() {
  explanationContainerElement.style.display = "none"
  questionContainerElement.style.display = "flex";

  button1Element.removeEventListener("click", handleButtonClick );
  button2Element.removeEventListener("click", handleButtonClick );

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
  
  button1Element.addEventListener("click", handleButtonClick);
  button2Element.addEventListener("click", handleButtonClick);

  isAnswerSubmitted = false; // Reset answer submitted flag
}


function handleButtonClick(event) {
  if (isAnswerSubmitted) return; // Prevent multiple submissions

  isAnswerSubmitted = true;
  const clickedButton = event.target;
  const isCorrect = clickedButton === button1Element ? questions[currentQuestion].answers[0].correct : questions[currentQuestion].answers[1].correct;
  console.log(isCorrect);
  
  if (isCorrect) {
    score++;
    showExplanation(true);
  } else {
    showExplanation(false);
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
  const explanation = explanations[currentQuestion];
  explanationContainerElement.style.display = "flex";
  explanationSubheadingElement.textContent = explanation.subheading;
  if(correct){
    answerHeadingElement.textContent = "You are right!"
    nextButtonExplanationElement.classList.add("primaryButton");
    nextButtonExplanationElement.textContent = explanation.nextButton;
    nextButtonExplanationElement.addEventListener("click", () => showQuestion())
  }
  else{
    answerHeadingElement.textContent = "Quiz over!"
    nextButtonExplanationElement.classList.add("secondaryButton");
    nextButtonExplanationElement.textContent = "Try Again"
    nextButtonExplanationElement.addEventListener("click", () => {
     gameOver();
    })
  }

  answerParagraphElement.textContent = explanation.paragpraph;
  answerPictureElement.src = explanation.picture;
  if (!explanation.explanation.trim()) {
    explanationCalloutElement.style.display = "none";
  } else {
    explanationParagraphElement.textContent = explanation.explanation;
    explanationCalloutElement.style.display = "inline";
  }
}

function gameOver(){
  explanationContainerElement.style.display = "none"
  leaderboardContainerElement.style.display = "flex";
  if(score > 3){
    congratsHeadingElement.textContent = "Congratulations, you're a dark patterns master!"
  }
  else{
    congratsHeadingElement.textContent = "Oops, that did not work out "
  }
  scoreHeading.textContent = `Your score is ${score} out of 5`;
  questionContainerElement.style.display = "none";

  onSnapshot(colRef, (snapshot) => {
    let scores = [];
    snapshot.docs.forEach((doc) => {
      scores.push({ ...doc.data(), id: doc.id });
    });

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
}



//adding a username
const addUsername = document.querySelector('.add');
addUsername.addEventListener('submit', (e) => {
  e.preventDefault()
  addDoc(colRef, {
    username: addUsername.username.value,
    score: score
  })
    .then(() => {
      addUsername.reset();
    })
})



